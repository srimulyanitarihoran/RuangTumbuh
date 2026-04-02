const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

// Re-using initialization pattern from index.js
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET: profile user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      // Jika butuh relasi (skillsOffered, dll), bisa di-include di sini
    });

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    }

    // Hapus password dari object response agar aman
    const { password, ...userProfile } = user;

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error);
    res.status(500).json({
      message: "Terjadi kesalahan server saat mengambil profil",
      error: error.message,
    });
  }
});

module.exports = router;