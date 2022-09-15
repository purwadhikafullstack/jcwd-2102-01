const { DataTypes } = require("sequelize");

const Unit = (sequelize) => {
  return sequelize.define("Unit", {
    unit_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });
};

module.exports = Unit;
