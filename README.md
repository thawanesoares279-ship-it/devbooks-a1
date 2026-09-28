# DevBooks - API REST

Projeto desenvolvido para a Atividade Prática Avaliativa (A1) da disciplina Programação para WEB II.

## Tecnologias

- Node.js
- Express
- Prisma ORM
- SQLite
- Postman

## Estrutura

```text
DevBooks/
├── prisma/
│   ├── migrations/
│   │   ├── migration_lock.toml
│   │   └── 20260927200000_init/
│   │       └── migration.sql
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── authorController.js
│   │   └── bookController.js
│   └── routes/
│       ├── authorRoutes.js
│       └── bookRoutes.js
├── .env
├── .gitignore
├── collection.json
├── package.json
├── README.md
└── server.js
```

## Instalação

Abra o terminal na pasta do projeto e execute:

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm start
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Rotas

### POST /authors

Cria um autor.

Exemplo:

```json
{
  "name": "Machado de Assis",
  "biography": "Escritor brasileiro."
}
```

### POST /books

Cria um livro vinculado a um autor existente.

Exemplo:

```json
{
  "title": "Dom Casmurro",
  "release_year": 1899,
  "author_id": "ID_DO_AUTOR"
}
```

### GET /books

Lista todos os livros e seus respectivos autores.

### PUT /books/:id

Atualiza os dados de um livro.

### DELETE /books/:id

Exclui definitivamente um livro.

## Postman

Importe o arquivo `collection.json` no Postman.

Primeiro execute **1 - Criar Autor**. Copie o `id` retornado e coloque na variável `authorId`.

Depois execute **2 - Criar Livro**. Copie o `id` retornado e coloque na variável `bookId`.

Em seguida, execute as requisições 3, 4 e 5.

## GitHub

Não envie `node_modules`, pois a pasta já está incluída no `.gitignore`.

Depois de criar o repositório público, envie todos os arquivos do projeto e compartilhe o link no AVA.
