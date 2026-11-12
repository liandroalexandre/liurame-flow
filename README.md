# LIURAME Flow

Sistema de gestão de projetos e tarefas desenvolvido com **React e TypeScript**, no âmbito da formação Full Stack da Master D.

## Descrição

O **LIURAME Flow** é uma aplicação web que permite organizar projetos, gerir tarefas e acompanhar o progresso das atividades através de uma interface intuitiva e responsiva.

A aplicação utiliza uma API REST simulada com **JSON Server**, permitindo guardar e consultar os dados.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Context API
- React Hooks e Custom Hooks
- JSON Server
- Lucide React
- Vitest
- React Testing Library
- ESLint
- HTML5 e CSS3

## Funcionalidades

### Gestão de projetos

- Criar novos projetos
- Consultar projetos existentes
- Editar projetos
- Eliminar projetos
- Visualizar os detalhes de cada projeto
- Validar os dados introduzidos

### Gestão de tarefas

- Criar tarefas associadas a projetos
- Consultar tarefas
- Editar tarefas
- Eliminar tarefas
- Definir datas limite
- Gerir estados das tarefas: pendente, em progresso e concluída
- Marcar tarefas como concluídas

### Dashboard

- Consultar o número de projetos
- Consultar o número total de tarefas
- Consultar o número de tarefas concluídas
- Acompanhar o progresso dos projetos através de barras de progresso

## Programação orientada a objetos e TypeScript

O projeto utiliza os seguintes conceitos:

- **Classes:** `Project` e `Task`, responsáveis pela representação e gestão dos dados.
- **Classe abstrata:** `BaseEntity`, que fornece propriedades e comportamentos comuns.
- **Herança:** as classes `Project` e `Task` estendem `BaseEntity`.
- **Interfaces:** `IProject`, `ITask` e `Identifiable`, que definem estruturas de dados.
- **Composição:** um projeto contém uma coleção de tarefas.
- **Tipos personalizados:** `TaskStatus`, que restringe os estados possíveis das tarefas.
- **Generics:** função `findById<T>`, utilizada para localizar projetos pelo identificador, mantendo a segurança de tipos.
- **Encapsulamento de lógica:** métodos para validar dados, concluir tarefas e calcular o progresso dos projetos.

## Arquitetura da aplicação

A aplicação está organizada em componentes e módulos com responsabilidades distintas:

- **`components/`** — componentes reutilizáveis da interface.
- **`context/`** — gestão do estado global através da Context API.
- **`hooks/`** — Custom Hook `useProjects`.
- **`models/`** — classes, interfaces e tipos TypeScript.
- **`pages/`** — páginas principais da aplicação.
- **`services/`** — comunicação com a API REST.
- **`utils/`** — funções utilitárias genéricas.
- **`tests/`** — testes automáticos das classes, funções e componentes React.

## Estrutura do projeto

