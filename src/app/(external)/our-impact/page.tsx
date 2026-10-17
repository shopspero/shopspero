import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { stories, partners } from './content';
import './impact.css';

export const metadata: Metadata = {
  title: 'Our Impact | Spero',
  description:
    'Meet the ministries and communities Spero supports, from equipping church leaders to opening doors to education.',
};

export default function OurImpactPage() {
  return (
    <div className="impact-page">
      {/* 1. Opening headline and introduction */}
      <header className="impact-hero">
        <p className="impact-kicker">Faith in action / Our impact</p>
        <h1>
          Made with purpose.
          <br />
          <em>Given with hope.</em>
        </h1>
        <p className="impact-lead">
          The story doesn’t end with what you wear. Your support helps us come
          alongside ministries sharing the gospel and caring for communities,
          near and far.
        </p>
      </header>
      {/* 2. Centered giving statement */}
      <section
        className="impact-intention impact-container"
        aria-labelledby="intention-title"
      >
        <p className="impact-kicker">The heart behind the giving</p>
        <div>
          <h2 id="intention-title">
            Apparel is the beginning.
            <br />
            Ministry is the purpose.
          </h2>
          <p>
            Spero’s proceeds support Christian ministries, faith-based campus
            initiatives, and the growth of our mission. We seek partners whose
            work is rooted in the gospel, and we want you to know the people and
            purposes behind that support.
          </p>
        </div>
      </section>

      {/* 3. Ministry stories — edit entries in content.ts */}
      <section
        id="giving"
        className="impact-giving impact-container"
        aria-labelledby="giving-title"
      >
        <div className="impact-section-heading">
          <div>
            <p className="impact-kicker">Beyond our campus</p>
            <h2 id="giving-title">Stories of shared hope.</h2>
          </div>
          <p>
            A closer look at the ministries
            <br />
            our proceeds have supported.
          </p>
        </div>
        {stories.map((story, index) => (
          <article id={story.id} className="impact-story" key={story.id}>
            <div className={`impact-story-art impact-story-art--${story.id}`}>
              <span className="impact-art-top">SPERO / MINISTRY STORIES</span>
              {story.image ? (
                <Image
                  src={story.image}
                  alt={story.photoAlt || story.name}
                  fill
                  sizes="(max-width: 639px) 100vw, 50vw"
                  className="impact-ministry-photo"
                />
              ) : (
                <span className="impact-country-mark" aria-hidden="true">
                  {story.mark}
                </span>
              )}
              <div className="impact-art-bottom">
                <span>{story.place}</span>
                <span>0{index + 1}</span>
              </div>
            </div>
            <div className="impact-story-copy">
              {story.photoCredit && (
                <a
                  className="impact-photo-credit"
                  href={story.photoSource}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {story.photoCredit}
                </a>
              )}
              <p className="impact-kicker">{story.category}</p>
              <p className="impact-organization">{story.name}</p>
              <h3>{story.title}</h3>
              <p className="impact-story-intro">{story.intro}</p>
              <p>{story.body}</p>
              <a
                className="impact-text-link"
                href={story.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Meet the ministry <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* 4. Campus and community partners — edit entries in content.ts */}
      <section className="impact-community" aria-labelledby="community-title">
        <div className="impact-container">
          <div className="impact-section-heading">
            <div>
              <p className="impact-kicker">Closer to home</p>
              <h2 id="community-title">
                One mission.
                <br />
                <em>Many hands.</em>
              </h2>
            </div>
            <p>
              Alongside our ministry giving, we connect with campus
              organizations and community initiatives through collaboration,
              outreach, and shared purpose.
            </p>
          </div>
          <div className="impact-partners">
            {partners.map((partner) => (
              <article className="impact-partner" key={partner.name}>
                <div className="impact-partner-identity">
                  {partner.image ? (
                    <Image
                      src={partner.image}
                      alt={`${partner.name} logo`}
                      width={100}
                      height={72}
                    />
                  ) : (
                    <span
                      className="impact-partner-monogram"
                      aria-hidden="true"
                    >
                      {partner.name
                        .split(' ')
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                  )}
                  <p className="impact-kicker">{partner.kind}</p>
                </div>
                <h3>{partner.name}</h3>
                <p>{partner.body}</p>
                <a
                  className="impact-text-link"
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meet {partner.name} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Closing message and shop link */}
      <section className="impact-closing">
        <p className="impact-kicker">Thank you for being part of the story</p>
        <h2>
          Small beginnings.
          <br />
          <em>Hope that travels.</em>
        </h2>
        <p>
          Every purchase is part of a shared mission. Thank you for helping us
          give with intention.
        </p>
        <Link className="impact-text-link" href="/shop">
          Explore the collection <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
