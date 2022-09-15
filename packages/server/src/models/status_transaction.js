const { DataTypes } = require("sequelize");

const Status_transaction = (sequelize) => {
  return sequelize.define("Status_transaction", {
    status_transaction: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  });
};

module.exports = Status_transaction;