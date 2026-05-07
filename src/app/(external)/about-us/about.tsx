'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, ReactNode } from 'react';
import './about.css';

type Faq = { id: string; question: string; answer: ReactNode };

const FAQS: Faq[] = [
  {
    id: 'what-does-spero-mean',
    question: 'What does the word "SPERO" mean?',
    answer: (
      <>
        In Latin, &ldquo;SPERO&rdquo; means &ldquo;to hope.&rdquo; Our vision is inspired
        by Matthew 10:29&ndash;31, which reflects care for the seemingly insignificant.
        {' '}
        <a
          href="https://shopspero.medium.com/what-does-spero-mean-8abf8394a91a"
          target="_blank"
          rel="noopener noreferrer"
          className="about-faq-inline-link"
        >
          Read more.
        </a>
      </>
    ),
  },
  {
    id: 'how-much-is-donated',
    question: 'Where do the profits go?',
    answer: (
      <>
        Spero is a nonprofit organization, and all proceeds go directly toward supporting
        Christian ministries, local faith-based initiatives, and expanding Spero&apos;s
        mission to bring the Gospel to more people.
      </>
    ),
  },
  {
    id: 'returns-exchanges',
    question: 'Can I return or exchange an item?',
    answer: (
      <>
        We allow returns within one week of receiving your order, provided the piece is
        brand new and unworn. We also accept returns for defects or quality issues.{' '}
        <a href="mailto:shopspero@gmail.com" className="about-faq-inline-link">
          Email us
        </a>{' '}
        with your order details.
      </>
    ),
  },
];

export default function AboutPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="about-page">
      {/* Cover */}
      <section className="about-cover">
        <Image
          src="/images/team/team.jpg"
          alt="The Spero team"
          fill
          priority
          sizes="100vw"
          className="about-cover-image"
        />
        <div className="about-cover-overlay" />
        <div className="about-cover-content">
          <p className="about-cover-eyebrow">Est. Berkeley</p>
          <h1 className="about-cover-title">We are Spero.</h1>
          <p className="about-cover-sub">
            A team of college students with a heart to share the gospel through
            biblically-empowered apparel.
          </p>
        </div>
      </section>

      {/* Etymology */}
      <section className="about-etymology">
        <p className="eyebrow">Spero</p>
        <h2 className="about-etymology-word">
          <span>&ldquo;to&nbsp;</span>
          <em>hope</em>
          <span>.&rdquo;</span>
        </h2>
        <p className="about-etymology-body">
          Our vision is rooted in Matthew 10:29&ndash;31, where something as
          insignificant as a sparrow, worth only a penny, is valued and cared for by God.
          We hope in the living hope, who bridged the gap that once separated us from Him —
          and we look up to see sparrows the same way we strive to look up to Christ daily
          as we navigate through our lives.
        </p>
        <p className="about-etymology-citation">— Latin, c. 1300</p>
      </section>

      {/* Mission — full bleed image with overlay */}
      <section className="about-mission-fullbleed">
        <Image
          src="/images/designs/flowers-1.jpg"
          alt="Spero mission"
          fill
          sizes="100vw"
          className="about-mission-image"
        />
        <div className="about-mission-overlay" />
        <div className="about-mission-content">
          <p className="eyebrow about-mission-eyebrow">Our Mission</p>
          <p className="about-mission-statement">
            To spread the Word of God by incorporating scripture into intentional designs —
            sparking hope, conversation, and bold living for Christ through everyday wear.
          </p>
        </div>
      </section>

      {/* Beliefs / Inline */}
      <section className="about-beliefs">
        <div className="about-beliefs-inner">
          <div className="about-beliefs-col">
            <p className="eyebrow">Gospel-centered</p>
            <p className="about-beliefs-body">
              Every design carries scripture. Each garment is a quiet reminder of who God
              is — perfectly good, faithful, and steadfast toward His people.
            </p>
          </div>
          <div className="about-beliefs-col">
            <p className="eyebrow">Nonprofit</p>
            <p className="about-beliefs-body">
              All proceeds support Christian ministries, faith-based campus
              initiatives, and the expansion of Spero&apos;s mission.
            </p>
          </div>
          <div className="about-beliefs-col">
            <p className="eyebrow">Student-built</p>
            <p className="about-beliefs-body">
              Spero is run entirely by college students using their talents in
              design, development, photography, and operations.{' '}
              <Link href="/team" className="about-faq-inline-link">
                Meet the team.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="about-faq">
        <div className="about-faq-header">
          <p className="eyebrow">Common Questions</p>
          <h2 className="about-faq-title">Frequently Asked</h2>
        </div>
        <ul className="about-faq-list">
          {FAQS.map((faq) => {
            const open = openId === faq.id;
            return (
              <li key={faq.id} className={`about-faq-item ${open ? 'is-open' : ''}`}>
                <button
                  className="about-faq-q"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : faq.id)}
                >
                  <span className="about-faq-q-text">{faq.question}</span>
                  <span className="about-faq-q-icon" aria-hidden>
                    {open ? '−' : '+'}
                  </span>
                </button>
                <div className="about-faq-a-wrap" aria-hidden={!open}>
                  <div className="about-faq-a">{faq.answer}</div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="about-faq-foot">
          Still curious?{' '}
          <a href="mailto:shopspero@gmail.com" className="about-faq-inline-link">
            Email us
          </a>
          .
        </p>
      </section>

      {/* Closing scripture */}
      <section className="about-closing">
        <p className="about-closing-quote">
          &ldquo;Are not two sparrows sold for a penny? Yet not one of them will fall to
          the ground outside your Father&apos;s care… you are worth more than many
          sparrows.&rdquo;
        </p>
        <p className="about-closing-cite">Matthew 10:29-31</p>
      </section>
    </div>
  );
}
