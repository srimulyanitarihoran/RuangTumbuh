import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CourseCard.module.css";
// Impor ikon-ikon relevan untuk header dinamis
import {
  FiClock,
  FiStar,
  FiBarChart2,
  FiArrowRight,
  FiCode,
  FiServer,
  FiDroplet,
  FiSmartphone,
  FiBookOpen,
} from "react-icons/fi";

export default function CourseCard({ course, index }) {
  const navigate = useNavigate();

  // Fungsi untuk mendapatkan ikon header berdasarkan kategori kursus
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "frontend":
        return <FiCode className={styles.bannerIcon} />;
      case "backend":
        return <FiServer className={styles.bannerIcon} />;
      case "ui/ux design":
      case "design":
        return <FiDroplet className={styles.bannerIcon} />;
      case "mobile dev":
        return <FiSmartphone className={styles.bannerIcon} />;
      default:
        // Ikon default jika kategori tidak cocok
        return <FiBookOpen className={styles.bannerIcon} />;
    }
  };

  return (
    <div className={styles.neoCard}>
      {/* --- BANNER GAMBAR / HEADER DINAMIS --- */}
      <div
        className={styles.cardBanner}
        style={{ backgroundColor: course.color }}
      >
        {/* Panggil fungsi ikon dinamis */}
        {getCategoryIcon(course.category)}

        {/* Lencana Kategori di pojok */}
        <span className={styles.categoryBadge}>
          {course.category || "General"}
        </span>
      </div>

      {/* --- BODY KARTU --- */}
      <div className={styles.cardBody}>
        {/* Judul Kursus */}
        <h3 className={styles.courseTitle}>{course.title}</h3>

        {/* Info Mentor & Rating (Gaya Avatar Kotak Membulat) */}
        <div className={styles.mentorInfo}>
          <div
            className={styles.mentorAvatar}
            style={{ backgroundColor: course.color }}
          >
            {course.emoji || "👤"}
          </div>
          <div className={styles.mentorText}>
            <span className={styles.mentorName}>{course.author}</span>
            <span className={styles.mentorRole}>Mentor</span>
          </div>

          {/* Rating di pojok kanan */}
          <div className={styles.ratingBadge}>
            <FiStar className={styles.starIcon} />
            <span>{course.rating ? `${course.rating}.0` : "5.0"}</span>
          </div>
        </div>
      </div>

      {/* --- FOOTER KARTU (2 Tombol Taktil) --- */}
      <div className={styles.cardFooter}>
        <button
          className={`${styles.actionBtn} ${styles.btnDetail}`}
          onClick={() => navigate(`/course/${course.id}`)}
        >
          Lihat Detail
        </button>
        <button
          className={`${styles.actionBtn} ${styles.btnBooking}`}
          onClick={() => navigate(`/booking`)}
        >
          Booking
        </button>
      </div>
    </div>
  );
}
