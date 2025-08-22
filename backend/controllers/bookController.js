const db = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const books = await db.Book.findAll({ include: db.Category });
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const book = await db.Book.findByPk(req.params.id, { include: db.Category });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const book = await db.Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const book = await db.Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    await book.update(req.body);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const book = await db.Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    await book.destroy();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};
