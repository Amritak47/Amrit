'use client';

import Link from 'next/link';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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

function FlagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IPhoneAboutIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-24 h-24 opacity-80" aria-hidden="true">
      <rect x="14" y="4" width="36" height="56" rx="7" />
      <path d="M24 12h16" strokeWidth="2" />
      <circle cx="32" cy="54" r="2" fill="#D4AF37" stroke="none" />
    </svg>
  );
}

const VALUES = [
  { Icon: FlagIcon, title: 'Proudly Nepali', desc: 'Born and built in Nepal, for Nepali customers. Every order helps grow the local tech ecosystem.' },
  { Icon: ShieldIcon, title: 'Genuine Products Only', desc: 'We only stock authentic devices from authorised supply chains. No grey imports, no compromises.' },
  { Icon: HeartIcon, title: 'Customer First', desc: 'From product advice to after-sales support — we are here on WhatsApp and Instagram every step.' },
  { Icon: WalletIcon, title: 'Flexible Payments', desc: 'Pay how you prefer — eSewa, Khalti, or Cash on Delivery. No fees passed to you.' },
];

const STATS = [
  { value: '500+', label: 'Devices Delivered' },
  { value: '77', label: 'Districts Reached' },
  { value: '4.9★', label: 'Customer Rating' },
  { value: '2yrs', label: 'In Business' },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--bg-1)', borderBottom: '1px solid var(--border)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(212,175,55,0.1) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
          >
            <LocationIcon className="w-3.5 h-3.5 shrink-0" />
            Kathmandu, Nepal
          </div>
          <h1
            className="text-4xl sm:text-6xl font-bold tracking-tight mb-5"
            style={{ color: 'var(--text)' }}
          >
            About Gadgets Park
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nepal
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Nepal&apos;s trusted destination for premium smartphones, laptops, tablets and smartwatches — delivering genuine technology to every corner of the country.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl"
            style={{ background: 'var(--border)' }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-10 px-6 text-center"
                style={{ background: 'var(--bg-1)' }}
              >
                <span className="text-4xl font-bold tabular-nums mb-1" style={{ color: 'var(--gold)' }}>
                  {stat.value}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* Visual */}
            <div className="relative">
              <div
                className="aspect-square rounded-3xl flex flex-col items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a1a24 0%, #0e0e18 100%)', border: '1px solid var(--border)' }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 60%)' }}
                />
                <div className="relative flex flex-col items-center gap-2">
                  <IPhoneAboutIcon />
                  <p className="text-xl font-bold" style={{ color: 'var(--gold)' }}>2+ Years</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>of serving Nepal</p>
                </div>
              </div>
              <div
                className="absolute -bottom-5 -right-5 px-5 py-3.5 rounded-2xl shadow-2xl"
                style={{ background: 'var(--bg-2)', border: '1px solid var(--border-gold)' }}
              >
                <p className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>500+</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Devices delivered</p>
              </div>
              <div
                className="absolute -top-5 -left-5 px-5 py-3.5 rounded-2xl shadow-2xl"
                style={{ background: 'var(--bg-2)', border: '1px solid var(--border-gold)' }}
              >
                <p className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>77</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Districts reached</p>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>
                  Our Story
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                  Technology for every Nepali
                </h2>
              </div>
              <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <p>
                  Gadgets Park Nepal started with a simple mission: make premium technology accessible to
                  everyone across Nepal — not just those in Kathmandu.
                </p>
                <p>
                  We saw that people in every district wanted the latest iPhones, Samsung Galaxy phones,
                  MacBooks and more, but trusted, affordable sources were hard to find. We decided to fix that.
                </p>
                <p>
                  Today, we operate as an authorised reseller with a curated catalogue of the world&apos;s
                  best devices, shipped to your door with flexible payment options that work for Nepal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>
              What drives us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-200 cursor-default"
                style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-gold)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold" style={{ color: 'var(--text)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>
              Get in touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              We&apos;d love to hear from you
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-7 rounded-2xl text-center cursor-pointer transition-all duration-200"
              style={{ background: 'var(--bg-1)', border: '1px solid var(--border)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'rgba(37,211,102,0.4)';
                el.style.transform = 'translateY(-3px)';
                el.style.boxShadow = '0 8px 30px rgba(37,211,102,0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'var(--border)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(37,211,102,0.15)', border: '1.5px solid rgba(37,211,102,0.3)', color: '#25d366' }}
              >
                <WhatsAppIcon className="w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>WhatsApp</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>+977-9800000000</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/gadgetsparknepal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-7 rounded-2xl text-center cursor-pointer transition-all duration-200"
              style={{ background: 'var(--bg-1)', border: '1px solid var(--border)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'rgba(253,29,29,0.35)';
                el.style.transform = 'translateY(-3px)';
                el.style.boxShadow = '0 8px 30px rgba(253,29,29,0.08)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'var(--border)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white"
                style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}
              >
                <InstagramIcon className="w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Instagram</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>@gadgetsparknepal</p>
              </div>
            </a>

            {/* Location */}
            <div
              className="flex flex-col items-center gap-4 p-7 rounded-2xl text-center"
              style={{ background: 'var(--bg-1)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'var(--gold-dim)', border: '1.5px solid var(--border-gold)', color: 'var(--gold)' }}
              >
                <LocationIcon className="w-7 h-7" />
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Location</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3" style={{ color: 'var(--text)' }}>
            Ready to find your next gadget?
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
            Browse our full catalogue and order directly via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3 rounded-full cursor-pointer transition-all duration-200 min-h-[48px]"
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: '#000' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(212,175,55,0.3)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              Browse Products
            </Link>
            <a
              href="https://wa.me/9779800000000?text=Hi%2C%20I%20want%20to%20browse%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3 rounded-full cursor-pointer transition-all duration-200 min-h-[48px]"
              style={{ background: 'var(--green-wa)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#1fba58';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--green-wa)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              <WhatsAppIcon className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
