import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ChatbotPanel.module.css";

// Animasi Staggered mirip React Bits (Swipe dari kanan)
const panelVariants = {
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.6,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  closed: {
    clipPath: "inset(0% 0% 0% 100%)", // Menutup ke arah kanan
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.4,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: {
    opacity: 0,
    x: 40, // Mundur ke kanan
    filter: "blur(10px)",
    transition: { duration: 0.2 },
  },
};

export default function ChatbotPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! Ada yang bisa RuangTumbuh bantu hari ini? Tanya apa saja seputar kelas, komunitas, atau fitur kami!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "user" },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Pertanyaan yang menarik! Saat ini otak AI RuangTumbuh masih dalam tahap pembelajaran. Nantikan update fitur kecerdasan kami segera! 🚀",
          sender: "bot",
        },
      ]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY GELAP */}


          <motion.div
            className={styles.chatbotContainer}
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants}
          >
            {/* Header Kembali ke Desain Asli yang Rapi */}
            <motion.div className={styles.header} variants={itemVariants}>
              <div className={styles.headerTitle}>
                <span className={styles.botIcon}>🤖</span>
                <h3>RuangTumbuh Bot</h3>
              </div>
              <button onClick={onClose} className={styles.closeBtn}>
                ×
              </button>
            </motion.div>

            {/* Area Percakapan */}
            <motion.div
              className={styles.chatBody}
              ref={chatBodyRef}
              variants={itemVariants}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`${styles.bubble} ${msg.sender === "user" ? styles.userBubble : styles.botBubble}`}
                  variants={itemVariants}
                >
                  {msg.text}
                </motion.div>
              ))}
            </motion.div>

            {/* Area Input */}
            <motion.form
              onSubmit={handleSend}
              className={styles.inputArea}
              variants={itemVariants}
            >
              <input
                type="text"
                placeholder="Tanya sesuatu..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.inputField}
              />
              <button type="submit" className={styles.sendBtn}>
                ➔
              </button>
            </motion.form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
