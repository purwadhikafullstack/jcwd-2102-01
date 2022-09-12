const { Transaction, Cart,Courier, Product,Product_stock,Product_image,Category, Product_description, Product_category, Unit, User } = require("../lib/sequelize");
const { Op } = require("sequelize");

const transactionsController = {

  // -------------------- Add To Cart Progress -------------------- //
  addToCart: async (req, res) => {
    try {
      const { buy_quantity, price, total_price, note, id_user, id_product } = req.body;
      
      // ---------------  Mengambil produk stok --------------- //
      const findproduct = await Product_stock.findOne({
        where: {
          [Op.and]: [
            { converted: {[Op.notIn]:['yes']} },
            { id_product: id_product, }
          ]
        },
      });
      // ---------------  Kondisi jika buy qty lebih besar dari stok maka error --------------- //
      if (buy_quantity >= findproduct.stock ) {
        throw new Error("Maaf produk stok tidak mencukupi");
      }

      // --------------- Mengambil data cart --------------- //
      const findCartProduct = await Cart.findOne({
        where: {
          [Op.and]: [
          { id_user: id_user, },
          { id_product: id_product, }
          ]
        },
      });
      // mengecek kondisi jika data cart dengan id user dan id product sudah ada maka melakukan update qty buy saja --------------- //
      let addProduct
      if (!findCartProduct) {
          addProduct= await Cart.create({
          buy_quantity, price, total_price, note, id_user, id_product
          });
          return res.status(201).json({
            message: "Berhasil menambah ke Keranjang",
            result: addProduct
          });
        } else {
          let newQuantity = parseInt(buy_quantity) + parseInt(findCartProduct.buy_quantity)
          if (newQuantity >= findproduct.stock ) {
            throw new Error("Maaf data keranjang anda melebihi produk stok");
          } else {
          addProduct= await Cart.update({
          buy_quantity: newQuantity, 
          price: parseFloat(findproduct.selling_price), 
          total_price:(parseFloat(buy_quantity) + parseFloat(findCartProduct.buy_quantity) )* parseFloat(findproduct.selling_price), 
          note, 
          id_user, 
          id_product
          },
          {where: {
          [Op.and]: [
          { id_user: id_user, },
          { id_product: id_product, }
          ]
          },}
          );
          return res.status(201).json({
          message: "Berhasil upadate data Keranjang",
          result: addProduct})
          }
        }
      // console.log(findproductStock.stock);
      // console.log(findCartProduct);
      // console.log(findCartProduct.buy_quantity);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Show the Cart User -------------------- //
  getCartUser: async (req, res) => {
    try {
      const { id } = req.params;

      const findCart = await Cart.findAll({
        include: [
          { model : User },
          { model : Product,
            include : [
              { model: Product_stock,
                include : [{model: Unit}],
                where: {
                converted: {[Op.notIn]:['yes']}
                }
              }, 
              { model : Product_image},
              { model : Product_description},
              ],
          },
        ],
        where: {
          id_user: id,
        },
      });
      return res.status(200).json({
        message: "fetching data Cart",
        result: findCart,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },

    // -------------------- Show all couriers -------------------- //
  getAllCouriers: async (req, res) => {
    try {
      const findCouriers = await Courier.findAll({});
      return res.status(200).json({
        message: "fetching data Couriers",
        result: findCouriers,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Edit Address -------------------- //
  editAddress: async (req, res) => {
    try {
      const { id } = req.params;

      await Address.update(
        {
          ...req.body,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        message: "Berhasil merubah data alamat",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Delete Cart -------------------- //
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;

      await Cart.destroy({
        where: { id },
      });

      return res.status(200).json({
        message: "Berhasil menghapus data Cart",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  },
};

module.exports = transactionsController;
