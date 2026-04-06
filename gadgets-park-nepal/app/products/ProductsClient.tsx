'use client';

import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

interface ProductsClientProps {
  initialCategory?: string;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
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
      <div
        className="sticky z-30 py-4"
        style={{
          top: '73px',
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {/* All button */}
            <button
              onClick={() => setActiveCategory('All')}
              className="flex-none inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold border cursor-pointer transition-all duration-150 min-h-[44px] whitespace-nowrap"
              style={
                activeCategory === 'All'
                  ? {
                      background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                      color: '#000',
                      border: '1px solid var(--gold)',
                    }
                  : {
                      background: 'var(--bg-2)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border)',
                    }
              }
              onMouseEnter={(e) => {
                if (activeCategory !== 'All') {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-gold)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== 'All') {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                }
              }}
            >
              All Products
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-none inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold border cursor-pointer transition-all duration-150 min-h-[44px] whitespace-nowrap"
                style={
                  activeCategory === cat
                    ? {
                        background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                        color: '#000',
                        border: '1px solid var(--gold)',
                      }
                    : {
                        background: 'var(--bg-2)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }
                }
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-gold)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Showing{' '}
          <span className="font-semibold" style={{ color: 'var(--text)' }}>
            {filtered.length}
          </span>{' '}
          {filtered.length === 1 ? 'product' : 'products'}
          {activeCategory !== 'All' && (
            <>
              {' '}in{' '}
              <span className="font-semibold" style={{ color: 'var(--gold)' }}>
                {activeCategory}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                color: 'var(--text-dim)',
              }}
            >
              <SearchIcon className="w-6 h-6" />
            </div>
            <p className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>
              No products found
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Try a different category
            </p>
          </div>
        )}
      </div>
    </>
  );
}
