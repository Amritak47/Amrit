import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Gadgets Park Nepal | Premium Gadgets — iPhones, MacBooks & More',
  description:
    'Shop the latest iPhones, Android phones, MacBooks, iPads and smartwatches in Nepal. 100% genuine products. Fast delivery to all 77 districts. Pay via eSewa, Khalti or Cash on Delivery.',
  keywords: 'gadgets Nepal, iPhone Nepal, MacBook Nepal, Android phones Nepal, smartwatch Nepal, buy iPhone Kathmandu',
  openGraph: {
    title: 'Gadgets Park Nepal | Premium Gadgets',
    description: 'Premium phones, tablets & laptops — shipped across all 77 districts of Nepal.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font)' }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
