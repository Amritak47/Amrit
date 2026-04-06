'use client';

import Link from 'next/link';
import { useState } from 'react';

const WA_LINK = 'https://wa.me/9779800000000?text=Hi%2C%20I%20want%20to%20browse%20your%20products';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C12 2 7 7 7 12a5 5 0 0 0 2.5 4.33C9.18 15.5 9 14.76 9 14c0-2.5 3-5 3-5s.5 2 2 3c0 0-1-2.5.5-4 1.3 1.2 2 2.9 2 4.5a5 5 0 0 1-5 5 5 5 0 0 1-5-5C6 7 12 2 12 2z" />
    </svg>
  );
}

function GadgetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.1) 50%, rgba(212,175,55,0.18) 100%)',
          borderBottom: '1px solid rgba(212,175,55,0.25)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-5 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--gold-light)' }}>
            <FlameIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Free delivery in Kathmandu valley</span>
          </div>
          <span style={{ color: 'rgba(212,175,55,0.35)' }} aria-hidden="true">|</span>
          <span className="text-xs font-semibold" style={{ color: 'var(--gold-light)' }}>eSewa &amp; Khalti accepted</span>
          <span style={{ color: 'rgba(212,175,55,0.35)' }} aria-hidden="true" className="hidden sm:inline">|</span>
          <span className="text-xs font-semibold hidden sm:inline" style={{ color: 'var(--gold-light)' }}>100% Genuine products guaranteed</span>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        style={{
          background: 'rgba(10,10,10,0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)' }}
            >
              <GadgetIcon className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              Gadgets Park
              <span className="gold-shimmer ml-1">Nepal</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'About', href: '/about' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-150 cursor-pointer relative group"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'; }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200"
              style={{ background: 'var(--green-wa)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#1fba58';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--green-wa)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              <WhatsAppIcon className="w-4 h-4" />
              Order Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-1)' }}
            className="md:hidden px-4 pb-5 pt-3"
          >
            <div className="flex flex-col gap-1">
              {[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150 cursor-pointer min-h-[44px] flex items-center"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg-2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-1" style={{ borderTop: '1px solid var(--border)' }}>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-full cursor-pointer transition-all min-h-[44px]"
                  style={{ background: 'var(--green-wa)' }}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
