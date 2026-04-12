import React from "react";
import { Skeleton } from "../Skeleton/Skeleton";
import styles from "./CourseCard.module.css"; // Gunakan container styling yang sama dengan kartu asli

export const CourseCardSkeleton = () => {
  return (
    <div
      className={styles.cardContainer}
      style={{
        padding: "16px",
        border: "1px solid #eee",
        borderRadius: "12px",
      }}
    >
      {/* Skeleton Gambar Thumbnail */}
      <Skeleton variant="rect" height="160px" className={styles.thumbnail} />

      <div style={{ marginTop: "16px" }}>
        {/* Skeleton Kategori/Badge */}
        <Skeleton variant="text" width="30%" height="24px" />

        {/* Skeleton Judul Kursus (2 baris) */}
        <Skeleton
          variant="text"
          width="90%"
          height="28px"
          style={{ marginTop: "8px" }}
        />
        <Skeleton variant="text" width="70%" height="28px" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          {/* Skeleton Harga */}
          <Skeleton variant="text" width="40%" height="24px" />
          {/* Skeleton Tombol */}
          <Skeleton variant="rect" width="80px" height="36px" />
        </div>
      </div>
    </div>
  );
};
