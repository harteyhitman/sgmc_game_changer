'use client'
import { useRef, useEffect } from 'react';
import styles from './aboutUs.module.scss';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);
useEffect(() => {
  if (!sectionRef.current) return;

  const statNumbers = sectionRef.current.querySelectorAll(`.${styles.statNumber}`);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statNumbers.forEach((number) => {
          const target = parseInt(number.getAttribute('data-count') || '0');
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
        });
      }
    });
  }, { threshold: 0.5 });

  observer.observe(sectionRef.current);

  return () => observer.disconnect();
}, []);
  const features = [
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
            <span className={styles.titleLineAccent}>SGMC</span>
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
              SGMC is at the forefront of blockchain innovation, combining 
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
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
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