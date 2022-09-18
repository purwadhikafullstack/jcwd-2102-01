const { DataTypes } = require("sequelize");

const Upload_recipe = (sequelize) => {
  return sequelize.define("Upload_recipe", {
    image_recipe: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no',
    },
  });
};

module.exports = Upload_recipe;
