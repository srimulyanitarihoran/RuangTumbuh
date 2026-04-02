import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Ambil data user dari localStorage (disimpan saat login)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        
        if (!storedUser || !storedUser.id) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`http://localhost:5001/api/user/${storedUser.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <DashboardLayout title="My Profile">
        <div className={styles.loadingContainer}>
          <p>Sedang memuat profil...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!userData) {
    return (
      <DashboardLayout title="My Profile">
        <div className={styles.errorContainer}>
          <p>Terjadi kesalahan saat memuat data profil.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Formatting date for 'Joined Since'
  const joinedDate = new Date(userData.createdAt).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  return (
    <DashboardLayout title="My Profile">
      <div className={styles.profileContainer}>
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.profileHeader}
        >
          <div className={styles.avatarLarge}>
            {userData.name ? userData.name.substring(0, 2).toUpperCase() : "U"}
          </div>
          <div className={styles.headerInfo}>
            <h1 className={styles.userName}>{userData.name}</h1>
            <p className={styles.userRole}>
              Balance: {userData.timeBalance} Menit Ruang ⏱️
            </p>
          </div>
        </motion.div>

        {/* Details Grid */}
        <div className={styles.detailsSection}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.infoGroup}
          >
            <label className={styles.label}>Email Address</label>
            <div className={styles.value}>{userData.email}</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.infoGroup}
          >
            <label className={styles.label}>Joined Since</label>
            <div className={styles.value}>{joinedDate}</div>
          </motion.div>
        </div>

        {/* Settings / Actions */}
        <div className={styles.actionSection}>
          <h2 className={styles.sectionTitle}>Account Settings</h2>
          <div className={styles.btnGroup}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              Logout 🏃‍♂️
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.deleteBtn}
            >
              Hapus Akun 🗑️
            </motion.button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
