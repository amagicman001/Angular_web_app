const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Book = require('./book')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.InventoryLog = require('./inventory_log')(sequelize, Sequelize);

db.Book.belongsTo(db.Category, { foreignKey: 'category_id' });
db.Category.hasMany(db.Book, { foreignKey: 'category_id' });
db.InventoryLog.belongsTo(db.Book, { foreignKey: 'book_id' });

db.sequelize.sync();

module.exports = db;
