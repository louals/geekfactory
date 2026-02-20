'use client';

import { useEffect, useState } from 'react';
import { AuctionCard } from '@/components/AuctionCard';
import { Loader2 } from 'lucide-react';
import { biddingService } from '@/lib/services/bidding';
import { BiddingProduct } from '@/types/api';

export default function AuctionsPage() {
    const [auctions, setAuctions] = useState<BiddingProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuctions = async () => {
            setIsLoading(true);
            try {
                const data = await biddingService.getActiveAuctions();
                setAuctions(data);
            } catch (error) {
                console.error('Failed to fetch auctions:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAuctions();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="flex flex-col space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white relative inline-block">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bismuth-magenta via-bismuth-purple to-bismuth-cyan animate-gradient-x">
                                Live Auctions
                            </span>
                        </h1>
                        <p className="text-white/60 text-sm max-w-md">
                            Bid on exclusive, one-of-a-kind bismuth pieces.
                        </p>
                    </div>
                </div>

                {/* Auctions Grid */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <Loader2 className="h-8 w-8 text-bismuth-magenta animate-spin" />
                        </div>
                    ) : auctions.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {auctions.map((auction, i) => (
                                <AuctionCard
                                    key={auction._id}
                                    id={auction._id}
                                    name={auction.name}
                                    currentBid={auction.currentHighestBid || auction.biddingStartPrice || 0}
                                    image={auction.image}
                                    endTime={auction.biddingEndAt}
                                    delay={i * 50}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 gap-4">
                            <div className="w-16 h-16 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🏷️</span>
                            </div>
                            <p className="text-lg">No active auctions at the moment.</p>
                            <p className="text-sm text-white/40">Check back later for new drops.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
