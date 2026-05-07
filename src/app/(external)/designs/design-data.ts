/**
 * Single source of truth for design list. No MDX — safe to import from list page.
 * Full data (with MDX) lives in design-data-with-mdx.tsx and is imported only by the [id] page.
 */

import type { ReactNode } from 'react';

export interface DesignSummary {
  id: string;
  name: string;
  imgs: string[];
  /** Scripture chapter & verse this design is rooted in. */
  verse: string;
  /** Available colorways (e.g. "Cream", "Black, Cream"). Optional for stickers. */
  colorway?: string;
  /** Currently shoppable on /shop. Drives the "Shop the drop" CTA on the detail page. */
  isCurrent?: boolean;
}

export interface DesignInfo extends DesignSummary {
  description: ReactNode;
}

/** Single source: id, name, imgs, verse for each design. */
export const designList: DesignSummary[] = [
  { id: 'god-is-love',     name: 'God is Love Crewneck',      verse: '1 John 4:8',          imgs: ['/images/designs/god-is-love-4.jpg', '/images/designs/god-love-2.jpg', '/images/designs/god-love-3.jpg'], colorway: 'Cream', isCurrent: true },
  { id: 'lux-aeterna',     name: 'Lux Aeterna Crewneck',      verse: 'Isaiah 60:19-21',     imgs: ['/images/designs/lux-aeterna-6.jpg', '/images/designs/lux-aeterna-2.jpg', '/images/designs/lux-aeterna-3.jpg'], colorway: 'Gray' },
  { id: 'the-calling',     name: 'The Calling T-Shirt',       verse: 'Ephesians 4:1-3',     imgs: ['/images/designs/the-calling-1.jpg', '/images/designs/the-calling-2.jpg', '/images/designs/the-calling-3.jpg'], colorway: 'Washed Black' },
  { id: 'tobwy',           name: 'To Be With You T-Shirt',    verse: 'John 15:5-7',         imgs: ['/images/designs/2bwy-3.jpg', '/images/designs/2bwy-2.jpg', '/images/designs/2bwy-1.jpg'], colorway: 'Washed Gray' },
  { id: 'surpassing-worth',name: 'Surpassing Worth Hoodie',   verse: 'Philippians 3:8',     imgs: ['/images/designs/surpassing-worth-1.jpg', '/images/designs/surpassing-worth-2.jpg', '/images/designs/surpassing-worth-3.jpg'], colorway: 'Navy Blue' },
  { id: 'justified',       name: 'Justified Hoodie',          verse: 'Romans 3:24-26',      imgs: ['/images/home/currentdrop.jpg', '/images/home/currentdrop2.jpg', '/images/home/currentdrop3.jpg'], colorway: 'Black' },
  { id: 'trust',           name: 'Trust T-Shirt',             verse: 'Matthew 6:25-33',     imgs: ['/images/designs/flowers-1.jpg', '/images/designs/flowers-2.jpg', '/images/designs/flowers-3.jpg'], colorway: 'White/Red' },
  { id: 'salvation',       name: 'Salvation Crewneck',        verse: 'Romans 5:6-11',       imgs: ['/images/designs/salvation-1.jpg', '/images/designs/salvation-2.jpg', '/images/designs/salvation-3.jpg'], colorway: 'Dark Gray' },
  { id: 'confidence',      name: 'Confidence T-Shirt',        verse: 'Psalm 139:14',        imgs: ['/images/designs/confidence-2.jpg', '/images/designs/confidence-1.jpg', '/images/designs/confidence-3.jpg'], colorway: 'White/Red' },
  { id: 'fullness',        name: 'Fullness Hoodie',           verse: 'Psalm 16:11',         imgs: ['/images/designs/fullness-2.jpg', '/images/designs/fullness-1.jpg', '/images/designs/fullness-3.jpg'], colorway: 'Light Blue and Cream' },
  { id: 'redeemed',        name: 'Redeemed Hoodie',           verse: 'Luke 1:78-79',        imgs: ['/images/designs/redeemed-1.jpg', '/images/designs/redeemed-2.jpg', '/images/designs/redeemed-3.jpg'], colorway: 'Black and Military Green' },
  { id: 'abide',           name: 'Abide Hoodie',              verse: 'Psalm 91:1-2',        imgs: ['/images/designs/abide-1.jpg', '/images/designs/abide-2.jpg', '/images/designs/abide-3.jpg', '/images/designs/abide-4.jpg'], colorway: 'Brown/Blue and Dark Gray/Red' },
  { id: 'hope',            name: 'Hope Longsleeve',           verse: '1 Timothy 4:10',      imgs: ['/images/designs/hope-1.jpg', '/images/designs/hope-2.jpg', '/images/designs/hope-3.jpg'], colorway: 'Black' },
  { id: 'walk-on-water',   name: 'Walk on Water Sticker',     verse: 'Matthew 14:29-31',    imgs: ['/images/designs/walk-on-water-1.png', '/images/designs/walk-on-water-2.jpg', '/images/designs/walk-on-water-3.jpg'] },
  { id: 'spero-bear',      name: 'Spero Bear Sticker',        verse: 'Luke 1:78-79',        imgs: ['/images/designs/spero-bear-1.png', '/images/designs/spero-bear-2.jpg', '/images/designs/spero-bear-3.jpg'] },
  { id: 'mountain-mover',  name: 'Mountain Mover Sticker',    verse: 'Matthew 17:20-21',    imgs: ['/images/designs/mountain-mover-1.png', '/images/designs/mountain-mover-2.jpg', '/images/designs/mountain-mover-3.jpg'] },
];

export const designIds = designList.map((d) => ({ id: d.id }));
export const designNames = Object.fromEntries(
  designList.map((d) => [d.id, d.name] as const)
) as Record<string, string>;
