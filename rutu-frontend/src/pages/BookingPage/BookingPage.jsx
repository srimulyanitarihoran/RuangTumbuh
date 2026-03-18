import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import CourseCard from "@/components/CourseCard/CourseCard";
import styles from "./BookingPage.module.css";

const bookingClasses = [
  { id: 1, title: "Frontend Basic", author: "Grace ashcroft", duration: "1 - 3h", rating: 5, color: "#38BDF8" },
  { id: 2, title: "Frontend Basic", author: "Grace ashcroft", duration: "1 - 3h", rating: 5, color: "#FB923C" },
  { id: 3, title: "Frontend Basic", author: "Grace ashcroft", duration: "1 - 3h", rating: 5, color: "#F472B6" },
  { id: 4, title: "Frontend Basic", author: "Grace ashcroft", duration: "1 - 3h", rating: 5, color: "#38BDF8" },
  { id: 5, title: "Frontend Basic", author: "Grace ashcroft", duration: "1 - 3h", rating: 5, color: "#FB923C" },
  { id: 6, title: "Frontend Basic", author: "Grace ashcroft", duration: "1 - 3h", rating: 5, color: "#F472B6" },
];

export default function BookingPage() {
  return (
    <DashboardLayout title="Booking">
      <div className={styles.container}>
        {/* Status Tracker Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={styles.statusCard}
        >
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Your Booking</h2>
          </div>
          
          <div className={styles.trackerContainer}>
            <div className={styles.step}>
              <div className={`${styles.iconCircle} ${styles.submit}`}>😌</div>
              <span className={styles.stepLabel}>Submit</span>
            </div>
            
            <div className={`${styles.line} ${styles.lineGreen}`}></div>
            
            <div className={styles.step}>
              <div className={`${styles.iconCircle} ${styles.onView}`}>👀</div>
              <span className={styles.stepLabel}>On View</span>
            </div>
            
            <div className={`${styles.line} ${styles.lineRed}`}></div>
            
            <div className={styles.step}>
              <div className={`${styles.iconCircle} ${styles.reject}`}>😡</div>
              <span className={styles.stepLabel}>Reject</span>
            </div>
          </div>
          
          <div className={styles.cardFooter}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.backBtn}
            >
              Back
            </motion.button>
          </div>
        </motion.div>

        {/* Classes Grid */}
        <div className={styles.courseGrid}>
          {bookingClasses.map((course, idx) => (
            <CourseCard key={course.id} course={course} index={idx} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
