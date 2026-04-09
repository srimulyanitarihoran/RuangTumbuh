import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAddCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    duration: "",
    description: "",
    tutorId: "",
  });

  const [modules, setModules] = useState([
    { id: Date.now(), title: "", duration: "" },
  ]);

  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({
    isOpen: false,
    type: "success",
    title: "",
    description: "",
  });

  const [isPending, setIsPending] = useState(false);
  const mutation = { isPending };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      setFormData((prev) => ({ ...prev, tutorId: user.id }));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addModule = () => {
    setModules((prev) => [
      ...prev,
      { id: Date.now(), title: "", duration: "" },
    ]);
  };

  const removeModule = (id) => {
    // Opsional: Cegah user menghapus modul jika hanya tersisa 1
    if (modules.length === 1) {
      setError("Kursus harus memiliki minimal 1 modul!");
      setTimeout(() => setError(null), 3000);
      return;
    }
    setModules((prev) => prev.filter((m) => m.id !== id));
  };

  const updateModule = (id, field, value) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  };

  const handleGoBack = () => {
    navigate("/mycourses");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.duration) {
      setError("Judul dan Durasi kursus wajib diisi!");
      return;
    }

    // Validasi modul tidak boleh kosong
    const isModulesValid = modules.every(
      (m) => m.title.trim() !== "" && m.duration !== "",
    );
    if (!isModulesValid) {
      setError("Pastikan semua judul dan durasi modul sudah terisi!");
      return;
    }

    setError(null);
    setIsPending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Data yang dikirim:", { ...formData, modules });

      setPopup({
        isOpen: true,
        type: "success",
        title: "Berhasil!",
        description: "Kursus baru berhasil ditambahkan.",
      });
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setError("Terjadi kesalahan saat menyimpan kursus.");
    } finally {
      setIsPending(false);
    }
  };

  return {
    formData,
    modules,
    error,
    popup,
    mutation,
    setPopup,
    handleInputChange,
    addModule,
    removeModule,
    updateModule,
    handleSubmit,
    handleGoBack,
  };
};
