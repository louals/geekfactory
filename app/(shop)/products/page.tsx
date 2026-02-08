'use client';

import { useEffect, useState } from 'react';
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { productService } from '@/lib/services/products';
import { Product, Category } from '@/types/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          productService.getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (selectedCategories.length === 0) return true;
    const categoryId = typeof p.category === 'string' ? p.category : p.category._id;
    return selectedCategories.includes(categoryId);
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

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
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChange}
                />
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
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p, i) => (
                  <ProductCard
                    key={p._id}
                    id={p._id}
                    name={p.name}
                    price={`$${p.price.toFixed(2)}`}
                    category={typeof p.category === 'string' ? '' : p.category.name}
                    delay={i * 50}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
                <p className="text-lg">No products found.</p>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && filteredProducts.length > 0 && (
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
                      <PaginationNext
                        href="#"
                        className="hover:bg-white/10 hover:text-bismuth-magenta"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryChange
}: {
  categories: Category[],
  selectedCategories: string[],
  onCategoryChange: (id: string) => void
}) {
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
              In stock
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
          <Slider defaultValue={[0, 500]} max={1000} step={1} className="py-4" />
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>$0</span>
          <span>$1000+</span>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-white uppercase tracking-wider">
          Category
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat._id} className="flex items-center space-x-2">
              <Checkbox
                id={cat._id}
                checked={selectedCategories.includes(cat._id)}
                onCheckedChange={() => onCategoryChange(cat._id)}
                className="border-white/20 data-[state=checked]:bg-bismuth-cyan"
              />
              <label
                htmlFor={cat._id}
                className="text-sm text-gray-400 cursor-pointer hover:text-white"
              >
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

