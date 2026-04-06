import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import api from "@/utils/api";

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
  }),
}));

describe("Halaman DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("harus merender statistik dashboard tanpa error", async () => {
    api.get.mockResolvedValueOnce({
      timeBalance: 100,
      learningMinutes: 300,
      upcomingSessions: 2,
      mentoringSessions: [],
    });

    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });
  });
});
