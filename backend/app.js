const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = console;
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Auth
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    logger.log('Login attempt:', { email, password, user });
    if (!user) {
      logger.log('Login failed: user not found for', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    logger.log('Comparing password:', { entered: password, stored: user.password });
    if (password !== user.password) {
      logger.log('Login failed: password mismatch for', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'secret', { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Books CRUD
app.get('/books', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/books/:id', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
    const book = result.rows[0];
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post('/books', auth, async (req, res) => {
  const { title, author, isbn, price, stock, description, cover_image, category_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, isbn, price, stock, description, cover_image, category_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [title, author, isbn, price, stock, description, cover_image, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.put('/books/:id', auth, async (req, res) => {
  const { title, author, isbn, price, stock, description, cover_image, category_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE books SET title=$1, author=$2, isbn=$3, price=$4, stock=$5, description=$6, cover_image=$7, category_id=$8 WHERE id=$9 RETURNING *',
      [title, author, isbn, price, stock, description, cover_image, category_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Book not found' });
    res.json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.delete('/books/:id', auth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Categories CRUD
app.get('/categories', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/categories/:id', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    const category = result.rows[0];
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post('/categories', auth, async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.put('/categories/:id', auth, async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categories SET name=$1, description=$2 WHERE id=$3 RETURNING *',
      [name, description, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Category not found' });
    res.json(result.rows[0]);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.delete('/categories/:id', auth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Inventory
app.post('/inventory/update', auth, async (req, res) => {
  const { bookId, change } = req.body;
  try {
    // Update book stock
    const updateResult = await pool.query(
      'UPDATE books SET stock = stock + $1 WHERE id = $2 RETURNING *',
      [change, bookId]
    );
    const book = updateResult.rows[0];
    if (!book) return res.status(404).json({ message: 'Book not found' });
    // Insert inventory log
    await pool.query(
      'INSERT INTO inventory_logs (book_id, change) VALUES ($1, $2)',
      [bookId, change]
    );
    res.json(book);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/inventory/low-stock', auth, async (req, res) => {
  const threshold = parseInt(req.query.threshold) || 5;
  try {
    const result = await pool.query('SELECT * FROM books WHERE stock <= $1', [threshold]);
    res.json(result.rows);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = 5000;
app.listen(PORT, () => logger.log(`Server running on port ${PORT}`));
