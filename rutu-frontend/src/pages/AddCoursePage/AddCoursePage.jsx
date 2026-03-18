import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./AddCoursePage.module.css";
import shape1 from "@/assets/shape1.svg";
import shape7 from "@/assets/shape7.svg";

export default function AddCoursePage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Publish Course">
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.sidebar}
        >
          <h1 className={styles.heroTitle}>Share Your <span className={styles.highlight}>Knowledge</span></h1>
          <p className={styles.heroDesc}>
            Bantu orang lain tumbuh dengan membagikan keahlianmu. 
            Isi detail kursusmu dan mulai menginspirasi hari ini!
          </p>
          <img src={shape1} alt="" className={styles.decor1} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.formSection}
        >
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>Title</label>
              <input type="text" placeholder="e.g. Master React in 10 Days" className={styles.input} />
            </div>

            <div className={styles.row}>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Tanggal Pelaksanaan</label>
                <input type="date" className={styles.input} />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Durasi</label>
                <input type="text" placeholder="e.g. 2 Jam" className={styles.input} />
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label className={styles.label}>Detail Kursus</label>
              <textarea placeholder="Ceritakan apa yang akan dipelajari..." className={styles.textarea} rows="5"></textarea>
            </div>

            <div className={styles.actions}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.cancelBtn}
                onClick={() => navigate(-1)}
              >
                Cancel
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, x: 5, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={styles.submitBtn}
              >
                Publish Now 🚀
              </motion.button>
            </div>
          </form>
          <img src={shape7} alt="" className={styles.decor2} />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
