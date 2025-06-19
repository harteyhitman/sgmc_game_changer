'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FaqSection.module.scss';

const faqItems = [
  {
    question: "What makes SGMC different from other tokens?",
    answer: "SGMC implements revolutionary anti-rug pull mechanisms and transparent tokenomics to protect investors. Our smart contracts are fully audited and include features like locked liquidity and community governance."
  },
  {
    question: "How can I participate in the token sale?",
    answer: "You can participate in our ongoing private sale by connecting your wallet to our platform. Make sure you're on our whitelist if required for the current phase."
  },
  {
    question: "What wallets are supported?",
    answer: "We support all EVM-compatible wallets including MetaMask, Trust Wallet, Coinbase Wallet, and WalletConnect. Make sure you're using the correct network for your transaction."
  },
  {
    question: "When will the token be listed on exchanges?",
    answer: "We plan to list on major decentralized exchanges immediately after the public sale concludes. Centralized exchange listings will follow based on community voting and exchange requirements."
  },
  {
    question: "How is the team incentivized?",
    answer: "Team tokens are vested over 2 years with a 6-month cliff. This ensures our team remains committed to the long-term success of the project."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Frequently <span className={styles.highlight}>Asked Questions</span>
        </motion.h2>

        <motion.div 
          className={styles.accordion}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
            >
              <button 
                className={styles.accordionHeader}
                onClick={() => toggleAccordion(index)}
              >
                <h3 className={styles.question}>{item.question}</h3>
                <div className={styles.accordionIcon}>
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    animate={{ rotate: activeIndex === index ? -45 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>
              <motion.div
                className={styles.accordionContent}
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className={styles.answer}>{item.answer}</div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}