'use client';

import Link from 'next/link';
import { featuredProducts } from './data/products';
import ProductCard from './components/ProductCard';

const WA_LINK = 'https://wa.me/9779800000000?text=Hi%2C%20I%20want%20to%20browse%20your%20products';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ---------- Category icons ---------- */
function IPhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="8" y="2" width="16" height="28" rx="4" />
      <path d="M13 5h6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="26" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 14h18v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V14z" />
      <path d="M11 14V10a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="18" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="20" cy="18" r="1.2" fill="currentColor" stroke="none" />
      <path d="M5 17v4M27 17v4" />
      <path d="M10.5 5.5 9 3M21.5 5.5 23 3" />
    </svg>
  );
}

function LaptopIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="6" width="24" height="16" rx="2" />
      <path d="M2 22h28" />
      <path d="M13 22l-1 3h8l-1-3" />
    </svg>
  );
}

function TabletIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="5" y="2" width="22" height="28" rx="3" />
      <circle cx="16" cy="27" r="1" fill="currentColor" stroke="none" />
      <rect x="9" y="6" width="14" height="18" rx="1" opacity="0.4" />
    </svg>
  );
}

function WatchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="8" />
      <path d="M12 4h8M12 28h8" />
      <path d="M16 10v6l3 3" />
    </svg>
  );
}

/* ---------- Trust / UI icons ---------- */
function TruckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M1 10h22" />
      <circle cx="17" cy="15" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const CATEGORIES = [
  {
    id: 'iPhone',
    label: 'iPhone',
    sub: 'iOS flagship',
    icon: IPhoneIcon,
    large: true,
    accent: 'rgba(100,160,255,0.15)',
    accentBorder: 'rgba(100,160,255,0.3)',
  },
  {
    id: 'MacBook',
    label: 'MacBook',
    sub: 'Laptop powerhouse',
    icon: LaptopIcon,
    large: false,
    accent: 'rgba(140,140,160,0.15)',
    accentBorder: 'rgba(140,140,160,0.25)',
  },
  {
    id: 'Android',
    label: 'Android',
    sub: 'Top brands',
    icon: AndroidIcon,
    large: false,
    accent: 'rgba(60,200,120,0.12)',
    accentBorder: 'rgba(60,200,120,0.25)',
  },
  {
    id: 'iPad',
    label: 'iPad',
    sub: 'Tablet pro',
    icon: TabletIcon,
    large: false,
    accent: 'rgba(160,100,255,0.13)',
    accentBorder: 'rgba(160,100,255,0.28)',
  },
  {
    id: 'Smartwatch',
    label: 'Smartwatch',
    sub: 'Stay connected',
    icon: WatchIcon,
    large: false,
    accent: 'rgba(255,160,60,0.12)',
    accentBorder: 'rgba(255,160,60,0.27)',
  },
];

const TRUST = [
  {
    Icon: ShieldIcon,
    title: 'Genuine Products',
    desc: '100% authentic devices from verified supply chains. No grey imports.',
  },
  {
    Icon: TruckIcon,
    title: 'Fast Delivery',
    desc: 'Same-day dispatch in Kathmandu. 2–4 days to all 77 districts.',
  },
  {
    Icon: WalletIcon,
    title: 'eSewa & Khalti',
    desc: "Nepal's most popular digital wallets accepted.",
  },
  {
    Icon: BoxIcon,
    title: 'Cash on Delivery',
    desc: 'Pay when your order arrives. No upfront required.',
  },
];

