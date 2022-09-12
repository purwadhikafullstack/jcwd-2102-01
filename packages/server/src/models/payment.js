const { DataTypes } = require("sequelize");

const Payment = (sequelize) => {
  return sequelize.define("Payment", {
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
};

module.exports = Payment;
