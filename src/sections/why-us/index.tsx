'use client'
import { useRef, useEffect } from 'react';
import styles from './whyUs.module.scss';

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

// why-us/index.tsx
useEffect(() => {
  const currentSection = sectionRef.current;
  const currentCards = cardRefs.current;

  if (!currentSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.visible);
      } else {
        entry.target.classList.remove(styles.visible);
      }
    });
  });

  observer.observe(currentSection);
  currentCards.forEach(card => card && observer.observe(card));

  return () => {
    observer.unobserve(currentSection);
    currentCards.forEach(card => card && observer.unobserve(card));
  };
}, []);

  const reasons = [
    {
      title: "Proven Expertise",
      description: "Our team has successfully delivered 100+ blockchain projects with measurable results.",
      icon: "🏆"
    },
    {
      title: "Cutting-Edge Technology",
      description: "We leverage the latest advancements in blockchain to build future-proof solutions.",
      icon: "💻"
    },
    {
      title: "User-Centric Design",
      description: "Our products prioritize intuitive interfaces without compromising on functionality.",
      icon: "🎨"
    },
    {
      title: "24/7 Support",
      description: "Dedicated support team available around the clock to assist you.",
      icon: "⏰"
    }
  ];

  return (
    <section id="why-us" ref={sectionRef} className={styles.whyUs}>
      <div className={styles.background}>
        <div className={styles.orb}></div>
        <div className={styles.orb}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>Why Choose</span>
            <span className={styles.titleLineAccent}>$GMC</span>
          </h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            We combine technical excellence with deep industry knowledge to deliver
            exceptional value to our clients and partners
          </p>
        </div>

        <div className={styles.reasons}>
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={styles.reasonCard}
            >
              <div className={styles.cardIconContainer}>
                <div className={styles.cardIcon}>{reason.icon}</div>
                <div className={styles.cardIconGlow}></div>
              </div>
              <h3 className={styles.cardTitle}>{reason.title}</h3>
              <p className={styles.cardDescription}>{reason.description}</p>
              <div className={styles.cardHoverEffect}></div>
            </div>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <button className={styles.ctaButton}>
            <span>Get Started</span>
            <div className={styles.buttonHoverEffect}></div>
          </button>
        </div>
      </div>
    </section>
  );
}