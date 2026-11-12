
import type { IProject } from "../models/Project";

const API_URL = "/api/projects";

async function verificarResposta(
    response: Response
): Promise<void> {
    if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
    }
}

export async function listarProjetos(): Promise<IProject[]> {
    const response = await fetch(API_URL);
    await verificarResposta(response);
    return response.json();
}

export async function obterProjeto(
    id: string
): Promise<IProject> {
    const response = await fetch(
        `${API_URL}/${encodeURIComponent(id)}`
    );

    await verificarResposta(response);
    return response.json();
}

export async function criarProjeto(
    projeto: IProject
): Promise<IProject> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projeto),
    });

    await verificarResposta(response);
    return response.json();
}

export async function atualizarProjeto(
    projeto: IProject
): Promise<IProject> {
    const response = await fetch(
        `${API_URL}/${encodeURIComponent(projeto.id)}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projeto),
        }
    );

    await verificarResposta(response);
    return response.json();
}

export async function eliminarProjeto(
    id: string
): Promise<void> {
    const response = await fetch(
        `${API_URL}/${encodeURIComponent(id)}`,
        {
            method: "DELETE",
        }
    );

    await verificarResposta(response);
}
