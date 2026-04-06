import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, formatPrice } from '../../data/products';
import ProductDetailClient from './ProductDetailClient';

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

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
