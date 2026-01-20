'use client';

import { useState } from 'react';
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
import { Package, Eye, Download, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: '#1024',
      date: 'Jan 12, 2024',
      status: 'Fulfilled',
      total: '$129.00',
      payment: 'Paid',
      items: 2,
      trackingNumber: 'TRK123456789',
    },
    {
      id: '#1023',
      date: 'Dec 28, 2023',
      status: 'Fulfilled',
      total: '$89.50',
      payment: 'Paid',
      items: 1,
      trackingNumber: 'TRK987654321',
    },
    {
      id: '#1018',
      date: 'Nov 15, 2023',
      status: 'Processing',
      total: '$230.00',
      payment: 'Paid',
      items: 3,
      trackingNumber: null,
    },
    {
      id: '#1015',
      date: 'Oct 22, 2023',
      status: 'Shipped',
      total: '$175.00',
      payment: 'Paid',
      items: 2,
      trackingNumber: 'TRK456789123',
    },
    {
      id: '#1012',
      date: 'Sep 30, 2023',
      status: 'Cancelled',
      total: '$65.00',
      payment: 'Refunded',
      items: 1,
      trackingNumber: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fulfilled':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Shipped':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Processing':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
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
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Orders Table */}
        {filteredOrders.length > 0 ? (
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
                      Order
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
                      Payment
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
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/5 border-white/10 transition-colors group"
                    >
                      <TableCell className="font-medium">
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-bismuth-cyan hover:text-bismuth-magenta transition-colors"
                        >
                          {order.id}
                        </Link>
                      </TableCell>
                      <TableCell className="text-white/70">
                        {order.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(order.status)} border`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white/70">
                        {order.items} items
                      </TableCell>
                      <TableCell className="text-white/70">
                        {order.payment}
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {order.total}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                            asChild
                          >
                            <Link href={`/orders/${order.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          {order.trackingNumber && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
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
