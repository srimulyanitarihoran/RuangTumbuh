import React from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { Popup } from "@/components/Popup/Popup";
import { Input } from "@/components/Input/Input";
import { Skeleton } from "@/components/Skeleton/Skeleton"; // [TAMBAHAN] Import Skeleton
import {
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiBookOpen,
  FiUser,
  FiStar,
} from "react-icons/fi";
import styles from "./CourseBookingPage.module.css";
import { useCourseBooking } from "@/hooks/useCourseBooking";
import { getCourseExtras } from "@/constants/courseData";
import { useCourseDetail } from "@/hooks/useCourseDetail";

export default function CourseBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courseData } = useCourseDetail();

  const {
    course,
    isLoading,
    isError,
    formData,
    popup,
    bookingMutation,
    setPopup,
    handleInputChange,
    handleBooking,
  } = useCourseBooking(id, user);


  if (isLoading) {
    return (
      <DashboardLayout title="Booking Session">
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <Skeleton width="250px" height="40px" />
            <Skeleton
              width="120px"
              height="45px"
              style={{ borderRadius: "12px" }}
            />
          </div>

          <div className={styles.bookingSection}>
            {/* SKELETON KOLOM KIRI */}
            <div
              className={styles.courseSummaryCard}
              style={{
                backgroundColor: "#f8fafc",
                border: "2px solid #e2e8f0",
              }}
            >
              <Skeleton
                width="100px"
                height="28px"
                style={{ borderRadius: "14px", marginBottom: "20px" }}
              />
              <Skeleton
                width="85%"
                height="36px"
                style={{ marginBottom: "16px" }}
              />
              <div style={{ marginBottom: "24px" }}>
                <Skeleton
                  width="100%"
                  height="16px"
                  style={{ marginBottom: "8px" }}
                />
                <Skeleton
                  width="100%"
                  height="16px"
                  style={{ marginBottom: "8px" }}
                />
                <Skeleton width="60%" height="16px" />
              </div>
              <div className={styles.courseMeta}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.metaItem}>
                    <Skeleton variant="circle" width="32px" height="32px" />
                    <div style={{ marginLeft: "10px", flex: 1 }}>
                      <Skeleton
                        width="50px"
                        height="12px"
                        style={{ marginBottom: "6px" }}
                      />
                      <Skeleton width="80px" height="16px" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SKELETON KOLOM KANAN */}
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <Skeleton
                  width="180px"
                  height="28px"
                  style={{ marginBottom: "10px" }}
                />
                <Skeleton width="240px" height="16px" />
              </div>
              <div className={styles.formContent} style={{ marginTop: "20px" }}>
                <div style={{ marginBottom: "20px" }}>
                  <Skeleton
                    width="100px"
                    height="18px"
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton
                    width="100%"
                    height="50px"
                    style={{ borderRadius: "12px" }}
                  />
                </div>
                <div className={styles.rowGroup}>
                  <div style={{ flex: 1 }}>
                    <Skeleton
                      width="100px"
                      height="18px"
                      style={{ marginBottom: "8px" }}
                    />
                    <Skeleton
                      width="100%"
                      height="50px"
                      style={{ borderRadius: "12px" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Skeleton
                      width="100px"
                      height="18px"
                      style={{ marginBottom: "8px" }}
                    />
                    <Skeleton
                      width="100%"
                      height="50px"
                      style={{ borderRadius: "12px" }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Skeleton
                    width="150px"
                    height="18px"
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton
                    width="100%"
                    height="100px"
                    style={{ borderRadius: "12px" }}
                  />
                </div>
                <div className={styles.actionRow} style={{ marginTop: "30px" }}>
                  <Skeleton
                    width="100%"
                    height="55px"
                    style={{ borderRadius: "12px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !course) {
    return (
      <DashboardLayout title="Terjadi Kesalahan">
        <div className={styles.loadingState}>❌ Kursus tidak ditemukan.</div>
      </DashboardLayout>
    );
  }

  const extras = getCourseExtras(course.kategori || "General");

  return (
    <DashboardLayout title={`Booking Session`}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Jadwalkan Sesi Kamu</h1>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate(`/search`)}
          >
            <FiArrowLeft /> Kembali
          </button>
        </div>

        <div className={styles.bookingSection}>
          {/* KOLOM KIRI: INFO KURSUS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.courseSummaryCard}
            style={{ backgroundColor: extras.color || "#facc15" }}
          >
            <span className={styles.ratingBadge}>
              <FiStar /> {courseData?.rating || 0} ({courseData?.reviews || 0}{" "}
              ulasan)
            </span>

            <h2 className={styles.courseTitle}>{course.name}</h2>

            <p className={styles.courseDescription}>
              {course.deskripsi ||
                "Kursus ini akan membimbingmu menguasai materi secara mendalam dengan metode pembelajaran yang interaktif dan mudah dipahami."}
            </p>

            <div className={styles.courseMeta}>
              <div className={styles.metaItem}>
                <FiUser className={styles.metaIcon} />
                <div>
                  <span>Tutor</span>
                  <strong>{course.tutor}</strong>
                </div>
              </div>
              <div className={styles.metaItem}>
                <FiClock className={styles.metaIcon} />
                <div>
                  <span>Durasi Sesi</span>
                  <strong>{course.durasi} Menit</strong>
                </div>
              </div>
              <div className={styles.metaItem}>
                <FiBookOpen className={styles.metaIcon} />
                <div>
                  <span>Kategori</span>
                  <strong>{course.kategori}</strong>
                </div>
              </div>
            </div>
          </motion.div>

          {/* KOLOM KANAN: FORMULIR BOOKING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={styles.formCard}
          >
            <div className={styles.formHeader}>
              <h3>Detail Reservasi</h3>
              <p>Tentukan kapan kamu ingin memulai sesi belajar ini.</p>
            </div>

            <form onSubmit={handleBooking} className={styles.formContent}>
              <Input
                label="Nama Lengkap Siswa"
                icon={FiUser}
                value={user?.name || ""}
                readOnly
                disabled
              />

              <div className={styles.rowGroup}>
                <Input
                  type="date"
                  label="Tanggal Sesi"
                  name="date"
                  icon={FiCalendar}
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="time"
                  label="Waktu Sesi"
                  name="time"
                  icon={FiClock}
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Input
                isTextarea
                label="Catatan untuk Tutor (Opsional)"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
              />

              <div className={styles.actionRow}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={bookingMutation.isPending}
                >
                  {bookingMutation.isPending
                    ? "Memproses..."
                    : "Booking Sekarang"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Popup
        isOpen={popup.isOpen}
        type={popup.type}
        icon={popup.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
        title={popup.title}
        description={popup.description}
        buttonText="Tutup"
        onAction={() => setPopup((prev) => ({ ...prev, isOpen: false }))}
      />
    </DashboardLayout>
  );
}
