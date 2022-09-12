const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define("User", {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    roles: {
      type: DataTypes.ENUM('Admin', 'User'),
      defaultValue: 'User',
    },
    is_verified: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no',
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    phone_no: {
      type: DataTypes.STRING(14),
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('Laki-laki', 'Perempuan', 'Lainnya'),
      defaultValue: 'Lainnya',
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    default_address: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
  });
};

module.exports = User;
