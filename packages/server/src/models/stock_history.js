const { DataTypes } = require("sequelize");

const Stock_history = (sequelize) => {
  return sequelize.define("Stock_history", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM('Penjualan', 'Unit Convertion','Update Stock'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });
};

module.exports = Stock_history;
