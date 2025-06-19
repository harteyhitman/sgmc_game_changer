'use client'
import { useRef, useEffect, useCallback } from 'react';
import styles from './aboutUs.module.scss';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const animationRefs = useRef<NodeJS.Timeout[]>([]);

  // Intersection Observer for section and cards
  useEffect(() => {
    const currentSection = sectionRef.current;
    const currentCards = cardsRef.current;
    
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentSection);
    currentCards.forEach((card) => card && observer.observe(card));

    return () => {
      observer.unobserve(currentSection);
      currentCards.forEach((card) => card && observer.unobserve(card));
    };
  }, []);

  // Counter animation effect
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const animateCounters = () => {
      const statNumbers = currentSection.querySelectorAll<HTMLElement>(`.${styles.statNumber}`);
      
      statNumbers.forEach((number) => {
        const target = parseInt(number.dataset.count || '0');
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            current = target;
          }
          number.textContent = Math.floor(current).toString();
        }, 16);
        
        animationRefs.current.push(timer);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
      animationRefs.current.forEach(timer => clearInterval(timer));
      animationRefs.current = [];
    };
  }, []);

  // Type-safe feature cards
  const features: Feature[] = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge blockchain solutions",
      icon: "🚀"
    },
    {
      title: "Security",
      description: "Enterprise-grade protection for your digital assets",
      icon: "🛡️"
    },
    {
      title: "Community",
      description: "Building together with our global network of users",
      icon: "🌍"
    },
    {
      title: "Transparency",
      description: "Open and verifiable operations at every level",
      icon: "🔍"
    }
  ];

  // Memoized card ref callback
  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.background}>
        <div className={styles.orb}></div>
        <div className={styles.orb}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>About</span>
            <span className={styles.titleLineAccent}>$GMC</span>
          </h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Revolutionizing the blockchain space with innovative solutions and 
            unparalleled user experiences
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={styles.paragraph}>
              $GMC is at the forefront of blockchain innovation, combining 
              cutting-edge technology with user-centric design to create 
              solutions that empower individuals and businesses alike.
            </p>
            <p className={styles.paragraph}>
              Founded in 2023, our team of experts brings together decades 
              of experience in blockchain development, cybersecurity, and 
              financial technology to build the next generation of decentralized 
              applications.
            </p>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber} data-count="100">0</span>+
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber} data-count="50">0</span>+
                <span className={styles.statLabel}>Team Members</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber} data-count="1">0</span>M+
                <span className={styles.statLabel}>Users</span>
              </div>
            </div>
          </div>

          <div className={styles.features}>
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={setCardRef(index)}
                className={styles.featureCard}
              >
                <div className={styles.cardIcon}>{feature.icon}</div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
                <div className={styles.cardHoverEffect}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}