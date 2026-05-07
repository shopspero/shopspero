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

export default function Page() {
  return (
    <div className="designs-page">
      {designList.map((design) => {
        const { title, subtitle } = parseDesignName(design.name);
        return (
          <section key={design.id} className="designs-hero">
            <Image
              src={design.imgs[0]}
              alt={design.name}
              fill
              className="designs-hero-image"
              sizes="100vw"
            />
            <div className="designs-hero-overlay" />
            <div className="designs-hero-content">
              <p className="designs-hero-subtitle">{subtitle}</p>
              <h2 className="designs-hero-title">{title}</h2>
              <Link href={`/designs/${design.id}`} className="designs-hero-btn">
                DISCOVER
              </Link>
            </div>
          </section>
        );
      })}

    </div>
  );
}
