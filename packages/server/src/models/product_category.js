// ----------- using hasMany and belongsTo
const { DataTypes } = require("sequelize");

const Product_category = (sequelize) => {
    return sequelize.define("Product_category", {});
  };
  
  module.exports = Product_category;
  
// ----------- using belongsToMany
// const { DataTypes } = require("sequelize");
// const Category = require("./category");
// const Product = require("./product");

// const Product_category = (sequelize) => {
//   return sequelize.define("Product_category", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//     },
//     id_product: {
//       type: DataTypes.INTEGER,
//       primaryKey: false,
//       allowNull: false,
//       references: {
//         model: Products,
//         key: 'id'
//       }
//     },
//     id_category: {
//       type: DataTypes.INTEGER,
//       primaryKey: false,
//       allowNull: false,
//       references: {
//         model: Categories,
//         key: 'id'
//       }
//     }
//   });
// };

// module.exports = Product_category;