import React from "react";
import styles from "./Footer.module.css";
// Kita import text-logo.svg untuk menggantikan font biasa
import textLogo from "@assets/text-logo.svg";

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerCard}>
        <div className={styles.topSection}>
          <div className={styles.topLeft}>
            <div className={styles.brand}>
              <img
                src={textLogo}
                alt="Ruang Tumbuh Logo"
                className={styles.textLogo}
              />
            </div>

            <div className={styles.navLinks}>
              <a href="#beranda">Home</a>
              <a href="#kalender">Calendar</a>
              <a href="#alur">Session</a>
              <a href="#komunitas">Community</a>
              <a href="#bantuan">Help</a>
            </div>
          </div>

          <div className={styles.topRight}>
            <span className={styles.newsletterTitle}>Stay up to date</span>
            <form
              className={styles.subscribeForm}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.subscribeBtn}>
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* ==========================================
            GARIS PEMISAH
            ========================================== */}
        <div className={styles.divider}></div>

        {/* ==========================================
            BAGIAN BAWAH (Copyright & Legal)
            ========================================== */}
        <div className={styles.bottomSection}>
          <span className={styles.copyright}>
            © 2026 RuangTumbuh. All rights reserved.
          </span>
          <div className={styles.legalLinks}>
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
