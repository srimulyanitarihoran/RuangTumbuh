import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./ProfilePage.module.css";
import { useProfile } from "@/hooks/useProfile";
import { getImageUrl } from "@/utils/imageHelper";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import {
  FiEdit3,
  FiUser,
  FiMapPin,
  FiBookOpen,
  FiInfo,
  FiCalendar,
  FiClock,
  FiZap,
  FiSettings,
  FiLogOut,
  FiTrash2,
} from "react-icons/fi";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userProfile, isLoading, initials, formatDate } = useProfile();

  // Konfigurasi Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // =========================================
  // BLOK LOADING: Meniru Struktur Layout Asli
  // =========================================
  if (isLoading) {
    return (
      <DashboardLayout title="Profil Saya">
        <div className={styles.container}>
          {/* --- HERO PROFILE CARD SKELETON --- */}
          <div className={styles.profileHeroCard}>
            <div className={styles.heroBanner}>
              {/* Skeleton Edit Button */}
              <div style={{ position: "absolute", top: 20, right: 20 }}>
                <Skeleton
                  width="120px"
                  height="40px"
                  style={{ borderRadius: "12px" }}
                />
              </div>
            </div>

            <div className={styles.heroContent}>
              <div className={styles.sideStat}>
                <div
                  className={styles.statBox}
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "2px dashed #e2e8f0",
                    boxShadow: "none",
                  }}
                >
                  <Skeleton
                    width="60px"
                    height="30px"
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton width="80px" height="14px" />
                </div>
              </div>

              <div className={styles.centerProfile}>
                <div
                  className={styles.avatarLarge}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <Skeleton
                    variant="circle"
                    width="100%"
                    height="100%"
                    style={{ minWidth: "120px", minHeight: "120px" }}
                  />
                </div>
                <Skeleton
                  width="200px"
                  height="32px"
                  style={{ marginTop: "16px", marginBottom: "12px" }}
                />
                <div
                  className={styles.userDetails}
                  style={{ justifyContent: "center" }}
                >
                  <Skeleton
                    width="80px"
                    height="20px"
                    style={{ borderRadius: "8px" }}
                  />
                  <span className={styles.detailDot}>•</span>
                  <Skeleton
                    width="100px"
                    height="20px"
                    style={{ borderRadius: "8px" }}
                  />
                  <span className={styles.detailDot}>•</span>
                  <Skeleton
                    width="120px"
                    height="20px"
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>

              <div className={styles.sideStat}>
                <div
                  className={styles.statBox}
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "2px dashed #e2e8f0",
                    boxShadow: "none",
                  }}
                >
                  <Skeleton
                    width="60px"
                    height="30px"
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton width="80px" height="14px" />
                </div>
              </div>
            </div>
          </div>

          {/* --- BOTTOM GRID CONTENT SKELETON --- */}
          <div className={styles.contentGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <Skeleton variant="circle" width="24px" height="24px" />
                  <Skeleton width="150px" height="28px" />
                </div>
                <div className={styles.bioContent}>
                  <div className={styles.descriptionText}>
                    <Skeleton
                      width="100%"
                      height="16px"
                      style={{ marginBottom: "8px" }}
                    />
                    <Skeleton width="80%" height="16px" />
                  </div>
                  <div className={styles.infoList}>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={styles.infoItem}>
                        <Skeleton
                          variant="circle"
                          width="48px"
                          height="48px"
                          style={{ flexShrink: 0 }}
                        />
                        <div
                          className={styles.infoItemText}
                          style={{ width: "100%" }}
                        >
                          <Skeleton
                            width="80px"
                            height="14px"
                            style={{ marginBottom: "8px" }}
                          />
                          <Skeleton width="140px" height="18px" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.passionSection}>
                    <Skeleton
                      width="150px"
                      height="24px"
                      style={{ marginBottom: "16px" }}
                    />
                    <div className={styles.passionWrapper}>
                      <Skeleton
                        width="80px"
                        height="36px"
                        style={{ borderRadius: "20px" }}
                      />
                      <Skeleton
                        width="100px"
                        height="36px"
                        style={{ borderRadius: "20px" }}
                      />
                      <Skeleton
                        width="90px"
                        height="36px"
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.balanceCard}>
                <div className={styles.cardHeader}>
                  <Skeleton variant="circle" width="24px" height="24px" />
                  <Skeleton width="120px" height="28px" />
                </div>
                <div className={styles.balanceContent}>
                  <Skeleton
                    width="140px"
                    height="40px"
                    style={{ marginBottom: "8px" }}
                  />
                  <Skeleton
                    width="100px"
                    height="16px"
                    style={{ marginBottom: "24px" }}
                  />
                  <Skeleton
                    width="100%"
                    height="50px"
                    style={{ borderRadius: "12px" }}
                  />
                </div>
              </div>
              <div className={styles.actionCard}>
                <div className={styles.cardHeader}>
                  <Skeleton variant="circle" width="24px" height="24px" />
                  <Skeleton width="160px" height="28px" />
                </div>
                <div className={styles.actionList}>
                  <Skeleton
                    width="100%"
                    height="50px"
                    style={{ borderRadius: "12px" }}
                  />
                  <Skeleton
                    width="100%"
                    height="50px"
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

  // =========================================
  // KODE ASLI ANDA (TIDAK ADA YANG DIUBAH)
  // =========================================
  return (
    <DashboardLayout title="Profil Saya">
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* --- HERO PROFILE CARD --- */}
        <motion.div variants={itemVariants} className={styles.profileHeroCard}>
          <div className={styles.heroBanner}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={styles.editBtnBanner}
              onClick={() => navigate("/edit-profile")}
            >
              <FiEdit3 /> Edit Profil
            </motion.button>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.sideStat}>
              <div
                className={styles.statBox}
                style={{ backgroundColor: "var(--primary-blue)" }}
              >
                <span className={styles.statNumber}>
                  {userProfile?.stats?.learningMinutes || 0}
                </span>
                <span className={styles.statLabel}>Menit Belajar</span>
              </div>
            </div>

            <div className={styles.centerProfile}>
              <div className={styles.avatarLarge}>
                {userProfile?.profilePicture ? (
                  <img
                    src={getImageUrl(userProfile?.profilePicture)}
                    alt="Profile"
                    className={styles.avatarImg}
                  />
                ) : (
                  initials
                )}
              </div>
              <h1 className={styles.userName}>{userProfile?.name}</h1>
              <div className={styles.userDetails}>
                <span className={styles.detailItem}>
                  <FiUser /> Siswa
                </span>
                <span className={styles.detailDot}>•</span>
                <span className={styles.detailItem}>
                  <FiMapPin /> {userProfile?.location || "Belum diatur"}
                </span>
                <span className={styles.detailDot}>•</span>
                <span className={styles.detailItem}>
                  <FiCalendar /> Bergabung {formatDate(userProfile?.createdAt)}
                </span>
              </div>
            </div>

            <div className={styles.sideStat}>
              <div
                className={styles.statBox}
                style={{ backgroundColor: "var(--primary-green)" }}
              >
                <span className={styles.statNumber}>
                  {userProfile?.stats?.teachingSessions || 0}
                </span>
                <span className={styles.statLabel}>Sesi Mengajar</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- BOTTOM GRID CONTENT --- */}
        <div className={styles.contentGrid}>
          <div className={styles.leftColumn}>
            <motion.div variants={itemVariants} className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <FiInfo
                  className={styles.cardIcon}
                  style={{ color: "var(--primary-blue)" }}
                />
                <h2 className={styles.cardTitle}>Tentang Saya</h2>
              </div>
              <div className={styles.bioContent}>
                <p className={styles.descriptionText}>
                  {userProfile?.description ||
                    "Halo! Saya belum menuliskan deskripsi diri."}
                </p>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <div
                      className={styles.infoItemIcon}
                      style={{ backgroundColor: "var(--primary-yellow)" }}
                    >
                      <FiBookOpen />
                    </div>
                    <div className={styles.infoItemText}>
                      <p className={styles.infoLabel}>Tanggal Lahir</p>
                      <p className={styles.infoValue}>
                        {userProfile?.birthDate
                          ? formatDate(userProfile.birthDate)
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div
                      className={styles.infoItemIcon}
                      style={{ backgroundColor: "var(--primary-blue)" }}
                    >
                      <FiCalendar />
                    </div>
                    <div className={styles.infoItemText}>
                      <p className={styles.infoLabel}>Kontak Email</p>
                      <p className={styles.infoValue}>{userProfile?.email}</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div
                      className={styles.infoItemIcon}
                      style={{ backgroundColor: "var(--primary-red)" }}
                    >
                      <FiBookOpen />
                    </div>
                    <div className={styles.infoItemText}>
                      <p className={styles.infoLabel}>Asal Sekolah</p>
                      <p className={styles.infoValue}>
                        {userProfile?.school || "-"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.passionSection}>
                  <h3 className={styles.subTitle}>Keahlian & Minat</h3>
                  <div className={styles.passionWrapper}>
                    {userProfile?.passions?.length > 0 ? (
                      userProfile.passions.map((item, index) => (
                        <span key={index} className={styles.passionTag}>
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className={styles.emptyPassion}>
                        Belum ada minat.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className={styles.rightColumn}>
            <motion.div variants={itemVariants} className={styles.balanceCard}>
              <div className={styles.cardHeader}>
                <FiClock
                  className={styles.cardIcon}
                  style={{ color: "var(--primary-green)" }}
                />
                <h2 className={styles.cardTitle}>Saldo Waktu</h2>
              </div>
              <div className={styles.balanceContent}>
                <h2 className={styles.balanceValue}>
                  {userProfile?.timeBalance || 0} Menit
                </h2>
                <p className={styles.balanceSub}>Tersedia untuk kelas</p>
                <motion.button
                  className={styles.topUpBtn}
                  onClick={() => navigate("/help")}
                >
                  <FiZap /> Isi Saldo ⚡
                </motion.button>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className={styles.actionCard}>
              <div className={styles.cardHeader}>
                <FiSettings
                  className={styles.cardIcon}
                  style={{ color: "#666" }}
                />
                <h2 className={styles.cardTitle}>Pengaturan Akun</h2>
              </div>

              <div className={styles.actionList}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`${styles.actionBtn} ${styles.logoutBtn}`}
                  onClick={() => {
                    console.log("Keluar akun diklik");
                  }}
                >
                  <FiLogOut /> Keluar Akun
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  onClick={() => {
                    console.log("Hapus akun diklik");
                  }}
                >
                  <FiTrash2 /> Hapus Akun
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
