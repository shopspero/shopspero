'use client';

import { useState, useCallback, useEffect } from 'react';

interface Spec {
  label: string;
  value: string;
}

interface DesignCarouselProps {
  images: string[];
  alt: string;
  specs: Spec[];
}

export default function DesignCarousel({ images, alt, specs }: DesignCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  return (
    <div className="dd-carousel">
      <div className="dd-carousel-stage">
        <button
          type="button"
          className="dd-carousel-imgwrap"
          onClick={next}
          aria-label="Next image"
        >
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${alt} — view ${i + 1}`}
              className={`dd-carousel-img ${i === index ? 'is-active' : ''}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </button>

        {total > 1 && (
          <div className="dd-carousel-controls">
            <button
              type="button"
              className="dd-carousel-arrow dd-carousel-arrow--prev"
              onClick={prev}
              aria-label="Previous image"
            >
              ←
            </button>
            <p className="dd-carousel-counter">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <button
              type="button"
              className="dd-carousel-arrow dd-carousel-arrow--next"
              onClick={next}
              aria-label="Next image"
            >
              →
            </button>
          </div>
        )}
      </div>

      <aside className="dd-carousel-aside">
        <p className="eyebrow dd-specs-eyebrow">Made With Intention</p>
        <dl className="dd-specs-list">
          {specs.map((spec) => (
            <div key={spec.label} className="dd-specs-row">
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        {total > 1 && (
          <div className="dd-carousel-dots" role="tablist" aria-label="Image selector">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-label={`Show image ${i + 1}`}
                aria-selected={i === index}
                className={`dd-carousel-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
