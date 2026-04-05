const express = require("express");
const router = express.Router();
const prisma = require("./prismaClient");

// POST: Buat booking baru (Siswa booking kursus)
router.post("/", async (req, res) => {
    try {
        const { courseId, studentId, studentName, scheduledAt, note } = req.body;

        if (!courseId || !studentId || !studentName || !scheduledAt) {
            return res.status(400).json({ message: "courseId, studentId, studentName, dan scheduledAt wajib diisi!" });
        }

        // Cek apakah kursus ada
        const course = await prisma.course.findUnique({
            where: { id: parseInt(courseId) },
        });
        if (!course) {
            return res.status(404).json({ message: "Kursus tidak ditemukan!" });
        }

        // Cegah booking kursus sendiri
        if (course.tutorId === studentId) {
            return res.status(400).json({ message: "Kamu tidak bisa booking kursus yang kamu buat sendiri!" });
        }

        // Cek apakah sudah pernah booking kursus ini dengan status PENDING/ACCEPTED
        const existingBooking = await prisma.courseBooking.findFirst({
            where: {
                courseId: parseInt(courseId),
                studentId,
                status: { in: ["PENDING", "ACCEPTED"] },
            },
        });
        if (existingBooking) {
            return res.status(400).json({ message: "Kamu sudah mempunyai booking aktif untuk kursus ini!" });
        }

        const newBooking = await prisma.courseBooking.create({
            data: {
                courseId: parseInt(courseId),
                studentId,
                studentName,
                scheduledAt: new Date(scheduledAt),
                note: note || null,
            },
        });

        res.status(201).json({
            message: "Booking berhasil diajukan!",
            booking: newBooking,
        });
    } catch (error) {
        console.error("❌ Create Booking Error:", error);
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
});

// GET: Ambil semua booking milik siswa (untuk tab "Pengajuan Saya")
router.get("/my-bookings", async (req, res) => {
    try {
        const { studentId } = req.query;
        if (!studentId) return res.status(400).json({ message: "studentId wajib diisi!" });

        const bookings = await prisma.courseBooking.findMany({
            where: { studentId },
            include: {
                course: {
                    select: { id: true, name: true, tutor: true, tutorId: true, kategori: true, durasi: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json(bookings);
    } catch (error) {
        console.error("❌ Get My Bookings Error:", error);
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
});

// GET: Ambil semua booking masuk ke kursus yang dimiliki tutor (untuk tab "Permintaan Masuk")
router.get("/incoming", async (req, res) => {
    try {
        const { tutorId } = req.query;
        if (!tutorId) return res.status(400).json({ message: "tutorId wajib diisi!" });

        // Cari semua courseId yang dimiliki tutor
        const tutorCourses = await prisma.course.findMany({
            where: { tutorId },
            select: { id: true },
        });

        const courseIds = tutorCourses.map((c) => c.id);

        if (courseIds.length === 0) return res.status(200).json([]);

        const bookings = await prisma.courseBooking.findMany({
            where: { courseId: { in: courseIds } },
            include: {
                course: {
                    select: { id: true, name: true, kategori: true, durasi: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json(bookings);
    } catch (error) {
        console.error("❌ Get Incoming Bookings Error:", error);
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
});

// PATCH: Update status booking (Terima / Tolak) oleh tutor
router.patch("/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, tutorId } = req.body;

        if (!["ACCEPTED", "REJECTED"].includes(status)) {
            return res.status(400).json({ message: "Status hanya boleh ACCEPTED atau REJECTED!" });
        }

        // Ambil booking + kursus untuk validasi kepemilikan
        const booking = await prisma.courseBooking.findUnique({
            where: { id },
            include: { course: { select: { tutorId: true } } },
        });

        if (!booking) return res.status(404).json({ message: "Booking tidak ditemukan!" });
        if (booking.course.tutorId !== tutorId) {
            return res.status(403).json({ message: "Kamu tidak berhak mengubah status booking ini!" });
        }

        const updated = await prisma.courseBooking.update({
            where: { id },
            data: { status },
        });

        res.status(200).json({ message: `Booking berhasil di${status === "ACCEPTED" ? "terima" : "tolak"}!`, booking: updated });
    } catch (error) {
        console.error("❌ Update Booking Status Error:", error);
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
});

module.exports = router;
