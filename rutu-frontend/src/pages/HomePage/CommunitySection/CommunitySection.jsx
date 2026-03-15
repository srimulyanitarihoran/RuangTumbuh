import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // Import tambahan dari framer-motion
import styles from "./CommunitySection.module.css";
import { COMMUNITY_FEATURES } from "@/constants/communityData";
import CommunityMockup from "./CommunityMockup";
import CommunityCard from "./CommunityCard";

export default function CommunitySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <main className={styles.main} id="komunitas" ref={sectionRef}>
      <div className={styles.leftSection}>
        <div className={styles.headerArea}>
          <span className={styles.tag}>Feature Spotlight</span>
          <h1 className={styles.heroTitle}>Interaction Room</h1>
          <p className={styles.heroDesc}>
            Belajar coding sendirian itu berat. Bergabunglah dengan ratusan
            pembelajar lainnya, diskusikan masalahmu, dan temukan circle yang
            sefrekuensi.
          </p>
        </div>

        <div className={styles.featureList}>
          {COMMUNITY_FEATURES.map((feat, index) => (
            <CommunityCard key={feat.id} feat={feat} index={index} />
          ))}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.stickyWrapper}>
          <motion.div style={{ y: mockupY, rotate: mockupRotate }}>
            <CommunityMockup />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
