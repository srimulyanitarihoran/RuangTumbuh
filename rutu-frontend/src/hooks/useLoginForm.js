import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";
import { loginPayloadSchema } from "@rutu/shared";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [apiError, setApiError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginPayloadSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      // Axios interceptor kita (di api.js) sudah otomatis me-return 'response.data.data'
      return await api.post("/auth/login", credentials);
    },
    onSuccess: (data) => {
      // Gunakan 'data.user' dan 'data.token' (karena ini sudah hasil ekstrak interceptor)
      if (data && data.user && data.token) {
        login(data.user, data.token);
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/dashboard");
        }, 3000);
      } else {
        setApiError("Format data dari server tidak sesuai.");
      }
    },
    onError: (err) => {
      setApiError(err.response?.data?.message || "Email atau password salah!");
    },
  });

  const onSubmit = (data) => {
    setApiError("");
    loginMutation.mutate(data);
  };

  return {
    form,
    apiError,
    showPopup,
    loginMutation,
    onSubmit,
    navigate,
  };
};
