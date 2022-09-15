const { DataTypes } = require("sequelize");

const Token = (sequelize) => {
  return sequelize.define("Token", {
    token: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
  });
};

module.exports = Token;
