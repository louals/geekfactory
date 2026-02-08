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
import { Package, Eye, Filter, Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orderService } from '@/lib/services/orders';
import { Order } from '@/types/api';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrdersMe();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'processing':
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order._id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-bismuth-cyan to-bismuth-magenta flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-white">
                Order History
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Track and manage your orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-white/20 text-white/80 px-4 py-2"
            >
              {filteredOrders.length}{' '}
              {filteredOrders.length === 1 ? 'Order' : 'Orders'}
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search by order number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-bismuth-cyan"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-white/10 text-white">
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Orders Table */}
        {isLoading ? (
          <div className="flex items-center justify-center p-20">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : filteredOrders.length > 0 ? (
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
                      Order ID
                    </TableHead>
                    <TableHead className="text-white/80 uppercase tracking-wider text-xs">
                      Date
                    </TableHead>
                    <TableHead className="text-white/80 uppercase tracking-wider text-xs">
                      Status
                    </TableHead>
                    <TableHead className="text-white/80 uppercase tracking-wider text-xs">
                      Items
                    </TableHead>
                    <TableHead className="text-white/80 uppercase tracking-wider text-xs">
                      Total
                    </TableHead>
                    <TableHead className="text-right text-white/80 uppercase tracking-wider text-xs">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/5 border-white/10 transition-colors group"
                    >
                      <TableCell className="font-medium">
                        <Link
                          href={`/profile/orders/${order._id}`}
                          className="text-bismuth-cyan hover:text-bismuth-magenta transition-colors"
                        >
                          #{order._id.slice(-6).toUpperCase()}
                        </Link>
                      </TableCell>
                      <TableCell className="text-white/70">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(order.status)} border capitalize`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white/70">
                        {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                            asChild
                          >
                            <Link href={`/profile/orders/${order._id}`}>
                              <Eye className="w-4 h-4" />
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
            <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No orders found
            </h3>
            <p className="text-white/60 mb-6">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : "You haven't placed any orders yet"}
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-bismuth-cyan to-bismuth-magenta hover:opacity-90 text-white"
            >
              <Link href="/products">Start Shopping</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

