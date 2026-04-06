import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  products,
  getProductBySlug,
  formatPrice,
  buildWhatsAppLink,
  categoryConfig,
} from '../../data/products';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${formatPrice(product.price)} | Gadgets Park Nepal`,
    description: `Buy ${product.name} in Nepal for ${formatPrice(product.price)}. Genuine product. Fast delivery. Pay via eSewa, Khalti or Cash on Delivery.`,
  };
}

const PAYMENT_METHODS = [
  {
    id: 'esewa',
    label: 'eSewa',
    icon: 'e',
    iconColor: 'text-green-700',
    iconBg: 'bg-green-100',
    desc: 'Digital wallet',
  },
  {
    id: 'khalti',
    label: 'Khalti',
    icon: 'K',
    iconColor: 'text-purple-700',
    iconBg: 'bg-purple-100',
    desc: 'Digital wallet',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    icon: '₹',
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-100',
    desc: 'Pay on arrival',
  },
];

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const config = categoryConfig[product.category];
  const waLink = buildWhatsAppLink(product.name, product.price);
  const igLink = `https://instagram.com/gadgetsparknepal`;
  const igMessage = encodeURIComponent(`Hi, I want to order ${product.name} - ${formatPrice(product.price)}`);
  const igOrderLink = `https://ig.me/m/gadgetsparknepal?text=${igMessage}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="hover:text-[var(--color-accent)] transition-colors">
              Products
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-text)] font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product image placeholder */}
          <div className="lg:sticky lg:top-24">
            <div
              className={`w-full aspect-square rounded-3xl flex flex-col items-center justify-center gap-4 ${
                config ? config.bg : 'bg-[var(--color-surface)]'
              } border border-[var(--color-border)]`}
            >
              <span className="text-8xl" aria-hidden="true">
                {config?.emoji ?? '📦'}
              </span>
              <span
                className={`text-sm font-semibold tracking-widest uppercase ${
                  config ? config.color : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {product.category}
              </span>
            </div>

            {/* Thumbnail row */}
            <div className="flex gap-3 mt-3 justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl border-2 border-[var(--color-border)] cursor-pointer hover:border-[var(--color-accent)] transition-colors ${
                    config ? config.bg : 'bg-[var(--color-surface)]'
                  }`}
                  aria-hidden="true"
                >
                  {config?.emoji ?? '📦'}
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-6">
            {/* Category + In Stock */}
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  config ? `${config.color} ${config.bg}` : 'text-[var(--color-text-secondary)] bg-[var(--color-surface)]'
                }`}
              >
                {config?.emoji && <span aria-hidden="true">{config.emoji}</span>}
                {product.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[var(--color-success)] bg-green-50">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" aria-hidden="true" />
                In Stock
              </span>
            </div>

            {/* Name */}
            <h1
              className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div>
              <p className="text-3xl font-bold text-[var(--color-text)] tabular-nums">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {/* Specs */}
            <div className="bg-[var(--color-surface)] rounded-2xl p-5">
              <h2 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">
                Key Specifications
              </h2>
              <ul className="space-y-2.5">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-3 text-sm text-[var(--color-text)]">
                    <span
                      className="w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment methods */}
            <div>
              <h2 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">
                Payment Methods
              </h2>
              <div className="flex flex-wrap gap-3">
                {PAYMENT_METHODS.map((pm) => (
                  <div
                    key={pm.id}
                    className="flex items-center gap-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-2.5"
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${pm.iconColor} ${pm.iconBg}`}
                      aria-hidden="true"
                    >
                      {pm.icon}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text)]">{pm.label}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{pm.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25d366] text-white font-bold text-base hover:bg-[#22c55e] active:bg-[#1ea855] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </a>

              <a
                href={igOrderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity hover:opacity-90 active:opacity-80"
                style={{
                  background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Order via Instagram
              </a>
            </div>

            {/* Assurance row */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[var(--color-border)]">
              {[
                { icon: '🚚', label: 'Fast Delivery' },
                { icon: '✅', label: 'Genuine Product' },
                { icon: '🔒', label: 'Secure Payment' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 text-center py-2">
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <span className="text-xs font-medium text-[var(--color-text-secondary)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
