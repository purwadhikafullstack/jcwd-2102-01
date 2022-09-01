const { DataTypes } = require("sequelize");

const Product_img = (sequelize) => {
  return sequelize.define("Product_img", {
    img_product: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
};

module.exports = Product_img;
