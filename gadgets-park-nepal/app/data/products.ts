export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  specs: string[];
};

export const products: Product[] = [
  {
    slug: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    category: 'iPhone',
    price: 179900,
    specs: ['6.3" Super Retina XDR', 'A18 Pro chip', '48MP camera system', '256GB storage'],
  },
  {
    slug: 'iphone-16',
    name: 'iPhone 16',
    category: 'iPhone',
    price: 149900,
    specs: ['6.1" Super Retina XDR', 'A18 chip', '48MP main camera', '128GB storage'],
  },
  {
    slug: 'samsung-galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    category: 'Android',
    price: 189900,
    specs: ['6.9" Dynamic AMOLED 2X', 'Snapdragon 8 Elite', '200MP quad camera', '256GB storage'],
  },
  {
    slug: 'macbook-pro-m4',
    name: 'MacBook Pro M4',
    category: 'MacBook',
    price: 329900,
    specs: ['14" Liquid Retina XDR', 'Apple M4 chip', '16GB unified memory', '512GB SSD'],
  },
  {
    slug: 'macbook-air-m3',
    name: 'MacBook Air M3',
    category: 'MacBook',
    price: 239900,
    specs: ['13.6" Liquid Retina', 'Apple M3 chip', '8GB unified memory', '256GB SSD'],
  },
  {
    slug: 'ipad-pro-m4',
    name: 'iPad Pro M4',
    category: 'iPad',
    price: 199900,
    specs: ['11" Ultra Retina XDR OLED', 'Apple M4 chip', '256GB storage', 'Wi-Fi 6E'],
  },
  {
    slug: 'apple-watch-series-10',
    name: 'Apple Watch Series 10',
    category: 'Smartwatch',
    price: 69900,
    specs: ['46mm Aluminium case', 'Always-On Retina display', 'Health & fitness tracking', 'GPS + Cellular'],
  },
  {
    slug: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    category: 'Android',
    price: 159900,
    specs: ['6.3" OLED display', 'Google Tensor G4', '50MP triple camera', '128GB storage'],
  },
  {
    slug: 'samsung-galaxy-watch-7',
    name: 'Samsung Galaxy Watch 7',
    category: 'Smartwatch',
    price: 49900,
    specs: ['44mm display', 'Exynos W1000', 'Advanced health monitoring', '40hr battery'],
  },
];

export const featuredProducts = products.slice(0, 4);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  // Nepali comma format: 1,79,900
  const str = price.toString();
  if (str.length <= 3) return str;
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `NPR ${formatted},${last3}`;
}

export function buildWhatsAppLink(productName: string, price: number): string {
  const formattedPrice = formatPrice(price);
  const message = encodeURIComponent(`Hi, I want to order ${productName} - ${formattedPrice}`);
  return `https://wa.me/9779800000000?text=${message}`;
}

export const categories = ['iPhone', 'Android', 'MacBook', 'iPad', 'Smartwatch'] as const;
export type Category = typeof categories[number];

export const categoryConfig: Record<string, { emoji: string; color: string; bg: string }> = {
  iPhone: { emoji: '📱', color: 'text-blue-700', bg: 'bg-blue-50' },
  Android: { emoji: '🤖', color: 'text-green-700', bg: 'bg-green-50' },
  MacBook: { emoji: '💻', color: 'text-slate-700', bg: 'bg-slate-100' },
  iPad: { emoji: '🖥️', color: 'text-purple-700', bg: 'bg-purple-50' },
  Smartwatch: { emoji: '⌚', color: 'text-orange-700', bg: 'bg-orange-50' },
};
