'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ArticlesPage() {
    const articles = [
        {
            title: "The Science of Oxidation Colors",
            snippet: "Why does Bismuth turn blue, then purple, then gold? It's all about thin-film interference.",
            date: "Jan 12, 2026",
            category: "Science"
        },
        {
            title: "Caring for your Hopper Crystals",
            snippet: "Bismuth is brittle. Here is how to ensure your jewelry lasts a lifetime without losing its shine.",
            date: "Dec 05, 2025",
            category: "Care Guide"
        },
        {
            title: "The Historical Alchemy of Element 83",
            snippet: "From ancient cosmetics to modern pharmaceuticals, Bismuth has had a wild journey through history.",
            date: "Nov 20, 2025",
            category: "History"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20 text-white min-h-screen">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-12 text-center">Journal of Elements</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-bismuth-cyan/50 hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Badge variant="outline" className="text-bismuth-cyan border-bismuth-cyan/30">{article.category}</Badge>
                            <span className="text-xs text-gray-500">{article.date}</span>
                        </div>
                        <h2 className="text-xl font-bold mb-3 group-hover:text-bismuth-magenta transition-colors">{article.title}</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">{article.snippet}</p>
                        <span className="text-bismuth-purple text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">Read Article →</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
