const db = require('../models');

exports.updateStock = async (req, res, next) => {
  try {
    const { bookId, change } = req.body;
    const book = await db.Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    book.stock += change;
    await book.save();
    await db.InventoryLog.create({ book_id: bookId, change });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.lowStock = async (req, res, next) => {
  try {
    const threshold = parseInt(req.query.threshold) || 5;
    const books = await db.Book.findAll({ where: { stock: { [db.Sequelize.Op.lte]: threshold } } });
    res.json(books);
  } catch (err) {
    next(err);
  }
};
