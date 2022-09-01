const { DataTypes } = require("sequelize");

const Upload_recipe = (sequelize) => {
  return sequelize.define("Upload_recipe", {
    img_recipe: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

module.exports = Upload_recipe;
