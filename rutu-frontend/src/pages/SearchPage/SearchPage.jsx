import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./SearchPage.module.css";
import CourseCard from "@/components/CourseCard/CourseCard";
import { FiSearch, FiSliders } from "react-icons/fi";

const categories = [
  "Semua",
  "Frontend",
  "Backend",
  "UI/UX Design",
  "Mobile Dev",
  "Data Science",
  "Matematika",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Fisika"
];

// Helper untuk memberikan warna, emoji, dan gambar acak/berdasarkan kategori agar tampilan tetap premium
const getCourseExtras = (category) => {
  const mapping = {
    "Frontend": {
      color: "#38BDF8",
      emoji: "👩‍💻",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600"
    },
    "Backend": {
      color: "#F472B6",
      emoji: "⚙️",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=600"
    },
    "UI/UX Design": {
      color: "#FACC15",
      emoji: "🎨",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&q=80&w=600"
    },
    "Mobile Dev": {
      color: "#10B981",
      emoji: "📱",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"
    },
    "Data Science": {
      color: "#A78BFA",
      emoji: "📊",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=600"
    },
    "Matematika": {
      color: "#FB923C",
      emoji: "📐",
      image: "https://images.unsplash.com/photo-1509228468518-180dd482270b?auto=format&fit=crop&q=80&w=600"
    },
    "Bahasa Inggris": {
      color: "#6366F1",
      emoji: "🇬🇧",
      image: "https://images.unsplash.com/photo-1543165796-5426273eaab3?auto=format&fit=crop&q=80&w=600"
    },
    "Bahasa Indonesia": {
      color: "#EF4444",
      emoji: "🇮🇩",
      image: "https://images.unsplash.com/photo-1518173946687-a4c8a9b746f4?auto=format&fit=crop&q=80&w=600"
    },
    "Fisika": {
      color: "#14B8A6",
      emoji: "⚛️",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=600"
    },
  };
  return mapping[category] || {
    color: "#94A3B8",
    emoji: "📚",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600"
  };
};

export default function SearchPage() {
  const [allCourses, setAllCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/course");
        const data = await response.json();

        // Map backend fields to frontend expected fields
        const formattedData = data.map(item => {
          const extras = getCourseExtras(item.kategori);
          return {
            id: item.id,
            title: item.name,
            author: item.tutor,
            category: item.kategori,
            duration: item.durasi,
            description: item.deskripsi,
            date: new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
            rating: 5, // Default rating as DB doesn't have it
            ...extras
          };
        });

        setAllCourses(formattedData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = allCourses.filter((course) => {
    const matchCategory =
      activeCategory === "Semua" || course.category === activeCategory;
    const matchSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <DashboardLayout title="Materi & Kursus">
      <div className={styles.container}>
        {/* --- HERO BANNER --- */}
        <motion.div
          className={styles.searchBanner}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <div className={styles.bannerContent}>
            <h2>Eksplorasi Skill Baru 🚀</h2>
            <p>
              Temukan ratusan materi, kursus, dan sesi mentoring yang siap
              membantu karirmu.
            </p>
          </div>
          <div className={styles.mascotBox}>
            <div className={styles.floatingShape}>✦</div>
            <div className={styles.floatingShape2}>●</div>
          </div>
        </motion.div>

        {/* --- SEARCH BAR & FILTER SECTION --- */}
        <div className={styles.searchControlArea}>
          <div className={styles.searchBarRow}>
            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Cari kursus, topik, atau mentor..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className={styles.filterBtn}>
              <FiSliders size={24} />
            </button>
          </div>

          {/* Baris Kategori */}
          <div className={styles.categoriesWrapper}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryPill} ${activeCategory === cat ? styles.pillActive : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- KURSUS GRID --- */}
        {loading ? (
          <div className={styles.loadingWrapper}>
            <p>Memuat kursus...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <motion.div
            className={styles.courseGrid}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {filteredCourses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  layout
                  variants={itemVariants}
                  exit="exit"
                >
                  <CourseCard course={course} index={idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>Oops! 🙈</h3>
            <p>
              Kursus dengan kata kunci <strong>"{searchQuery}"</strong> tidak
              ditemukan.
            </p>
            <button
              className={styles.resetBtn}
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua");
              }}
            >
              Reset Pencarian
            </button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
