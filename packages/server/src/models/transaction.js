const { DataTypes } = require("sequelize");

const Transaction = (sequelize) => {
  return sequelize.define("Transaction", {
    no_invoice: {
      type: DataTypes.STRING(300),
      allowNull: true,
      unique: true,
    },
    product_type_total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_transaction: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shipping_cost: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_paid: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cancel_description: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  });
};

module.exports = Transaction;
