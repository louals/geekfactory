import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#050505]">
      <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl h-screen sticky top-0 flex flex-col hidden lg:flex">
        <div className="p-8">
          <Link href="/">
            <h2 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-bismuth-cyan to-bismuth-purple cursor-pointer hover:opacity-80 transition-opacity">
              BISMUTH ADMIN
            </h2>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
          >
            <LayoutDashboard
              size={20}
              className="group-hover:text-bismuth-cyan transition-colors"
            />
            Overview
          </Link>
          <Link
            href="/admin/inventory"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
          >
            <Package
              size={20}
              className="group-hover:text-bismuth-magenta transition-colors"
            />
            Inventory
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
          >
            <ShoppingBag
              size={20}
              className="group-hover:text-bismuth-purple transition-colors"
            />
            Orders
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
          >
            <Users
              size={20}
              className="group-hover:text-bismuth-teal transition-colors"
            />
            Customers
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bismuth-cyan to-bismuth-purple" />
            <div>
              <p className="text-sm font-medium text-white">The Smith</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
