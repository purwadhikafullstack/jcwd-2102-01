const { Transaction, Transaction_list, Cart,Courier,Stock_history, Product,Product_stock,Product_image,Category, Product_description, Product_category, Unit, User } = require("../lib/sequelize");
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
      if (buy_quantity > findproduct.stock ) {
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

          if (newQuantity > findproduct.stock ) {
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
      return res.status(200).json({
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

  // -------------------- Create new Transaction -------------------- //
  newTransaction: async (req, res) => {
    try {
      const { id_user } = req.params;
      const { total_transaction, courier, shipping_cost, total_paid, cancel_description, transaction_status , id_address,id_upload_recipe, id_payment } = req.body;
      
      // ---------- get the Inv Number ---------- //
      // get month and year 
      var datenow= new Date() ;
      var day = datenow.getDate() ;
      var month = datenow.getMonth() + 1 ;
      var year = datenow.getFullYear();
      if(month <= 10) {
        month = '0'+ (datenow.getMonth() + 1)
      }
      // get user ID
      var noIdUser = id_user
      if(id_user < 10) {noIdUser = '000' + id_user } 
      else if(id_user < 100)  {noIdUser = '00' + id_user } 
      else if(id_user < 1000)  {noIdUser = '0' + id_user } 
      // get transaction id
      const gettransactionId =  await Transaction.max('id');
      var newTransactionId = gettransactionId + 1;
      if(newTransactionId < 10) {newTransactionId = '000'+ (gettransactionId + 1)}
      else if(newTransactionId < 100) {newTransactionId = '00'+ (gettransactionId + 1)}
      else if(newTransactionId < 1000) {newTransactionId = '0'+ (gettransactionId + 1)}
      // no Invoice
      var noInvoice = 'HM-' + month.toString()+ year.toString().substr(-2) + noIdUser + newTransactionId 

      const newTransaction = await Transaction.create({
        no_invoice: noInvoice, total_transaction, courier, shipping_cost, total_paid, cancel_description, transaction_status,id_user, id_address,id_upload_recipe, id_payment
      });

      // Mengambil data cart 
      const findCartProduct = await Cart.findAll({
        where: {id_user: id_user },
      });

      const renderTransactionList = () => {
        return findCartProduct.map((val) => {
        // Mapping memasukkan data ke table transaction List
        Transaction_list.create({
        buy_quantity:val.buy_quantity, 
        price:val.price, 
        total_price:val.total_price, 
        note:"",
        id_user:val.id_user,
        id_product:val.id_product,
        id_transaction:newTransactionId});

        // Mapping Panggil Product Stock untuk diupdate
        const findProduct = Product_stock.findOne({
          where: {
            [Op.and]: [
              { converted: {[Op.notIn]:['yes']} },
              { id_product: val.id_product }
            ]
          },
        });

        let newStokUpdate = findProduct.stock - val.buy_quantity
        let newTotalSold = val.buy_quantity + findProduct.total_sold
        console.log('tes find ' + findProduct.stock);
        console.log('tes val cart ' + val.buy_quantity);
        console.log('tes val id prod ' + val.id_product);
        console.log('tes find prod' + findProduct.id);
        
        Product_stock.update({stock: newStokUpdate, total_sold:newTotalSold}, {
        where: {
          [Op.and]: [
            { converted: {[Op.notIn]:['yes']} },
            { id_product: val.id_product, }
          ]
        },});
        
        // tambah data stock history
        Stock_history.create({
        type: 'Penjualan', description: 'pengurangan', quantity : val.buy_quantity, id_product: val.id_product, id_unit: findProduct.id_unit , 
        });

        // delete data cart
        Cart.destroy({
        where: {
          [Op.and]: [
          { id_user: id_user, },
          { id_product: val.id_product, }
          ]
        },});

      })
      }
      renderTransactionList()

      return res.status(200).json({
        message: "Berhasil Membuat transaksi",
        result: [newTransaction, findCartProduct]
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
