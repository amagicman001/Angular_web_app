-- Create the bookstore database and tables, and insert initial data
-- Run these commands in psql or pgAdmin

CREATE DATABASE bookstore;
\c bookstore

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(20),
  price NUMERIC(10,2),
  stock INT,
  description TEXT,
  cover_image TEXT,
  category_id INT REFERENCES categories(id)
);

CREATE TABLE inventory_logs (
  id SERIAL PRIMARY KEY,
  book_id INT REFERENCES books(id),
  change INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO users (email, password, role) VALUES
('admin@bookstore.com', 'admin123', 'admin');

INSERT INTO categories (name, description) VALUES
('Fiction', 'Fictional books'),
('Non-Fiction', 'Non-fictional books');

INSERT INTO books (title, author, isbn, price, stock, description, cover_image, category_id) VALUES
('Book One', 'Author A', '1111111111', 10.99, 5, 'First book', '', 1),
('Book Two', 'Author B', '2222222222', 15.99, 2, 'Second book', '', 2);

INSERT INTO inventory_logs (book_id, change) VALUES
(1, 5),
(2, 2);
