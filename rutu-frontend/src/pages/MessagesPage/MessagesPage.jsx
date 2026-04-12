import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import styles from "./MessagesPage.module.css";
import { FiSearch, FiUsers, FiUser } from "react-icons/fi";
import { BsCheckAll } from "react-icons/bs";
import { Skeleton } from "@/components/Skeleton/Skeleton";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

// --- KOMPONEN CARD (MEMOIZED) ---
const MessageCard = React.memo(({ msg, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
    className={`${styles.messageItem} ${msg.unread > 0 ? styles.unreadItem : ""}`}
    onClick={() => onClick(msg.id, msg.isExisting)}
  >
    <div className={styles.avatar} style={{ backgroundColor: msg.color }}>
      {msg.emoji}
      {msg.type === "personal" && <span className={styles.onlineDot}></span>}
    </div>

    <div className={styles.textGroup}>
      <div className={styles.nameRow}>
        <span className={styles.name}>{msg.name}</span>
      </div>
      <p className={`${styles.text} ${msg.unread > 0 ? styles.textBold : ""}`}>
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
));

// --- KOMPONEN SKELETON ---
const MessageSkeleton = () => (
  <div
    className={styles.messageItem}
    style={{ cursor: "default", backgroundColor: "#fff" }}
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
  </div>
);

// --- KOMPONEN LIST (ISOLASI RE-RENDER) ---
const MessageList = React.memo(
  ({ items, isLoading, emptyText, type, onCardClick }) => {
    return (
      <div className={styles.messageList}>
        <AnimatePresence mode="popLayout" initial={false}>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <MessageSkeleton key={`${type}-skeleton-${index}`} />
            ))
          ) : items.length === 0 ? (
            <motion.div
              key={`${type}-empty`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.emptyState}
            >
              <p>{emptyText}</p>
            </motion.div>
          ) : (
            items.map((msg) => (
              <MessageCard
                key={`${type}-${msg.id}`}
                msg={msg}
                onClick={onCardClick}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    );
  },
);

export default function MessagesPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [historyRooms, setHistoryRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);

  const [personalSearchQuery, setPersonalSearchQuery] = useState("");
  const [personalSearchResults, setPersonalSearchResults] = useState([]);
  const [isPersonalLoading, setIsPersonalLoading] = useState(false);

  const [groupSearchQuery, setGroupSearchQuery] = useState("");
  const [groupSearchResults, setGroupSearchResults] = useState([]);
  const [isGroupLoading, setIsGroupLoading] = useState(false);

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

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (personalSearchQuery.trim()) {
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
        setPersonalSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [personalSearchQuery, token]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (groupSearchQuery.trim()) {
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
        setGroupSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [groupSearchQuery, token]);

  const handleOpenChat = useCallback(
    async (targetId, isExistingRoom) => {
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
        if (result.success) navigate(`/messages/${result.data.id}`);
      } catch (error) {
        console.error("Gagal membuat/membuka chat:", error);
      }
    },
    [navigate, token],
  );

  const displayPersonal = personalSearchQuery.trim()
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
        .filter((room) => !room.isGroup && room.messages?.length > 0)
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

  const displayGroups = groupSearchQuery.trim()
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
        .filter((room) => room.isGroup && room.messages?.length > 0)
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

  return (
    <DashboardLayout title="Pesan & Komunitas">
      <div className={styles.container}>
        <motion.div
          className={styles.searchBanner}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className={styles.bannerContent}>
            <h2>Buat Relasi Menjadi Aksi 🤝</h2>
            <p>
              Temukan teman belajar, mentor, dan komunitas yang akan mendukung
              perjalanan belajarmu.
            </p>
          </div>
        </motion.div>

        <div className={styles.splitLayout}>
          <div className={styles.columnBox}>
            <div className={styles.columnHeader}>
              <div
                className={styles.headerIconWrap}
                style={{ backgroundColor: "var(--primary-yellow)" }}
              >
                <FiUser />
              </div>
              <h3>
                {personalSearchQuery ? "Hasil Pencarian" : "Chat Personal"}
              </h3>
              <span className={styles.countBadge}>
                {isLoadingRooms || isPersonalLoading
                  ? "..."
                  : displayPersonal.length}
              </span>
            </div>
            <div className={styles.searchBarRow}>
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
            <MessageList
              type="personal"
              items={displayPersonal}
              isLoading={isLoadingRooms || isPersonalLoading}
              onCardClick={handleOpenChat}
              emptyText={
                personalSearchQuery
                  ? "User tidak ditemukan."
                  : "Kamu belum memiliki riwayat obrolan."
              }
            />
          </div>

          <div className={styles.columnBox}>
            <div className={styles.columnHeader}>
              <div
                className={styles.headerIconWrap}
                style={{ backgroundColor: "var(--primary-blue)" }}
              >
                <FiUsers />
              </div>
              <h3>{groupSearchQuery ? "Hasil Pencarian" : "Grup Komunitas"}</h3>
              <span className={styles.countBadge}>
                {isLoadingRooms || isGroupLoading
                  ? "..."
                  : displayGroups.length}
              </span>
            </div>
            <div className={styles.searchBarRow}>
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
            <MessageList
              type="group"
              items={displayGroups}
              isLoading={isLoadingRooms || isGroupLoading}
              onCardClick={handleOpenChat}
              emptyText={
                groupSearchQuery
                  ? "Grup tidak ditemukan."
                  : "Belum bergabung ke grup manapun."
              }
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
