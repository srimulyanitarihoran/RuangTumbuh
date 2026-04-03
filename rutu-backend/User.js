const express = require("express");
const router = express.Router();
const prisma = require("./prismaClient");

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