```text
liurame-flow/
├── public/
├── src/
│   ├── components/
│   │   └── FormularioTarefa.tsx
│   ├── context/
│   │   ├── ProjectContext.tsx
│   │   └── ProjectContextDefinition.ts
│   ├── hooks/
│   │   └── useProjects.ts
│   ├── models/
│   │   ├── BaseEntity.ts
│   │   ├── Project.ts
│   │   └── Task.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── DetalheProjeto.tsx
│   │   └── FormularioProjeto.tsx
│   ├── services/
│   │   └── projectService.ts
│   ├── tests/
│   │   ├── Dashboard.test.tsx
│   │   ├── FormularioProjeto.test.tsx
│   │   ├── Project.test.ts
│   │   ├── Task.test.ts
│   │   └── findById.test.ts
│   ├── utils/
│   │   └── findById.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── db.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Requisitos para executar

É necessário ter o **Node.js** e o **npm** instalados.

## Instalação

Clonar o repositório:

```bash
git clone https://github.com/liandroalexandre/liurame-flow.git
```

Entrar na pasta do projeto:

```bash
cd liurame-flow
```

Instalar as dependências:

```powershell
npm.cmd install
```

No Windows PowerShell, caso `npm` ou `npx` sejam bloqueados pela política de execução, podem ser utilizados `npm.cmd` e `npx.cmd`.

## Executar a API REST

Abrir um terminal na pasta do projeto e executar:

```powershell
npx.cmd json-server --watch db.json --port 3001
```

A API fica disponível em:

http://localhost:3001/projects

**Nota:** o terminal da API deve permanecer aberto durante a utilização da aplicação.

## Executar a aplicação

Abrir um segundo terminal na pasta do projeto e executar:

```powershell
npm.cmd run dev
```

Abrir no navegador o endereço apresentado pelo Vite, normalmente:

http://localhost:5173

O Vite está configurado para aceitar ligações de outros dispositivos da mesma rede local.

## Comunicação com a API — Proxy do Vite

Para evitar a utilização de um endereço IP fixo no código, foi configurado um proxy no ficheiro `vite.config.ts`.

A aplicação utiliza o endereço relativo:

```typescript
const API_URL = "/api/projects";
```

Durante o desenvolvimento, o Vite encaminha os pedidos para o JSON Server:

```text
React → /api/projects → Vite → localhost:3001/projects
```

Esta configuração permite utilizar a aplicação no computador e em dispositivos móveis ligados à mesma rede local.

O proxy é uma configuração do ambiente de desenvolvimento. Para disponibilizar a aplicação publicamente, será necessário alojar a API num serviço acessível pela internet ou adaptar a arquitetura de persistência.

## Testes em dispositivos móveis

A interface foi testada num computador e num telemóvel real.

Os testes incluíram:

- Abertura e visualização do Dashboard.
- Adaptação da interface ao ecrã do telemóvel.
- Consulta dos projetos existentes.
- Criação e gravação de novos projetos.
- Criação e gravação de tarefas.
- Comunicação com o JSON Server através da rede Wi-Fi.

Para testar num telemóvel, o computador e o dispositivo móvel devem estar ligados à mesma rede.

Com os dois servidores ativos, aceder no telemóvel ao endereço de rede apresentado pelo Vite, por exemplo:

```text
http://192.168.1.10:5173/
```

O endereço IP apresentado é apenas um exemplo da rede utilizada nos testes. Pode ser diferente noutras redes.

## Geração de identificadores e compatibilidade HTTP

Inicialmente, a aplicação utilizava `crypto.randomUUID()` para gerar os identificadores dos projetos e das tarefas.

Durante os testes num telemóvel real, verificou-se que este método não estava disponível no contexto HTTP utilizado através do endereço IP da rede local.

Para permitir a criação de projetos e tarefas nesse ambiente, foi adotada a seguinte alternativa:

```typescript
`${Date.now()}-${Math.random().toString(36).slice(2)}`;
```

Esta solução combina o instante de criação com um valor aleatório, permitindo gerar identificadores adequados ao contexto de demonstração do exercício.

**Limitação técnica:** este método não oferece as mesmas garantias de unicidade de um UUID.

Numa aplicação de produção, seria preferível gerar identificadores UUID num contexto seguro (HTTPS) ou atribuí-los no servidor.

Esta alteração não modifica a arquitetura TypeScript, as operações CRUD ou as regras de validação do projeto.

## Executar os testes

A aplicação utiliza **Vitest** e **React Testing Library** para testar classes, funções e componentes React.

Para executar todos os testes:

```powershell
npx.cmd vitest run
```

Foram implementados **19 testes automáticos**:

| Ficheiro                     | Número de testes |
| ---------------------------- | ---------------: |
| `Task.test.ts`               |                5 |
| `Project.test.ts`            |                9 |
| `Dashboard.test.tsx`         |                1 |
| `FormularioProjeto.test.tsx` |                1 |
| `findById.test.ts`           |                3 |
| **Total**                    |           **19** |

Os testes verificam operações das classes, validações, cálculos de progresso, pesquisa genérica por identificador e apresentação de componentes React.

Após as melhorias de compatibilidade móvel, os **19 testes foram executados novamente e aprovados**.

## Verificar a qualidade do código

Executar o ESLint:

```powershell
npm.cmd run lint
```

Gerar a versão de produção:

```powershell
npm.cmd run build
```

Ambas as verificações foram executadas com sucesso após as alterações.

## Persistência dos dados

Os projetos e as tarefas são armazenados no ficheiro `db.json` através do JSON Server.

A aplicação utiliza pedidos HTTP para consultar, criar, atualizar e eliminar projetos.

As tarefas são armazenadas dentro dos respetivos projetos e atualizadas através da API REST.

O JSON Server funciona como uma API local de desenvolvimento e demonstração, não como um serviço de produção alojado na internet.

## Interface e responsividade

A interface foi desenvolvida com **CSS3**, incluindo estilos para diferentes dimensões de ecrã, cartões de projetos, indicadores de progresso, formulários e identificação visual dos estados das tarefas.

A aplicação foi também testada num telemóvel real, tendo sido confirmada a adaptação da interface e o funcionamento das operações de criação e gravação de projetos e tarefas.

## Repositório GitHub

O código-fonte e o histórico de desenvolvimento estão disponíveis em:

https://github.com/liandroalexandre/liurame-flow

## Autor

Projeto desenvolvido no âmbito da formação **Full Stack da Master D**.

## Estado do projeto

Aplicação funcional com operações CRUD, validação de dados, programação orientada a objetos, gestão de estado global, API REST, interface responsiva, compatibilidade com dispositivos móveis em rede local e **19 testes automáticos aprovados**.

As verificações ESLint e build de produção foram concluídas com sucesso.
