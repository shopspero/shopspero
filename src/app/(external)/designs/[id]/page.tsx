import designData from '@/app/(external)/designs/design-data-with-mdx';
import { designIds, designNames, designList } from '@/app/(external)/designs/design-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import DesignCarousel from './DesignCarousel';
import '../designs.css';

const garmentTypes = ['Hoodie', 'T-Shirt', 'Crewneck', 'Sticker', 'Longsleeve'];

function parseDesignName(name: string): { title: string; subtitle: string; garment: string } {
  const words = name.split(' ');
  const lastWord = words[words.length - 1];
  if (garmentTypes.includes(lastWord)) {
    return {
      title: words.slice(0, -1).join(' ').toUpperCase(),
      subtitle: lastWord + ' Collection',
      garment: lastWord,
    };
  }
  return {
    title: name.toUpperCase(),
    subtitle: 'Spero Collection',
    garment: 'Apparel',
  };
}

interface Spec {
  label: string;
  value: string;
}

function getSpecs(garment: string, verse: string, colorway?: string): Spec[] {
  const base: Spec[] = [{ label: 'Verse', value: verse }];

  switch (garment) {
    case 'Hoodie':
      return [
        ...base,
        { label: 'Composition', value: '100% Cotton, 380 GSM' },
        { label: 'Fit', value: 'Boxy, drop-shoulder' },
        { label: 'Colorways', value: colorway || 'Bone, Black' },
      ];
    case 'Crewneck':
      return [
        ...base,
        { label: 'Composition', value: '100% Cotton, 380 GSM' },
        { label: 'Fit', value: 'Relaxed' },
        { label: 'Colorways', value: colorway || 'Cream, Black' },
      ];
    case 'T-Shirt':
      return [
        ...base,
        { label: 'Composition', value: '100% Combed Cotton, 220 GSM' },
        { label: 'Fit', value: 'Boxy' },
        { label: 'Colorways', value: colorway || 'White, Black' },
      ];
    case 'Longsleeve':
      return [
        ...base,
        { label: 'Composition', value: '100% Cotton, 240 GSM' },
        { label: 'Fit', value: 'Relaxed' },
        { label: 'Colorways', value: colorway || 'Cream, Black' },
      ];
    case 'Sticker':
      return [
        ...base,
        { label: 'Material', value: 'Vinyl, weather-resistant' },
        { label: 'Finish', value: 'Matte' },
        { label: 'Dimensions', value: '~3 in' },
      ];
    default:
      if (colorway) {
        return [...base, { label: 'Colorways', value: colorway }];
      }
      return base;
  }
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [...designIds];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const name = designNames[id];
  if (name === undefined) {
    notFound();
  }
  return {
    title: `${name} - Spero`,
  };
}

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const design = designData.find((d) => d.id === id);
  if (design === undefined) {
    notFound();
  }
  const { title, subtitle, garment } = parseDesignName(design.name);
  const [primary] = design.imgs;
  const specs = getSpecs(garment, design.verse, design.colorway);

  const idx = designList.findIndex((d) => d.id === id);
  const next = designList[(idx + 1) % designList.length];
  const nextParsed = parseDesignName(next.name);

  return (
    <article className="dd">
      {/* Header */}
      <header className="dd-header">
        <p className="eyebrow">{subtitle}</p>
        <h1 className="dd-title">{title}</h1>
        <p className="dd-counter">
          {String(idx + 1).padStart(2, '0')} <span>/</span>{' '}
          {String(designList.length).padStart(2, '0')}
        </p>
      </header>

      {/* Spread — primary image (no zoom) + narrative */}
      <section className="dd-spread">
        <div className="dd-spread-image-wrap">
          <Image
            src={primary}
            alt={design.name}
            fill
            priority
            className="dd-spread-image"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="dd-spread-text">
          <p className="dd-spread-eyebrow eyebrow">The Design</p>
          <div className="dd-mdx">{design.description}</div>
        </div>
      </section>

      {/* Carousel + Specs side-by-side */}
      <DesignCarousel images={design.imgs} alt={design.name} specs={specs} />

      {/* Conditional shop CTA — only for current drops */}
      {design.isCurrent && (
        <section className="dd-shop">
          <p className="eyebrow">Available Now</p>
          <h2 className="dd-shop-title">Shop the Drop</h2>
          <p className="dd-shop-sub">
            This piece is currently part of our active collection.
          </p>
          <Link href="/shop" className="cta-link">
            Order This Design
          </Link>
        </section>
      )}

      {/* Tail — next design */}
      <section className="dd-tail">
        <p className="eyebrow">Next</p>
        <Link href={`/designs/${next.id}`} className="dd-tail-link">
          <span className="dd-tail-name">{nextParsed.title}</span>
          <span className="dd-tail-arrow" aria-hidden>→</span>
        </Link>
        <Link href="/designs" className="dd-tail-back">
          Back to all designs
        </Link>
      </section>
    </article>
  );
}
