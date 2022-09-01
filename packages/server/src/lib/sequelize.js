const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/database");

const sequelize = new Sequelize({
  username: dbConfig.MYSQL_USERNAME,
  password: dbConfig.MYSQL_PASSWORD,
  database: dbConfig.MYSQL_DB_NAME,
  port: dbConfig.MYSQL_PORT,
  dialect: "mysql",
});

//models
const Address = require("../models/address")(sequelize);
const Payment = require("../models/payment")(sequelize);
const Cart = require("../models/cart")(sequelize);
const Category = require("../models/category")(sequelize);
const Courier = require("../models/courier")(sequelize);
const Transaction_list = require("../models/transaction_list")(sequelize);
const Transaction = require("../models/transaction")(sequelize);
const Product_description = require("../models/product_description")(sequelize);
const Produk_img = require("../models/product_img")(sequelize);
const Product_stock = require("../models/product_stock")(sequelize);
const Product = require("../models/product")(sequelize);
const Product_category = require("../models/product_category")(sequelize);
const Unit = require("../models/unit")(sequelize);
const Status_transaction = require("../models/status_transaction")(sequelize);
const Stock_history = require("../models/stock_history")(sequelize);
const Token = require("../models/token")(sequelize);
const Upload_recipe = require("../models/upload_recipe")(sequelize);
const User = require("../models/user")(sequelize);

// 1 : M
User.hasMany(Token, { foreignKey: "id_user" });
Token.belongsTo(User, { foreignKey: "id_user" });

User.hasMany(Payment, { foreignKey: "id_user" });
Payment.belongsTo(User, { foreignKey: "id_user" });

User.hasMany(Address, { foreignKey: "id_user" });
Address.belongsTo(User, { foreignKey: "id_user" });

User.hasMany(Upload_recipe, { foreignKey: "id_user" });
Upload_recipe.belongsTo(User, { foreignKey: "id_user" });

User.hasMany(Cart, { foreignKey: "id_user" });
Cart.belongsTo(User, { foreignKey: "id_user" });

User.hasMany(Transaction_list, { foreignKey: "id_user" });
Transaction_list.belongsTo(User, { foreignKey: "id_user" });

User.hasMany(Transaction, { foreignKey: "id_user" });
Transaction.belongsTo(User, { foreignKey: "id_user" });

Address.hasMany(Transaction, { foreignKey: "id_address" });
Transaction.belongsTo(Address, { foreignKey: "id_address" });

Upload_recipe.hasMany(Transaction, { foreignKey: "id_upload_recipe" });
Transaction.belongsTo(Upload_recipe, { foreignKey: "id_upload_recipe" });

Payment.hasMany(Transaction, { foreignKey: "id_payment" });
Transaction.belongsTo(Payment, { foreignKey: "id_payment" });

Product_description.hasOne(Product, { foreignKey: "id_produk_description" });
Product.belongsTo(Product_description, { foreignKey: "id_produk_description" });

Product.hasMany(Produk_img, { foreignKey: "id_product" });
Produk_img.belongsTo(Product, { foreignKey: "id_product" });

Product.hasMany(Product_stock, { foreignKey: "id_product" });
Product_stock.belongsTo(Product, { foreignKey: "id_product" });

Product.hasMany(Stock_history, { foreignKey: "id_product" });
Stock_history.belongsTo(Product, { foreignKey: "id_product" });

Product.hasMany(Cart, { foreignKey: "id_product" });
Cart.belongsTo(Product, { foreignKey: "id_product" });

Product.hasMany(Transaction_list, { foreignKey: "id_product" });
Transaction_list.belongsTo(Product, { foreignKey: "id_product" });

Unit.hasMany(Stock_history, { foreignKey: "id_unit" });
Stock_history.belongsTo(Unit, { foreignKey: "id_unit" });
Unit.hasMany(Product_stock, { foreignKey: "id_unit" });
Product_stock.belongsTo(Unit, { foreignKey: "id_unit" });

Status_transaction.hasOne(Transaction, { foreignKey: "id_stat_transaction" });
Transaction.belongsTo(Status_transaction, { foreignKey: "id_stat_transaction" });

// Transaction.hasMany(Cart, { foreignKey: "id_transaction" });
// Cart.belongsTo(Transaction, { foreignKey: "id_transaction" });

Transaction.hasMany(Transaction_list, { foreignKey: "id_transaction" });
Transaction_list.belongsTo(Transaction, { foreignKey: "id_transaction" });

// M : M no primary key product category
Product.hasMany(Product_category, { foreignKey: "id_product" });
Product_category.belongsTo(Product, { foreignKey: "id_product" });
Category.hasMany(Product_category, { foreignKey: "id_category" });
Product_category.belongsTo(Category, { foreignKey: "id_category" });

// M : M primary key
// Product.belongsToMany(Category, { through: Product_category});
// Category.belongsToMany(Product, { through: Product_category});

module.exports = {
  sequelize,
  Address,
  Payment,
  Cart,
  Category,
  Courier,
  Transaction_list,
  Transaction,
  Product_description,
  Produk_img,
  Product_stock,
  Product,
  Product_category,
  Unit,
  Status_transaction,
  Stock_history,
  Token,
  Upload_recipe,
  User,
};
