'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { biddingService } from '@/lib/services/bidding';
import { useAuthStore } from '@/lib/auth-store';
import { BiddingProduct, Bid } from '@/types/api';
import { Loader2, Heart, Gavel, Clock, Trophy, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function AuctionPage({ params }: PageProps) {
    const { id } = use(params);
    const [product, setProduct] = useState<BiddingProduct | null>(null);
    const [bids, setBids] = useState<Bid[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState<string>('');
    const [isPlacingBid, setIsPlacingBid] = useState(false);

    const user = useAuthStore((state) => state.user);

    const fetchAuctionDetails = async () => {
        try {
            const [productData, bidsData] = await Promise.all([
                biddingService.getBiddingDetails(id),
                biddingService.getProductBids(id)
            ]);
            setProduct(productData);
            setBids(bidsData);
        } catch (error) {
            console.error('Failed to fetch auction details:', error);
            toast.error('Auction not found');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuctionDetails();

        // Optional: Poll for updates every 10 seconds
        const interval = setInterval(fetchAuctionDetails, 10000);
        return () => clearInterval(interval);
    }, [id]);

    const handlePlaceBid = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast.error('You must be logged in to place a bid');
            return;
        }

        if (!product) return;

        const amount = parseFloat(bidAmount);
        if (isNaN(amount)) {
            toast.error('Please enter a valid amount');
            return;
        }

        const currentHighest = product.currentHighestBid || product.biddingStartPrice || 0;
        if (amount <= currentHighest) {
            toast.error(`Bid must be higher than current price: $${currentHighest}`);
            return;
        }

        setIsPlacingBid(true);
        try {
            await biddingService.placeBid(id, amount);
            toast.success('Bid placed successfully!');
            setBidAmount('');
            // Refresh data
            await fetchAuctionDetails();
        } catch (error: any) {
            console.error("Place bid error:", error);
            toast.error(error.response?.data?.message || 'Failed to place bid');
        } finally {
            setIsPlacingBid(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-10 w-10 text-bismuth-magenta animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
                <h1 className="text-2xl font-bold mb-4">Auction Not Found</h1>
                <Button asChild variant="outline">
                    <Link href="/auctions">Back to Auctions</Link>
                </Button>
            </div>
        );
    }

    const currentPrice = product.currentHighestBid || product.biddingStartPrice || 0;
    const isEnded = new Date(product.biddingEndAt!).getTime() < Date.now();
    const sortedBids = [...bids].sort((a, b) => b.amount - a.amount);

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="mb-8">
                <Link
                    href="/auctions"
                    className="text-sm text-gray-500 hover:text-bismuth-magenta transition-colors"
                >
                    ← Back to Live Auctions
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Image Section */}
                <div className="relative aspect-square w-full max-w-[600px] mx-auto bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md flex items-center justify-center p-10 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-bismuth-magenta/10 to-bismuth-purple/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

                    {/* Live Badge */}
                    {!isEnded && (
                        <div className="absolute top-6 right-6 z-20 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                            Live Auction
                        </div>
                    )}
                    {isEnded && (
                        <div className="absolute top-6 right-6 z-20 bg-gray-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">
                            Auction Ended
                        </div>
                    )}

                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="relative z-10 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 ease-out"
                            priority
                        />
                    ) : (
                        <div className="relative z-10 w-48 h-48 border-4 border-bismuth-cyan/30 rotate-45 group-hover:rotate-90 transition-transform duration-700 shadow-[0_0_50px_rgba(34,211,238,0.3)]" />
                    )}
                </div>

                {/* Details & Bidding Section */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-bismuth-magenta tracking-widest uppercase text-xs font-bold border border-bismuth-magenta/30 px-3 py-1 rounded-full bg-bismuth-magenta/10">
                                {typeof product.category === 'string' ? 'Special Item' : product.category.name}
                            </span>
                            {isEnded && product.winner && (
                                <span className="text-bismuth-cyan tracking-widest uppercase text-xs font-bold border border-bismuth-cyan/30 px-3 py-1 rounded-full bg-bismuth-cyan/10 flex items-center gap-1">
                                    <Trophy className="w-3 h-3" /> Winner Declared
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
                            {product.name}
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Current Bid</span>
                            <span className="text-3xl font-mono text-bismuth-cyan font-bold">${currentPrice.toFixed(2)}</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Ends In</span>
                            <div className="flex items-center gap-2 text-white/80">
                                <Clock className="w-4 h-4 text-bismuth-purple" />
                                <span className="font-mono text-lg">
                                    {new Date(product.biddingEndAt!).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-6">
                        {product.description || 'No description available for this auction item.'}
                    </p>

                    {/* Bidding Area */}
                    {!isEnded ? (
                        <div className="bg-gradient-to-br from-white/5 to-black rounded-2xl border border-white/10 p-6 backdrop-blur-sm shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Gavel className="w-5 h-5 text-bismuth-magenta" />
                                Place Your Bid
                            </h3>

                            <form onSubmit={handlePlaceBid} className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">$</span>
                                        <Input
                                            type="number"
                                            placeholder={`${(currentPrice + 10).toFixed(2)} or more`}
                                            className="pl-8 h-12 bg-black/50 border-white/20 text-white focus:border-bismuth-magenta/50 text-lg font-mono"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            min={currentPrice + 0.01}
                                            step="0.01"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={isPlacingBid}
                                        className="h-12 px-8 bg-bismuth-magenta hover:bg-bismuth-magenta/80 text-white font-bold tracking-wide rounded-md shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition-all"
                                    >
                                        {isPlacingBid ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Bid Now'}
                                    </Button>
                                </div>
                                {!user && (
                                    <p className="text-xs text-center text-red-400">
                                        Please <Link href="/login" className="underline hover:text-white">login</Link> to place a bid.
                                    </p>
                                )}
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Bidding Closed</h3>
                            <p className="text-gray-400">This auction has ended.</p>
                        </div>
                    )}

                    {/* Bid History */}
                    <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                        <div className="p-4 border-b border-white/10 bg-black/20">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-bismuth-cyan" />
                                Recent Bids
                            </h3>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            {sortedBids.length > 0 ? (
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-black/40 text-xs uppercase tracking-wider text-gray-500 font-medium">
                                        <tr>
                                            <th className="px-4 py-3">Bidder</th>
                                            <th className="px-4 py-3 text-right">Amount</th>
                                            <th className="px-4 py-3 text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {sortedBids.map((bid) => (
                                            <tr key={bid._id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-3 text-white/80 font-mono text-xs">
                                                    {typeof bid.user === 'object' ? bid.user.name : 'Unknown User'}
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-bismuth-cyan">
                                                    ${bid.amount.toFixed(2)}
                                                </td>
                                                <td className="px-4 py-3 text-right text-gray-500 text-xs">
                                                    {new Date(bid.createdAt).toLocaleDateString()} {new Date(bid.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    No bids yet. Be the first!
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
