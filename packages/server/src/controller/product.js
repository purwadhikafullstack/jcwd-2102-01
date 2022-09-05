const { Category, Product_category, Product, Product_stock, Stock_history, Product_description, Product_img, Unit } = require("../lib/sequelize");
const { Op } = require("sequelize");

const productController = {
  // -------------------- get all product untuk mengambil semua data product yang akan ditampilkan di home perlimit -------------------- //
  getProductPaging: async (req, res) => {
    try {
      const { limit = 16, page = 1, search } = req.query;
      
      const findProduct= await Product.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        // where: {
        //   product_name: {
        //   [Op.like]: `%${search}%`
        //   }
        // },
        include: [
          {
            model: Product_description,
          },
          { model : Product_category,
            include: Category,
            // where: {id_category: '9'}
          },
          { model : Product_stock,
            include: Unit
          },
          { model : Product_img,
          },
        ],
        order: [["createdAt", "DESC"]],
        // where: {product_name: {[Op.like]: '%hat%'}}
      });
      
      return res.status(200).json({
        message: "fetching data",
        result: findProduct,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: "error ",
      });
    }
  },
  // // -------------------- get all product untuk mengambil semua data product yang akan ditampilkan di home perlimit -------------------- //
  // getProductPaging: async (req, res) => {
  //   try {
  //     const { limit = 16, page = 1 } = req.query;
      
  //     const findProduct= await Product.findAll({
  //       offset: (page - 1) * limit,
  //       limit: limit ? parseInt(limit) : undefined,
  //       include: [
  //         {
  //           model: Product_description,
  //         },
  //         { model : Product_category,
  //           include: Category
  //         },
  //         { model : Product_stock,
  //           include: Unit
  //         },
  //         { model : Product_img,
  //         },
  //       ],
  //       order: [["createdAt", "DESC"]],
  //       // where: {product_name: {[Op.like]: '%hat%'}}
  //     });
      
  //     return res.status(200).json({
  //       message: "fetching data",
  //       result: findProduct,
  //     });
  //   } catch (err) {
  //     console.log(err);

  //     res.status(400).json({
  //       message: "error ",
  //     });
  //   }
  // },
  
  // -------------------- get Detail Prouct by ID-------------------- //
  getProductById: async (req, res) => {
    try {
      const { code } = req.params;

      const findProductCode= await Product.findAll({
        include: [
          {
            model: Product_description,
          },
          { model : Product_category,
            include: Category
          },
          { model : Product_stock,
            include: Unit
          },
          { model : Product_img,
          },
        ],
        where: {
          product_code: code,
        },
      });

      return res.status(200).json({
        message: "fetching data",
        result: findProductCode,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: "error ",
      });
    }
  },

   // -------------------- get Image Product by ID-------------------- //
  getProductImageById: async (req, res) => {
    try {
      const { id } = req.params;

      const findProductImage= await Product_img.findAll({
        include: [
          {
            model: Product,
            include: Product_description
          },
        ],
        where: {
          id_product: id,
        },
      });

      return res.status(200).json({
        message: "fetching data",
        result: findProductImage,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: "error ",
      });
    }
  },
};

module.exports = productController;
