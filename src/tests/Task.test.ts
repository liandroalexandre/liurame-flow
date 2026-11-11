
import { describe, expect, it } from 'vitest';
import { Task } from '../models/Task';

describe('Classe Task', () => {
    it('deve criar uma tarefa com os dados corretos', () => {
        const task = new Task(
            '1',
            'Criar interface',
            'Desenvolver a página inicial',
            '2026-12-15'
        );

        expect(task.title).toBe('Criar interface');
        expect(task.status).toBe('pendente');
    });

    it('deve validar uma tarefa correta', () => {
        const task = new Task(
            '2',
            'Criar formulário',
            'Implementar formulário de contacto',
            '2026-12-20'
        );

        expect(task.validate()).toBe(true);
    });

    it('deve rejeitar uma tarefa com título inválido', () => {
        const task = new Task(
            '3',
            'AB',
            'Descrição válida',
            '2026-12-20'
        );

        expect(task.validate()).toBe(false);
    });

    it('deve marcar uma tarefa como concluída', () => {
        const task = new Task(
            '4',
            'Testar aplicação',
            'Executar testes automáticos',
            '2026-12-25'
        );

        task.complete();

        expect(task.status).toBe('concluida');
        expect(task.isCompleted()).toBe(true);
    });

    it('deve identificar uma tarefa pendente', () => {
        const task = new Task(
            '5',
            'Criar documentação',
            'Escrever o README do projeto',
            '2026-12-30'
        );

        expect(task.isCompleted()).toBe(false);
    });
});
