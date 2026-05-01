'use client';

import Image from 'next/image';
import './about.css';

export default function AboutPage() {
  return (
    <div className="about-page">

      {/* SECTION 1 — HERO */}
      <section className="about-hero">
        <div className="about-hero-image">
          <Image
            src="/images/team/team.webp"
            alt="Spero Team"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 47vw"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
        </div>
        <div className="about-hero-content">
          <h1 className="about-hero-heading">We are Spero.</h1>
          <p className="about-hero-sub">
            a team of college students with a heart to share the gospel with
            biblically empowered apparel.
          </p>
        </div>
      </section>

      {/* SECTION 2 — SPERO NAME */}
      <section className="about-spero">
        <div className="about-spero-text">
          <h2 className="about-spero-heading">&ldquo;Spero&rdquo;</h2>
          <p className="about-spero-body">
            In Latin, the word &ldquo;spero&rdquo; means &ldquo;to hope.&rdquo;
            Our vision is deeply rooted in Matthew 10:29&ndash;31, where
            something as insignificant as a sparrow, worth only a penny, is
            valued much greater and cared for by God. This reminds us that we
            hope in the living hope, who bridged the gap that once separated
            us from Him. We also look up to see sparrows, the same way we
            strive to look up to Christ daily as we navigate through our lives.
          </p>
        </div>
        <div className="about-spero-image">
          <Image
            src="/images/designs/hope-1.jpg"
            alt="Spero hope design"
            fill
            sizes="(max-width: 768px) 100vw, 53vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* SECTION 3 — MISSION */}
      <section className="about-mission">
        <div className="about-mission-image">
          <Image
            src="/images/designs/flowers-1.jpg"
            alt="God Clothes the Flowers of the Field"
            fill
            sizes="(max-width: 768px) 100vw, 47vw"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
        </div>
        <div className="about-mission-content">
          <h2 className="about-mission-heading">Our Mission</h2>
          <p className="about-mission-body">
            Spero is a gospel-centered clothing brand dedicated to creating
            scripture-based streetwear that serves as both a statement of faith
            and a tool for evangelism.
          </p>
          <p className="about-mission-body">
            Our mission is to spread the Word of God by incorporating Bible
            verses into every design and producing intentional designs that
            spark hope through everyday wear, spark conversations with both
            unbelievers and believers, and encouraging wearers to live boldly
            for Christ.
          </p>
        </div>
      </section>

      {/* SECTION 4 — PASTOR GPT */}
      <section className="about-pastorgpt">
        <h2 className="about-pastorgpt-heading">
          Curious about learning more about Christianity?
        </h2>
        <p className="about-pastorgpt-sub">
          Talk to PastorGPT and ask all your questions!
        </p>
        <a
          href="https://chatgpt.com/g/g-A1ojXxmox-pastor-gpt"
          target="_blank"
          rel="noopener noreferrer"
          className="about-pastorgpt-btn"
        >
          Chat with PastorGPT
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </section>

    </div>
  );
}