const MARQUEE_ITEMS = [
  'FREE DELIVERY IN KATHMANDU',
  'GENUINE PRODUCTS',
  'ESEWA & KHALTI',
  'CASH ON DELIVERY',
  '77 DISTRICTS',
  '500+ DEVICES SOLD',
  '4.9 STAR RATING',
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--bg)' }}
        aria-labelledby="hero-heading"
      >
        {/* Gold radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(212,175,55,0.14) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid lines */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'var(--gold-dim)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-light)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: 'var(--gold-light)' }}
            />
            Nepal&apos;s #1 Gadget Store
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.0] mb-6"
            style={{ color: 'var(--text)' }}
          >
            Premium Gadgets
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 60%, var(--gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Delivered
            </span>{' '}
            to Your Door
          </h1>

          <p
            className="max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed mb-10"
            style={{ color: 'var(--text-muted)' }}
          >
            iPhones · MacBooks · Android · Smartwatches — shipped anywhere in Nepal with eSewa, Khalti, or Cash on Delivery.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-base cursor-pointer transition-all duration-200 min-h-[52px]"
              style={{
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                color: '#000',
                boxShadow: '0 0 40px rgba(212,175,55,0.25)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 60px rgba(212,175,55,0.4)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(212,175,55,0.25)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              Shop Now
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base cursor-pointer transition-all duration-200 min-h-[52px]"
              style={{
                background: 'transparent',
                color: 'var(--green-wa)',
                border: '1.5px solid rgba(37,211,102,0.5)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37,211,102,0.1)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--green-wa)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(37,211,102,0.5)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Order on WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div
            className="inline-flex flex-wrap items-center justify-center gap-0 rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg-1)',
              border: '1px solid var(--border)',
            }}
          >
            {[
              { value: '500+', label: 'Devices Sold' },
              { value: '77', label: 'Districts' },
              { value: '4.9★', label: 'Rating' },
              { value: '2yrs', label: 'In Business' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-7 py-4"
                style={{
                  borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span
                  className="text-2xl font-bold tabular-nums"
                  style={{ color: 'var(--gold)' }}
                >
                  {stat.value}
                </span>
                <span className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Announcement Marquee Strip ── */}
      <div
        className="overflow-hidden py-3"
        style={{
          background: 'var(--gold-dim)',
          borderTop: '1px solid var(--border-gold)',
          borderBottom: '1px solid var(--border-gold)',
        }}
        aria-hidden="true"
      >
        <div className="animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6 text-xs font-bold uppercase tracking-[0.15em] whitespace-nowrap"
              style={{ color: 'var(--gold)' }}
            >
              {item}
              <span style={{ color: 'var(--border-gold)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Category Bento ── */}
      <section
        className="py-20"
        style={{ background: 'var(--bg)' }}
        aria-labelledby="categories-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--gold)' }}
              >
                Browse by Category
              </p>
              <h2
                id="categories-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                Shop by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors duration-150"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'; }}
            >
              View all
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const isLarge = cat.large;
              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className={`group relative flex flex-col justify-between p-6 rounded-2xl overflow-hidden cursor-pointer transition-all duration-250 ${
                    isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
                  } ${i === 0 && 'row-span-2'}`}
                  style={{
                    background: 'var(--bg-2)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'var(--border-gold)';
                    el.style.boxShadow = '0 0 40px rgba(212,175,55,0.12)';
                    el.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'var(--border)';
                    el.style.boxShadow = 'none';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Accent glow bg */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${cat.accent} 0%, transparent 60%)`,
                    }}
                    aria-hidden="true"
                  />
                  {/* Icon */}
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: cat.accent,
                      border: `1px solid ${cat.accentBorder}`,
                      color: 'var(--text-muted)',
                    }}
                  >
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  {/* Label */}
                  <div className="relative">
                    <p
                      className="text-xs mb-0.5 font-medium"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      {cat.sub}
                    </p>
                    <p
                      className={`font-bold tracking-tight ${isLarge ? 'text-2xl' : 'text-lg'}`}
                      style={{ color: 'var(--text)' }}
                    >
                      {cat.label}
                    </p>
                    <div
                      className="inline-flex items-center gap-1 mt-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: 'var(--gold)' }}
                    >
                      Shop <ArrowRightIcon className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section
        className="py-20"
        style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)' }}
        aria-labelledby="featured-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--gold)' }}
              >
                Hand-picked for you
              </p>
              <h2
                id="featured-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors duration-150"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'; }}
            >
              View all products
              <ArrowRightIcon className="w-4 h-4" />
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
              className="inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-full text-sm cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                color: '#000',
              }}
            >
              See all products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Banner ── */}
      <section
        className="py-16"
        style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
        aria-label="Why shop with us"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: 'var(--text)' }}
            >
              The Gadgets Park Nepal Difference
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-4 p-6 rounded-2xl transition-all duration-200 group cursor-default"
                style={{
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-gold)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: 'var(--gold-dim)',
                    border: '1px solid var(--border-gold)',
                    color: 'var(--gold)',
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1.5"
                    style={{ color: 'var(--text)' }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background: 'var(--bg-1)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Green glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(37,211,102,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{ background: 'rgba(37,211,102,0.15)', border: '1.5px solid rgba(37,211,102,0.3)', color: 'var(--green-wa)' }}
          >
            <WhatsAppIcon className="w-8 h-8" />
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--text)' }}
          >
            Ready to order?
          </h2>
          <p
            className="text-base mb-8 max-w-lg mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Chat with us on WhatsApp and we&apos;ll help you find the perfect device — and get it delivered fast anywhere in Nepal.
          </p>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white font-bold px-10 py-4 rounded-full text-base cursor-pointer transition-all duration-200"
            style={{
              background: 'var(--green-wa)',
              boxShadow: '0 0 40px rgba(37,211,102,0.2)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#1fba58';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 60px rgba(37,211,102,0.35)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--green-wa)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(37,211,102,0.2)';
            }}
          >
            <WhatsAppIcon className="w-5 h-5" />
            Chat on WhatsApp
          </a>

          <p
            className="text-xs mt-5"
            style={{ color: 'var(--text-dim)' }}
          >
            +977-9800000000 &nbsp;·&nbsp; @gadgetsparknepal
          </p>
        </div>
      </section>
    </>
  );
}
