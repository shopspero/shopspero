import type { Metadata } from 'next';
import Image from 'next/image';
import {
  givingYear,
  currentMinistries,
  pastMinistries,
  partners,
} from './content';
import MinistryCard from './MinistryCard';
import PastMinistriesGallery from './PastMinistriesGallery';
import './impact.css';

export const metadata: Metadata = {
  title: 'Our Impact | Spero',
  description:
    'See the ministries Spero is supporting this year, our past giving, and our campus and community partnerships.',
};

export default function OurImpactPage() {
  return (
    <div className="impact-page">
      <header className="impact-hero">
        <p className="impact-kicker">Our Impact</p>
        <h1>
          Made with purpose.
          <br />
          <em>Given with hope.</em>
        </h1>
        <p className="impact-lead">
          Spero’s proceeds support Christian ministries and local outreach. Here
          is where we’re focusing our giving this year, along with the
          organizations we’ve supported in the past.
        </p>
      </header>

      {/* This year's giving is the first section after the introduction. */}
      <section
        className="impact-current impact-container"
        aria-labelledby="current-title"
      >
        <div className="impact-section-heading">
          <p className="impact-kicker">Our focus · {givingYear}</p>
          <h2 id="current-title">This year’s ministries</h2>
        </div>
        <div className="impact-current-list">
          {currentMinistries.map((ministry, index) => (
            <MinistryCard
              key={ministry.id}
              ministry={ministry}
              priority={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="impact-past" aria-labelledby="past-title">
        <div className="impact-container">
          <div className="impact-section-heading">
            <p className="impact-kicker">Past giving</p>
            <h2 id="past-title">Ministries we’ve supported</h2>
          </div>
          <PastMinistriesGallery ministries={pastMinistries} />
        </div>
      </section>

      {/* Local partnerships are separate from international ministry giving. */}
      <section
        className="impact-community impact-container"
        aria-labelledby="community-title"
      >
        <div className="impact-section-heading">
          <p className="impact-kicker">Campus & local community</p>
          <h2 id="community-title">
            One mission.
            <br />
            <em>Many hands.</em>
          </h2>
          <p>
            We also partner with campus fellowships and community organizations
            through clothing drops, distribution, and outreach.
          </p>
        </div>
        <div className="impact-partners">
          {partners.map((partner) => (
            <article className="impact-partner" key={partner.name}>
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${partner.name}`}
                className={`impact-partner-logo${partner.darkBackground ? ' impact-partner-logo--dark' : ''}${partner.fullCircle ? ' impact-partner-logo--full' : ''}${partner.logoStyle ? ' impact-partner-logo--' + partner.logoStyle : ''}`}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={600}
                  height={300}
                  sizes="200px"
                />
              </a>
              <h3>{partner.name}</h3>
              <p>{partner.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
