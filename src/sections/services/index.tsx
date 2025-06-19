'use client'
import { useRef, useEffect } from 'react';
import styles from './services.module.scss';

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

useEffect(() => {
  const currentSection = sectionRef.current;
  const currentServices = serviceRefs.current;

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
  currentServices.forEach(service => service && observer.observe(service));

  return () => {
    observer.unobserve(currentSection);
    currentServices.forEach(service => service && observer.unobserve(service));
  };
}, []);

  const services = [
    {
      title: "Blockchain Development",
      description: "Custom blockchain solutions tailored to your business needs",
      icon: "⛓️",
      features: [
        "Smart Contract Development",
        "DApp Creation",
        "Tokenization",
        "DeFi Solutions"
      ]
    },
    {
      title: "Web3 Integration",
      description: "Seamlessly integrate Web3 functionality into your applications",
      icon: "🌐",
      features: [
        "Wallet Integration",
        "NFT Marketplaces",
        "DAO Development",
        "Web3 Authentication"
      ]
    },
    {
      title: "Security Audits",
      description: "Comprehensive security assessments for your blockchain projects",
      icon: "🔒",
      features: [
        "Smart Contract Audits",
        "Penetration Testing",
        "Vulnerability Assessment",
        "Security Consulting"
      ]
    }
  ];

  return (
    <section id="services" ref={sectionRef} className={styles.services}>
      <div className={styles.background}>
        <div className={styles.orb}></div>
        <div className={styles.orb}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>Our</span>
            <span className={styles.titleLineAccent}>Services</span>
          </h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Comprehensive blockchain solutions designed to propel your business into the decentralized future
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { serviceRefs.current[index] = el; }}
              className={styles.serviceCard}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
              
              <ul className={styles.featuresList}>
                {service.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className={styles.cardHoverEffect}></div>
              <div className={styles.cardGlowEffect}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}