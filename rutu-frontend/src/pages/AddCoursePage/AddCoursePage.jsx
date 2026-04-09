import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { Popup } from "@/components/Popup/Popup";
import { Input } from "@/components/Input/Input";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiSave,
  FiCheckCircle,
  FiBookOpen,
  FiLayers,
  FiUploadCloud,
  FiArrowLeft,
} from "react-icons/fi";
import styles from "./AddCoursePage.module.css";
import { useAddCourse } from "@/hooks/useAddCourse";

export default function AddCoursePage() {
  const {
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
  } = useAddCourse();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4 } },
    exit: { opacity: 0, scale: 0.9, height: 0, padding: 0, overflow: "hidden" },
  };

  return (
    <DashboardLayout title="Tambah Kursus Baru">
      <div className={styles.container}>
        {/* --- HEADER CONTAINER --- */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Buat Kursus Baru</h1>
          <button
            type="button"
            className={styles.backBtn}
            onClick={handleGoBack}
          >
            <FiArrowLeft /> Kembali
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* NOTIFIKASI ERROR */}
          {error && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={styles.errorMessage}
            >
              {error}
            </motion.div>
          )}

          {/* --- SPLIT LAYOUT (KIRI & KANAN) --- */}
          <div className={styles.splitLayout}>
            {/* KOLOM KIRI: Informasi Dasar & Upload */}
            <div className={styles.mainCard}>
              <div className={styles.cardHeader}>
                <div
                  className={styles.headerIconWrap}
                  style={{ backgroundColor: "#FACC15" }}
                >
                  <FiBookOpen />
                </div>
                <h3>Informasi Dasar</h3>
              </div>

              <div className={styles.inputGroup}>
                <Input
                  label="Judul Kursus"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.rowGroup}>
                <div className={styles.inputGroup}>
                  <Input
                    label="Kategori"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <Input
                    label="Durasi (Menit)"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* PERUBAHAN: Menggunakan Input dengan properti isTextarea */}
              <div className={styles.inputGroup}>
                <Input
                  isTextarea
                  label="Deskripsi Singkat"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              {/* UPLOAD AREA */}
              <div className={styles.uploadContainer}>
                <label className={styles.uploadLabel}>Thumbnail Kursus</label>
                <div className={styles.uploadArea}>
                  <FiUploadCloud className={styles.uploadIcon} />
                  <div className={styles.uploadText}>
                    <h4>Klik atau drag foto ke sini</h4>
                    <p>SVG, PNG, JPG atau GIF (Max. 800x400px)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: Daftar Modul */}
            <div className={styles.modulesCard}>
              <div className={styles.cardHeader}>
                <div
                  className={styles.headerIconWrap}
                  style={{ backgroundColor: "#38BDF8" }}
                >
                  <FiLayers />
                </div>
                <h3>Kurikulum Modul</h3>
              </div>

              <p className={styles.moduleDesc}>
                Tambahkan materi-materi yang akan diajarkan secara berurutan.
                (Minimal 1 modul)
              </p>

              <div className={styles.moduleList}>
                <AnimatePresence>
                  {modules.map((m, index) => (
                    <motion.div
                      key={m.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className={styles.moduleItem}
                    >
                      <div className={styles.moduleNumber}>{index + 1}</div>

                      <div className={styles.moduleInputs}>
                        <Input
                          label="Judul Materi"
                          value={m.title}
                          onChange={(e) =>
                            updateModule(m.id, "title", e.target.value)
                          }
                        />
                        <Input
                          label="Menit"
                          type="number"
                          value={m.duration}
                          onChange={(e) =>
                            updateModule(m.id, "duration", e.target.value)
                          }
                        />
                      </div>

                      <button
                        type="button"
                        className={styles.trashBtn}
                        onClick={() => removeModule(m.id)}
                        title="Hapus Modul"
                        disabled={modules.length === 1}
                      >
                        <FiTrash2 />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <button
                type="button"
                className={styles.addModuleBtn}
                onClick={addModule}
              >
                <FiPlus size={22} /> Tambah Modul Baru
              </button>
            </div>
          </div>

          {/* --- ACTION BAR (BAGIAN BAWAH) --- */}
          <div className={styles.actionBar}>
            <div className={styles.actionText}>
              <h3>Siap untuk dipublikasi?</h3>
              <p>Pastikan semua data dan modul sudah terisi dengan benar.</p>
            </div>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Menyimpan..." : "Simpan Kursus Sekarang"}
              {!mutation.isPending && <FiSave size={20} />}
            </button>
          </div>
        </form>

        <Popup
          isOpen={popup.isOpen}
          type={popup.type}
          icon={<FiCheckCircle />}
          title={popup.title}
          description={popup.description}
          onAction={() => setPopup((p) => ({ ...p, isOpen: false }))}
        />
      </div>
    </DashboardLayout>
  );
}
