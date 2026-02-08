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
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { orderService } from '@/lib/services/orders';
import { Order } from '@/types/api';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await orderService.getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
            toast.success(`Order status updated to ${newStatus}`);
            fetchOrders();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.email?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (typeof order.user !== 'string' && order.user?.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
            paid: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
            shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
            completed: 'bg-green-500/20 text-green-400 border-green-500/20',
            cancelled: 'bg-red-500/20 text-red-400 border-red-500/20',
        };
        return (
            <Badge variant="outline" className={styles[status] || ''}>
                {status.toUpperCase()}
            </Badge>
        );
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-serif font-bold text-white">Order Management</h1>
                <p className="text-gray-400">Track and manage customer orders</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search by ID or email..."
                        className="pl-10 bg-white/5 border-white/10 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-white/10 text-white">
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-gray-400">Order ID</TableHead>
                            <TableHead className="text-gray-400">Customer</TableHead>
                            <TableHead className="text-gray-400">Date</TableHead>
                            <TableHead className="text-gray-400">Total</TableHead>
                            <TableHead className="text-gray-400">Status</TableHead>
                            <TableHead className="text-center text-gray-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-gray-500">Loading orders...</TableCell>
                            </TableRow>
                        ) : filteredOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-gray-500">No orders found</TableCell>
                            </TableRow>
                        ) : (
                            filteredOrders.map((order) => (
                                <TableRow key={order._id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell className="font-mono text-xs text-bismuth-cyan">
                                        #{order._id.slice(-8).toUpperCase()}
                                    </TableCell>
                                    <TableCell className="text-white">
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {typeof order.user !== 'string' ? order.user?.name : 'Guest'}
                                            </span>
                                            <span className="text-xs text-gray-400">{order.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-400">
                                        {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                                    </TableCell>
                                    <TableCell className="text-white font-medium">${order.total.toFixed(2)}</TableCell>
                                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setIsDetailsOpen(true);
                                                }}
                                                className="h-8 w-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                                            >
                                                <Eye size={16} />
                                            </Button>
                                            <Select
                                                onValueChange={(value) => handleStatusUpdate(order._id, value)}
                                                defaultValue={order.status}
                                            >
                                                <SelectTrigger className="h-8 w-[120px] bg-white/5 border-white/10 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-black border-white/10 text-white">
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="paid">Paid</SelectItem>
                                                    <SelectItem value="shipped">Shipped</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="bg-black/95 border-white/10 text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-serif">Order Details</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-6 py-4">
                            <div className="grid grid-cols-2 gap-8 pb-6 border-b border-white/10">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Customer Info</h4>
                                    <p className="text-white font-medium">{typeof selectedOrder.user !== 'string' ? selectedOrder.user?.name : 'Guest Order'}</p>
                                    <p className="text-sm text-gray-400">{selectedOrder.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Order Info</h4>
                                    <p className="text-white font-medium">#{selectedOrder._id}</p>
                                    <p className="text-sm text-gray-400">{format(new Date(selectedOrder.createdAt), 'PPPP p')}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Items</h4>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded bg-black flex items-center justify-center border border-white/10 overflow-hidden">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <Package size={24} className="text-gray-700" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{item.name}</p>
                                                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-mono text-bismuth-cyan">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-400">Current Status:</span>
                                    {getStatusBadge(selectedOrder.status)}
                                </div>
                                <p className="text-2xl font-bold text-white">
                                    Total: <span className="text-bismuth-magenta">${selectedOrder.total.toFixed(2)}</span>
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
