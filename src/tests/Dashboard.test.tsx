// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import { useProjects } from "../hooks/useProjects";

vi.mock("../hooks/useProjects", () => ({
  useProjects: vi.fn(),
}));

const mockUseProjects = vi.mocked(useProjects);

describe("Componente Dashboard", () => {
  it("deve apresentar os projetos existentes", () => {
    mockUseProjects.mockReturnValue({
      projects: [
        {
          id: "1",
          name: "Website LIURAME",
          description: "Desenvolvimento do website",
          createdAt: "2026-11-10T12:00:00.000Z",
          tasks: [
            {
              id: "101",
              title: "Criar interface",
              description: "Desenvolver a página inicial",
              dueDate: "2026-12-01",
              status: "concluida",
              createdAt: "2026-11-10T12:00:00.000Z",
            },
          ],
        },
      ],
      loading: false,
      error: null,
      refreshProjects: vi.fn(),
      addProject: vi.fn(),
      updateProject: vi.fn(),
      deleteProject: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    expect(screen.getByText("Website LIURAME")).toBeTruthy();

    expect(screen.getByText("Desenvolvimento do website")).toBeTruthy();
  });
});
