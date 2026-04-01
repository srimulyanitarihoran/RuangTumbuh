import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./SchedulePage.module.css";
import { useNavigate } from "react-router-dom";

// Icons
import {
  FiCalendar,
  FiClock,
  FiVideo,
  FiUser,
  FiCheckCircle,
  FiPlayCircle,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// --- DUMMY DATA JADWAL ---
const allSchedules = [
  {
    id: 1,
    dateId: "12",
    time: "10:00",
    endTime: "12:00",
    title: "Review UI/UX",
    partner: "Siti Aminah",
    role: "Siswa",
    platform: "Google Meet",
    status: "Selesai",
    color: "#e5e7eb",
    dotColor: "#000",
    category: "Mentoring",
  },
  {
    id: 2,
    dateId: "14",
    time: "13:00",
    endTime: "15:00",
    title: "Live Class: React Fundamental",
    partner: "Budi Santoso",
    role: "Mentor",
    platform: "Zoom",
    status: "Berlangsung",
    color: "var(--primary-green)",
    dotColor: "var(--primary-green)",
    category: "Kelas",
  },
  {
    id: 3,
    dateId: "14",
    time: "19:30",
    endTime: "21:00",
    title: "Diskusi Proyek: Backend API",
    partner: "Tim Alpha",
    role: "Grup",
    platform: "Discord",
    status: "Akan Datang",
    color: "var(--primary-yellow)",
    dotColor: "var(--primary-yellow)",
    category: "Diskusi",
  },
  {
    id: 4,
    dateId: "22",
    time: "09:00",
    endTime: "11:00",
    title: "Workshop Tailwind",
    partner: "Dian Sastro",
    role: "Mentor",
    platform: "Google Meet",
    status: "Akan Datang",
    color: "var(--primary-blue)",
    dotColor: "var(--primary-blue)",
    category: "Workshop",
  },
];

const categories = ["Semua", "Mentoring", "Kelas", "Diskusi", "Workshop"];

export default function SchedulePage() {
  const navigate = useNavigate();
  const [activeDate, setActiveDate] = useState("14");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Filter jadwal
  const currentSchedules = allSchedules.filter((s) => {
    const matchDate = s.dateId === activeDate;
    const matchCat =
      activeCategory === "Semua" || s.category === activeCategory;
    return matchDate && matchCat;
  });

  // Generator Kalender (November 2026 dimulai di hari Minggu)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
  const emptyDaysStart = [];
  const datesWithSchedules = allSchedules.map((s) => s.dateId);

  // Animasi Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", bounce: 0.4 } },
  };

  return (
    <DashboardLayout title="Jadwal Belajar">
      <div className={styles.container}>
        {/* --- BANNER --- */}
        <motion.div
          className={styles.scheduleBanner}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className={styles.bannerText}>
            <h2>Atur Kegiatan Kamu 📅</h2>
            <p>
              Atur waktumu, jangan sampai ada sesi berharga yang terlewatkan.
              Semua jadwal pentingmu ada di sini!
            </p>
          </div>
          <button
            className={styles.addBtn}
            onClick={() => navigate("/add-course")}
          >
            <FiPlus size={20} strokeWidth={3} /> Jadwal Baru
          </button>
        </motion.div>

        {/* --- 50:50 LAYOUT GRID --- */}
        <div className={styles.splitLayout}>
          {/* ========================================================= */}
          {/* KOLOM KIRI: KALENDER & KATEGORI                             */}
          {/* ========================================================= */}
          <div className={styles.leftColumn}>
            {/* BOX KALENDER */}
            <div className={styles.calendarCard}>
              <div className={styles.calendarHeader}>
                <button className={styles.navBtn}>
                  <FiChevronLeft size={20} />
                </button>
                <h3 className={styles.monthTitle}>November 2026</h3>
                <button className={styles.navBtn}>
                  <FiChevronRight size={20} />
                </button>
              </div>

              <div className={styles.calendarGrid}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className={styles.dayLabel}>
                      {day}
                    </div>
                  ),
                )}

                {emptyDaysStart.map((id) => (
                  <div key={id} className={styles.dateCellEmpty}></div>
                ))}

                {daysInMonth.map((day) => {
                  const hasSchedule = datesWithSchedules.includes(day);
                  const isActive = activeDate === day;

                  let classList = `${styles.day}`;
                  if (isActive) classList += ` ${styles.primaryDay}`;
                  else if (hasSchedule) classList += ` ${styles.secondaryDay}`;

                  return (
                    <button
                      key={day}
                      className={classList}
                      onClick={() => setActiveDate(day)}
                    >
                      {day}
                      {hasSchedule && <div className={styles.eventDot}></div>}
                    </button>
                  );
                })}
              </div>

              <div className={styles.events}>
                <div className={`${styles.eventItem} ${styles.bgPrimary}`}>
                  <div
                    className={`${styles.colorBox} ${styles.colorPrimary}`}
                  ></div>
                  <span className={styles.eventText}>Tanggal Terpilih</span>
                </div>
                <div className={`${styles.eventItem} ${styles.bgSecondary}`}>
                  <div
                    className={`${styles.colorBox} ${styles.colorSecondary}`}
                  ></div>
                  <span className={styles.eventText}>Ada Jadwal Tersedia</span>
                </div>
              </div>
            </div>

            {/* BOX KATEGORI FILTER (Sudah Diperbarui Style Tab-nya) */}
            <div className={styles.neoBox}>
              <h4 className={styles.boxTitle}>Filter Kategori Sesi</h4>
              <div className={styles.categoryWrap}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`${styles.catPill} ${activeCategory === cat ? styles.catActive : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* KOLOM KANAN: TIMELINE AGENDA                                */}
          {/* ========================================================= */}
          <div className={styles.rightColumn}>
            <div className={styles.agendaBox}>
              <div className={styles.timelineHeader}>
                <h3>Agenda: {activeDate} Nov 2026</h3>
                <span className={styles.eventCount}>
                  {currentSchedules.length} Sesi
                </span>
              </div>

              <div className={styles.timelineWrapper}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeDate}-${activeCategory}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.timelineList}
                  >
                    {currentSchedules.length === 0 ? (
                      <div className={styles.emptyState}>
                        <FiCalendar size={50} color="#999" />
                        <h4>Hari yang tenang!</h4>
                        <p>
                          Tidak ada jadwal{" "}
                          {activeCategory !== "Semua"
                            ? `untuk ${activeCategory}`
                            : ""}{" "}
                          di tanggal ini.
                        </p>
                      </div>
                    ) : (
                      currentSchedules.map((item, index) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          className={styles.timelineItem}
                        >
                          {/* Kartu Jadwal */}
                          <div className={styles.cardCol}>
                            <div className={styles.scheduleCard}>
                              <div className={styles.cardHeader}>
                                <div className={styles.timeBadgeInside}>
                                  <FiClock className={styles.timeIcon} />
                                  <span>
                                    {item.time} - {item.endTime}
                                  </span>
                                </div>

                                <div
                                  className={styles.statusBadge}
                                  style={{
                                    backgroundColor: item.color,
                                    color:
                                      "#000",
                                  }}
                                >
                                  {item.status === "Selesai" && (
                                    <FiCheckCircle />
                                  )}
                                  {item.status === "Berlangsung" && (
                                    <FiPlayCircle />
                                  )}
                                  {item.status}
                                </div>
                              </div>

                              <div className={styles.cardBody}>
                                <span className={styles.catLabel}>
                                  {item.category}
                                </span>
                                <h3 className={styles.courseTitle}>
                                  {item.title}
                                </h3>
                                <div className={styles.metaGrid}>
                                  <div className={styles.metaBadge}>
                                    <FiUser />{" "}
                                    <span>
                                      {item.partner}{" "}
                                      <small>({item.role})</small>
                                    </span>
                                  </div>
                                  <div className={styles.metaBadge}>
                                    <FiVideo /> <span>{item.platform}</span>
                                  </div>
                                </div>
                              </div>

                              <div className={styles.cardFooter}>
                                <button
                                  className={`${styles.actionBtn} ${styles.btnDetail}`}
                                >
                                  Detail
                                </button>
                                {item.status !== "Selesai" && (
                                  <button
                                    className={`${styles.actionBtn} ${styles.btnPrimary}`}
                                  >
                                    Masuk Ruangan
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
