# LIURAME Flow

Sistema de gestão de projetos e tarefas desenvolvido com React e TypeScript.

## Descrição

O LIURAME Flow é uma aplicação web que permite organizar projetos, gerir tarefas e acompanhar o progresso das atividades.

A aplicação utiliza uma API REST simulada com JSON Server para guardar os dados.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Context API
- React Hooks
- JSON Server
- Lucide React
- Vitest
- ESLint
- HTML5 e CSS3

## Funcionalidades

### Gestão de projetos

- Criar novos projetos
- Consultar projetos existentes
- Editar projetos
- Eliminar projetos
- Visualizar os detalhes de cada projeto

### Gestão de tarefas

- Criar tarefas associadas a projetos
- Consultar tarefas
- Editar tarefas
- Eliminar tarefas
- Definir datas limite
- Gerir estados das tarefas:
  - Pendente
  - Em progresso
  - Concluída
- Marcar tarefas como concluídas

### Dashboard

- Consultar o número de projetos
- Consultar o número total de tarefas
- Consultar tarefas concluídas
- Acompanhar o progresso dos projetos

## Programação orientada a objetos

O projeto utiliza classes TypeScript:

- BaseEntity: classe abstrata
- Project: representação dos projetos
- Task: representação das tarefas

As classes incluem construtores, métodos de validação e métodos para gerir tarefas e calcular o progresso dos projetos.

## Estrutura do projeto

```text
src/
  components/
    FormularioTarefa.tsx
  context/
    ProjectContext.tsx
    ProjectContextDefinition.ts
  hooks/
    useProjects.ts
  models/
    BaseEntity.ts
    Project.ts
    Task.ts
  pages/
    Dashboard.tsx
    DetalheProjeto.tsx
    FormularioProjeto.tsx
  services/
    projectService.ts
  tests/
    Project.test.ts
    Task.test.ts
  App.tsx
  main.tsx
  index.css
db.json
```

## Instalação

É necessário ter o Node.js e o npm instalados.

Na pasta do projeto, executar:

```bash
npm install
```

## Executar a API REST

Abrir um terminal e executar:

```bash
npx json-server --watch db.json --port 3001
```

A API fica disponível em:

http://localhost:3001/projects

## Executar a aplicação

Abrir outro terminal e executar:

```bash
npm run dev
```

Abrir no navegador o endereço apresentado pelo Vite, normalmente:

http://localhost:5173

## Executar os testes

```bash
npx vitest run
```

Foram implementados 14 testes automáticos:

- 5 testes da classe Task
- 9 testes da classe Project

## Verificar o código

Executar o ESLint:

```bash
npm run lint
```

Gerar a versão de produção:

```bash
npm run build
```

## Persistência dos dados

Os projetos e as tarefas são armazenados no ficheiro db.json através do JSON Server.

A aplicação utiliza pedidos HTTP para consultar, criar, atualizar e eliminar projetos.

As tarefas são guardadas dentro dos respetivos projetos.

## Autor

Projeto desenvolvido no âmbito da formação Full Stack da Master D.

## Estado do projeto

Aplicação funcional, com operações CRUD, validação de dados, gestão de estado global e testes automáticos.
