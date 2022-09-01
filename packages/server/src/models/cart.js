const { DataTypes } = require("sequelize");

const Cart = (sequelize) => {
  return sequelize.define("Cart", {
    buy_qty: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    note: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  });
};

module.exports = Cart;
