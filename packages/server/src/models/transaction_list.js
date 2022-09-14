const { DataTypes } = require("sequelize");

const Transaction_list = (sequelize) => {
  return sequelize.define("Transaction_list", {
    buy_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    total_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

  });
};

module.exports = Transaction_list;
