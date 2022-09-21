const { DataTypes } = require("sequelize");

const Address = (sequelize) => {
  return sequelize.define("Address", {
    receiver_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    receiver_phone: {
      type: DataTypes.STRING(14),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(350),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Kecamatan
    districts: {
      type: DataTypes.STRING(200),
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
    is_deleted: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no',
      allowNull: true,
    },
  });
};

module.exports = Address;
