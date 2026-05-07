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
    body: "The Gospel is the good news about Jesus Christ — the most important message in all of human history. That God loves you and has made a way for you to know Him.",
    verse: 'For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.',
    verseRef: 'John 3:16',
    image: '/images/statement-of-faith/gospel.jpg',
    points: [
      'The Gospel means "good news"',
      "It's about God's love and salvation",
      'Available to everyone who believes',
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
    body: "Sin entered the world and created a gap between humanity and God. This isn't just about being bad — it's a fundamental brokenness that affects everyone. We all fall short of God's perfect standard.",
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
    body: 'God loved us so much that He sent Jesus to earth. Jesus lived a perfect life, died on the cross to pay the penalty for our sins, and rose from the dead. He took our punishment so we could have a relationship with God.',
    verse: 'Christ died for our sins according to the Scriptures, He was buried, He was raised on the third day.',
    verseRef: '1 Corinthians 15:3-4',
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
    body: "Salvation is a free gift from God. You can't earn it through good works or religious activity. All you need to do is believe in Jesus, confess your need for Him, and accept His forgiveness.",
    verse: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised Him from the dead, you will be saved.",
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
    body: "When you accept Jesus, you become a new creation. Your past is forgiven, your identity changes, and you begin a journey of growth. God's Spirit lives in you, guiding and empowering you to live with purpose and hope.",
    verse: 'Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!',
    verseRef: '2 Corinthians 5:17',
    image: '/images/statement-of-faith/new-life.jpg',
    points: [
      'You become a new creation',
      'Your past is forgiven',
      'Begin a journey of transformation',
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
