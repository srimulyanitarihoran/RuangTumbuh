import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@components/Button/Button";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className={styles.errorCode}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        404
      </motion.h1>

      <h2 className={styles.title}>Waduh! Halaman Tidak Ditemukan</h2>

      <p className={styles.description}>
        Sepertinya Anda tersesat di RuangTumbuh. Halaman yang Anda cari mungkin
        telah pindah atau tidak pernah ada.
      </p>

      <div className={styles.buttonGroup}>
        <Button variant="primary" onClick={() => navigate("/")}>
          Kembali ke Beranda
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Kembali Sebelumnya
        </Button>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
