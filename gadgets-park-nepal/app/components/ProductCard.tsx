'use client';

import Link from 'next/link';
import { Product, formatPrice, buildWhatsAppLink } from '../data/products';

interface ProductCardProps {
  product: Product;
}

/* Category-specific dark gradient backgrounds + icon colors */
const categoryVisual: Record<string, { gradient: string; iconColor: string; label: string }> = {
  iPhone: {
    gradient: 'linear-gradient(135deg, #0d1b2e 0%, #0a1628 50%, #071020 100%)',
    iconColor: '#4da6ff',
    label: 'iPhone',
  },
  Android: {
    gradient: 'linear-gradient(135deg, #0d1f14 0%, #081510 50%, #060f0a 100%)',
    iconColor: '#3ddc84',
    label: 'Android',
  },
  MacBook: {
    gradient: 'linear-gradient(135deg, #1a1a24 0%, #141420 50%, #0e0e18 100%)',
    iconColor: '#9898b8',
    label: 'MacBook',
  },
  iPad: {
    gradient: 'linear-gradient(135deg, #1a0d2e 0%, #140a24 50%, #0e071a 100%)',
    iconColor: '#a06af4',
    label: 'iPad',
  },
  Smartwatch: {
    gradient: 'linear-gradient(135deg, #2a1500 0%, #1e1000 50%, #150b00 100%)',
    iconColor: '#ff9a3c',
    label: 'Smartwatch',
  },
};

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

function IPhoneIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <rect x="12" y="3" width="24" height="42" rx="5" />
      <path d="M19 7.5h10" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="40" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AndroidIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M10 21h28v15a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3V21z" />
      <path d="M17 21V16a7 7 0 0 1 14 0v5" />
      <circle cx="18" cy="27.5" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="30" cy="27.5" r="1.8" fill="currentColor" stroke="none" />
      <path d="M7 25v6M41 25v6" />
      <path d="M16 8 14 5M32 8l2-5" />
    </svg>
  );
}

function LaptopIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <rect x="6" y="9" width="36" height="24" rx="3" />
      <path d="M3 33h42" />
      <path d="M19 33l-1.5 5h11L27 33" />
    </svg>
  );
}

function TabletIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <rect x="8" y="3" width="32" height="42" rx="4" />
      <circle cx="24" cy="41" r="1.5" fill="currentColor" stroke="none" />
      <rect x="13" y="8" width="22" height="28" rx="1.5" opacity="0.35" />
    </svg>
  );
}

function WatchIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <circle cx="24" cy="24" r="12" />
      <path d="M18 6h12M18 42h12" />
      <path d="M24 15v9l4.5 4.5" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, React.FC<IconProps>> = {
  iPhone: IPhoneIcon,
  Android: AndroidIcon,
  MacBook: LaptopIcon,
  iPad: TabletIcon,
  Smartwatch: WatchIcon,
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const waLink = buildWhatsAppLink(product.name, product.price);
  const visual = categoryVisual[product.category] ?? {
    gradient: 'linear-gradient(135deg, #1a1a1a, #111)',
    iconColor: '#a3a3a3',
    label: product.category,
  };
  const Icon = CATEGORY_ICONS[product.category] ?? IPhoneIcon;

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-all duration-250"
      style={{
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--border-gold)';
        el.style.boxShadow = '0 8px 40px rgba(212,175,55,0.1)';
        el.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--border)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Image area */}
      <Link href={`/products/${product.slug}`} className="block" tabIndex={-1}>
        <div
          className="w-full aspect-square flex flex-col items-center justify-center gap-3 relative overflow-hidden"
          style={{ background: visual.gradient }}
        >
          {/* Soft radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${visual.iconColor}18 0%, transparent 65%)`,
            }}
            aria-hidden="true"
          />
          <Icon
            className="w-16 h-16 relative transition-transform duration-300 group-hover:scale-110"
            style={{ color: visual.iconColor } as React.CSSProperties}
          />
          {/* Category label */}
          <span
            className="relative text-xs font-bold uppercase tracking-widest"
            style={{ color: visual.iconColor, opacity: 0.7 }}
          >
            {visual.label}
          </span>
        </div>
      </Link>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Category chip */}
        <div>
          <span
            className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              background: 'var(--gold-dim)',
              color: 'var(--gold)',
              border: '1px solid var(--border-gold)',
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Name */}
        <Link href={`/products/${product.slug}`} className="block cursor-pointer">
          <h3
            className="font-semibold leading-snug line-clamp-2 transition-colors duration-150"
            style={{ color: 'var(--text)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = 'var(--gold)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = 'var(--text)'; }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p
          className="text-lg font-bold tabular-nums"
          style={{ color: 'var(--gold)' }}
        >
          {formatPrice(product.price)}
        </p>

        {/* CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white text-sm font-semibold cursor-pointer transition-all duration-200 mt-auto min-h-[44px]"
          style={{ background: 'var(--green-wa)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#1fba58';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.3)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--green-wa)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
          }}
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          Order via WhatsApp
        </a>
      </div>
    </article>
  );
}
