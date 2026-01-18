'use client';

import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile filter
import { SlidersHorizontal } from 'lucide-react';
import { Separator } from '@radix-ui/react-select';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

export default function ProductsPage() {
    const products = [
        {
            id: '1',
            name: 'Iridescent Geode Ring',
            price: '$89.00',
            category: 'Rings',
        },
        {
            id: '2',
            name: 'Bismuth Crystal Pendant',
            price: '$129.00',
            category: 'Necklaces',
        },
        {
            id: '3',
            name: 'Elemental Cuff',
            price: '$159.00',
            category: 'Bracelets',
        },
        { id: '4', name: 'Prism Earrings', price: '$79.00', category: 'Earrings' },
        {
            id: '5',
            name: 'Geometry Necklace',
            price: '$199.00',
            category: 'Necklaces',
        },
        {
            id: '6',
            name: 'Rainbow Ore Bracelet',
            price: '$110.00',
            category: 'Bracelets',
        },
        { id: '7', name: 'Raw Crystal', price: '$45.00', category: 'Specimens' },
        {
            id: '8',
            name: 'Hopper Formation',
            price: '$210.00',
            category: 'Specimens',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="flex flex-col space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-8">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
                        All Products
                    </h1>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="md:hidden w-full border-white/10 text-white"
                                >
                                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="bg-black border-r border-white/10 text-white pt-10"
                            >
                                {/* Mobile Filters Content (Clone of Sidebar) */}
                                <FilterSidebar />
                            </SheetContent>
                        </Sheet>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 whitespace-nowrap hidden sm:inline">
                                Sort by:
                            </span>
                            <Select defaultValue="featured">
                                <SelectTrigger className="w-full md:w-[180px] bg-white/5 border-white/10 text-white">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="bg-black border-white/10 text-white">
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="w-64 hidden md:block flex-shrink-0 space-y-8">
                        <FilterSidebar />
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p, i) => (
                                <ProductCard key={p.id} {...p} delay={i * 50} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            className="hover:bg-white/10 hover:text-bismuth-cyan"
                                        />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            isActive
                                            className="bg-white text-black hover:bg-bismuth-cyan/80"
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            className="hover:bg-white/10 hover:text-white"
                                        >
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            className="hover:bg-white/10 hover:text-white"
                                        >
                                            3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            className="hover:bg-white/10 hover:text-bismuth-magenta"
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FilterSidebar() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-white uppercase tracking-wider">
                    Availability
                </h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="in-stock"
                            className="border-white/20 data-[state=checked]:bg-bismuth-cyan"
                        />
                        <label
                            htmlFor="in-stock"
                            className="text-sm text-gray-400 cursor-pointer hover:text-white"
                        >
                            In stock (12)
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="out-of-stock"
                            className="border-white/20 data-[state=checked]:bg-bismuth-cyan"
                        />
                        <label
                            htmlFor="out-of-stock"
                            className="text-sm text-gray-400 cursor-pointer hover:text-white"
                        >
                            Out of stock (2)
                        </label>
                    </div>
                </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-4">
                <h3 className="text-sm font-medium text-white uppercase tracking-wider">
                    Price
                </h3>
                <div className="px-2">
                    <Slider defaultValue={[0, 300]} max={500} step={1} className="py-4" />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                    <span>$0</span>
                    <span>$500+</span>
                </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-4">
                <h3 className="text-sm font-medium text-white uppercase tracking-wider">
                    Category
                </h3>
                <div className="space-y-2">
                    {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Specimens'].map(
                        (cat) => (
                            <div key={cat} className="flex items-center space-x-2">
                                <Checkbox
                                    id={cat}
                                    className="border-white/20 data-[state=checked]:bg-bismuth-cyan"
                                />
                                <label
                                    htmlFor={cat}
                                    className="text-sm text-gray-400 cursor-pointer hover:text-white"
                                >
                                    {cat}
                                </label>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
