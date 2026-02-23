/**
 * Single source of truth for design list. No MDX — safe to import from list page.
 * Full data (with MDX) lives in design-data-with-mdx.tsx and is imported only by the [id] page.
 */

import type { ReactNode } from 'react';

export interface DesignSummary {
  id: string;
  name: string;
  imgs: string[];
}

export interface DesignInfo extends DesignSummary {
  description: ReactNode;
}

/** Single source: id, name, imgs for each design. */
export const designList: DesignSummary[] = [
  { id: 'the-calling', name: 'The Calling T-Shirt', imgs: ['/images/designs/the-calling-1.jpg', '/images/designs/the-calling-2.jpg', '/images/designs/the-calling-3.jpg'] },
  { id: 'surpassing-worth', name: 'Surpassing Worth Hoodie', imgs: ['/images/designs/surpassing-worth-1.jpg', '/images/designs/surpassing-worth-2.jpg', '/images/designs/surpassing-worth-3.jpg'] },
  { id: 'justified', name: 'Justified Hoodie', imgs: ['/images/home/currentdrop3.jpg', '/images/home/currentdrop2.jpg', '/images/home/currentdrop.jpg'] },
  { id: 'trust', name: 'Trust T-Shirt', imgs: ['/images/designs/flowers-1.jpg', '/images/designs/flowers-2.jpg', '/images/designs/flowers-3.jpg'] },
  { id: 'salvation', name: 'Salvation Crewneck', imgs: ['/images/designs/salvation-1.jpg', '/images/designs/salvation-2.jpg', '/images/designs/salvation-3.jpg'] },
  { id: 'confidence', name: 'Confidence T-Shirt', imgs: ['/images/designs/confidence-2.jpg', '/images/designs/confidence-1.jpg', '/images/designs/confidence-3.jpg'] },
  { id: 'fullness', name: 'Fullness Hoodie', imgs: ['/images/designs/fullness-2.jpg', '/images/designs/fullness-1.jpg', '/images/designs/fullness-3.jpg'] },
  { id: 'redeemed', name: 'Redeemed Hoodie', imgs: ['/images/designs/redeemed-1.jpg', '/images/designs/redeemed-2.jpg', '/images/designs/redeemed-3.jpg'] },
  { id: 'abide', name: 'Abide Hoodie', imgs: ['/images/designs/abide-1.jpg', '/images/designs/abide-2.jpg', '/images/designs/abide-3.jpg', '/images/designs/abide-4.jpg'] },
  { id: 'hope', name: 'Hope Longsleeve', imgs: ['/images/designs/hope-1.jpg', '/images/designs/hope-2.jpg', '/images/designs/hope-3.jpg'] },
  { id: 'walk-on-water', name: 'Walk on Water Sticker', imgs: ['/images/designs/walk-on-water-1.png', '/images/designs/walk-on-water-2.jpg', '/images/designs/walk-on-water-3.jpg'] },
  { id: 'spero-bear', name: 'Spero Bear Sticker', imgs: ['/images/designs/spero-bear-1.png', '/images/designs/spero-bear-2.jpg', '/images/designs/spero-bear-3.jpg'] },
  { id: 'mountain-mover', name: 'Mountain Mover Sticker', imgs: ['/images/designs/mountain-mover-1.png', '/images/designs/mountain-mover-2.jpg', '/images/designs/mountain-mover-3.jpg'] },
];

export const designIds = designList.map((d) => ({ id: d.id }));
export const designNames = Object.fromEntries(
  designList.map((d) => [d.id, d.name] as const)
) as Record<string, string>;
