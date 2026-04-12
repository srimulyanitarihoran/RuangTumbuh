import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

export const useCourseBooking = (id, currentUser) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateUserData } = useAuth();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    note: "",
  });

  const [popup, setPopup] = useState({
    isOpen: false,
    type: "success",
    title: "",
    description: "",
  });

  // Fetch data kursus
  const {
    data: rawCourse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await api.get(`/courses/${id}`);
      return response.data !== undefined ? response.data : response;
    },
    enabled: !!id,
  });

  const course = rawCourse;

  const bookingMutation = useMutation({
    mutationFn: async (scheduledAt) => {
      return await api.post("/bookings", {
        courseId: parseInt(id),
        studentId: currentUser.id,
        studentName: currentUser.name,
        scheduledAt,
        note: formData.note,
        duration: course.durasi,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBookings", currentUser?.id]);

      const requiredMinutes = course?.durasi ? parseInt(course.durasi) : 0;
      const currentBalance = currentUser?.timeBalance
        ? parseInt(currentUser.timeBalance)
        : 0;
      updateUserData({ timeBalance: currentBalance - requiredMinutes });

      setPopup({
        isOpen: true,
        type: "success",
        title: "Booking Berhasil!",
        description:
          "Permintaan booking berhasil diajukan dan Saldo Waktu kamu telah dipotong.",
      });
      setTimeout(() => navigate("/mycourses"), 2500);
    },
    onError: (error) => {
      setPopup({
        isOpen: true,
        type: "error",
        title: "Booking Gagal",
        description:
          error.response?.data?.message ||
          "Terjadi kesalahan saat memproses booking.",
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      setPopup({
        isOpen: true,
        type: "error",
        title: "Data Tidak Lengkap",
        description: "Harap pilih tanggal dan waktu sesi kursus kamu!",
      });
      return;
    }

    // --- VALIDASI SALDO WAKTU ---
    const requiredMinutes = course?.durasi ? parseInt(course.durasi) : 0;
    const currentBalance = currentUser?.timeBalance
      ? parseInt(currentUser.timeBalance)
      : 0;

    if (currentBalance < requiredMinutes) {
      // Tampilkan popup jika saldo kurang
      setPopup({
        isOpen: true,
        type: "error", // Gunakan tipe error agar muncul ikon peringatan
        title: "Saldo Waktu Tidak Cukup",
        description: `Sesi ini membutuhkan ${requiredMinutes} menit, tapi saldo kamu hanya ${currentBalance} menit. Yuk kumpulkan waktu dengan menjadi tutor!`,
      });
      return; // Hentikan proses booking
    }

    const scheduledAt = new Date(
      `${formData.date}T${formData.time}`,
    ).toISOString();
    bookingMutation.mutate(scheduledAt);
  };

  return {
    course,
    isLoading,
    isError,
    formData,
    popup,
    bookingMutation,
    setPopup,
    handleInputChange,
    handleBooking,
  };
};
