# 🌟 RuangTumbuh (TimeBank System) 🌟

[![CI/CD Pipeline](https://github.com/adyvka31/ruangtumbuh/actions/workflows/main.yaml/badge.svg)](https://github.com/adyvka31/ruangtumbuh/actions)
[![Frontend Deploy](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](#)
[![Backend Deploy](https://img.shields.io/badge/Railway-Deployed-success?logo=railway)](#)

RuangTumbuh adalah aplikasi web *Full-Stack* berbasis *monorepo* yang memfasilitasi siswa untuk mencari, memesan (*booking*), dan mengelola jadwal kursus dengan tutor secara efisien. Proyek ini dibangun menggunakan arsitektur *workspace* (`pnpm`) untuk memisahkan *frontend*, *backend*, dan *shared library*, serta dilengkapi dengan kecerdasan buatan dan fitur *real-time*.

---

## 🚀 Live Demo & Panduan Pengguna

Untuk pengujian dan *review*, silakan akses tautan berikut:

- **🌍 Aplikasi Frontend (Live)**: [https://ruang-tumbuh.vercel.app/](https://ruang-tumbuh.vercel.app/)
- **⚙️ RESTful API Backend**: [https://ruangtumbuh-production.up.railway.app/](https://ruangtumbuh-production.up.railway.app/)
- **📖 Panduan Penggunaan (User Guide)**: [Google Drive - Panduan User](https://drive.google.com/drive/folders/1UoOZBxEGZPellOZMP9FGa5bEmSK3l_DZ?usp=sharing)

---

## ✨ Keunggulan Utama

> Kami percaya bahwa 1 jam belajar desain grafis memiliki nilai yang setara dengan 1 jam belajar fisika. Semua ilmu itu berharga!

- ⏳ **Time Wallet System**: Sistem "Dompet Waktu" yang transparan untuk mencatat saldo jam belajar.
- 💻 **Sistem Booking & Penjadwalan:** Pemesanan kursus dan manajemen kalender yang dinamis.
- 🗓️ **Integrated Calendar**: Sistem booking sesi belajar yang terintegrasi langsung dengan kalender aplikasi.
- 💬 **Real-time Messaging:** Fitur obrolan langsung antar siswa dan tutor menggunakan *Socket.io*.
- 🤝 **Manajemen Komunitas & Kehadiran:** Sistem pelacakan presensi dan interaksi komunitas pembelajaran.
- 🛡️ **Session Validation:** Keamanan terjamin dengan sistem upload bukti belajar sebelum saldo waktu ditransfer.
- 🤖 **AI Chatbot Assistant:** Integrasi cerdas menggunakan **Google Generative AI (Gemini)** untuk membantu menjawab pertanyaan pengguna secara otomatis.

---

## 🛠️ Teknologi & Arsitektur

**Arsitektur Monorepo:** Dikendalikan menggunakan `pnpm workspaces`.

- **Frontend (Client):** React.js 1, Vite, React Router DOM, React-Bootstrap, Framer Motion (Animasi), Zustand/Hooks, Axios.
- **Backend (API Server):** Node.js, Express.js, Prisma ORM, PostgreSQL, Socket.io, Google Generative AI (@google/generative-ai), JWT, Winston (Logging).
- **DevOps & Tooling:** Docker & Docker Compose, GitHub Actions (CI/CD), Husky (Pre-commit hooks), ESLint.
- **Testing:** Vitest & React Testing Library (Frontend), Jest & Supertest (Backend).

---

## 👥 Tim Kreator (CC26-PS050)

RuangTumbuh dikembangkan dengan ❤️ oleh tim **Full Stack** berbakat:

| Nama                          | Peran & Spesialisasi                                                       |
| :---------------------------- | :------------------------------------------------------------------------- |
| **Rafif Sava Adyvka Pratama** | **Project Manager & Full Stack Lead** (Server Architect & Time Wallet Logic) |
| **Faiz Faishal Nugroho**      | **Full Stack Developer** (Interactive UI & User-Centered Design)              |
| **Sri Mulyani Tarihoran**     | **Backend Developer** (React Architecture & State Management)                 |
| **Pelangi Pagi**              | **UI/UX Designer & Frontend Developer** (Figma Designer & Component Slicing)                |
| **Emiliana Olivia Carlene**   | **Frontend & Logic Developer** (Notification System & Flow Validation)             |

---

## 📅 Roadmap Project (2026)

| Estimasi Waktu      | Aktivitas                                           |
| :------------------ | :-------------------------------------------------- |
| **09 - 15 Mar**     | Planning - Perancangan arsitektur sistem            |
| **16 - 22 Mar**     | Development — Implementasi ui/ux & frontend         |
| **23 - 29 Mar**     | Development — Implementasi backend & database       |
| **30 Mar - 05 Apr** | Testing — Bug fixing, dan user acceptance testing   |
| **05 - 11 Apr**     | Deployment — Launching, monitoring, dan finishing   |

---

## 🚀 Cara Menjalankan Project Lokal

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/ruang-tumbuh.git
   ```
2. **Install Dependencies**
   ```bash
   pnpm install
   ```
3. **Run Dev Server**
   ```bash
   pnpm run dev
   ```

---

<div align="center">
  <p><b>© 2026 RuangTumbuh. All Rights Reserved.</b></p>
</div>
