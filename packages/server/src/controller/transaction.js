const { Transaction, Transaction_list, Cart,Address,Courier,Stock_history, Product,Product_stock,Product_image,
  Category, Product_description, Product_category, Unit, User, Payment, Upload_recipe } = require("../lib/sequelize");
const { Op } = require("sequelize");

const transactionsController = {

  // -------------------- Add To Cart Progress -------------------- //
  addToCart: async (req, res) => {
    try {
      const { buy_quantity, price, total_price, note, id_user, id_product, id_unit } = req.body;
      
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
          buy_quantity, price, total_price, note, id_user, id_product, id_unit
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
      const { idUser } = req.params;

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
          id_user: idUser,
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
      const { idUser } = req.params;
      const { total_transaction, courier, shipping_cost, total_paid, cancel_description, transaction_status , 
        id_address,id_upload_recipe, id_payment } = req.body;
      
      // ---------- get the Inv Number ---------- //
      // get month and year 
      var datenow= new Date() ;
      var day = datenow.getDate();
      var month = datenow.getMonth() + 1 ;
      var year = datenow.getFullYear();
      if(month <= 10) {
        month = '0'+ (datenow.getMonth() + 1)
      }
      // get transaction id
      const gettransactionId =  await Transaction.max('id');
      var newTransactionId = gettransactionId + 1;
      if(newTransactionId < 10) {newTransactionId = '000'+ (gettransactionId + 1)}
      else if(newTransactionId < 100) {newTransactionId = '00'+ (gettransactionId + 1)}
      else if(newTransactionId < 1000) {newTransactionId = '0'+ (gettransactionId + 1)}
      // no Invoice
      var noInvoice = 'HM-INV-' + month.toString() + year.toString().substr(-2)  + newTransactionId 

      const newTransaction = await Transaction.create({
        no_invoice: noInvoice, total_transaction, courier, shipping_cost, total_paid, cancel_description, transaction_status,id_user : idUser, id_address,id_upload_recipe, id_payment
      });

      // Mengambil data cart 
      const findCartProduct = await Cart.findAll({
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
              ],
          },
        ],
        where: {id_user: idUser },
      });

      if(!findCartProduct) {
        throw new Error("Keranjang anda kosong");
      }

      // let findProduct
      const renderTransactionList = () => {
        return findCartProduct.map((val) => {
        // Mapping memasukkan data ke table transaction List
        Transaction_list.create({
        buy_quantity:val.buy_quantity, 
        price:val.price, 
        total_price:val.total_price, 
        id_user:val.id_user,
        id_product:val.id_product,
        id_unit: val.id_unit,
        id_transaction:newTransactionId});

        // delete data cart
        Cart.destroy({
        where: {
          [Op.and]: [
          { id_user: idUser, },
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

    // -------------------- Show the Cart User "Menunggu Pembayaran" -------------------- //
    getUserTransactionOrder: async (req, res) => {
    try {
      const { idUser, noInvoice } = req.params;

      const findOrderList = await Transaction.findOne({
        include: [
          { model : User },
          { model : Address },
          { model : Transaction_list,
            include: [{model: Unit},
              { model : Product,
            include : [
              { model: Product_stock,
                include : [{model: Unit}],
              }, 
              { model : Product_image},
              { model : Product_description},
              ],
            },
            ]
           },
          
        ],
        where: {
          [Op.and]: [{id_user: idUser},{no_invoice: noInvoice},{transaction_status: "Menunggu Pembayaran"} ]
        },
      });

      return res.status(200).json({
        message: "fetching data Transaksi Order",
        result: [findOrderList],
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },

    // -------------------- Get all transaction list -------------------- //
    getAllTransaction: async (req, res) => {
    try {
      const { idUser, limit , page = 1, search, startDate, endDate, status, sort, orderby } = req.query;

        const findTransaction = await Transaction.findAll({
          offset: (page - 1) * limit,
          limit: limit ? parseInt(limit) : undefined,
          include: [
            { model : User },
            { model : Address },
            { model : Transaction_list,
              include: [
                { model : Product,
              include : [
                { model: Product_stock,
                  include : [{model: Unit}],
                }, 
                { model : Product_image},
                { model : Product_description},
                ],
              },
            {model: Unit}
          ]
            },
            { model : Upload_recipe },
            { model : Payment },
          ],
          where: {
            [Op.and]: [
              idUser ? {id_user: idUser} : null,

              search ? {no_invoice:{[Op.substring]: `${search}`}} : null,
              // status ? {transaction_status: status} : null,
              status == 'Menunggu Pembayaran'   ? 
              {[Op.or]: [{transaction_status: 'Resep Dokter'},{transaction_status: 'Menunggu Pembayaran'},{transaction_status: 'Menunggu Konfirmasi Pembayaran'}]}: status ? {transaction_status: status} : null,
              
              startDate && endDate ? {createdAt: 
                {[Op.between]: [startDate, endDate]}} : null, 
              ]
            },
            order: orderby == 'no_invoice' && sort ? [[`${orderby}`, `${sort}`]] : 
            orderby == 'createdAt' && sort ? [[`${orderby}`, `${sort}`]]
            : [["createdAt", "DESC"]],
        });

      return res.status(200).json({
        message: "fetching data Transaksi",
        result: findTransaction,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Upload Payment -------------------- //
  uploadPayment: async (req, res) => {
    try {
      const { noInvoice } = req.params;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "payment_images";
      const { filename } = req.file;
      
      // get payments id
      const getpaymentId =  await Payment.max('id');
      var newPaymentId = getpaymentId + 1;

      const addPaymentProof = await Payment.create(
        { 
          image_url: `${uploadFileDomain}/${filePath}/${filename}`,
        },
      )

      await Transaction.update(
        { 
          id_payment: newPaymentId,
          transaction_status:"Menunggu Konfirmasi Pembayaran",
          cancel_description:'',
        },
        {
          where: {no_invoice : noInvoice},
        }
      )

      return res.status(200).json({
        message: "Sukses upload bukti transfer",
        result : addPaymentProof
      });
    } catch (err) {
      console.log(err);
      // res.status(500).json({
      //   message: "File image tidak boleh lebih dari 1MB",
      // });
      return res.status(200).json({
        message: "File image tidak boleh lebih dari 1MB",
      });
    }
  },

  // -------------------- Upload Recipe -------------------- //
  uploadRecipe: async (req, res) => {
    try {
      const { idUser } = req.params;
      const { note, id_address } = req.body;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "recipes_images";
      const { filename } = req.file;
      
      const newUploadRecipe = await Upload_recipe.create(
        { 
          image_recipe: `${uploadFileDomain}/${filePath}/${filename}`,
          id_user: idUser,
          note,
        },
      )

      // ---------- get the Inv Number ---------- //
      // get month and year 
      var datenow= new Date() ;
      var day = datenow.getDate();
      var month = datenow.getMonth() + 1 ;
      var year = datenow.getFullYear();
      if(month <= 10) {
        month = '0'+ (datenow.getMonth() + 1)
      }
       // get transaction id
      const gettransactionId =  await Transaction.max('id');
      var newTransactionId = gettransactionId + 1;
      if(newTransactionId < 10) {newTransactionId = '000'+ (gettransactionId + 1)}
      else if(newTransactionId < 100) {newTransactionId = '00'+ (gettransactionId + 1)}
      else if(newTransactionId < 1000) {newTransactionId = '0'+ (gettransactionId + 1)}
      // no Invoice
      var noInvoice = 'HM-INV-' + month.toString() + year.toString().substr(-2)  + newTransactionId 

      const newTransaction = await Transaction.create({
        no_invoice: noInvoice, transaction_status :'Resep Dokter',id_user : idUser, note,id_address ,id_payment: 1, id_upload_recipe: newUploadRecipe.id
      });

      return res.status(200).json({
        message: "Sukses upload Resep dokter",
        result : [newUploadRecipe, newTransaction]
      });
    } catch (err) {
      console.log(err);
      //  res.status(400).json({
      //   message: err.toString(),
      // });
      return res.status(200).json({
        message: "File image tidak boleh lebih dari 1MB",
      });
    }
  },

   // -------------------- Change transaction status -------------------- //
  editTransactionStatus: async (req, res) => {
    try {
      const { noInvoice } = req.params;
      const { transaction_status } = req.body;
      
      // Jika status dikirim maka potong stok
      if(transaction_status == 'Dikirim') {
      // Mengambil Id Transaksi 
      const findTransactionId = await Transaction.findOne({
        where: { no_invoice: noInvoice },
      });

      // Mengambil data list Transaksi
      const findTransactionList = await Transaction_list.findAll({
        include: [
          { model : User },
          { model : Product,
            include : [
              { model: Product_stock,
                include : [{model: Unit}],
              }, 
              ],
          },
        ],
        where: {id_transaction: findTransactionId.id},
      });

      const renderTransactionList = () => { 
        return findTransactionList.map((val) => {
        // Mapping Panggil Product Stock untuk diupdate
        let newStokUpdate = val.id_unit == val.Product.Product_stocks[0].id_unit ? val.Product.Product_stocks[0].stock - val.buy_quantity : val.Product.Product_stocks[1].stock - val.buy_quantity 
        let newTotalSold = val.id_unit == val.Product.Product_stocks[0].id_unit ? val.Product.Product_stocks[0].total_sold + val.buy_quantity : val.Product.Product_stocks[1].total_sold + val.buy_quantity
        // console.log('tes find ' +  val.Product.Product_stocks[0].stock);
        // console.log('tes find ' +  val.Product.Product_stocks[0].Unit.id);
        // console.log('tes find id uni' + val.id_unit);
        // console.log('tes val cart ' + val.buy_quantity);
        
        Product_stock.update({stock: newStokUpdate, total_sold:newTotalSold}, {
        where: {
          [Op.and]: [
            { id_unit: val.id_unit},
            { id_product: val.id_product, }
          ]
        },});
        
        // tambah data stock history
        Stock_history.create({
        type: 'Penjualan', description: 'pengurangan', quantity : val.buy_quantity, id_product: val.id_product, id_unit: val.Product.Product_stocks[0].Unit.id, 
        });
      })
    }
    renderTransactionList()
    await Transaction.update(
          { 
            ...req.body, 
          },
          {
            where: {
              no_invoice : noInvoice,
            },
          }
        )

    return res.status(200).json({
        message: "Berhasil mengirimpesanan",
      });
    } else if (transaction_status == 'Resep Dokter') 
    {
      await Transaction.update(
          { 
            ...req.body, 
            transaction_status: 'Menunggu Pembayaran', 
          },
          {
            where: {
              no_invoice : noInvoice,
            },
          }
        )
        return res.status(200).json({
          message: "Transaction status changed",
        });
      
    } else {
      await Transaction.update(
          { 
            ...req.body, 
          },
          {
            where: {
              no_invoice : noInvoice,
            },
          }
        )
        return res.status(200).json({
          message: "Transaction status changed",
        });
    }

    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  },

  //  // -------------------- Change transaction status -------------------- //
  // editTransactionStatus: async (req, res) => {
  //   try {
  //     const { noInvoice } = req.params;
  //     const { transaction_status } = req.body;
      
  //     // Jika status dikirim maka potong stok
  //     if(transaction_status == 'Dikirim') {
  //     // Mengambil Id Transaksi 
  //     const findTransactionId = await Transaction.findOne({
  //       where: { no_invoice: noInvoice },
  //     });

  //     // Mengambil data list Transaksi
  //     const findTransactionList = await Transaction_list.findAll({
  //       include: [
  //         { model : User },
  //         { model : Product,
  //           include : [
  //             { model: Product_stock,
  //               include : [{model: Unit}],
  //             }, 
  //             ],
  //         },
  //       ],
  //       where: {id_transaction: findTransactionId.id},
  //     });

  //     const renderTransactionList = () => { 
  //       return findTransactionList.map((val) => {
  //       // Mapping Panggil Product Stock untuk diupdate
  //       let newStokUpdate = val.Product.Product_stocks[0].stock - val.buy_quantity
  //       let newTotalSold = val.buy_quantity + val.Product.Product_stocks[0].total_sold
  //       // console.log('tes find ' +  val.Product.Product_stocks[0].stock);
  //       // console.log('tes find ' +  val.Product.Product_stocks[0].Unit.id);
  //       // console.log('tes find id uni' + val.id_unit);
  //       // console.log('tes val cart ' + val.buy_quantity);
        
  //       Product_stock.update({stock: newStokUpdate, total_sold:newTotalSold}, {
  //       where: {
  //         [Op.and]: [
  //           { id_unit:val.id_unit},
  //           { id_product: val.id_product, }
  //         ]
  //       },});
        
  //       // tambah data stock history
  //       Stock_history.create({
  //       type: 'Penjualan', description: 'pengurangan', quantity : val.buy_quantity, id_product: val.id_product, id_unit: val.Product.Product_stocks[0].Unit.id, 
  //       });
  //     })
  //   }
  //   renderTransactionList()
  //   await Transaction.update(
  //         { 
  //           ...req.body, 
  //         },
  //         {
  //           where: {
  //             no_invoice : noInvoice,
  //           },
  //         }
  //       )

  //   return res.status(200).json({
  //       message: "Berhasil mengirimpesanan",
  //     });
  //   } else {
  //     await Transaction.update(
  //         { 
  //           ...req.body, 
  //         },
  //         {
  //           where: {
  //             no_invoice : noInvoice,
  //           },
  //         }
  //       )
  //       return res.status(200).json({
  //         message: "Transaction status changed",
  //       });
  //   }

  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       message: err.toString(),
  //     });
  //   }
  // },

// -------------------- Serve Custom Order Progress (Docter Ricepe) -------------------- //
  serveCustomOrder: async (req, res) => {
    try {
      const { buy_quantity, id_user, id_product, id_unit, id_transaction } = req.body;
      
      // ---------------  Mengambil produk stok --------------- //
      const findproduct = await Product_stock.findOne({
        where: {
          [Op.and]: [
            { id_product: id_product, },
            { id_unit: id_unit, }
          ]
        },
      });
      // ---------------  Kondisi jika buy qty lebih besar dari stok maka error --------------- //
      if (buy_quantity > findproduct.stock ) {
        throw new Error("Maaf produk stok tidak mencukupi");
      }

      // --------------- Mengambil data order --------------- //
      const findOrderProduct = await Transaction_list.findOne({
        where: {
          [Op.and]: [
          { id_user: id_user, },
          { id_product: id_product,},
          { id_unit: id_unit, },
          { id_transaction: id_transaction, }
          ]
        },
      });
      
      // mengecek kondisi jika data order dengan id user dan id product dan id transaksi sudah ada maka melakukan update qty buy saja --------------- //
      let addProduct
      if (!findOrderProduct) {
          addProduct= await Transaction_list.create({
          buy_quantity, 
          price: parseFloat(findproduct.selling_price), 
          total_price:parseFloat(findproduct.selling_price * buy_quantity) , 
          id_user, 
          id_product, 
          id_unit, 
          id_transaction
          });
        } else {
          let newQuantity = parseInt(buy_quantity) + parseInt(findOrderProduct.buy_quantity)

          if (newQuantity > findproduct.stock ) {
            throw new Error("Maaf quantity melebihi produk stok");
          } else {
          addProduct= await Transaction_list.update({
          buy_quantity: newQuantity, 
          price: parseFloat(findproduct.selling_price), 
          total_price:parseFloat(newQuantity) * parseFloat(findproduct.selling_price), 
          },
          {where: {
          [Op.and]: [
          { id_user: id_user, },
          { id_product: id_product, },
          { id_unit: id_unit, },
          { id_transaction: id_transaction, }
          ]
          },}
          );
          
          }
        }

      // Mengambil data Transaksi untuk update total price //
      const findOrderTransaction= await Transaction.findOne({
        where: {
          [Op.and]: [
          { id_user: id_user, },
          { id: id_transaction, }
          ]
        },
      });
      
      let newTotalTransaction = findOrderTransaction.total_transaction + parseFloat(findproduct.selling_price * buy_quantity)
      await Transaction.update(
        {
          total_transaction: parseFloat(newTotalTransaction), 
          total_paid: parseFloat(newTotalTransaction), 
        },
        {
          where: {id: id_transaction},
        }
      )
          return res.status(201).json({
          message: "Berhasil menambah data list transaksi",
          result: addProduct})
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Edit Transaction List (Serve Custome Order / Docter Recipe) -------------------- //
  editTransactionList: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_transaction, buy_quantity, total_price, price } = req.body;

      // Mengambil data Transaksi untuk update total price //
      const findOrderTransaction= await Transaction.findOne({
        where: {
          id: id_transaction,
        },
      });
      
      let newTotalPrice = buy_quantity * price
      let newTotalTransaction = (findOrderTransaction.total_transaction - total_price) + newTotalPrice
      await Transaction.update(
        {
          total_transaction: parseFloat(newTotalTransaction), 
          total_paid: parseFloat(newTotalTransaction), 
        },
        {
          where: {id: id_transaction},
        }
      )

      await Transaction_list.update(
        {
          buy_quantity: buy_quantity, 
          total_price: parseFloat(newTotalPrice), 
        },
        {
        where: { id },
        });

      return res.status(200).json({
        message: "Berhasil Update data Order List",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Delete Transaction List (Serve Custome Order / Docter Recipe) -------------------- //
  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_transaction, total_price } = req.body;

      // Mengambil data Transaksi untuk update total price //
      const findOrderTransaction= await Transaction.findOne({
        where: {
          id: id_transaction,
        },
      });
      
      let newTotalTransaction = findOrderTransaction.total_transaction - total_price
      await Transaction.update(
        {
          total_transaction: parseFloat(newTotalTransaction), 
          total_paid: parseFloat(newTotalTransaction), 
        },
        {
          where: {id: id_transaction},
        }
      )

      await Transaction_list.destroy({
        where: { id },
        });

      return res.status(200).json({
        message: "Berhasil menghapus data List Transaksi",
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
