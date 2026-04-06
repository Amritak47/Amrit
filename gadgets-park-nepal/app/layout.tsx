import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Gadgets Park Nepal | Premium Gadgets in Nepal',
  description:
    'Shop the latest iPhones, Android phones, MacBooks, iPads and smartwatches in Nepal. Genuine products. Fast delivery. Pay via eSewa, Khalti or Cash on Delivery.',
  keywords: 'gadgets Nepal, iPhone Nepal, MacBook Nepal, Android phones Nepal, smartwatch Nepal',
  openGraph: {
    title: 'Gadgets Park Nepal | Premium Gadgets in Nepal',
    description: 'Premium phones, tablets & laptops — shipped across Nepal.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
