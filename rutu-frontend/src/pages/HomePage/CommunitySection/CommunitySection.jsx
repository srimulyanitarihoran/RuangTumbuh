import React, { useRef } from "react";
import { motion } from "framer-motion";
import styles from "./CommunitySection.module.css";
import { COMMUNITY_FEATURES } from "@/constants/communityData";
import CommunityMockup from "./CommunityMockup";

export default function CommunitySection() {
  const containerRef = useRef(null);

  return (
    // Tambahkan id="komunitas" di sini agar Navbar bisa scroll ke sini
    <main className={styles.main} ref={containerRef} id="komunitas">
      
      {/* KIRI: TEKS FITUR (SCROLL) */}
      <div className={styles.leftSection}>
        <div className={styles.headerArea}>
          <span className={styles.tag}>Feature Spotlight</span>
          <h1 className={styles.heroTitle}>Interaction Room</h1>
          <p className={styles.heroDesc}>
            Belajar coding sendirian itu berat. Bergabunglah dengan ratusan pembelajar
            lainnya, diskusikan masalahmu, dan temukan *circle* yang sefrekuensi.
          </p>
        </div>

        <div className={styles.featureList}>
          {COMMUNITY_FEATURES.map((feat, index) => (
            <motion.div 
              key={feat.id} 
              className={styles.featureCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div 
                className={styles.cardIndicator} 
                style={{ backgroundColor: feat.color }} 
              />
              <div className={styles.cardContent}>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* KANAN: MOCKUP CHAT (STICKY) */}
      <div className={styles.rightSection}>
         <div className={styles.stickyWrapper}>
            <CommunityMockup containerRef={containerRef} />
         </div>
      </div>
      
    </main>
  );
}