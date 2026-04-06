import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import SearchPage from "./SearchPage";
import api from "@/utils/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Mock API (JANGAN GUNAKAN vi.mock("axios"))
vi.mock("@/utils/api", () => ({
  default: { get: vi.fn() },
}));

// 2. Mock Router
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

// 3. Mock AuthContext
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "user-123", name: "Rafif Sava" },
  }),
}));

describe("Halaman SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("harus merender input pencarian dan filter", async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    api.get.mockResolvedValue({ data: [], meta: { totalPages: 1 } });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const searchInputs = screen.getAllByRole("textbox");
      expect(searchInputs.length).toBeGreaterThan(0);
    });
  });
});
