import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import api from "@/utils/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/utils/api", () => ({
  default: { get: vi.fn() },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "user-123", name: "Rafif Sava", email: "rafif@example.com" },
    logout: vi.fn(),
  }),
}));

describe("Halaman ProfilePage", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();

    api.get.mockResolvedValue({
      name: "Rafif Sava",
      email: "rafif@example.com",
      timeBalance: 500,
      stats: { learningMinutes: 120, teachingSessions: 5 },
    });
  });

  it("harus merender halaman dan menampilkan nama user dari backend", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ProfilePage />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Profil Saya")).toBeInTheDocument();
      const nameElements = screen.getAllByText("Rafif Sava");
      expect(nameElements.length).toBeGreaterThan(0);
    });
  });
});
