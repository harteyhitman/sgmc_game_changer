import styles from './footer.module.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>SGMC</span>
          <p className={styles.tagline}>CHANGE THE GAME+</p>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Project</h4>
            <Link href="#about" className={styles.link}>About</Link>
            <Link href="#tokenomics" className={styles.link}>Tokenomics</Link>
            <Link href="#roadmap" className={styles.link}>Roadmap</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Resources</h4>
            <Link href="#" className={styles.link}>Whitepaper</Link>
            <Link href="#" className={styles.link}>Audit Report</Link>
            <Link href="#" className={styles.link}>GitHub</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Community</h4>
            <Link href="#" className={styles.link}>Twitter</Link>
            <Link href="#" className={styles.link}>Telegram</Link>
            <Link href="#" className={styles.link}>Discord</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>© {new Date().getFullYear()} SGMC. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <Link href="#" className={styles.legalLink}>Terms</Link>
          <Link href="#" className={styles.legalLink}>Privacy</Link>
        </div>
      </div>
    </footer>
  );
}