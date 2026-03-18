import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  const user = {
    name: "Alyssa Jane",
    email: "alyssa.jane@example.com",
    role: "Learning Explorer",
    joined: "March 2026",
    avatar: "AJ"
  };

  return (
    <DashboardLayout title="My Profile">
      <div className={styles.profileContainer}>
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.profileHeader}
        >
          <div className={styles.avatarLarge}>{user.avatar}</div>
          <div className={styles.headerInfo}>
            <h1 className={styles.userName}>{user.name}</h1>
            <p className={styles.userRole}>{user.role}</p>
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
            <div className={styles.value}>{user.email}</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.infoGroup}
          >
            <label className={styles.label}>Joined Since</label>
            <div className={styles.value}>{user.joined}</div>
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
              onClick={() => navigate("/login")}
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
