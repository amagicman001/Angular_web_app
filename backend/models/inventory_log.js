module.exports = (sequelize, DataTypes) => {
  const InventoryLog = sequelize.define('InventoryLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
    change: { type: DataTypes.INTEGER, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'inventory_logs',
    timestamps: false,
  });
  return InventoryLog;
};
