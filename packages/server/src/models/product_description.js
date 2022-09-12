const { DataTypes } = require("sequelize");

const Product_description = (sequelize) => {
  return sequelize.define("Product_description", {
    weight: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    kegunaan: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    komposisi: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    kemasan: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    golongan: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    cara_simpan: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    nomor_ijin_edar: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cara_pakai: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    peringatan: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  });
};

module.exports = Product_description;
