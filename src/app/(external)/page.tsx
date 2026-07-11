import Image from 'next/image';
import Link from 'next/link';
import Slideshow from '@/components/Slideshow';
import './home.css';

interface DropPreview {
  id: string;
  imagePath: string;
  altText: string;
  header: string;
  verse: string;
  href: string;
  size: 'wide' | 'tall';
}

const drops: DropPreview[] = [
  {
    id: 'god-is-love',
    imagePath: '/images/designs/god-is-love-1.jpg',
    altText: 'God is Love drop',
    header: 'God is Love',
    verse: '1 John 4:8',
    href: '/shop',
    size: 'wide',
  },
  {
    id: 'lux-aeterna',
    imagePath: '/images/designs/lux-aeterna-1.jpg',
    altText: 'Lux Aeterna drop',
    header: 'Lux Aeterna',
    verse: 'Isaiah 60',
    href: '/designs/lux-aeterna',
    size: 'tall',
  },
  {
    id: 'the-calling',
    imagePath: '/images/designs/the-calling-1.jpg',
    altText: 'The Calling drop',
    header: 'The Calling',
    verse: 'Ephesians 4:1',
    href: '/designs/the-calling',
    size: 'tall',
  },
];

export default function Page() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <Slideshow />
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <h1 className="home-hero-title">God is Love</h1>
          <p className="home-hero-verse">1 John 4:8</p>
          <Link href="/shop" className="home-hero-cta">
            Shop the Collection
          </Link>
        </div>
        <div className="home-hero-scroll-cue" aria-hidden>
          <span>Scroll</span>
          <div className="home-hero-scroll-line" />
        </div>
      </section>

      {/* Mission strip */}
      <section className="home-mission">
        <p className="eyebrow">Our Mission</p>
        <p className="home-mission-body">
          Spero is a gospel-centered apparel project — clothing made to spark conversations
          about hope, grace, and the love of Christ. Every design carries scripture.
        </p>
        <Link href="/about-us" className="home-mission-link">
          Read the story
        </Link>
      </section>

      {/* Drops collage */}
      <section className="home-drops">
        <div className="home-drops-grid">
          {drops.map((drop) => (
            <Link
              key={drop.id}
              href={drop.href}
              className={`home-drop home-drop--${drop.size}`}
            >
              <div className="home-drop-image-wrap">
                <Image
                  src={drop.imagePath}
                  alt={drop.altText}
                  fill
                  className="home-drop-image"
                  sizes={
                    drop.size === 'wide'
                      ? '100vw'
                      : '(max-width: 639px) 100vw, 50vw'
                  }
                />
              </div>
              <div className="home-drop-caption">
                <p className="home-drop-verse">{drop.verse}</p>
                <h3 className="home-drop-name">{drop.header}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Designs CTA strip */}
      <section className="home-explore">
        <p className="eyebrow">The Collection</p>
        <h2 className="home-explore-title">Explore every design.</h2>
        <Link href="/designs" className="cta-link">
          View Designs
        </Link>
      </section>
    </div>
  );
}
