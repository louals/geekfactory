'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Gavel, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { biddingService } from '@/lib/services/bidding';
import { BidHistoryItem } from '@/types/api';

export default function BidsPage() {
    const [bids, setBids] = useState<BidHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const data = await biddingService.getMyBidHistory();
                setBids(data);
            } catch (error) {
                console.error('Failed to fetch bids:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBids();
    }, []);

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-bismuth-magenta to-bismuth-purple flex items-center justify-center">
                            <Gavel className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-serif font-bold text-white">
                                My Bids
                            </h1>
                            <p className="text-white/60 text-sm mt-1">
                                Track your active and past bids
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Badge
                            variant="outline"
                            className="border-white/20 text-white/80 px-4 py-2"
                        >
                            {bids.length} {bids.length === 1 ? 'Bid' : 'Bids'}
                        </Badge>
                    </div>
                </div>

                {/* Bids Table */}
                {isLoading ? (
                    <div className="flex items-center justify-center p-20">
                        <Loader2 className="w-8 h-8 text-bismuth-magenta animate-spin" />
                    </div>
                ) : bids.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-lg border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm"
                    >
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-white/5">
                                    <TableRow className="hover:bg-transparent border-white/10">
                                        <TableHead className="text-white/80 uppercase tracking-wider text-xs">
                                            Product
                                        </TableHead>
                                        <TableHead className="text-white/80 uppercase tracking-wider text-xs">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-white/80 uppercase tracking-wider text-xs">
                                            Bid Amount
                                        </TableHead>
                                        <TableHead className="text-white/80 uppercase tracking-wider text-xs">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-right text-white/80 uppercase tracking-wider text-xs">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bids.map((bid, index) => (
                                        <motion.tr
                                            key={bid._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-white/5 border-white/10 transition-colors group"
                                        >
                                            <TableCell className="font-medium">
                                                <span className="text-white">
                                                    {bid.product.name}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-white/70">
                                                {new Date(bid.createdAt).toLocaleDateString()} {new Date(bid.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </TableCell>
                                            <TableCell className="text-bismuth-cyan font-mono">
                                                ${bid.amount.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {bid.isHighestBid ? (
                                                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 capitalize">
                                                        Highest Bidder
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 capitalize">
                                                        Outbid
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                                                        asChild
                                                    >
                                                        <Link href={`/auctions/${bid.product._id}`}>
                                                            <ExternalLink className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 rounded-lg p-12 backdrop-blur-sm text-center"
                    >
                        <Gavel className="w-16 h-16 text-white/20 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white mb-2">
                            No bids found
                        </h3>
                        <p className="text-white/60 mb-6">
                            You haven't placed any bids yet.
                        </p>
                        <Button
                            asChild
                            className="bg-gradient-to-r from-bismuth-magenta to-bismuth-purple hover:opacity-90 text-white"
                        >
                            <Link href="/auctions">Browse Auctions</Link>
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
