const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createBook(req, res) {
  try {
    const { title, release_year, author_id } = req.body;

    if (!title || release_year === undefined || !author_id) {
      return res.status(400).json({
        error: 'title, release_year e author_id são obrigatórios.'
      });
    }

    const author = await prisma.authors.findUnique({
      where: { id: author_id }
    });

    if (!author) {
      return res.status(404).json({
        error: 'Autor não encontrado.'
      });
    }

    const book = await prisma.books.create({
      data: {
        title,
        release_year: Number(release_year),
        author_id
      }
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function getBooks(req, res) {
  try {
    const books = await prisma.books.findMany({
      include: {
        author: true
      }
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const { title, release_year, author_id } = req.body;

    const existingBook = await prisma.books.findUnique({
      where: { id }
    });

    if (!existingBook) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    if (author_id) {
      const author = await prisma.authors.findUnique({
        where: { id: author_id }
      });

      if (!author) {
        return res.status(404).json({ error: 'Autor não encontrado.' });
      }
    }

    const data = {};

    if (title !== undefined) data.title = title;
    if (release_year !== undefined) data.release_year = Number(release_year);
    if (author_id !== undefined) data.author_id = author_id;

    const book = await prisma.books.update({
      where: { id },
      data
    });

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const existingBook = await prisma.books.findUnique({
      where: { id }
    });

    if (!existingBook) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    await prisma.books.delete({
      where: { id }
    });

    return res.status(200).json({
      message: 'Livro excluído com sucesso.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook
};
