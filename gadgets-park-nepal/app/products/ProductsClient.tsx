'use client';

import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryChip from '../components/CategoryChip';

interface ProductsClientProps {
  initialCategory?: string;
}

export default function ProductsClient({ initialCategory }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory ?? 'All');

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('All')}
              className={`flex-none inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer select-none ${
                activeCategory === 'All'
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                  : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <div key={cat} className="flex-none">
                <CategoryChip
                  category={cat}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  asFilter
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Showing <span className="font-semibold text-[var(--color-text)]">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'product' : 'products'}
          {activeCategory !== 'All' && (
            <>
              {' '}in <span className="font-semibold text-[var(--color-text)]">{activeCategory}</span>
            </>
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4" aria-hidden="true">🔍</span>
            <p className="text-lg font-semibold text-[var(--color-text)]">No products found</p>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Try a different category
            </p>
          </div>
        )}
      </div>
    </>
  );
}
