const { DataTypes } = require("sequelize");

const Product_image = (sequelize) => {
  return sequelize.define("Product_image", {
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
};

module.exports = Product_image;
