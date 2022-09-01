const { DataTypes } = require("sequelize");

const Address = (sequelize) => {
  return sequelize.define("Address", {
    address: {
      type: DataTypes.STRING(350),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    province_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    city_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    city_id: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    // Jenis Daerah Tingkat II. Berisi "Kota" atau "Kabupaten" from raja ongkir
    type: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    default_address: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

module.exports = Address;
