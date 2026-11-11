
import { describe, expect, it } from 'vitest';
import { findById } from '../utils/findById';

describe('Função genérica findById', () => {
    const projects = [
        { id: '1', name: 'LIURAME Flow' },
        { id: '2', name: 'Website LIURAME' }
    ];

    const tasks = [
        { id: '101', title: 'Criar interface' },
        { id: '102', title: 'Testar aplicação' }
    ];

    it('deve encontrar um projeto pelo ID', () => {
        const result = findById(projects, '2');

        expect(result).toEqual({
            id: '2',
            name: 'Website LIURAME'
        });
    });

    it('deve encontrar uma tarefa pelo ID', () => {
        const result = findById(tasks, '101');

        expect(result).toEqual({
            id: '101',
            title: 'Criar interface'
        });
    });

    it('deve devolver undefined quando o ID não existe', () => {
        const result = findById(projects, '999');

        expect(result).toBeUndefined();
    });
});
