'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./statement-of-faith.css";

interface Slide {
  id: number;
  number: string;
  title: string;
  content: string;
  verse: string;
  verseReference: string;
  image: string;
  points: string[];
}

const slides: Slide[] = [
  {
    id: 0,
    number: "01",
    title: "Gospel",
    content: "The Gospel is the good news about Jesus Christ. It's the most important message in all of human history - that God loves you and has made a way for you to know Him.",
    verse: "For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.",
    verseReference: "John 3:16",
    image: "https://images.unsplash.com/photo-1528874230033-c1818d79aa7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwZG9vciUyMGJyaWdodCUyMGxpZ2h0fGVufDF8fHx8MTc3NDY0NDk1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    points: [
      "The Gospel means 'good news'",
      "It's about God's love and salvation",
      "Available to everyone who believes"
    ]
  },
  {
    id: 1,
    number: "02",
    title: "God's Love",
    content: "Before you were born, God knew you and loved you. His love isn't based on what you do - it's based on who He is. God created you with intention and purpose because He wanted a relationship with you.",
    verse: "But God demonstrates His own love for us in this: While we were still sinners, Christ died for us.",
    verseReference: "Romans 5:8",
    image: "https://images.unsplash.com/photo-1772510934625-00bfb29439b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3ZpbmclMjBlbWJyYWNlJTIwZmFtaWx5fGVufDF8fHx8MTc3NDY0NDk1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    points: [
      "God's love is unconditional",
      "You were created with purpose",
      "His desire is relationship with you"
    ]
  },
  {
    id: 2,
    number: "03",
    title: "The Problem",
    content: "Sin entered the world and created a gap between humanity and God. This isn't just about 'being bad' - it's a fundamental brokenness that affects everyone. We all fall short of God's perfect standard.",
    verse: "For all have sinned and fall short of the glory of God.",
    verseReference: "Romans 3:23",
    image: "https://images.unsplash.com/photo-1582181873396-b29fe9ba32b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBjaGFpbiUyMGZyZWVkb218ZW58MXx8fHwxNzc0NjQ0OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    points: [
      "Sin separates us from God",
      "Everyone has sinned",
      "We cannot fix this ourselves"
    ]
  },
  {
    id: 3,
    number: "04",
    title: "The Solution",
    content: "God loved us so much that He sent Jesus to earth. Jesus lived a perfect life, died on the cross to pay the penalty for our sins, and rose from the dead. He took our punishment so we could have a relationship with God.",
    verse: "Christ died for our sins according to the Scriptures, He was buried, He was raised on the third day.",
    verseReference: "1 Corinthians 15:3-4",
    image: "https://images.unsplash.com/photo-1697469056548-18de734f0fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zcyUyMHNpbGhvdWV0dGUlMjBzdW5zZXR8ZW58MXx8fHwxNzc0NjQ0OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    points: [
      "Jesus lived a perfect life",
      "He died in our place",
      "He rose again, defeating death"
    ]
  },
  {
    id: 4,
    number: "05",
    title: "Your Response",
    content: "Salvation is a free gift from God. You can't earn it through good works or religious activity. All you need to do is believe in Jesus, confess your need for Him, and accept His forgiveness.",
    verse: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised Him from the dead, you will be saved.",
    verseReference: "Romans 10:9",
    image: "https://images.unsplash.com/photo-1748583917969-a4b4a5d1b6f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwaGFuZHMlMjBsaWdodCUyMGhvcGV8ZW58MXx8fHwxNzc0NjQ0OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    points: [
      "Salvation is a free gift",
      "Believe and confess Jesus as Lord",
      "Accept God's forgiveness"
    ]
  },
  {
    id: 5,
    number: "06",
    title: "New Life",
    content: "When you accept Jesus, you become a new creation. Your past is forgiven, your identity changes, and you begin a journey of growth. God's Spirit lives in you, guiding and empowering you to live with purpose and hope.",
    verse: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    verseReference: "2 Corinthians 5:17",
    image: "https://images.unsplash.com/photo-1586010339640-0cee8a975977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwbW91bnRhaW4lMjBob3BlfGVufDF8fHx8MTc3NDY0NDk1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    points: [
      "You become a new creation",
      "Your past is forgiven",
      "Begin a journey of transformation"
    ]
  }
];

const slideVariants = {
  enter: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function GospelSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const cooldown = useRef(false);

  const goNext = () => setActiveSlide((i) => Math.min(i + 1, slides.length - 1));
  const goPrev = () => setActiveSlide((i) => Math.max(i - 1, 0));

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Trackpad horizontal swipe via wheel event
  const handleWheel = (e: React.WheelEvent) => {
    if (cooldown.current) return;
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return; // ignore vertical scroll
    if (Math.abs(e.deltaX) < 20) return; // ignore noise

    cooldown.current = true;
    if (e.deltaX > 0) goNext();
    else goPrev();
    setTimeout(() => { cooldown.current = false; }, 600);
  };

  // Click left/right half to navigate
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const mid = e.currentTarget.getBoundingClientRect().width / 2;
    if (e.nativeEvent.offsetX < mid) goPrev();
    else goNext();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const threshold = 180;
    if (e.clientX < threshold) setHoverSide('left');
    else if (e.clientX > window.innerWidth - threshold) setHoverSide('right');
    else setHoverSide(null);
  };

  const slide = slides[activeSlide];

  return (
    <div className="sof-page">
      {/* Static page title */}
      <div className="sof-title-section">
        <h2 className="sof-title">The Gospel Journey</h2>
      </div>

      {/* Animated slide number + title */}
      <div className="sof-subtitle-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            <p className="sof-slide-number">{slide.number}</p>
            <h3 className="sof-slide-title">{slide.title}</h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide content — swaps in-place */}
      <div
        className="sof-viewport"
        onWheel={handleWheel}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverSide(null)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            variants={slideVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="sof-slide-inner"
          >
            <div className="sof-slide-grid">
              {/* Left — description + points */}
              <div className="sof-slide-content">
                <p>{slide.content}</p>
                <div className="sof-points">
                  {slide.points.map((point, idx) => (
                    <div key={idx} className="sof-point">
                      <span className="sof-bullet">•</span>
                      <p className="sof-point-text">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center — image */}
              <div className="sof-slide-image-wrapper">
                <img src={slide.image} alt={slide.title} />
                <div className="sof-image-overlay" />
              </div>

              {/* Right — verse */}
              <div className="sof-slide-verse">
                <p className="sof-verse-text">"{slide.verse}"</p>
                <p className="sof-verse-ref">— {slide.verseReference}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hover side overlays */}
        <div className={`sof-hover-overlay sof-hover-left${hoverSide === 'left' && activeSlide > 0 ? ' sof-hover-visible' : ''}`} />
        <div className={`sof-hover-overlay sof-hover-right${hoverSide === 'right' && activeSlide < slides.length - 1 ? ' sof-hover-visible' : ''}`} />

        {/* Subtle dot position indicators only */}
        <div className="sof-dots">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`sof-dot ${activeSlide === index ? 'sof-dot-active' : 'sof-dot-inactive'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
