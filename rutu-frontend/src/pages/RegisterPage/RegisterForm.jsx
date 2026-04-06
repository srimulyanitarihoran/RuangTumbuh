import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api";
import styles from "./RegisterForm.module.css";
import { FiUser, FiAtSign, FiLock } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { Popup } from "@components/Popup/Popup";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  // REACT QUERY: Mutation Register
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      return await api.post("/auth/register", userData);
    },
    onSuccess: () => {
      setPopup({
        isOpen: true,
        title: "Akun Dibuat!",
        description:
          "Akun kamu berhasil dibuat. Mengalihkan ke halaman login...",
      });
      setTimeout(() => {
        setPopup({ ...popup, isOpen: false });
        navigate("/login");
      }, 3000);
    },
    onError: (err) => {
      console.error("Gagal register:", err);
      setError(
        err.response?.data?.message ||
          "Terjadi kesalahan saat registrasi. Coba lagi nanti.",
      );
    },
  });

  const handleChange = (e) => {
    if (error) setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword)
      return setError("Password dan Konfirmasi Password harus sama persis.");

    const nameRegex = /^[a-zA-Z\s]*$/;
    const nameWords = name.trim().split(/\s+/);
    if (!nameRegex.test(name))
      return setError("Nama hanya boleh berisi huruf.");
    if (nameWords.length < 2 || nameWords.length > 5)
      return setError("Nama lengkap harus terdiri dari 2 hingga 5 kata.");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,32}$/;
    if (!passwordRegex.test(password)) {
      return setError(
        "Password harus 8-32 karakter dan mengandung kombinasi huruf besar, kecil, serta angka.",
      );
    }

    registerMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        {error && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              marginBottom: "10px",
              marginTop: "-15px",
            }}
          >
            {error}
          </p>
        )}

        <div className={styles.inputFormGroup}>
          <Input
            type="text"
            id="name"
            name="name"
            label="Name"
            icon={FiUser}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            icon={FiAtSign}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className={styles.formRow}>
            <div className={styles.flexInput}>
              <Input
                type="password"
                id="password"
                name="password"
                label="Password"
                icon={FiLock}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.flexInput}>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm"
                icon={FiLock}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <Button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Loading..." : "Register"}
        </Button>
      </form>

      <Popup
        isOpen={popup.isOpen}
        type="success"
        icon={<MdCheckCircle />}
        title={popup.title}
        description={popup.description}
        buttonText="Pergi Ke Login"
        onAction={() => navigate("/login")}
      />
    </>
  );
};
