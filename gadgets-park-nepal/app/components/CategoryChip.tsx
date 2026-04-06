'use client';

import { categoryConfig } from '../data/products';

interface CategoryChipProps {
  category: string;
  active?: boolean;
  onClick?: () => void;
  asFilter?: boolean;
}

export default function CategoryChip({
  category,
  active = false,
  onClick,
  asFilter = false,
}: CategoryChipProps) {
  const config = categoryConfig[category];

  if (asFilter) {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer select-none ${
          active
            ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
            : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
        }`}
      >
        {config && <span aria-hidden="true">{config.emoji}</span>}
        {category}
      </button>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        config ? `${config.color} ${config.bg}` : 'text-[var(--color-text-secondary)] bg-[var(--color-surface)]'
      }`}
    >
      {config && <span aria-hidden="true">{config.emoji}</span>}
      {category}
    </span>
  );
}
