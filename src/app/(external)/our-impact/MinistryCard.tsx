import Image from 'next/image';
import type { Ministry } from './content';

export default function MinistryCard({
  ministry,
  priority = false,
}: {
  ministry: Ministry;
  priority?: boolean;
}) {
  return (
    <article className="impact-ministry">
      <figure className="impact-ministry-figure">
        <Image
          src={ministry.photo.src}
          alt={ministry.photo.alt}
          width={1200}
          height={800}
          sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1164px) calc((100vw - 112px) / 2), 526px"
          priority={priority}
          className="impact-ministry-photo"
        />
        <figcaption>
          Photo:{' '}
          <a
            href={ministry.photo.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ministry.photo.credit}
          </a>
        </figcaption>
      </figure>
      <div className="impact-ministry-copy">
        <p className="impact-kicker">{ministry.place}</p>
        <h3>{ministry.name}</h3>
        <p>{ministry.body}</p>
        {ministry.href && (
          <a
            className="impact-text-link"
            href={ministry.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit {ministry.name} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
