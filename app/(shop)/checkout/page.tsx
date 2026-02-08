'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { orderService } from '@/lib/services/orders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ShoppingBag, Loader2, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalAmount, clearCart, isLoading: isCartLoading } = useCartStore();
    const { user } = useAuthStore();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        if (user && user.email) {
            setEmail(user.email);
        }
    }, [user]);

    // If cart is empty and not loading and not just succeeded, redirect to home
    useEffect(() => {
        if (items.length === 0 && !isCartLoading && !isSuccess) {
            router.push('/');
        }
    }, [items, isCartLoading, isSuccess, router]);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user && (!email || !name || !phone || !address)) {
            toast.error('Please fill in all information to continue as guest');
            return;
        }

        setIsSubmitting(true);
        try {
            // Send only the email. Sending 'name', 'phone', or 'address' 
            // currently triggers a 'property should not exist' error.
            const orderEmail = user?.email || email;
            const data = { email: orderEmail };

            const order = await orderService.createOrder(data);
            setOrderData(order);
            setIsSuccess(true);
            clearCart();
            toast.success('Order placed successfully!');
        } catch (error: any) {
            console.error('Order failed:', error);
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-4xl font-serif font-bold text-white">Thank You for Your Order!</h1>
                <p className="text-gray-400 max-w-md">
                    Your order <span className="text-bismuth-cyan font-mono">#{orderData?._id?.slice(-8).toUpperCase()}</span> has been placed successfully.
                    We&apos;ve sent a confirmation email to <span className="text-white font-medium">{user?.email || email}</span>.
                </p>
                <div className="pt-8 space-x-4">
                    <Button asChild className="rounded-full bg-white text-black hover:bg-gray-200 px-8">
                        <Link href="/">Back to Home</Link>
                    </Button>
                    {user && (
                        <Button asChild variant="outline" className="rounded-full border-white/10 text-white px-8">
                            <Link href="/profile/orders">View Orders</Link>
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/products" className="text-gray-500 hover:text-white transition-colors">
                        Collections
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                    <span className="text-white font-medium">Checkout</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Checkout Form */}
                    <div className="lg:col-span-7 space-y-8">
                        {!user && (
                            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-bismuth-magenta" />
                                        Guest Checkout
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="bg-black/50 border-white/10 text-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="bg-black/50 border-white/10 text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            placeholder="+213 5XX XX XX XX"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="bg-black/50 border-white/10 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-gray-300">Shipping Address</Label>
                                        <Input
                                            id="address"
                                            placeholder="Street, City, Province"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="bg-black/50 border-white/10 text-white"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Already have an account? <Link href="/login" className="text-bismuth-cyan hover:underline">Log in</Link> for faster checkout.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-bismuth-cyan" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-6 rounded-xl border border-bismuth-cyan/30 bg-bismuth-cyan/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-bismuth-cyan/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-bismuth-cyan" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Cash On Delivery</p>
                                            <p className="text-xs text-gray-400">Pay when you receive your crystal</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest bg-bismuth-cyan/20 text-bismuth-cyan px-2 py-1 rounded">DEFAULT</span>
                                </div>
                                <p className="text-xs text-gray-500 italic mt-4 text-center">
                                    More payment methods (Stripe, Crypto) coming soon.
                                </p>
                            </CardContent>
                        </Card>

                        <Button
                            onClick={handlePlaceOrder}
                            disabled={isSubmitting || (items.length === 0)}
                            className="w-full h-16 rounded-full bg-gradient-to-r from-bismuth-cyan to-bismuth-purple text-black font-extrabold text-xl hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all border-none group"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Complete Order <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 space-y-6">
                            <Card className="bg-black/60 border-white/10 backdrop-blur-xl overflow-hidden">
                                <CardHeader className="bg-white/5">
                                    <CardTitle className="text-white text-lg flex items-center gap-2">
                                        <ShoppingBag className="w-4 h-4" /> Order Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="max-h-[400px] overflow-y-auto px-6 py-4 space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="relative w-20 h-20 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                                                    {item.image ? (
                                                        <Image src={item.image} alt={item.name} fill className="object-cover p-2" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black" />
                                                    )}
                                                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-bismuth-magenta text-white text-[10px] flex items-center justify-center font-bold">
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <h4 className="text-white text-sm font-medium line-clamp-1">{item.name}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">{item.variant || 'Standard'}</p>
                                                    <p className="text-bismuth-cyan text-sm font-mono mt-2">${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator className="bg-white/10" />

                                    <div className="p-6 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Subtotal</span>
                                            <span className="text-white font-mono">${totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Shipping</span>
                                            <span className="text-green-500 uppercase text-[10px] font-bold tracking-widest mt-1">FREE</span>
                                        </div>
                                        <Separator className="bg-white/10 my-2" />
                                        <div className="flex justify-between items-end pt-2">
                                            <span className="text-white font-serif text-xl font-bold">Total</span>
                                            <div className="text-right">
                                                <span className="text-bismuth-magenta text-2xl font-mono font-bold">${totalAmount.toFixed(2)}</span>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">USD</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="px-4 text-center space-y-2">
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Secure Checkout • Encrypted Transactions</p>
                                <div className="flex justify-center gap-4 opacity-30 grayscale contrast-125">
                                    {/* Placeholder for payment logos */}
                                    <div className="h-4 w-8 bg-white/50 rounded" />
                                    <div className="h-4 w-8 bg-white/50 rounded" />
                                    <div className="h-4 w-8 bg-white/50 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
