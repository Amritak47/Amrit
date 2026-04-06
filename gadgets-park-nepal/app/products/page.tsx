import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'All Products | Gadgets Park Nepal',
  description:
    'Browse iPhones, Android phones, MacBooks, iPads and smartwatches. All genuine products with fast delivery across Nepal.',
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Page header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'var(--bg-1)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Subtle gold glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 100% at 0% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--gold)' }}
          >
            Gadgets Park Nepal
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-3"
            style={{ color: 'var(--text)' }}
          >
            All Products
          </h1>
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            Genuine devices. Fast delivery. Best prices in Nepal.
          </p>
        </div>
      </div>

      <ProductsClient initialCategory={category} />
    </div>
  );
}
