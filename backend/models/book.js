module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    cover_image: { type: DataTypes.STRING },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'books',
  });
  return Book;
};
