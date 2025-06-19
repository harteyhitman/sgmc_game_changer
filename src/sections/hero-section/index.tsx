'use client'

// components/HeroSection.tsx
import { useEffect, useRef } from 'react';
import styles from './heroSection.module.scss';
import Button from '@/components/ui/button';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full size of container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Special characters for the background
    const chars = "01♠♣♥♦♫☼♀♂♪♫☼§→↓←↑!@#$%^&*()_+{}|:<>?-=[];',./~`";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    function drawMatrix() {
      if (!ctx) return;

      // Semi-transparent black background
      ctx.fillStyle = 'rgba(10, 15, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set style for characters
      ctx.fillStyle = '#0af';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drops that reach bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(drawMatrix, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className={styles.matrixBackground} />
      
      {/* Content container */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titleMain}>$GMC</span>
          <span className={styles.titleMain}>Change The Game</span>
          <span className={styles.titleSecondary}>No More Rugs</span>
        </h1>
        
        <p className={styles.subtitle}>
          Innovative solutions for the modern web with cutting-edge technology
          and stunning design.
        </p>
        
        <div className={styles.ctaContainer}>
          <Button className={styles.ctaPrimary}>
            <span>Get Started</span>
            <div className={styles.hoverEffect}></div>
          </Button>
          <Button className={styles.ctaSecondary}>
            <span>Learn More</span>
            <div className={styles.hoverEffect}></div>
          </Button>
        </div>
      </div>
      
      {/* Animated decorative elements */}
      <div className={styles.floatingOrbs}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.orb} style={{
            '--delay': `${i * 2}s`,
            '--size': `${Math.random() * 20 + 10}px`,
            '--x-start': `${Math.random() * 100}%`,
            '--y-start': `${Math.random() * 100}%`,
          } as React.CSSProperties} />
        ))}
      </div>
    </section>
  );
}