const { DataTypes } = require("sequelize");

const Category = (sequelize) => {
  return sequelize.define("Category", {
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    img_category: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  });
};

module.exports = Category;
