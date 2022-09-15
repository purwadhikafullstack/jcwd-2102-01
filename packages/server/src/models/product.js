const { DataTypes } = require("sequelize");

const Product = (sequelize) => {
  return sequelize.define("Product", {
    product_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no',
      allowNull: true,
    },
  });
};

module.exports = Product;
