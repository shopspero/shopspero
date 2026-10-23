'use client';

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MinistryCard from './MinistryCard';
import type { Ministry } from './content';

export default function PastMinistriesGallery({
  ministries,
}: {
  ministries: Ministry[];
}) {
  const [index, setIndex] = useState(0);
  if (ministries.length === 0) return null;
  const previous = () => setIndex((value) => Math.max(0, value - 1));
  const next = () =>
    setIndex((value) => Math.min(ministries.length - 1, value + 1));

  return (
    <div
      className="impact-gallery"
      role="region"
      aria-label="Previously supported ministries gallery"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          previous();
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          next();
        }
      }}
    >
      <div className="impact-gallery-controls">
        <p aria-live="polite" aria-atomic="true">
          {index + 1} / {ministries.length}
          <span className="impact-sr-only">: {ministries[index].name}</span>
        </p>
        <button
          type="button"
          onClick={previous}
          disabled={index === 0}
          aria-label="Previous ministry"
          aria-controls="past-ministry-slide"
        >
          <FiChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={index === ministries.length - 1}
          aria-label="Next ministry"
          aria-controls="past-ministry-slide"
        >
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
      <div
        id="past-ministry-slide"
        className="impact-gallery-slide"
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${ministries.length}: ${ministries[index].name}`}
      >
        <MinistryCard ministry={ministries[index]} />
      </div>
    </div>
  );
}
