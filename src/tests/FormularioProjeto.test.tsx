// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FormularioProjeto from "../pages/FormularioProjeto";

vi.mock("../hooks/useProjects", () => ({
  useProjects: () => ({
    projects: [],
    loading: false,
    error: null,
    refreshProjects: vi.fn(),
    addProject: vi.fn(),
    updateProject: vi.fn(),
    deleteProject: vi.fn(),
  }),
}));

describe("Componente FormularioProjeto", () => {
  it("deve apresentar os campos para criar um projeto", () => {
    render(
      <MemoryRouter>
        <FormularioProjeto />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Novo projeto" })).toBeTruthy();

    expect(screen.getByLabelText("Nome do projeto")).toBeTruthy();

    expect(screen.getByLabelText("Descrição")).toBeTruthy();

    expect(screen.getByRole("button", { name: "Criar projeto" })).toBeTruthy();
  });
});
