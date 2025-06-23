'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './navbar.module.scss';
import Link from 'next/link';
import { useWeb3 } from '@/components/provider/Web3Provider';
import { shortenAddress } from '@/utils/web3';
import ThemeToggle from '../theme-toggle';

export default function Navbar() {
  const { connectWallet, disconnectWallet, account, isConnected } = useWeb3();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnect = async () => {
    try {
      await connectWallet();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setMobileMenuOpen(false);
  };

  return (
    <div className={styles.actions}>
  <ThemeToggle />
    <nav 
      ref={navbarRef} 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMain}>$GMC</span>
          <span className={styles.logoPulse}></span>
        </Link>

        <div className={`${styles.menu} ${mobileMenuOpen ? styles.open : ''}`}>
          <Link 
            href="#about" 
            className={styles.menuItem}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>About</span>
            <div className={styles.menuItemUnderline}></div>
          </Link>
          <Link 
            href="#tokenomics" 
            className={styles.menuItem}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Tokenomics</span>
            <div className={styles.menuItemUnderline}></div>
          </Link>
          <Link 
            href="#roadmap" 
            className={styles.menuItem}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Roadmap</span>
            <div className={styles.menuItemUnderline}></div>
          </Link>
          <Link 
            href="#community" 
            className={styles.menuItem}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Community</span>
            <div className={styles.menuItemUnderline}></div>
          </Link>
        </div>

        <div className={styles.walletContainer}>
          {isConnected ? (
            <div className={styles.walletConnected}>
              <div className={styles.walletAddressContainer}>
                <span className={styles.walletAddress}>
                  {shortenAddress(account!)}
                </span>
                <div className={styles.walletStatusIndicator}></div>
              </div>
              <button 
                onClick={handleDisconnect}
                className={styles.disconnectButton}
              >
                <span>Disconnect</span>
                <div className={styles.buttonHoverEffect}></div>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleConnect}
              className={styles.connectButton}
            >
              <span>Connect Wallet</span>
              <div className={styles.buttonHoverEffect}></div>
            </button>
          )}
        </div>

        <button 
          className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.open : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.menuIcon}></span>
        </button>
      </div>
    </nav>
</div>
  
  );
}