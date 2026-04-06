import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Gadgets Park Nepal',
  description:
    'Learn about Gadgets Park Nepal — your trusted source for genuine premium gadgets delivered across Nepal.',
};

const TEAM_VALUES = [
  {
    icon: '🇳🇵',
    title: 'Proudly Nepali',
    desc: 'Born and built in Nepal, for Nepali customers. Every order helps grow the local tech ecosystem.',
  },
  {
    icon: '✅',
    title: 'Genuine Products Only',
    desc: 'We only stock authentic devices from authorised supply chains. No grey imports, no compromises.',
  },
  {
    icon: '🤝',
    title: 'Customer First',
    desc: 'From product advice to after-sales support — we are here on WhatsApp and Instagram every step of the way.',
  },
  {
    icon: '💳',
    title: 'Flexible Payments',
    desc: 'Pay how you prefer — eSewa, Khalti, or Cash on Delivery. No payment processor fees passed to you.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[var(--color-border)] rounded-full px-4 py-1.5 mb-8">
            <span className="text-base" aria-hidden="true">🇳🇵</span>
            <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
              Kathmandu, Nepal
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-[var(--color-text)] tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            About Gadgets Park Nepal
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[var(--color-text-secondary)] leading-relaxed">
            We are Nepal&apos;s trusted destination for premium smartphones, laptops, tablets and
            smartwatches — delivering genuine technology to every corner of the country.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Story visual */}
            <div className="relative">
              <div className="bg-[var(--color-surface)] rounded-3xl aspect-square flex flex-col items-center justify-center gap-4 border border-[var(--color-border)]">
                <span className="text-7xl" aria-hidden="true">📱</span>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[var(--color-text)]">2+ Years</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">of serving Nepal</p>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-4 -right-4 bg-white border border-[var(--color-border)] rounded-2xl px-4 py-3 shadow-md">
                <p className="text-2xl font-bold text-[var(--color-text)]">500+</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Devices delivered</p>
              </div>
              <div className="absolute -top-4 -left-4 bg-white border border-[var(--color-border)] rounded-2xl px-4 py-3 shadow-md">
                <p className="text-2xl font-bold text-[var(--color-text)]">77</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Districts reached</p>
              </div>
            </div>

            {/* Story text */}
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">
                  Our Story
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
                  Technology for every Nepali
                </h2>
              </div>

              <div className="flex flex-col gap-4 text-[var(--color-text-secondary)] leading-relaxed">
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

      {/* Values */}
      <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">
              What drives us
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
              Our values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_VALUES.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl border border-[var(--color-border)] p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl" aria-hidden="true">{value.icon}</span>
                <h3 className="font-bold text-[var(--color-text)]">{value.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">
              Get in touch
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
              We&apos;d love to hear from you
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--color-border)] hover:border-[#25d366] hover:shadow-md transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-[#25d366] flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text)]">WhatsApp</p>
                <p className="text-sm text-[var(--color-text-secondary)]">+977-9800000000</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/gadgetsparknepal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--color-border)] hover:shadow-md transition-all text-center group"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text)]">Instagram</p>
                <p className="text-sm text-[var(--color-text-secondary)]">@gadgetsparknepal</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--color-border)] text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
                <span className="text-2xl" aria-hidden="true">📍</span>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text)]">Location</p>
                <p className="text-sm text-[var(--color-text-secondary)]">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-14">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">
            Ready to find your next gadget?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-7">
            Browse our full catalogue and order directly via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-7 py-3 rounded-full hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Browse Products
            </Link>
            <a
              href="https://wa.me/9779800000000?text=Hi%2C%20I%20want%20to%20browse%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#22c55e] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
