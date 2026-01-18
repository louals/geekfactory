import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { LogOut, MapPin, Package } from 'lucide-react';

export default function ProfilePage() {
    const orders = [
        {
            id: '#1024',
            date: 'Jan 12, 2024',
            status: 'Fulfilled',
            total: '$129.00',
            payment: 'Paid',
        },
        {
            id: '#1023',
            date: 'Dec 28, 2023',
            status: 'Fulfilled',
            total: '$89.50',
            payment: 'Paid',
        },
        {
            id: '#1018',
            date: 'Nov 15, 2023',
            status: 'Unfulfilled',
            total: '$230.00',
            payment: 'Pending',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-serif font-bold text-white">
                        My Account
                    </h1>
                    <Button
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
                    >
                        <LogOut className="w-4 h-4" /> Log out
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Order History */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-medium text-white flex items-center gap-2">
                            <Package className="w-5 h-5 text-bismuth-cyan" /> Order History
                        </h2>
                        {orders.length > 0 ? (
                            <div className="rounded-lg border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm">
                                <Table>
                                    <TableHeader className="bg-white/5">
                                        <TableRow className="hover:bg-transparent border-white/10">
                                            <TableHead className="text-gray-400">Order</TableHead>
                                            <TableHead className="text-gray-400">Date</TableHead>
                                            <TableHead className="text-gray-400">Payment</TableHead>
                                            <TableHead className="text-gray-400">
                                                Fulfillment
                                            </TableHead>
                                            <TableHead className="text-right text-gray-400">
                                                Total
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order) => (
                                            <TableRow
                                                key={order.id}
                                                className="hover:bg-white/5 border-white/10 transition-colors"
                                            >
                                                <TableCell className="font-medium text-bismuth-cyan">
                                                    <Link
                                                        href={`/orders/${order.id}`}
                                                        className="hover:underline"
                                                    >
                                                        {order.id}
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="text-gray-300">
                                                    {order.date}
                                                </TableCell>
                                                <TableCell className="text-gray-300">
                                                    {order.payment}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Fulfilled'
                                                                ? 'bg-green-500/10 text-green-400'
                                                                : 'bg-yellow-500/10 text-yellow-400'
                                                            }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right text-white">
                                                    {order.total}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                You haven&apos;t placed any orders yet.
                            </p>
                        )}
                    </div>

                    {/* Account Details */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-medium text-white flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-bismuth-magenta" /> Account
                            Details
                        </h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm space-y-4">
                            <div className="space-y-1">
                                <p className="text-white font-medium text-lg">The Smith</p>
                                <p className="text-gray-400">United States</p>
                            </div>
                            <Button
                                variant="link"
                                className="text-bismuth-cyan hover:text-bismuth-purple p-0 h-auto"
                            >
                                View Addresses (1)
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
