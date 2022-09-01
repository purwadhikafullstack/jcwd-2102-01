const { DataTypes } = require("sequelize");

const Payment = (sequelize) => {
  return sequelize.define("Payment", {
    img_payment: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
};

module.exports = Payment;
