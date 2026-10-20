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
        <div className="impact-ministry-image-wrap">
          <Image
            src={ministry.photo.src}
            alt={ministry.photo.alt}
            fill
            sizes="(max-width: 639px) 100vw, 50vw"
            priority={priority}
            className="impact-ministry-photo"
          />
        </div>
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
        <p className="eyebrow">{ministry.place}</p>
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
