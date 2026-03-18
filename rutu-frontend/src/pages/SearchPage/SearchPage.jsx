import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./SearchPage.module.css";
import CourseCard from "@/components/CourseCard/CourseCard";


// Assuming we might have some course card images later, but for now using colored placeholders
export default function SearchPage() {
  const courses = [
    { id: 1, title: "Frontend Basic", author: "Grace ashcroft", duration: "1 - 3h", rating: 5, color: "#38BDF8", date: "20 Mar 2026" },
    { id: 2, title: "Frontend Basic", author: "Grace ashcroft", duration: "1 - 3h", rating: 5, color: "#FB923C", date: "22 Mar 2026" },
    { id: 3, title: "Frontend Basic", author: "Grace ashcroft", duration: "1 - 3h", rating: 5, color: "#F472B6", date: "25 Mar 2026" },
    { id: 4, title: "UI/UX Design", author: "John Doe", duration: "2 - 4h", rating: 4, color: "#FB923C", date: "28 Mar 2026" },
    { id: 5, title: "React Advanced", author: "Jane Smith", duration: "5 - 8h", rating: 5, color: "#FACC15", date: "30 Mar 2026" },
    { id: 6, title: "Node JS", author: "Mike Ross", duration: "3 - 5h", rating: 3, color: "#38BDF8", date: "02 Apr 2026" },
    { id: 7, title: "Python Basics", author: "Harvey Specter", duration: "1 - 2h", rating: 5, color: "#38BDF8", date: "05 Apr 2026" },
    { id: 8, title: "CSS Mastery", author: "Donna Paulsen", duration: "2 - 3h", rating: 4, color: "#F472B6", date: "10 Apr 2026" },
    { id: 10, title: "Mobile Dev", author: "Louis Litt", duration: "4 - 6h", rating: 5, color: "#FB923C", date: "15 Apr 2026" },
  ];


  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <DashboardLayout title="Courses">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.date}>{currentDate}</p>
        </div>

        <div className={styles.searchBarRow}>
           <div className={styles.searchContainer}>
              <input type="text" placeholder="Search" className={styles.searchInput} />
           </div>
           <button className={styles.filterBtn}>
              <div className={styles.filterIcon}>
                 <span></span>
                 <span></span>
                 <span></span>
              </div>
           </button>
        </div>

        <div className={styles.courseGrid}>
          {courses.map((course, idx) => (
            <CourseCard key={course.id} course={course} index={idx} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

