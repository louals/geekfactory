import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface AuctionCardProps {
    id: string;
    name: string;
    currentBid: number;
    image?: string;
    endTime?: string;
    delay?: number;
}

export function AuctionCard({
    id,
    name,
    currentBid,
    image,
    endTime,
    delay = 0,
}: AuctionCardProps) {
    return (
        <Card
            className="border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group hover:border-bismuth-magenta/50 transition-all duration-300 h-full flex flex-col justify-between animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="h-64 relative bg-black/20 flex items-center justify-center overflow-hidden">
                {/* Abstract Bismuth Placeholder */}
                <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-bismuth-magenta/30 to-bismuth-purple/30 blur-3xl group-hover:scale-150 transition-transform duration-700" />

                {image ? (
                    <div className="relative w-full h-full p-8">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                ) : (
                    <div className="w-24 h-24 border-2 border-bismuth-cyan/30 rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_30px_rgba(34,211,238,0.3)]" />
                )}

                {/* Live Badge */}
                <div className="absolute top-4 right-4 bg-red-500/80 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse">
                    Live
                </div>
            </div>
            <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-serif font-bold text-white mb-2">{name}</h3>
                <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-widest text-white/40">Current Bid</span>
                    <p className="text-bismuth-magenta text-lg font-mono">${currentBid.toFixed(2)}</p>
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 relative z-10 flex flex-col gap-3">
                {endTime && (
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>Ends {new Date(endTime).toLocaleDateString()}</span>
                    </div>
                )}
                <Button
                    asChild
                    className="w-full rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-bismuth-magenta hover:border-bismuth-magenta/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-all duration-300"
                >
                    <Link href={`/auctions/${id}`}>Place Bid</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
