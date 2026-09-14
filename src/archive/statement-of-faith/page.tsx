import Image from 'next/image';
import './statement-of-faith.css';

export const metadata = {
  title: 'Statement of Faith - Spero',
};

interface Chapter {
  number: string;
  title: string;
  body: string;
  verse: string;
  verseRef: string;
  image: string;
  points: string[];
}

const chapters: Chapter[] = [
  {
    number: '01',
    title: 'The Gospel',
    body: "The Gospel is the good news about Jesus Christ. It is the message that while we were helpless and lost, God acted to save. God sent His Son to live a perfect, sinless life so that He could stand in our place as a substitute for our sins. Jesus lived the life we failed to live and died the death we deserved, satisfying God's justice so that we could be forgiven.",
    verse: 'In this is love, not that we have loved God but that he loved us and sent his Son to be the propitiation for our sins.',
    verseRef: '1 John 4:10',
    image: '/images/statement-of-faith/gospel.jpg',
    points: [
      'God requires perfection, which we cannot obtain',
      "Jesus Christ satisfied God's righteous requirements",
      'Trust Him as your only hope for salvation',
    ],
  },
  {
    number: '02',
    title: "God's Love",
    body: "Before you were born, God knew you and loved you. His love isn't based on what you do — it's based on who He is. God created you with intention and purpose because He wanted a relationship with you.",
    verse: 'But God demonstrates His own love for us in this: While we were still sinners, Christ died for us.',
    verseRef: 'Romans 5:8',
    image: '/images/designs/god-is-love-1.jpg',
    points: [
      "God's love is unconditional",
      'You were created with purpose',
      'His desire is relationship with you',
    ],
  },
  {
    number: '03',
    title: 'The Problem',
    body: "Sin entered the world, separating humanity from God. This isn't just about 'being bad' — our problem is a corrupt nature that is in rebellion against God's authority, preferring our own rules to His perfect design. We all fall short of God's perfect standard.",
    verse: 'For all have sinned and fall short of the glory of God.',
    verseRef: 'Romans 3:23',
    image: '/images/statement-of-faith/the-problem.jpg',
    points: [
      'Sin separates us from God',
      'Everyone has sinned',
      'We cannot fix this ourselves',
    ],
  },
  {
    number: '04',
    title: 'The Solution',
    body: 'Out of His abundant grace, God sent His only Son, Jesus Christ, to live out a perfect life in our stead, and take upon Himself all the punishment for our brokenness. He bore our sins upon the cross, that we may freely receive His righteousness.',
    verse: 'For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God.',
    verseRef: '2 Corinthians 5:21',
    image: '/images/statement-of-faith/the-solution.jpg',
    points: [
      'Jesus lived a perfect life',
      'He died in our place',
      'He rose again, defeating death',
    ],
  },
  {
    number: '05',
    title: 'Your Response',
    body: "Salvation is the free gift of God. It is not the result of our good works, but Christ's finished work on the cross. In response, we are called to believe in the name of Jesus, confess and repent of our sins, and surrender our lives to His lordship.",
    verse: "If you confess with your mouth, 'Jesus is Lord,' and believe in your heart that God raised Him from the dead, you will be saved.",
    verseRef: 'Romans 10:9',
    image: '/images/statement-of-faith/your-response.jpg',
    points: [
      'Salvation is a free gift',
      'Believe and confess Jesus as Lord',
      "Accept God's forgiveness",
    ],
  },
  {
    number: '06',
    title: 'New Life',
    body: "Following Jesus is the beginning of a transformed life. When we trust in Christ, we are not just forgiven; we are made new. The Holy Spirit dwells within us, giving us new desires to love God and serve others. While we still face struggles, we now walk with the assurance that nothing can separate us from His love. We no longer live for our own glory, but for the one who died and rose again to make us His own!",
    verse: 'Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.',
    verseRef: '2 Corinthians 5:17',
    image: '/images/statement-of-faith/new-life.jpg',
    points: [
      'You are a new creation in Christ',
      'The Holy Spirit leads and helps you grow',
      'The Father holds you fast in His grace',
    ],
  },
];

export default function Page() {
  return (
    <div className="sof-page">
      {/* Cover */}
      <section className="sof-cover">
        <p className="eyebrow">Statement of Faith</p>
        <h1 className="sof-cover-title">The Gospel Journey</h1>
        <p className="sof-cover-sub">
          Six chapters on what we believe — what God has done, and what it means for you.
        </p>
        <div className="sof-cover-rule" />
        <p className="sof-cover-meta">Six chapters · ~5 min read</p>
      </section>

      {/* Chapters */}
      {chapters.map((ch, i) => (
        <section key={ch.number} className={`sof-chapter sof-chapter--${i % 2 === 0 ? 'image-right' : 'image-left'}`}>
          <div className="sof-chapter-image-wrap">
            <Image
              src={ch.image}
              alt={ch.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="sof-chapter-image"
            />
          </div>

          <div className="sof-chapter-text">
            <p className="sof-chapter-number">{ch.number}</p>
            <h2 className="sof-chapter-title">{ch.title}</h2>
            <p className="sof-chapter-body">{ch.body}</p>
            <ul className="sof-chapter-points">
              {ch.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <blockquote className="sof-chapter-verse">
              <p>&ldquo;{ch.verse}&rdquo;</p>
              <cite>— {ch.verseRef}</cite>
            </blockquote>
          </div>
        </section>
      ))}

      {/* PastorGPT plug */}
      <section className="sof-pastorgpt">
        <p className="eyebrow">Curious to learn more?</p>
        <h2 className="sof-pastorgpt-heading">
          Bring your questions about Christianity.
        </h2>
        <p className="sof-pastorgpt-sub">
          Talk to PastorGPT — a thoughtful conversational guide trained to walk through
          scripture and answer questions about the faith.
        </p>
        <a
          href="https://chatgpt.com/g/g-A1ojXxmox-pastor-gpt"
          target="_blank"
          rel="noopener noreferrer"
          className="sof-pastorgpt-btn"
        >
          Chat with PastorGPT
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </section>
    </div>
  );
}
