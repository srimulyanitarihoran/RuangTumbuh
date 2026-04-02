import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
    const token = localStorage.getItem("token");

    // Jika SUDAH ADA token, jangan kasih masuk ke Login/Register
    // Lempar balik ke dashboard atau halaman utama
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    // Jika BELUM login, silakan akses halaman Login/Register (Outlet)
    return <Outlet />;
}