// In-memory data for books, categories, users, and inventory logs
module.exports = {
  users: [
  { id: 1, email: 'admin@bookstore.com', password: 'admin123', role: 'admin' } // password: admin123
  ],
  books: [
    { id: 1, title: 'Book One', author: 'Author A', isbn: '1111111111', price: 10.99, stock: 5, description: 'First book', cover_image: '', category_id: 1 },
    { id: 2, title: 'Book Two', author: 'Author B', isbn: '2222222222', price: 15.99, stock: 2, description: 'Second book', cover_image: '', category_id: 2 }
  ],
  categories: [
    { id: 1, name: 'Fiction', description: 'Fictional books' },
    { id: 2, name: 'Non-Fiction', description: 'Non-fictional books' }
  ],
  inventory_logs: [
    { id: 1, book_id: 1, change: 5, timestamp: new Date() },
    { id: 2, book_id: 2, change: 2, timestamp: new Date() }
  ]
};
