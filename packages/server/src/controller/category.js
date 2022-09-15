const { Category, Product_category, Product, Product_description,Product_stock, Produk_img } = require("../lib/sequelize");

const categoryController = {
  // -------------------- Get Category-------------------- //
  getCategory: async (req, res) => {
    try {
      const findCategory = await Category.findAll({
        include: {
          model: Product_category,
          include: Product
      },
        order: ["category"],
      });

      return res.status(200).json({
        message: "fetching data",
        result: findCategory,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Get Category by id Product-------------------- //
  getCategoryByProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const findCategoryByProduct = await Product_category.findAll({
        include: [{
          model: Product,
          include: Product_description
      }, {
        model: Category,
      }],
        order: ["id"], 
        where: {
            id_product: id,
          },
      });

      return res.status(200).json({
        message: "fetching data",
        result: findCategoryByProduct,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Add Category -------------------- //
  addCategory: async (req, res) => {
    try {
      const { category } = req.body;

      const newCategory = await Category.create({
        category
      });

      return res.status(201).json({
        message: "Category created",
        result: newCategory,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },

  

};

module.exports = categoryController;
