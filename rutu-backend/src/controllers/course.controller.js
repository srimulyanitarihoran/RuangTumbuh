const prisma = require("../config/db");

const createCourse = async (req, res) => {
  try {
    const { name, tutorId, kategori, durasi, deskripsi, modules } = req.body;

    if (!name || name.length < 5 || name.length > 100) {
      return res
        .status(400)
        .json({ message: "Judul kursus harus antara 5 hingga 100 karakter." });
    }
    if (!kategori) {
      return res
        .status(400)
        .json({ message: "Kategori kursus wajib dipilih." });
    }
    if (!durasi || isNaN(durasi) || parseInt(durasi) <= 0) {
      return res
        .status(400)
        .json({
          message: "Durasi kursus harus berupa angka lebih dari 0 menit.",
        });
    }
    if (!deskripsi || deskripsi.length < 20 || deskripsi.length > 1000) {
      return res
        .status(400)
        .json({
          message: "Deskripsi kursus harus antara 20 hingga 1000 karakter.",
        });
    }

    // Validasi Array Modul
    if (!modules || !Array.isArray(modules) || modules.length === 0) {
      return res
        .status(400)
        .json({ message: "Kursus harus memiliki minimal 1 modul materi." });
    }
    if (modules.length > 20) {
      return res
        .status(400)
        .json({
          message: "Maksimal hanya diperbolehkan membuat 20 modul per kursus.",
        });
    }

    // Validasi isi masing-masing modul
    for (let i = 0; i < modules.length; i++) {
      const m = modules[i];
      if (!m.title || m.title.trim() === "") {
        return res
          .status(400)
          .json({
            message: `Judul materi pada modul ke-${i + 1} tidak boleh kosong.`,
          });
      }
      if (!m.duration || isNaN(m.duration) || parseInt(m.duration) <= 0) {
        return res
          .status(400)
          .json({
            message: `Durasi materi pada modul ke-${i + 1} harus lebih dari 0 menit.`,
          });
      }
    }

    const user = await prisma.user.findUnique({ where: { id: tutorId } });
    if (!user)
      return res.status(404).json({ message: "Tutor tidak ditemukan!" });

    const newCourse = await prisma.course.create({
      data: {
        name,
        tutor: user.name,
        tutorId,
        kategori,
        durasi: String(durasi),
        deskripsi,
        modules: modules || [],
      },
    });
    res
      .status(201)
      .json({ message: "Kursus berhasil ditambahkan!", course: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const { tutorId } = req.query;
    let where = tutorId ? { tutorId } : {};
    const courses = await prisma.course.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
    });
    if (!course)
      return res.status(404).json({ message: "Kursus tidak ditemukan!" });
    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, kategori, durasi, deskripsi, modules } = req.body;
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        name,
        kategori,
        durasi: String(durasi),
        deskripsi,
        modules: modules || [],
      },
    });
    res
      .status(200)
      .json({ message: "Kursus berhasil diperbarui!", course: updatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await prisma.course.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(200)
      .json({ message: "Kursus berhasil dihapus!", course: deletedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
