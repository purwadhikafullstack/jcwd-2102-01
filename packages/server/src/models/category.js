const { DataTypes } = require("sequelize");

const Category = (sequelize) => {
  return sequelize.define("Category", {
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  });
};

module.exports = Category;
