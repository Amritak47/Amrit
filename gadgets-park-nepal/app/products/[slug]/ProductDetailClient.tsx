'use client';

import Link from 'next/link';
import { Product, formatPrice, buildWhatsAppLink } from '../../data/products';

interface Props {
  product: Product;
}

/* ── Icon helpers ── */
interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function TruckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* Device icons */
function IPhoneDevIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <rect x="14" y="4" width="36" height="56" rx="7" />
      <path d="M24 12h16" strokeWidth="2.5" />
      <circle cx="32" cy="54" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function AndroidDevIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M14 30h36v20a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V30z" />
      <path d="M22 30V23a10 10 0 0 1 20 0v7" />
      <circle cx="24" cy="38" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="40" cy="38" r="2.5" fill="currentColor" stroke="none" />
      <path d="M9 34v8M55 34v8" />
      <path d="M22 12l-3-5M42 12l3-5" />
    </svg>
  );
}
function LaptopDevIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <rect x="8" y="12" width="48" height="32" rx="4" />
      <path d="M4 44h56" />
      <path d="M26 44l-2 8h16l-2-8" />
    </svg>
  );
}
function TabletDevIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <rect x="10" y="4" width="44" height="56" rx="5" />
      <circle cx="32" cy="55" r="2" fill="currentColor" stroke="none" />
      <rect x="16" y="10" width="32" height="40" rx="2" opacity="0.3" />
    </svg>
  );
}
function WatchDevIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <circle cx="32" cy="32" r="16" />
      <path d="M24 8h16M24 56h16" />
      <path d="M32 20v12l6 6" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, React.FC<IconProps>> = {
  iPhone: IPhoneDevIcon,
  Android: AndroidDevIcon,
  MacBook: LaptopDevIcon,
  iPad: TabletDevIcon,
  Smartwatch: WatchDevIcon,
};

const CATEGORY_VISUAL: Record<string, { gradient: string; iconColor: string }> = {
  iPhone: { gradient: 'linear-gradient(135deg, #0d1b2e 0%, #071020 100%)', iconColor: '#4da6ff' },
  Android: { gradient: 'linear-gradient(135deg, #0d1f14 0%, #060f0a 100%)', iconColor: '#3ddc84' },
  MacBook: { gradient: 'linear-gradient(135deg, #1a1a24 0%, #0e0e18 100%)', iconColor: '#9898b8' },
  iPad: { gradient: 'linear-gradient(135deg, #1a0d2e 0%, #0e071a 100%)', iconColor: '#a06af4' },
  Smartwatch: { gradient: 'linear-gradient(135deg, #2a1500 0%, #150b00 100%)', iconColor: '#ff9a3c' },
};

const PAYMENT_METHODS = [
  {
    id: 'esewa', label: 'eSewa', shortLabel: 'e', desc: 'Digital wallet',
    bg: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e',
  },
  {
    id: 'khalti', label: 'Khalti', shortLabel: 'K', desc: 'Digital wallet',
    bg: 'rgba(160,100,255,0.12)', border: '1px solid rgba(160,100,255,0.25)', color: '#a06af4',
  },
  {
    id: 'cod', label: 'Cash on Delivery', shortLabel: 'COD', desc: 'Pay on arrival',
    bg: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)',
  },
];

export default function ProductDetailClient({ product }: Props) {
  const visual = CATEGORY_VISUAL[product.category] ?? { gradient: 'linear-gradient(135deg, #1a1a1a, #111)', iconColor: '#a3a3a3' };
  const Icon = CATEGORY_ICONS[product.category] ?? IPhoneDevIcon;
  const waLink = buildWhatsAppLink(product.name, product.price);
  const igOrderLink = `https://ig.me/m/gadgetsparknepal?text=${encodeURIComponent(`Hi, I want to order ${product.name} - ${formatPrice(product.price)}`)}`;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-1)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="transition-colors duration-150 cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'; }}
            >Home</Link>
            <span style={{ color: 'var(--text-dim)' }} aria-hidden="true">/</span>
            <Link
              href="/products"
              className="transition-colors duration-150 cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'; }}
            >Products</Link>
            <span style={{ color: 'var(--text-dim)' }} aria-hidden="true">/</span>
            <span className="font-medium truncate" style={{ color: 'var(--text)' }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Product image */}
          <div className="lg:sticky lg:top-28">
            <div
              className="w-full aspect-square rounded-3xl flex flex-col items-center justify-center gap-4 relative overflow-hidden"
              style={{ background: visual.gradient, border: '1px solid var(--border)' }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 40%, ${visual.iconColor}20 0%, transparent 60%)` }}
              />
              <Icon className="w-32 h-32 relative" style={{ color: visual.iconColor }} />
              <span className="relative text-sm font-bold uppercase tracking-widest" style={{ color: visual.iconColor, opacity: 0.65 }}>
                {product.category}
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-150"
                  style={{ background: visual.gradient, border: i === 1 ? '2px solid var(--gold)' : '1px solid var(--border)' }}
                  aria-hidden="true"
                >
                  <Icon className="w-7 h-7" style={{ color: visual.iconColor }} />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-7">
            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
              >
                {product.category}
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: '#22c55e' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} aria-hidden="true" />
                In Stock
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight" style={{ color: 'var(--text)' }}>
              {product.name}
            </h1>

            {/* Price */}
            <div className="p-5 rounded-2xl" style={{ background: 'var(--bg-1)', border: '1px solid var(--border)' }}>
              <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--gold)' }}>
                {formatPrice(product.price)}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-dim)' }}>Inclusive of all taxes</p>
            </div>

            {/* Specs */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--bg-1)', border: '1px solid var(--border)' }}>
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
                Key Specifications
              </h2>
              <ul className="space-y-3">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-3 text-sm">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
                      aria-hidden="true"
                    >
                      <CheckIcon className="w-3 h-3" />
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment methods */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-dim)' }}>
                Payment Methods
              </h2>
              <div className="flex flex-wrap gap-3">
                {PAYMENT_METHODS.map((pm) => (
                  <div
                    key={pm.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'var(--bg-1)', border: '1px solid var(--border)' }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: pm.bg, border: pm.border, color: pm.color }}
                    >
                      {pm.shortLabel}
                    </span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{pm.label}</p>
                      <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{pm.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-1">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-base cursor-pointer transition-all duration-200 min-h-[56px]"
                style={{ background: 'var(--green-wa)', boxShadow: '0 0 40px rgba(37,211,102,0.15)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = '#1fba58';
                  el.style.boxShadow = '0 0 60px rgba(37,211,102,0.3)';
                  el.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'var(--green-wa)';
                  el.style.boxShadow = '0 0 40px rgba(37,211,102,0.15)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                Order via WhatsApp
              </a>

              <a
                href={igOrderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-base cursor-pointer transition-all duration-200 min-h-[56px]"
                style={{ background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                }}
              >
                <InstagramIcon className="w-5 h-5 shrink-0" />
                Order via Instagram
              </a>
            </div>

            {/* Assurance */}
            <div className="grid grid-cols-3 gap-3 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
              {[
                { I: TruckIcon, label: 'Fast Delivery' },
                { I: ShieldIcon, label: 'Genuine Product' },
                { I: LockIcon, label: 'Secure Payment' },
              ].map(({ I: AssurIcon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center py-1">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
                    aria-hidden="true"
                  >
                    <AssurIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
