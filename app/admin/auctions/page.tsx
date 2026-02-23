'use client';

import { useEffect, useState, useCallback } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Gavel,
    Trophy,
    ChevronDown,
    ChevronUp,
    Loader2,
    RefreshCw,
    XCircle,
} from 'lucide-react';
import { biddingService } from '@/lib/services/bidding';
import { BiddingProduct, Bid, User } from '@/types/api';
import { toast } from 'sonner';

export default function AdminAuctionsPage() {
    const [auctions, setAuctions] = useState<BiddingProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [bidsMap, setBidsMap] = useState<Record<string, Bid[]>>({});
    const [loadingBidsFor, setLoadingBidsFor] = useState<string | null>(null);

    // Winner declaration modal state
    const [confirmWinner, setConfirmWinner] = useState<{
        auction: BiddingProduct;
        bid: Bid;
    } | null>(null);
    const [isDeclaring, setIsDeclaring] = useState(false);

    // Close auction modal state
    const [confirmClose, setConfirmClose] = useState<BiddingProduct | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    const fetchAuctions = useCallback(async () => {
        setIsLoading(true);
        try {
            // Fall back to getActiveAuctions if getAllAuctions returns empty
            let data: BiddingProduct[] = [];
            try {
                data = await biddingService.getAllAuctions();
            } catch {
                data = await biddingService.getActiveAuctions();
            }
            if (!data || data.length === 0) {
                data = await biddingService.getActiveAuctions();
            }
            setAuctions(data);
        } catch (error) {
            console.error('Failed to fetch auctions:', error);
            toast.error('Failed to load auctions');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAuctions();
    }, [fetchAuctions]);

    const toggleExpand = async (auction: BiddingProduct) => {
        if (expandedId === auction._id) {
            setExpandedId(null);
            return;
        }
        setExpandedId(auction._id);
        if (!bidsMap[auction._id]) {
            setLoadingBidsFor(auction._id);
            try {
                const bids = await biddingService.getProductBids(auction._id);
                setBidsMap((prev) => ({ ...prev, [auction._id]: bids }));
            } catch {
                toast.error('Failed to load bids for this auction');
            } finally {
                setLoadingBidsFor(null);
            }
        }
    };

    const handleDeclareWinner = async () => {
        if (!confirmWinner) return;
        const { auction, bid } = confirmWinner;
        const userId = typeof bid.user === 'object' ? bid.user._id : bid.user;
        setIsDeclaring(true);
        try {
            await biddingService.declareWinner(auction._id, userId);
            toast.success(`Winner declared for "${auction.name}"!`);
            setConfirmWinner(null);
            // Refresh
            await fetchAuctions();
            setBidsMap((prev) => {
                const copy = { ...prev };
                delete copy[auction._id];
                return copy;
            });
            setExpandedId(null);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err?.response?.data?.message || 'Failed to declare winner');
        } finally {
            setIsDeclaring(false);
        }
    };

    const handleCloseAuction = async () => {
        if (!confirmClose) return;
        setIsClosing(true);
        try {
            await biddingService.closeBidding(confirmClose._id);
            toast.success(`"${confirmClose.name}" auction closed`);
            setConfirmClose(null);
            await fetchAuctions();
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err?.response?.data?.message || 'Failed to close auction');
        } finally {
            setIsClosing(false);
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleString([], {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getAuctionStatus = (auction: BiddingProduct) => {
        const now = Date.now();
        if (!auction.biddingActive) return 'inactive';
        if (auction.biddingEndAt && new Date(auction.biddingEndAt).getTime() < now) return 'ended';
        if (auction.biddingStartAt && new Date(auction.biddingStartAt).getTime() > now) return 'upcoming';
        return 'live';
    };

    const statusBadge = (status: string) => {
        const map: Record<string, { label: string; cls: string }> = {
            live: { label: '● Live', cls: 'bg-green-500/20 text-green-400 border-green-500/30' },
            ended: { label: 'Ended', cls: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
            upcoming: { label: 'Upcoming', cls: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
            inactive: { label: 'Inactive', cls: 'bg-red-500/20 text-red-400 border-red-500/30' },
        };
        const { label, cls } = map[status] ?? map.inactive;
        return <Badge variant="outline" className={cls}>{label}</Badge>;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 text-bismuth-magenta animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white">Auction Management</h1>
                    <p className="text-gray-400">View bids, declare winners, and manage live auctions</p>
                </div>
                <Button
                    variant="outline"
                    onClick={fetchAuctions}
                    className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 gap-2 w-fit"
                >
                    <RefreshCw size={15} />
                    Refresh
                </Button>
            </div>

            {auctions.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500 gap-3 rounded-xl border border-white/10 bg-black/40">
                    <Gavel size={40} className="text-white/20" />
                    <p>No auctions found. Enable bidding on a product from Inventory.</p>
                </div>
            ) : (
                <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="text-gray-400">Product</TableHead>
                                <TableHead className="text-gray-400">Status</TableHead>
                                <TableHead className="text-gray-400">Start Price</TableHead>
                                <TableHead className="text-gray-400">Highest Bid</TableHead>
                                <TableHead className="text-gray-400">Total Bids</TableHead>
                                <TableHead className="text-gray-400">Ends At</TableHead>
                                <TableHead className="text-gray-400">Winner</TableHead>
                                <TableHead className="text-center text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auctions.map((auction) => {
                                const status = getAuctionStatus(auction);
                                const bids = bidsMap[auction._id] ?? [];
                                const isExpanded = expandedId === auction._id;
                                const isLoadingBids = loadingBidsFor === auction._id;
                                const winner = auction.winner;
                                const winnerName =
                                    typeof winner === 'object' && winner !== null
                                        ? (winner as User).name
                                        : winner
                                            ? 'Winner Declared'
                                            : null;

                                return (
                                    <>
                                        {/* Main Row */}
                                        <TableRow
                                            key={auction._id}
                                            className="border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                                            onClick={() => toggleExpand(auction)}
                                        >
                                            <TableCell className="font-medium text-white">
                                                <div className="flex items-center gap-2">
                                                    {isExpanded ? (
                                                        <ChevronUp size={14} className="text-bismuth-cyan shrink-0" />
                                                    ) : (
                                                        <ChevronDown size={14} className="text-gray-500 shrink-0" />
                                                    )}
                                                    {auction.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{statusBadge(status)}</TableCell>
                                            <TableCell className="text-gray-300 font-mono">
                                                ${(auction.biddingStartPrice ?? 0).toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-bismuth-cyan font-mono font-bold">
                                                {auction.currentHighestBid
                                                    ? `$${auction.currentHighestBid.toFixed(2)}`
                                                    : '—'}
                                            </TableCell>
                                            <TableCell className="text-gray-300">
                                                {auction.totalBids ?? '—'}
                                            </TableCell>
                                            <TableCell className="text-gray-400 text-xs">
                                                {formatDate(auction.biddingEndAt)}
                                            </TableCell>
                                            <TableCell>
                                                {winnerName ? (
                                                    <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                                                        <Trophy size={12} /> {winnerName}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-600 text-xs">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-center gap-2">
                                                    {status !== 'inactive' && !winnerName && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-7 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                                            onClick={() => setConfirmClose(auction)}
                                                        >
                                                            <XCircle size={12} className="mr-1" />
                                                            Close
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                        {/* Expanded Bids Sub-row */}
                                        {isExpanded && (
                                            <TableRow key={`${auction._id}-bids`} className="bg-black/30">
                                                <TableCell colSpan={8} className="p-0">
                                                    <div className="p-4 border-t border-white/5">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <p className="text-sm font-semibold text-white">
                                                                Bids for{' '}
                                                                <span className="text-bismuth-cyan">{auction.name}</span>
                                                            </p>
                                                            {!winnerName && (
                                                                <p className="text-xs text-gray-500">
                                                                    Click a bidder&apos;s row to declare them winner
                                                                </p>
                                                            )}
                                                        </div>

                                                        {isLoadingBids ? (
                                                            <div className="flex items-center justify-center py-6 text-gray-500">
                                                                <Loader2 size={18} className="animate-spin mr-2" />
                                                                Loading bids...
                                                            </div>
                                                        ) : bids.length === 0 ? (
                                                            <p className="text-center text-gray-500 py-6 text-sm">
                                                                No bids have been placed yet.
                                                            </p>
                                                        ) : (
                                                            <div className="rounded-lg border border-white/10 overflow-hidden">
                                                                <table className="w-full text-sm">
                                                                    <thead className="bg-white/5 text-xs uppercase text-gray-500 tracking-wider">
                                                                        <tr>
                                                                            <th className="px-4 py-2 text-left">Rank</th>
                                                                            <th className="px-4 py-2 text-left">Bidder</th>
                                                                            <th className="px-4 py-2 text-left">Email</th>
                                                                            <th className="px-4 py-2 text-right">
                                                                                Amount
                                                                            </th>
                                                                            <th className="px-4 py-2 text-right">
                                                                                Placed At
                                                                            </th>
                                                                            {!winnerName && (
                                                                                <th className="px-4 py-2 text-center">
                                                                                    Action
                                                                                </th>
                                                                            )}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="divide-y divide-white/5">
                                                                        {[...bids]
                                                                            .sort((a, b) => b.amount - a.amount)
                                                                            .map((bid, idx) => {
                                                                                const bidUser =
                                                                                    typeof bid.user === 'object'
                                                                                        ? bid.user
                                                                                        : null;
                                                                                const isTopBid = idx === 0;
                                                                                return (
                                                                                    <tr
                                                                                        key={bid._id}
                                                                                        className={`transition-colors ${isTopBid
                                                                                                ? 'bg-yellow-500/5 hover:bg-yellow-500/10'
                                                                                                : 'hover:bg-white/5'
                                                                                            }`}
                                                                                    >
                                                                                        <td className="px-4 py-3 text-center">
                                                                                            {isTopBid ? (
                                                                                                <Trophy
                                                                                                    size={14}
                                                                                                    className="text-yellow-400 mx-auto"
                                                                                                />
                                                                                            ) : (
                                                                                                <span className="text-gray-500 font-mono text-xs">
                                                                                                    #{idx + 1}
                                                                                                </span>
                                                                                            )}
                                                                                        </td>
                                                                                        <td className="px-4 py-3 text-white font-medium">
                                                                                            {bidUser?.name ?? 'User'}
                                                                                        </td>
                                                                                        <td className="px-4 py-3 text-gray-400 text-xs">
                                                                                            {bidUser?.email ?? '—'}
                                                                                        </td>
                                                                                        <td className="px-4 py-3 text-right font-mono text-bismuth-cyan font-bold">
                                                                                            ${bid.amount.toFixed(2)}
                                                                                        </td>
                                                                                        <td className="px-4 py-3 text-right text-gray-500 text-xs">
                                                                                            {formatDate(bid.createdAt)}
                                                                                        </td>
                                                                                        {!winnerName && (
                                                                                            <td className="px-4 py-3 text-center">
                                                                                                <Button
                                                                                                    size="sm"
                                                                                                    className="h-7 text-xs bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 hover:text-yellow-300 gap-1"
                                                                                                    onClick={() =>
                                                                                                        setConfirmWinner({
                                                                                                            auction,
                                                                                                            bid,
                                                                                                        })
                                                                                                    }
                                                                                                >
                                                                                                    <Trophy size={11} />
                                                                                                    Declare Winner
                                                                                                </Button>
                                                                                            </td>
                                                                                        )}
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Confirm Winner Dialog */}
            <Dialog open={!!confirmWinner} onOpenChange={(open) => !open && setConfirmWinner(null)}>
                <DialogContent className="bg-black/90 border-white/10 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            Confirm Winner
                        </DialogTitle>
                    </DialogHeader>
                    {confirmWinner && (
                        <div className="space-y-4 py-2">
                            <p className="text-gray-300 text-sm">
                                You are about to declare{' '}
                                <span className="text-white font-semibold">
                                    {typeof confirmWinner.bid.user === 'object'
                                        ? confirmWinner.bid.user.name
                                        : 'this user'}
                                </span>{' '}
                                as the winner of{' '}
                                <span className="text-bismuth-cyan font-semibold">
                                    {confirmWinner.auction.name}
                                </span>{' '}
                                with a bid of{' '}
                                <span className="text-yellow-400 font-mono font-bold">
                                    ${confirmWinner.bid.amount.toFixed(2)}
                                </span>
                                .
                            </p>
                            <p className="text-xs text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                ⚠️ This will close the auction. This action cannot be undone.
                            </p>
                            <div className="flex gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-white/10 hover:bg-white/5"
                                    onClick={() => setConfirmWinner(null)}
                                    disabled={isDeclaring}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 hover:text-yellow-300"
                                    onClick={handleDeclareWinner}
                                    disabled={isDeclaring}
                                >
                                    {isDeclaring ? (
                                        <Loader2 size={15} className="animate-spin mr-2" />
                                    ) : (
                                        <Trophy size={15} className="mr-2" />
                                    )}
                                    Confirm Winner
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Confirm Close Dialog */}
            <Dialog open={!!confirmClose} onOpenChange={(open) => !open && setConfirmClose(null)}>
                <DialogContent className="bg-black/90 border-white/10 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <XCircle className="w-5 h-5 text-red-400" />
                            Close Auction Early
                        </DialogTitle>
                    </DialogHeader>
                    {confirmClose && (
                        <div className="space-y-4 py-2">
                            <p className="text-gray-300 text-sm">
                                Are you sure you want to close the auction for{' '}
                                <span className="text-bismuth-cyan font-semibold">{confirmClose.name}</span> early?
                            </p>
                            <p className="text-xs text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                ⚠️ No winner will be declared automatically. Use &quot;Declare Winner&quot; to assign one first.
                            </p>
                            <div className="flex gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-white/10 hover:bg-white/5"
                                    onClick={() => setConfirmClose(null)}
                                    disabled={isClosing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                                    onClick={handleCloseAuction}
                                    disabled={isClosing}
                                >
                                    {isClosing ? (
                                        <Loader2 size={15} className="animate-spin mr-2" />
                                    ) : (
                                        <XCircle size={15} className="mr-2" />
                                    )}
                                    Close Auction
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
