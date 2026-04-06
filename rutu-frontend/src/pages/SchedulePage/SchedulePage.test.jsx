import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import SchedulePage from "./SchedulePage";
import api from "@/utils/api";

// 1. Mock API
vi.mock("@/utils/api", () => ({
  default: { get: vi.fn(), delete: vi.fn() },
}));

// 2. Mock Router
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

// 3. Mock AuthContext
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "user-123", name: "Rafif Sava", email: "rafif@example.com" },
  }),
}));

describe("Halaman SchedulePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("harus merender kalender jadwal", async () => {
    // 4. Return Array kosong karena backend mereturn array untuk jadwal
    api.get.mockResolvedValue([]);

    render(
      <BrowserRouter>
        <SchedulePage />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Atur Kegiatan Kamu/i)).toBeInTheDocument();
      expect(screen.getByText("Sun")).toBeInTheDocument();
      expect(screen.getByText("Mon")).toBeInTheDocument();
    });
  });
});
