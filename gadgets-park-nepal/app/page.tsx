import Link from 'next/link';
import { featuredProducts, categories, categoryConfig, buildWhatsAppLink } from './data/products';
import ProductCard from './components/ProductCard';

const WHY_US = [
  {
    icon: '🚚',
    title: 'Fast Delivery',
    desc: 'Same-day dispatch in Kathmandu. 2–4 days across Nepal.',
  },
  {
    icon: '✅',
    title: 'Genuine Products',
    desc: 'Every device is 100% authentic. No grey imports, no surprises.',
  },
  {
    icon: '💳',
    title: 'eSewa & Khalti',
    desc: 'Pay conveniently with Nepal\'s most popular digital wallets.',
  },
  {
    icon: '📦',
    title: 'Cash on Delivery',
    desc: 'Pay when your order arrives. No upfront payment required.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle grid backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.35,
          }}
        />
        {/* Warm radial glow */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,113,227,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
            <span className="text-xs font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase">
              Delivering across Nepal
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text)] leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Gadgets Park
            <br />
            <span className="text-[var(--color-accent)]">Nepal</span>
          </h1>

          <p className="max-w-xl mx-auto text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-10">
            Premium phones, tablets &amp; laptops — shipped across Nepal.
            Pay with eSewa, Khalti, or Cash on Delivery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[var(--color-accent-hover)] transition-colors text-base"
            >
              Shop Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="https://wa.me/9779800000000?text=Hi%2C%20I%20want%20to%20browse%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-[var(--color-border)] text-[var(--color-text)] font-semibold px-8 py-3.5 rounded-full hover:border-[#25d366] hover:text-[#25d366] transition-colors text-base"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order on WhatsApp
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mt-14 pt-10 border-t border-[var(--color-border)]">
            {[
              { value: '500+', label: 'Devices Sold' },
              { value: '77', label: 'Districts Delivered' },
              { value: '4.9★', label: 'Customer Rating' },
              { value: '2yrs', label: 'In Business' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[var(--color-text)] tabular-nums">{stat.value}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">
                Browse by Category
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
                What are you looking for?
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] hover:underline"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {categories.map((cat) => {
              const cfg = categoryConfig[cat];
              return (
                <Link
                  key={cat}
                  href={`/products?category=${cat}`}
                  className={`flex-none snap-start flex flex-col items-center gap-3 px-6 py-5 rounded-2xl border border-[var(--color-border)] bg-white hover:border-[var(--color-accent)] hover:shadow-md transition-all min-w-[130px] group`}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform" aria-hidden="true">
                    {cfg.emoji}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-text)]">{cat}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1">
                Hand-picked for you
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] hover:underline"
            >
              View all products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-7 py-3 rounded-full hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              See all products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">
              Why Shop With Us
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
              The Gadgets Park Nepal difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-[var(--color-border)] p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                <h3 className="font-bold text-[var(--color-text)]">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA Banner ── */}
      <section className="relative overflow-hidden bg-[var(--color-text)] py-16">
        {/* Decorative circles */}
        <div
          aria-hidden="true"
          className="absolute -left-24 -top-24 w-72 h-72 rounded-full"
          style={{ background: 'rgba(37,211,102,0.12)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full"
          style={{ background: 'rgba(37,211,102,0.08)' }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#25d366] mb-6">
            <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to order?
          </h2>
          <p className="text-base text-white/70 mb-8 max-w-lg mx-auto">
            Message us on WhatsApp and we&apos;ll help you find the perfect device — and get it delivered fast.
          </p>

          <a
            href="https://wa.me/9779800000000?text=Hi%2C%20I%20want%20to%20browse%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25d366] text-white font-bold px-10 py-4 rounded-full text-base hover:bg-[#22c55e] active:bg-[#1ea855] transition-colors shadow-lg shadow-black/20"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>

          <p className="text-xs text-white/40 mt-5">
            +977-9800000000 &nbsp;·&nbsp; @gadgetsparknepal
          </p>
        </div>
      </section>
    </>
  );
}
