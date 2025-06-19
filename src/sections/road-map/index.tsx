'use client'
import { useRef } from 'react';
import { motion, useInView, easeOut } from 'framer-motion';
import styles from './roadmap.module.scss';

const roadmapItems = [
  {
    title: "Q1 2023",
    completed: true,
    milestones: [
      "Project conception",
      "Team assembly",
      "Smart contract development"
    ]
  },
  {
    title: "Q2 2023",
    completed: true,
    milestones: [
      "Private funding round",
      "Platform MVP development",
      "Security audits"
    ]
  },
  {
    title: "Q3 2023",
    completed: false,
    milestones: [
      "Public token launch",
      "DEX listings",
      "Marketing campaign"
    ]
  },
  {
    title: "Q4 2023",
    completed: false,
    milestones: [
      "Platform beta release",
      "Strategic partnerships",
      "Community expansion"
    ]
  }
];

export default function RoadmapSection() {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  return (
    <section id="roadmap" className={styles.roadmap}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Our <span className={styles.highlight}>Roadmap</span>
        </motion.h2>

        <motion.div 
          className={styles.timeline}
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {roadmapItems.map((item, index) => (
            <motion.div 
              key={index}
              className={`${styles.timelineItem} ${item.completed ? styles.completed : ''}`}
              variants={itemVariants}
            >
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h3 className={styles.quarter}>{item.title}</h3>
                  <div className={styles.statusIndicator}>
                    {item.completed ? (
                      <svg viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    ) : (
                      <div className={styles.pulseDot} />
                    )}
                  </div>
                </div>
                <ul className={styles.milestones}>
                  {item.milestones.map((milestone, mIndex) => (
                    <motion.li 
                      key={mIndex}
                      className={styles.milestone}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                      transition={{ delay: 0.1 * mIndex, duration: 0.4 }}
                    >
                      {milestone}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}