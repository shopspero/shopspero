'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import staffData, { StaffInfo } from '@/app/(external)/team/staff-data';
import './team.css';

const sections: { key: StaffInfo['section']; label: string }[] = [
  { key: 'executive', label: 'Executives' },
  { key: 'developer', label: 'Web Development' },
  { key: 'designer', label: 'Design' },
  { key: 'admin', label: 'Admin' },
  { key: 'photographer', label: 'Media' },
];

export default function Team() {
  const [curCard, setCurCard] = useState<StaffInfo | null>(null);

  useEffect(() => {
    if (curCard) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
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
        const members = staffData.filter((s) => s.section === key);
        if (members.length === 0) return null;
        return (
          <section key={key} className="team-section">
            <p className="team-section-eyebrow">{label}</p>
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
                      style={{ objectPosition: staff.objectPosition || 'top' }}
                      sizes="(max-width: 768px) 50vw, 240px"
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
            className="team-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
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
                style={{ objectPosition: curCard.objectPosition || 'top' }}
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
            <div className="team-modal-body">
              <p className="eyebrow">{curCard.role}</p>
              <h3 className="team-modal-name">{curCard.name}</h3>
              <p className="team-modal-bio">{curCard.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
