import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./CommunityMockup.module.css";

export default function CommunityMockup({ containerRef }) {
  // Animasi Parallax berotasi saat di-scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [4, -4, 4]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      className={styles.mockupContainer}
      style={{ rotate, y: yParallax }}
    >
      {/* Header Chat */}
      <div className={styles.chatHeader}>
        <div className={styles.groupInfo}>
          <div className={styles.groupAvatar}>💻</div>
          <div>
            <h3 className={styles.groupName}>Ruang Frontend Dev</h3>
            <p className={styles.onlineStatus}>🟢 128 online</p>
          </div>
        </div>
      </div>

      {/* Body Chat */}
      <div className={styles.chatBody}>
        <div className={`${styles.bubble} ${styles.leftBubble}`}>
          <span className={styles.sender}>Adyvka</span>
          <p>Guys, ada yang paham cara fix error hydration di React 18? 😭</p>
        </div>

        <div className={`${styles.bubble} ${styles.rightBubble}`}>
          <span className={styles.sender}>Mentor Budi</span>
          <p>
            Coba cek tag HTML di dalam komponen mu. Biasanya ada p di dalam p.
            Kirim snipet kodenya ke sini ya! 🔥
          </p>
        </div>

        <div className={`${styles.bubble} ${styles.leftBubble}`}>
          <span className={styles.sender}>Siswa A</span>
          <p>
            Wah, makasih infonya kak! Btw besok mabar nge-bug bareng yuk jam 8
            malam.
          </p>
        </div>
      </div>

      {/* Input Chat */}
      <div className={styles.chatInput}>
        <div className={styles.inputBox}>Ketik pesan...</div>
        <button className={styles.sendBtn}>➔</button>
      </div>
    </motion.div>
  );
}
