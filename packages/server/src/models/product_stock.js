const { DataTypes } = require("sequelize");

const Product_stock = (sequelize) => {
  return sequelize.define("Product_stock", {
    isi_perkemasan: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    capital_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    first_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    selling_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    margin: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    converted: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no',
    },
  });
};

module.exports = Product_stock;
