import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Gadgets Park Nepal',
  description:
    'Learn about Gadgets Park Nepal — your trusted source for genuine premium gadgets delivered across Nepal.',
};

export default function AboutPage() {
  return <AboutClient />;
}
