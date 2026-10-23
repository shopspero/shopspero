'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import staffData, { StaffInfo } from '@/app/(external)/team/staff-data';
import './team.css';

const sections = [
  { key: 'executive', label: 'Executive Team' },
  { key: 'team', label: 'Team' },
];

export default function Team() {
  const [curCard, setCurCard] = useState<StaffInfo | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (curCard) {
      const trigger = document.activeElement as HTMLElement | null;
      const modal = modalRef.current;
      const closeButton = modal?.querySelector<HTMLButtonElement>('button');
      closeButton?.focus();
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setCurCard(null);
        if (event.key === 'Tab') {
          event.preventDefault();
          closeButton?.focus();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener('keydown', handleKeyDown);
        trigger?.focus();
      };
    }
  }, [curCard]);

  return (
    <div className="team-page">
      <header className="team-header">
        <p className="eyebrow">The Team</p>
        <h1 className="team-title">Meet Spero</h1>
        <p className="team-subtitle">
          A diverse group of Christians using their talents and skills to glorify God
          through their work — students, designers, developers, and photographers building
          Spero together.
        </p>
      </header>

      {sections.map(({ key, label }) => {
        const members = staffData.filter(
          (staff) => !staff.archived && (key === 'executive'
            ? staff.section === 'executive'
            : staff.section !== 'executive'),
        );
        if (members.length === 0) return null;
        return (
          <section key={key} className="team-section">
            <h2 className="team-section-eyebrow">{label}</h2>
            <div className="team-grid">
              {members.map((staff) => (
                <button
                  key={staff.name}
                  className="team-card"
                  onClick={() => setCurCard(staff)}
                  aria-label={`Read about ${staff.name}`}
                >
                  <div className="team-card-image-wrap">
                    <Image
                      src={staff.img}
                      alt={staff.name}
                      fill
                      className="team-card-image"
                      style={{ objectPosition: staff.objectPosition || 'center' }}
                      sizes="(max-width: 639px) 50vw, 220px"
                    />
                  </div>
                  <h3 className="team-card-name">{staff.name}</h3>
                  <p className="team-card-role">{staff.role}</p>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      <section className="team-join">
        <p className="eyebrow">Join the Team</p>
        <h2 className="team-join-title">
          Interested in working with us?
        </h2>
        <p className="team-join-body">
          We&apos;re always looking for new members. If you&apos;re excited about using
          your creative talents to glorify God, reach out.
        </p>
        <a href="mailto:shopspero@gmail.com" className="cta-link">
          Email Us
        </a>
      </section>

      {curCard && (
        <div
          className="team-modal-backdrop"
          onClick={() => setCurCard(null)}
          role="presentation"
        >
          <div
            ref={modalRef}
            className="team-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${curCard.name} bio`}
          >
            <button
              className="team-modal-close"
              onClick={() => setCurCard(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="team-modal-image-wrap">
              <Image
                src={curCard.img}
                alt={curCard.name}
                fill
                className="team-modal-image"
                style={{ objectPosition: curCard.objectPosition || 'center' }}
                sizes="(max-width: 639px) 100vw, 280px"
              />
            </div>
            <div className="team-modal-body">
              <p className="eyebrow">{curCard.role}</p>
              <h3 className="team-modal-name">{curCard.name}</h3>
              <p className="team-modal-major">{curCard.major}</p>
              <h4 className="team-modal-label">Why Spero</h4>
              <p className="team-modal-bio">{curCard.bio}</p>
              {curCard.favoriteBibleVerse && (
                <>
                  <h4 className="team-modal-label">Favorite Bible Verse</h4>
                  <blockquote className="team-modal-verse">{curCard.favoriteBibleVerse}</blockquote>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
