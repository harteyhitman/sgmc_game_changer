'use client'

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import styles from './TokenSalesSection.module.scss';

const tokenDetails = [
  { label: "Token Name", value: "SGMC" },
  { label: "Token Symbol", value: "SGMC" },
  { label: "Total Supply", value: "1,000,000,000" },
  { label: "Initial Market Cap", value: "$5,000,000" },
];

const salePhases = [
  {
    name: "Seed Round",
    progress: 100,
    allocation: "5% of supply",
    price: "$0.005",
    status: "Completed"
  },
  {
    name: "Private Sale",
    progress: 80,
    allocation: "10% of supply",
    price: "$0.01",
    status: "Ongoing"
  },
  {
    name: "Public Sale",
    progress: 0,
    allocation: "15% of supply",
    price: "$0.02",
    status: "Upcoming"
  }
];

export default function TokenSalesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

const itemVariant: Variants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] // Use an easing array instead of string
    }
  }
};
  return (
    <section id="token-sales" className={styles.tokenSales}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Token <span className={styles.highlight}>Sales</span>
        </motion.h2>

        <div className={styles.grid}>
          <motion.div 
            className={styles.tokenInfo}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.subtitle}>Token Details</h3>
            <div className={styles.detailsGrid}>
              {tokenDetails.map((detail, index) => (
                <div key={index} className={styles.detailItem}>
                  <span className={styles.detailLabel}>{detail.label}</span>
                  <span className={styles.detailValue}>{detail.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className={styles.salesInfo}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles.subtitle}>Sales Phases</h3>
            <motion.div 
              className={styles.phasesContainer}
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {salePhases.map((phase, index) => (
                <motion.div 
                  key={index}
                  className={styles.phaseCard}
                  variants={itemVariant}
                >
                  <div className={styles.phaseHeader}>
                    <h4 className={styles.phaseName}>{phase.name}</h4>
                    <span className={`${styles.phaseStatus} ${styles[phase.status.toLowerCase().replace(' ', '')]}`}>
                      {phase.status}
                    </span>
                  </div>
                  <div className={styles.phaseDetails}>
                    <div className={styles.phaseDetail}>
                      <span>Allocation:</span>
                      <span>{phase.allocation}</span>
                    </div>
                    <div className={styles.phaseDetail}>
                      <span>Price:</span>
                      <span>{phase.price}</span>
                    </div>
                  </div>
                  <div className={styles.progressContainer}>
                    <div 
                      className={styles.progressBar}
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                    <span className={styles.progressText}>{phase.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}