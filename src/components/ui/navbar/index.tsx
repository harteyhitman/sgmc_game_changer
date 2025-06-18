'use client'

import styles from './navbar.module.scss';
import Link from 'next/link';
import { useWeb3 } from '@/components/provider/Web3Provider';
import { shortenAddress } from '@/utils/web3';

export default function Navbar() {
  const { connectWallet, disconnectWallet, account, isConnected } = useWeb3();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span>SGMC</span>
        </Link>

        <div className={styles.menu}>
          <Link href="#about" className={styles.menuItem}>About</Link>
          <Link href="#tokenomics" className={styles.menuItem}>Tokenomics</Link>
          <Link href="#roadmap" className={styles.menuItem}>Roadmap</Link>
          <Link href="#community" className={styles.menuItem}>Community</Link>
        </div>

        <div className={styles.walletContainer}>
          {isConnected ? (
            <div className={styles.walletConnected}>
              <span className={styles.walletAddress}>
                {shortenAddress(account!)}
              </span>
              <button 
                onClick={disconnectWallet}
                className={styles.disconnectButton}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className={styles.connectButton}
            >
              Connect Wallet
            </button>
          )}
        </div>

        <button className={styles.mobileMenuButton}>
          <span className={styles.menuIcon}></span>
        </button>
      </div>
    </nav>
  );
}