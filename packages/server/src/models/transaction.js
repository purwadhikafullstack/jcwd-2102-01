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
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    courier: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    shipping_cost: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    total_paid: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    transaction_status: {
      type: DataTypes.ENUM('Menunggu Pembayaran', 'Menunggu Konfirmasi Pembayaran','Diproses','Dibatalkan','Dikirim','Pesanan Dikonfirmasi'),
      defaultValue: 'Menunggu Pembayaran',
      allowNull: true,
    },
    cancel_description: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  });
};

module.exports = Transaction;
