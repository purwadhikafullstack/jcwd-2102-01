const { Category, Product_category, Product, Product_stock, Stock_history, Product_description, Product_image, Unit } = require("../lib/sequelize");
const { Op } = require("sequelize");

const productController = {
  // -------------------- get all product untuk mengambil semua data product yang akan ditampilkan di home perlimit -------------------- //
  getProductPaging: async (req, res) => {
    try {
      const { limit , page = 1, search, category, category2, category3, sort, orderby } = req.query;
      
      let findProduct

      if(!search) {
        findProduct= await Product.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        include: [
          { model: Product_description },
          { model : Product_category,
            include: [{model: Category, 
            // where: category ? { category: `${category}`} : {}
            where: category || category2 || category3 ? {
            [Op.or]: [{category: `${category}`}, {category: `${category2}`},{category: `${category3}`}, ]
            } : {}
          }],
          },
          { model : Product_stock,
            include: [{model: Unit}],
            where: {
            converted: {[Op.notIn]:['yes']}
            }
          },
          { model : Product_image,
          },
        ],
        order: orderby == 'product_name' && sort ? [[`${orderby}`, `${sort}`]] : 
        orderby == 'selling_price' && sort ? [[Product_stock, `${orderby}`, `${sort}`]]
        :[],
        where: {
            is_deleted: {[Op.notIn]:['yes']}
            }
      });
      } else {
        findProduct= await Product.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        where: {
          [Op.and]: [
            { product_name: {[Op.substring]: `${search}`} },
            { is_deleted: {[Op.notIn]:['yes']} }
          ]
        },
        include: [
          { model: Product_description },
          { model : Product_category,
            include: [{model: Category, 
            // where: category ? { category: `${category}`} : {}
            where: category || category2 || category3 ? {
            [Op.or]: [{category: `${category}`}, {category: `${category2}`},{category: `${category3}`}, ]
            } : {}
          }],
          },
          { model : Product_stock,
            include: [{model: Unit}],
            where: {
            converted: {[Op.notIn]:['yes']}
            }
          },
          { model : Product_image,
          },
        ],
        order: orderby == 'product_name' && sort ? [[`${orderby}`, `${sort}`]] : 
        orderby == 'selling_price' && sort ? [[Product_stock, `${orderby}`, `${sort}`]]
        :[],
      });
      }

      return res.status(200).json({
        message: "fetching data",
        result: findProduct,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- get all product untuk mengambil semua data product yang akan ditampilkan di Admin -------------------- //
  getProductPagingAdmin: async (req, res) => {
    try {
      const { limit , page = 1, search, category, category2, category3, sort, orderby } = req.query;
      
      let findProduct

      if(!search) {
        findProduct= await Product.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        include: [
          { model: Product_description },
          { model : Product_category,
            include: [{model: Category, 
            // where: category ? { category: `${category}`} : {}
            where: category || category2 || category3 ? {
            [Op.or]: [{category: `${category}`}, {category: `${category2}`},{category: `${category3}`}, ]
            } : {}
          }],
          },
          { model : Product_stock,
            include: [{model: Unit}],
          },
          { model : Product_image,
          },
        ],
        order: orderby == 'product_name' && sort ? [[`${orderby}`, `${sort}`]] : 
        orderby == 'selling_price' && sort ? [[Product_stock, `${orderby}`, `${sort}`]]
        :[],
        where: {
            is_deleted: {[Op.notIn]:['yes']}
            }
      });
      } else {
        findProduct= await Product.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        where: {
          [Op.and]: [
            { product_name: {[Op.substring]: `${search}`} },
            { is_deleted: {[Op.notIn]:['yes']} }
          ]
        },
        include: [
          { model: Product_description },
          { model : Product_category,
            include: [{model: Category, 
            // where: category ? { category: `${category}`} : {}
            where: category || category2 || category3 ? {
            [Op.or]: [{category: `${category}`}, {category: `${category2}`},{category: `${category3}`}, ]
            } : {}
          }],
          },
          { model : Product_stock,
            include: [{model: Unit}],
          },
          { model : Product_image,
          },
        ],
        order: orderby == 'product_name' && sort ? [[`${orderby}`, `${sort}`]] : 
        orderby == 'selling_price' && sort ? [[Product_stock, `${orderby}`, `${sort}`]]
        :[],
      });
      }

      return res.status(200).json({
        message: "fetching data",
        result: findProduct,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  
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
            include: Unit,
            where: {
            converted: {[Op.notIn]:['yes']}
            }
          },
          { model : Product_image,
          },
        ],
        where: {
          [Op.and]: [
            {is_deleted: {[Op.notIn]:['yes']}},
            { product_code: code, }
          ]
          
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

      const findProductImage= await Product_image.findAll({
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
