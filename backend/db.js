const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // default superuser, change if needed
  host: 'localhost',
  database: 'bookstore',
  password: 'amand0125',
  port: 5432,
});

module.exports = pool;
