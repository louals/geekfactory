'use client';

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Package, Layers, Search } from 'lucide-react';
import { productService } from '@/lib/services/products';
import { categoryService } from '@/lib/services/categories';
import { Product, Category } from '@/types/api';
import { toast } from 'sonner';

export default function InventoryPage() {
    const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Form states
    const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        isActive: true,
        image: '',
    });

    const [categoryForm, setCategoryForm] = useState({
        name: '',
        slug: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [productsData, categoriesData] = await Promise.all([
                productService.getProducts(false), // Get all products including inactive
                categoryService.getCategories(),
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to fetch inventory data:', error);
            toast.error('Failed to load inventory');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { name, description, price, stock, category, isActive } = productForm;
            const submissionData = {
                name,
                description: description || undefined,
                price: Number(price),
                stock: stock ? Number(stock) : 0,
                category,
                isActive: !!isActive
            };

            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, submissionData);
                toast.success('Product updated successfully');
            } else {
                await productService.createProduct(submissionData);
                toast.success('Product created successfully');
            }

            setIsProductDialogOpen(false);
            setEditingProduct(null);
            resetProductForm();
            fetchData();
        } catch (error) {
            toast.error('Failed to save product');
        }
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await categoryService.updateCategory(editingCategory._id, categoryForm);
                toast.success('Category updated successfully');
            } else {
                await categoryService.createCategory(categoryForm);
                toast.success('Category created successfully');
            }
            setIsCategoryDialogOpen(false);
            setEditingCategory(null);
            setCategoryForm({ name: '', slug: '' });
            fetchData();
        } catch (error) {
            toast.error('Failed to save category');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await productService.deleteProduct(id);
            toast.success('Product deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await categoryService.deleteCategory(id);
            toast.success('Category deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    const resetProductForm = () => {
        setProductForm({
            name: '',
            description: '',
            price: 0,
            stock: 0,
            category: '',
            isActive: true,
            image: '',
        });
    };

    const openEditProduct = (product: Product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            description: product.description || '',
            price: product.price,
            stock: product.stock,
            category: typeof product.category === 'string' ? product.category : product.category._id,
            isActive: product.isActive,
            image: product.image || (Array.isArray(product.images) ? product.images[0] : ''),
        });
        setIsProductDialogOpen(true);
    };

    const openEditCategory = (category: Category) => {
        setEditingCategory(category);
        setCategoryForm({
            name: category.name,
            slug: category.slug,
        });
        setIsCategoryDialogOpen(true);
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white">Inventory Management</h1>
                    <p className="text-gray-400">Manage your products and collections</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                    <Button
                        variant={activeTab === 'products' ? 'secondary' : 'ghost'}
                        onClick={() => setActiveTab('products')}
                        className="gap-2"
                    >
                        <Package size={16} /> Products
                    </Button>
                    <Button
                        variant={activeTab === 'categories' ? 'secondary' : 'ghost'}
                        onClick={() => setActiveTab('categories')}
                        className="gap-2"
                    >
                        <Layers size={16} /> Categories
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder={`Search ${activeTab}...`}
                        className="pl-10 bg-white/5 border-white/10 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {activeTab === 'products' ? (
                    <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-gray-200" onClick={() => { setEditingProduct(null); resetProductForm(); }}>
                                <Plus className="mr-2 h-4 w-4" /> Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black/90 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleProductSubmit} className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Product Name</Label>
                                        <Input
                                            required
                                            value={productForm.name}
                                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                            className="bg-white/5 border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Category</Label>
                                        <Select
                                            value={productForm.category}
                                            onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                                        >
                                            <SelectTrigger className="bg-white/5 border-white/10">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-black border-white/10 text-white">
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <textarea
                                        className="w-full min-h-[100px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bismuth-cyan"
                                        value={productForm.description}
                                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Price ($)</Label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={productForm.price}
                                            onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                                            className="bg-white/5 border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Stock</Label>
                                        <Input
                                            type="number"
                                            required
                                            value={productForm.stock}
                                            onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) })}
                                            className="bg-white/5 border-white/10"
                                        />
                                    </div>
                                </div>

                                <p className="text-xs text-amber-400 bg-amber-400/10 p-3 rounded border border-amber-400/20 italic">
                                    Product images are currently handled automatically by the system. Only core details are required.
                                </p>


                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={productForm.isActive}
                                        onChange={(e) => setProductForm({ ...productForm, isActive: e.target.checked })}
                                        className="h-4 w-4 rounded border-white/10 bg-white/5 text-bismuth-cyan"
                                    />
                                    <Label htmlFor="isActive">Active (Visible to customers)</Label>
                                </div>

                                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 mt-6">
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                ) : (
                    <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-gray-200" onClick={() => { setEditingCategory(null); setCategoryForm({ name: '', slug: '' }); }}>
                                <Plus className="mr-2 h-4 w-4" /> Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black/90 border-white/10 text-white">
                            <DialogHeader>
                                <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCategorySubmit} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Category Name</Label>
                                    <Input
                                        required
                                        value={categoryForm.name}
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                                            setCategoryForm({ name, slug });
                                        }}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Slug</Label>
                                    <Input
                                        required
                                        value={categoryForm.slug}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 mt-4">
                                    {editingCategory ? 'Update Category' : 'Create Category'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
                {activeTab === 'products' ? (
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="text-gray-400">Product</TableHead>
                                <TableHead className="text-gray-400">Category</TableHead>
                                <TableHead className="text-gray-400">Price</TableHead>
                                <TableHead className="text-gray-400">Stock</TableHead>
                                <TableHead className="text-gray-400">Status</TableHead>
                                <TableHead className="text-center text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">Loading products...</TableCell>
                                </TableRow>
                            ) : filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">No products found</TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => (
                                    <TableRow key={product._id} className="border-white/5 hover:bg-white/5 transition-colors">
                                        <TableCell className="font-medium text-white">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                                                    {product.image || (product.images && product.images[0]) ? (
                                                        <img src={product.image || product.images?.[0]} alt={product.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <Package size={20} className="text-gray-600" />
                                                    )}
                                                </div>
                                                {product.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-400">
                                            {typeof product.category === 'string'
                                                ? categories.find(c => c._id === product.category)?.name || 'Unknown'
                                                : product.category.name}
                                        </TableCell>
                                        <TableCell className="text-white">${product.price.toFixed(2)}</TableCell>
                                        <TableCell className="text-white">
                                            <span className={product.stock <= 5 ? 'text-red-400 font-bold' : ''}>
                                                {product.stock}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={product.isActive ? 'default' : 'secondary'} className={product.isActive ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-gray-500/20 text-gray-400 border-gray-500/20'}>
                                                {product.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditProduct(product)}
                                                    className="h-8 w-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                ) : (
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="text-gray-400">Category Name</TableHead>
                                <TableHead className="text-gray-400">Slug</TableHead>
                                <TableHead className="text-center text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-10 text-gray-500">Loading categories...</TableCell>
                                </TableRow>
                            ) : filteredCategories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-10 text-gray-500">No categories found</TableCell>
                                </TableRow>
                            ) : (
                                filteredCategories.map((category) => (
                                    <TableRow key={category._id} className="border-white/5 hover:bg-white/5 transition-colors">
                                        <TableCell className="font-medium text-white">{category.name}</TableCell>
                                        <TableCell className="text-gray-400">/{category.slug}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditCategory(category)}
                                                    className="h-8 w-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteCategory(category._id)}
                                                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
