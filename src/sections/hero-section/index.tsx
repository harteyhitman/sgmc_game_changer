import styles from './heroSection.module.scss';
import Button from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span>CHANGE</span>
          <span className={styles.highlight}>THE GAME+</span>
        </h1>
        <p className={styles.subtitle}>NO MORE RUGS.</p>
        <div className={styles.ctaContainer}>
          <Button variant="primary" size="medium">Connect Wallet</Button>
          <Button variant="secondary" size="large">Whitepaper</Button>
        </div>
      </div>
      <div className={styles.particleBackground} id="particles-js"></div>
    </section>
  );
}