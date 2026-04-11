import React from "react";
import { motion } from "framer-motion";
import { useFlowAnimation } from "@/hooks/useFlowAnimation";
import styles from "./FlowSection.module.css";

export default function FlowCard({ item, index, scrollYProgress }) {
  const { y, opacity, scale } = useFlowAnimation(scrollYProgress, index);

  return (
    <motion.div
      className={styles.cardWrapper}
      style={{ y, opacity, scale }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
    >
      <div className={styles.card}>
        <div
          className={styles.semiCircle}
          style={{ backgroundColor: item.color }}
        >
          <span className={styles.stepNumber}>0{index + 1}</span>
        </div>

        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDesc}>{item.desc}</p>
      </div>
    </motion.div>
  );
}
