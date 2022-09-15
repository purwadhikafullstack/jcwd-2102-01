const { DataTypes } = require("sequelize");

const Courier = (sequelize) => {
  return sequelize.define("Courier", {
   // courier dari raja ongkir cuma bisa Kurir yang valid adalah pos, tiki, dan jne.
    courier_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    courier: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });
};

module.exports = Courier;
