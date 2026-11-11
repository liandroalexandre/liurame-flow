
import { describe, expect, it } from 'vitest';

import { Project } from '../models/Project';
import { Task } from '../models/Task';

describe('Classe Project', () => {
    it('deve criar um projeto corretamente', () => {
        const project = new Project(
            '1',
            'Website LIURAME',
            'Desenvolvimento do website institucional'
        );

        expect(project.name).toBe('Website LIURAME');
        expect(project.tasks).toHaveLength(0);
    });

    it('deve validar um projeto correto', () => {
        const project = new Project(
            '2',
            'LIURAME Flow',
            'Sistema de gestão de projetos'
        );

        expect(project.validate()).toBe(true);
    });

    it('deve rejeitar um projeto com nome inválido', () => {
        const project = new Project(
            '3',
            'AB',
            'Descrição válida do projeto'
        );

        expect(project.validate()).toBe(false);
    });

    it('deve adicionar uma tarefa ao projeto', () => {
        const project = new Project(
            '4',
            'Projeto de testes',
            'Testar a gestão de tarefas'
        );

        const task = new Task(
            '101',
            'Criar interface',
            'Desenvolver a interface principal',
            '2026-12-15'
        );

        project.addTask(task);

        expect(project.tasks).toHaveLength(1);
        expect(project.tasks[0].title).toBe('Criar interface');
    });

    it('deve impedir a adição de uma tarefa inválida', () => {
        const project = new Project(
            '5',
            'Projeto de testes',
            'Testar a validação de tarefas'
        );

        const task = new Task(
            '102',
            'AB',
            'Descrição válida',
            '2026-12-15'
        );

        expect(() => project.addTask(task)).toThrow(
            'Os dados da tarefa são inválidos.'
        );

        expect(project.tasks).toHaveLength(0);
    });

    it('deve remover uma tarefa do projeto', () => {
        const project = new Project(
            '6',
            'Projeto de testes',
            'Testar a remoção de tarefas'
        );

        const task = new Task(
            '103',
            'Criar formulário',
            'Desenvolver o formulário de contacto',
            '2026-12-20'
        );

        project.addTask(task);
        project.removeTask('103');

        expect(project.tasks).toHaveLength(0);
    });

    it('deve calcular corretamente o progresso do projeto', () => {
        const project = new Project(
            '7',
            'Projeto de testes',
            'Testar o cálculo do progresso'
        );

        const task1 = new Task(
            '104',
            'Criar interface',
            'Desenvolver a interface principal',
            '2026-12-15'
        );

        const task2 = new Task(
            '105',
            'Criar navegação',
            'Implementar as rotas da aplicação',
            '2026-12-20'
        );

        task1.complete();

        project.addTask(task1);
        project.addTask(task2);

        expect(project.getProgress()).toBe(50);
    });

    it('deve devolver 0% quando não existem tarefas', () => {
        const project = new Project(
            '8',
            'Projeto vazio',
            'Projeto sem tarefas associadas'
        );

        expect(project.getProgress()).toBe(0);
    });

    it('deve devolver 100% quando todas as tarefas estão concluídas', () => {
        const project = new Project(
            '9',
            'Projeto concluído',
            'Projeto com todas as tarefas concluídas'
        );

        const task = new Task(
            '106',
            'Finalizar projeto',
            'Concluir todas as funcionalidades',
            '2026-12-30'
        );

        task.complete();
        project.addTask(task);

        expect(project.getProgress()).toBe(100);
    });
});
