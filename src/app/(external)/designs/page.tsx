export const metadata = {
  title: 'Designs - Spero',
};

import { designList } from '@/app/(external)/designs/design-data';
import Image from 'next/image';
import Link from 'next/link';
import './designs.css';

const garmentTypes = ['Hoodie', 'T-Shirt', 'Crewneck', 'Sticker', 'Longsleeve'];

function parseDesignName(name: string): { title: string; subtitle: string } {
  const words = name.split(' ');
  const lastWord = words[words.length - 1];
  if (garmentTypes.includes(lastWord)) {
    return {
      title: words.slice(0, -1).join(' ').toUpperCase(),
      subtitle: lastWord + ' Collection',
    };
  }
  return {
    title: name.toUpperCase(),
    subtitle: 'Spero Collection',
  };
}

// Editorial rhythm: every 5th tile is a full-width feature.
// 16 designs → indices 0, 5, 10, 15 are features; the rest pair up.
function isFullWidth(index: number): boolean {
  return index % 5 === 0;
}

export default function Page() {
  return (
    <div className="designs-page">
      <div className="designs-grid">
        {designList.map((design, i) => {
          const { title, subtitle } = parseDesignName(design.name);
          const full = isFullWidth(i);
          return (
            <Link
              key={design.id}
              href={`/designs/${design.id}`}
              className={`designs-tile ${full ? 'designs-tile-full' : 'designs-tile-half'}`}
              style={{ animationDelay: `${(i % 4) * 80}ms` }}
            >
              <div className="designs-tile-image-wrap">
                <Image
                  src={design.imgs[0]}
                  alt={design.name}
                  fill
                  className="designs-tile-image"
                  sizes={full ? '100vw' : '(max-width: 639px) 100vw, 50vw'}
                />
              </div>
              <div className="designs-tile-caption">
                <p className="designs-tile-subtitle">{subtitle}</p>
                <h2 className="designs-tile-title">{title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
