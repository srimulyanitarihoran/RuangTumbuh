import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"; // Sesuaikan path jika berbeda

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // 1. Tambahkan state untuk mendeteksi apakah menu mobile sedang terbuka
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 2. Buat fungsi untuk membalik (toggle) state isMenuOpen
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fungsi tambahan: Tutup menu otomatis jika link diklik
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`${styles.headerContainer} ${isScrolled ? styles.scrolled : ""}`}
    >
      <nav className={styles.navbar}>
        {/* Hamburger Button (hanya muncul di mobile) */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ""}`}
          ></span>
        </button>

        {/* --- DESKTOP MENU --- */}
        <div className={styles.left}>
          <Link to="/">HOME</Link>
          <Link to="/">LEARN</Link>
          <Link to="/">CALENDAR</Link>
          <Link to="/">SESSION</Link>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.right}>
          <Link to="/login">SIGN IN</Link>
          <Link to="/register"className={styles.button}>GET STARTED</Link>
        </div>

        <div
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        >
          <Link to="/" onClick={closeMenu}>
            HOME
          </Link>
          <Link to="/" onClick={closeMenu}>
            Learn
          </Link>
          <Link to="/" onClick={closeMenu}>
            CALENDAR
          </Link>
          <Link to="/" onClick={closeMenu}>
            SESSION
          </Link>

          <div className={styles.mobileMenuDivider}></div>

          <Link to="/login" onClick={closeMenu}>
            SIGN IN
          </Link>
          <Link to="/register" className={styles.button} onClick={closeMenu}>
            GET STARTED
          </Link>
        </div>
      </nav>

      <div className={`${styles.dashboard}`}>
        <img src={logo} alt="Logo RuangTumbuh" />
      </div>
    </div>
  );
}
