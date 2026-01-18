import Navbar from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">{children}</main>
      <footer className="border-t border-white/10 bg-black py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} The Bismuth Smith. Handcrafted
          Magic.
        </div>
      </footer>
    </div>
  );
}
