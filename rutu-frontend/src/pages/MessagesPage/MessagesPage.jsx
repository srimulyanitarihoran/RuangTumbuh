import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./MessagesPage.module.css";
import { FiSearch, FiUsers, FiUser } from "react-icons/fi";
import { BsCheckAll } from "react-icons/bs";
import { Skeleton } from "@/components/Skeleton/Skeleton"; // [TAMBAHAN] Import Skeleton

// URL Backend API
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

export default function MessagesPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // --- STATE RIWAYAT CHAT ---
  const [historyRooms, setHistoryRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true); // [TAMBAHAN] State loading

  // --- STATE PENCARIAN PERSONAL ---
  const [personalSearchQuery, setPersonalSearchQuery] = useState("");
  const [personalSearchResults, setPersonalSearchResults] = useState([]);
  const [isSearchingPersonal, setIsSearchingPersonal] = useState(false);
  const [isPersonalLoading, setIsPersonalLoading] = useState(false); // [TAMBAHAN] State loading pencarian

  // --- STATE PENCARIAN GRUP ---
  const [groupSearchQuery, setGroupSearchQuery] = useState("");
  const [groupSearchResults, setGroupSearchResults] = useState([]);
  const [isSearchingGroups, setIsSearchingGroups] = useState(false);
  const [isGroupLoading, setIsGroupLoading] = useState(false); // [TAMBAHAN] State loading pencarian

  // 1. AMBIL RIWAYAT CHAT SAAT HALAMAN DIMUAT
  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoadingRooms(true);
      try {
        const res = await fetch(`${BASE_URL}/api/chats/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (result.success) setHistoryRooms(result.data);
      } catch (error) {
        console.error("Gagal memuat riwayat:", error);
      } finally {
        setIsLoadingRooms(false);
      }
    };
    if (token) fetchRooms();
  }, [token]);

  // 2. LOGIKA PENCARIAN PERSONAL (USER)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (personalSearchQuery.trim()) {
        setIsSearchingPersonal(true);
        setIsPersonalLoading(true);
        try {
          const res = await fetch(
            `${BASE_URL}/api/users/search?q=${personalSearchQuery}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const result = await res.json();
          if (result.success) setPersonalSearchResults(result.data);
        } catch (error) {
          console.error("Gagal mencari user:", error);
        } finally {
          setIsPersonalLoading(false);
        }
      } else {
        setIsSearchingPersonal(false);
        setPersonalSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [personalSearchQuery, token]);

  // 3. LOGIKA PENCARIAN GRUP (KOMUNITAS)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (groupSearchQuery.trim()) {
        setIsSearchingGroups(true);
        setIsGroupLoading(true);
        try {
          const res = await fetch(
            `${BASE_URL}/api/chats/search-groups?q=${groupSearchQuery}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const result = await res.json();
          if (result.success) setGroupSearchResults(result.data);
        } catch (error) {
          console.error("Gagal mencari grup:", error);
        } finally {
          setIsGroupLoading(false);
        }
      } else {
        setIsSearchingGroups(false);
        setGroupSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [groupSearchQuery, token]);

  // 4. FUNGSI MEMBUKA / MEMBUAT ROOM CHAT
  const handleOpenChat = async (targetId, isExistingRoom) => {
    if (isExistingRoom) {
      navigate(`/messages/${targetId}`);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/chats/private`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otherUserId: targetId }),
      });
      const result = await res.json();
      if (result.success) {
        navigate(`/messages/${result.data.id}`);
      }
    } catch (error) {
      console.error("Gagal membuat/membuka chat private:", error);
    }
  };

  // --- PEMETAAN DATA UNTUK TAMPILAN (KOLOM KIRI) ---
  const displayPersonal = isSearchingPersonal
    ? personalSearchResults.map((user) => ({
        id: user.id,
        isExisting: false,
        type: "personal",
        name: user.name,
        text: user.description || "Siswa RuangTumbuh",
        color: "#FACC15",
        emoji: user.name.charAt(0).toUpperCase(),
        unread: 0,
        time: "Baru",
      }))
    : historyRooms
        .filter(
          (room) => !room.isGroup && room.messages && room.messages.length > 0,
        )
        .map((room) => {
          const otherUser = room.participants.find(
            (p) => p.user.id !== currentUser.id,
          )?.user;
          return {
            id: room.id,
            isExisting: true,
            type: "personal",
            name: otherUser ? otherUser.name : "Unknown",
            text: room.messages[0].text,
            color: "#FB923C",
            emoji: otherUser ? otherUser.name.charAt(0).toUpperCase() : "👤",
            unread: 0,
            time: new Date(room.messages[0].createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

  // --- PEMETAAN DATA UNTUK TAMPILAN (KOLOM KANAN) ---
  const displayGroups = isSearchingGroups
    ? groupSearchResults.map((g) => ({
        id: g.id,
        isExisting: true,
        type: "group",
        name: g.name,
        text: "Klik untuk bergabung ke komunitas",
        color: "#38BDF8",
        emoji: "🚀",
        unread: 0,
        time: "Database",
      }))
    : historyRooms
        .filter(
          (room) => room.isGroup && room.messages && room.messages.length > 0,
        )
        .map((room) => ({
          id: room.id,
          isExisting: true,
          type: "group",
          name: room.name,
          text: room.messages[0].text,
          color: "#38BDF8",
          emoji: "👥",
          unread: 0,
          time: new Date(room.messages[0].createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4 } },
  };

  const MessageCard = ({ msg }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      className={`${styles.messageItem} ${msg.unread > 0 ? styles.unreadItem : ""}`}
      onClick={() => handleOpenChat(msg.id, msg.isExisting)}
    >
      <div className={styles.avatar} style={{ backgroundColor: msg.color }}>
        {msg.emoji}
        {msg.type === "personal" && <span className={styles.onlineDot}></span>}
      </div>

      <div className={styles.textGroup}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{msg.name}</span>
        </div>
        <p
          className={`${styles.text} ${msg.unread > 0 ? styles.textBold : ""}`}
        >
          {msg.text}
        </p>
      </div>

      <div className={styles.metaGroup}>
        <span
          className={`${styles.time} ${msg.unread > 0 ? styles.timeUnread : ""}`}
        >
          {msg.time}
        </span>
        {msg.unread > 0 ? (
          <div className={styles.unreadBadge}>{msg.unread}</div>
        ) : (
          <BsCheckAll className={styles.readIcon} />
        )}
      </div>
    </motion.div>
  );

  // [TAMBAHAN] Komponen Skeleton yang menyerupai MessageCard
  const MessageSkeleton = () => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      className={styles.messageItem}
      style={{ cursor: "default", backgroundColor: "#fff" }} // Hindari hover effect
    >
      <div
        className={styles.avatar}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <Skeleton variant="circle" width="48px" height="48px" />
      </div>

      <div className={styles.textGroup} style={{ gap: "6px" }}>
        <Skeleton width="120px" height="18px" />
        <Skeleton width="200px" height="14px" />
      </div>

      <div className={styles.metaGroup}>
        <Skeleton width="40px" height="14px" />
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout title="Pesan & Komunitas">
      <div className={styles.container}>
        {/* --- HERO BANNER --- */}
        <motion.div
          className={styles.searchBanner}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <div className={styles.bannerContent}>
            <h2>Buat Relasi Menjadi Aksi 🤝</h2>
            <p>
              Temukan teman belajar, mentor, dan komunitas yang akan mendukung
              perjalanan belajarmu. Ayo mulai ngobrol dan berkembang bersama!
            </p>
          </div>
          <div className={styles.mascotBox}>
            <div className={styles.floatingShape}>✦</div>
            <div className={styles.floatingShape2}>●</div>
          </div>
        </motion.div>

        <div className={styles.splitLayout}>
          {/* KOLOM KIRI: Chat Personal / Cari User */}
          <div className={styles.columnBox}>
            <div className={styles.columnHeader}>
              <div
                className={styles.headerIconWrap}
                style={{ backgroundColor: "var(--primary-yellow)" }}
              >
                <FiUser />
              </div>
              <h3>
                {isSearchingPersonal ? "Hasil Pencarian" : "Chat Personal"}
              </h3>
              <span className={styles.countBadge}>
                {isLoadingRooms || isPersonalLoading
                  ? "..."
                  : displayPersonal.length}
              </span>
            </div>

            <div
              className={styles.searchBarRow}
              style={{ marginBottom: "25px" }}
            >
              <div className={styles.searchContainer}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Cari siswa atau tutor..."
                  className={styles.searchInput}
                  value={personalSearchQuery}
                  onChange={(e) => setPersonalSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.messageList}>
              <AnimatePresence>
                {isLoadingRooms || isPersonalLoading ? (
                  // Tampilkan Skeleton jika sedang loading rooms atau sedang mencari user
                  Array.from({ length: 4 }).map((_, index) => (
                    <MessageSkeleton key={`personal-skeleton-${index}`} />
                  ))
                ) : displayPersonal.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>
                      {isSearchingPersonal
                        ? "User tidak ditemukan."
                        : "Kamu belum memiliki riwayat obrolan."}
                    </p>
                  </div>
                ) : (
                  displayPersonal.map((msg) => (
                    <MessageCard key={msg.id} msg={msg} />
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* KOLOM KANAN: Grup Komunitas / Cari Grup */}
          <div className={styles.columnBox}>
            <div className={styles.columnHeader}>
              <div
                className={styles.headerIconWrap}
                style={{ backgroundColor: "var(--primary-blue)" }}
              >
                <FiUsers />
              </div>
              <h3>
                {isSearchingGroups ? "Hasil Pencarian" : "Grup Komunitas"}
              </h3>
              <span className={styles.countBadge}>
                {isLoadingRooms || isGroupLoading
                  ? "..."
                  : displayGroups.length}
              </span>
            </div>

            <div
              className={styles.searchBarRow}
              style={{ marginBottom: "25px" }}
            >
              <div className={styles.searchContainer}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Cari grup komunitas..."
                  className={styles.searchInput}
                  value={groupSearchQuery}
                  onChange={(e) => setGroupSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.messageList}>
              <AnimatePresence>
                {isLoadingRooms || isGroupLoading ? (
                  // Tampilkan Skeleton jika sedang loading rooms atau sedang mencari grup
                  Array.from({ length: 4 }).map((_, index) => (
                    <MessageSkeleton key={`group-skeleton-${index}`} />
                  ))
                ) : displayGroups.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>
                      {isSearchingGroups
                        ? "Grup tidak ditemukan."
                        : "Belum bergabung ke grup manapun."}
                    </p>
                  </div>
                ) : (
                  displayGroups.map((msg) => (
                    <MessageCard key={msg.id} msg={msg} />
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
