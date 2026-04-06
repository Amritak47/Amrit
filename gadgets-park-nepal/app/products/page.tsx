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
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">
            Gadgets Park Nepal
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            All Products
          </h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Genuine devices. Fast delivery. Best prices in Nepal.
          </p>
        </div>
      </div>

      <ProductsClient initialCategory={category} />
    </div>
  );
}
