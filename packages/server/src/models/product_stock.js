const { DataTypes } = require("sequelize");

const Product_stock = (sequelize) => {
  return sequelize.define("Product_stock", {
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qty_sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    capital_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    selling_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    profit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    converted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

module.exports = Product_stock;
