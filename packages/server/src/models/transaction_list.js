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
    medicine_concoction_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    medicine_concoction: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no',
    },
  });
};

module.exports = Transaction_list;
