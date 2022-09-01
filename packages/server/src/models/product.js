const { DataTypes } = require("sequelize");

const Product = (sequelize) => {
  return sequelize.define("Product", {
    product_code: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    product_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    isi_perkemasan: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

module.exports = Product;
