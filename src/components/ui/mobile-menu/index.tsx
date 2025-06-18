'use client'

import { useEffect, useState } from 'react';
import styles from './mobileMenu.module.scss';
import Link from 'next/link';
import { useWeb3 } from '@/components/provider/Web3Provider';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { connectWallet, disconnectWallet, account, isConnected } = useWeb3();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <button 
        className={`${styles.mobileMenuButton} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.menuIcon}></span>
      </button>

      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          <nav className={styles.mobileNav}>
            <Link href="#about" className={styles.mobileNavItem} onClick={() => setIsOpen(false)}>About</Link>
            <Link href="#tokenomics" className={styles.mobileNavItem} onClick={() => setIsOpen(false)}>Tokenomics</Link>
            <Link href="#roadmap" className={styles.mobileNavItem} onClick={() => setIsOpen(false)}>Roadmap</Link>
            <Link href="#community" className={styles.mobileNavItem} onClick={() => setIsOpen(false)}>Community</Link>
          </nav>

          <div className={styles.mobileWallet}>
            {isConnected ? (
              <div className={styles.mobileWalletConnected}>
                <span className={styles.mobileWalletAddress}>
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </span>
                <button 
                  onClick={() => {
                    disconnectWallet();
                    setIsOpen(false);
                  }}
                  className={styles.mobileDisconnectButton}
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  connectWallet();
                  setIsOpen(false);
                }}
                className={styles.mobileConnectButton}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}