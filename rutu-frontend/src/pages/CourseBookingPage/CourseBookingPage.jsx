import React, { useState } from "react";
import api from "@/utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./CourseBookingPage.module.css";
import { Popup } from "@/components/Popup/Popup";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function CourseBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth(); // Menggunakan useAuth agar lebih aman
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    note: "",
  });

  const [popup, setPopup] = useState({
    isOpen: false,
    type: "success",
    title: "",
    description: "",
  });

  // 1. REACT QUERY: Ambil Data Kursus (Menggantikan useEffect)
  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      // Axios langsung mengembalikan data, tidak butuh .json() atau ngecek response.ok
      return await api.get(`/courses/${id}`);
    },
    enabled: !!id,
  });

  // 2. REACT QUERY: Mutasi untuk Submit Booking
  const bookingMutation = useMutation({
    mutationFn: async (scheduledAt) => {
      return await api.post("/bookings", {
        courseId: parseInt(id),
        studentId: currentUser.id,
        studentName: currentUser.name,
        scheduledAt: scheduledAt,
        note: formData.note,
      });
    },
    onSuccess: () => {
      // Refresh data "Pengajuan Saya" di background
      queryClient.invalidateQueries(["myBookings", currentUser?.id]);

      setPopup({
        isOpen: true,
        type: "success",
        title: "Berhasil!",
        description:
          "Permintaan booking kamu berhasil diajukan! Silakan cek di menu My Courses.",
      });
      setTimeout(() => {
        navigate("/mycourses");
      }, 2500);
    },
    onError: (error) => {
      console.error("Booking failed:", error);
      setPopup({
        isOpen: true,
        type: "danger",
        title: "Booking Gagal",
        description:
          error.response?.data?.message ||
          "Terjadi kesalahan saat memproses booking.",
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      setPopup({
        isOpen: true,
        type: "danger",
        title: "Gagal",
        description: "Harap pilih tanggal dan waktu!",
      });
      return;
    }

    // Gabungkan date dan time menjadi ISO string
    const scheduledAt = new Date(
      `${formData.date}T${formData.time}`,
    ).toISOString();

    // Eksekusi API via Mutation
    bookingMutation.mutate(scheduledAt);
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Memuat...">
        <div style={{ textAlign: "center", padding: "50px" }}>
          Memuat detail kursus...
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !course) {
    return (
      <DashboardLayout title="Error">
        <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
          Terjadi kesalahan. Kursus tidak ditemukan.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Course Booking">
      <div className={styles.container}>
        <div className={styles.bookingSection}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.leftContent}
          >
            <h1 className={styles.title}>{course.name}</h1>
            <p className={styles.author}>by {course.tutor}</p>
            <div
              style={{
                marginTop: "20px",
                fontWeight: "600",
                fontSize: "1.2rem",
              }}
            >
              <span>Category: {course.kategori}</span>
              <br />
              <span>Duration: {course.durasi} Min</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.formContainer}
          >
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Your Name"
                className={styles.input}
                value={currentUser?.name || ""}
                readOnly
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.selectWrapper}>
                <input
                  type="date"
                  name="date"
                  className={styles.input}
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.selectWrapper}>
                <input
                  type="time"
                  name="time"
                  className={styles.input}
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <textarea
                name="note"
                placeholder="Apa yang ingin kamu pelajari?"
                className={styles.textarea}
                rows="4"
                value={formData.note}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className={styles.actionRow}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={styles.backBtn}
                onClick={() => navigate(-1)}
                type="button"
                disabled={bookingMutation.isPending}
              >
                ←
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.submitBtn}
                onClick={handleBooking}
                type="submit"
                disabled={bookingMutation.isPending}
              >
                {bookingMutation.isPending ? "Memproses..." : "Book Now 🚀"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <Popup
        isOpen={popup.isOpen}
        type={popup.type}
        icon={popup.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
        title={popup.title}
        description={popup.description}
        buttonText={popup.type === "success" ? "OK" : "Tutup"}
        onAction={() => setPopup({ ...popup, isOpen: false })}
      />
    </DashboardLayout>
  );
}
