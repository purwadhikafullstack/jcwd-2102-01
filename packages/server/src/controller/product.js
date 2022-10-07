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
  getProductPagingAdminRacik: async (req, res) => {
    try {
      const { limit , page = 1, search} = req.query;

        findProduct= await Product_stock.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        include: [
          { model: Product,
            include : [
            { model: Product_description },
            { model : Product_category,
              include: {model: Category}
            },
            { model : Product_image},
          ],
          where: {
            [Op.and]: [
              {is_deleted: {[Op.notIn]:['yes']}},
              search ? {[Op.or]: [
                { product_name: {[Op.substring]: `${search}`} },
                { product_code: {[Op.substring]: `${search}`}}        
              ]} : null
          ],
        },
      },
      {model: Unit}
      ],
      // order: [[Product,'product_name', 'ASC']],
      });

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


  //! -- Jason --
  // -------------------- get Product Admin-------------------- //
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
            where: category || category2 || category3 ? {
            [Op.or]: [{category: `${category}`}, {category: `${category2}`},{category: `${category3}`}, ]
            } : {}
          }],
          },
          { model : Product_stock,
            include: [{model: Unit}],
            where: {
            converted: {[Op.notIn]:[1]}
            }
          },
          { model : Product_image,
          },
        ],
        order: orderby == 'product_name' && sort ? [[`${orderby}`, `${sort}`]] : 
        orderby == 'selling_price' && sort ? [[Product_stock, `${orderby}`, `${sort}`]]
        :[],
        
      });
      } else {
        findProduct= await Product.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        where: {
          product_name: {
          [Op.substring]: `${search}`
          }
        },
        include: [
          { model: Product_description },
          { model: Product_category,
            include: [{model: Category, 
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

  // -------------------- get Unit -------------------- //
  getUnit: async(req, res) =>{
  try{
    const newUnit = await Unit.findAll({
      include:{
        model: Product_stock,
        include: Product
      },
      order: ["unit_name"],
    });
    return res.status(200).json({
      message: "fetching data",
      result: newUnit,
    })
  }catch(err){
    console.log(err);

    res.status(400).json({
      message: err. toString()
    })
  }
},

  // -------------------- Add Product -------------------- //
  addProduct: async (req, res) => {
        try{
            const { product_name, product_code, kegunaan, kemasan, golongan, cara_simpan, nomor_ijin_edar,id_produk_description, cara_pakai, peringatan, weight, komposisi, stock, capital_price, selling_price, converted, isi_perkemasan, total_sold, first_price, margin, id_category, id_unit, image_url, quantity, type, description} = req.body;
          // console.log(req.body)
          console.log(id_unit)
          console.log(id_category)
          const newProdDec = await Product_description.create({
              kegunaan: `${kegunaan}`,
              kemasan: `${kemasan}`,
              golongan: `${golongan}` ,
              cara_simpan: `${cara_simpan}` ,
              nomor_ijin_edar: `${nomor_ijin_edar}` ,
              cara_pakai: `${cara_pakai}`,
              peringatan:`${peringatan}`,
              weight:`${weight}`,
              komposisi:`${komposisi}`,
              
            });

              const newProd = await Product.create({
                  product_name: `${product_name}`,
                  // product_price: `${price}`,
                  product_code: `${product_code}`,
                  is_deleted: "no",
                  id_produk_description:newProdDec.id,
                   
              });
              const newProdCatCom = await Product_category.create({
                id_product: newProd.id,
                id_category,
            });

          const newProdStock = await Product_stock.create({
              stock: `${stock}`,
              capital_price: parseFloat(`${capital_price}`),
              selling_price:parseFloat(`${selling_price}`),
              converted: `${converted}`,
              isi_perkemasan: parseInt(`${isi_perkemasan}`),
            total_sold: parseFloat(`${total_sold}`),
              first_price: parseFloat(`${first_price}`),
              id_product: newProd.id,
              margin: parseFloat(`${margin}`),
              id_unit,
          });

          const newStockHistory = await Stock_history.create({
            quantity: newProdStock.stock,
              type:`update stock`,
              description:`penambahan`,
              id_product: newProd.id,
              id_unit: newProdStock.id_unit 
          });
          
          const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
          const filePath = "product_images";
          const { filename } = req.file;
          const newProdImage = await Product_image.create({
              image_url:`${uploadFileDomain}/${filePath}/${filename}`,
              id_product: newProd.id
          })
            return res.status(201).json({
                message:"Product terbuatkan",
                result: [newProd, newProdDec, newStockHistory ,newProdStock, newProdCatCom, newProdImage]
              });
        }catch(err){
        console.log(err);
        return res.status(500).json({
        message: err.toString(),
        })
        }
    },

  // -------------------- Edit Product -------------------- //
    editProduct: async (req, res) => {
        try {
          console.log("masukedit");
                const { id } = req.params;
                const { product_name, product_code, kegunaan, kemasan, golongan, cara_simpan, nomor_ijin_edar, cara_pakai, peringatan, weight, komposisi, stock, capital_price, selling_price, converted, isi_perkemasan, total_sold, first_price, margin, id_category,namacategory, image_url} = req.body
                const product = {
                  product_code,
                  product_name,
                }
                console.log(req.body);
                const product_desc = {
                  kegunaan, kemasan, golongan, cara_simpan, nomor_ijin_edar, cara_pakai, peringatan, weight, komposisi,
                }

                const prod_stock = {
                  stock, capital_price, selling_price, converted, isi_perkemasan, total_sold, first_price, margin,
                }
                //kasih proteksi
                const prod_img ={
                  image_url
                }
                const upProd = await Product.update(
                  {
                    ...product,
                  },
                  {
                    where: {
                      id,
                    },
                  }
                  );
                  console.log(upProd)

                const prod_category={
                  id_product:upProd.id,
                  id_category
                }
                const prod = await Product.findOne(
                  {
                    where:{
                      id,
                    },
                  }
                  )
                  
                  const upProdDec = await Product_description.update(
                    {
                      ...product_desc,
                    },
                    {
                      where: {
                        id: prod.id_produk_description,
                      },
                    }
                    );

                    const idprodStock = await Product.findAll(
                      {
                        where:{
                          id,
                        },
                      }
                    )
                const upProdStock = await Product_stock.update(
                  {
                    ...prod_stock,
                  },
                  {
                    where: {
                      id: prod_stock.id_product,
                    },
                  }
                );
                const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
                const filePath = "product_images";
                const { filename } = req.file;  
                
                const upProdImg = await Product_image.update(
                  {
                    image_url: `${uploadFileDomain}/${filePath}/${filename}`,
                  },
                  {
                    where: {
                      id,
                    },
                  }
                )
                return res.status(200).json({
                  message: "Product sudah diedit",
                  result: [upProd, upProdDec, upProdStock, upProdImg]
                });
              } catch (err) {
                console.log(err);
                res.status(500).json({
                  message: err.toString(),
                });
              }
              },

  // -------------------- Deleted Product -------------------- //
  deleteButtonProduct: async (req, res) => {
    try {
        const { id } = req.params;
        const { is_deleted } = req.body
        const deleted = {is_deleted}
        const delBut = await Product.update(
          {
            is_deleted: "yes"
          },
          {
          where:{
            id,
          },
          }
          )

        return res.status(200).json({
          message: "Product sudah dideleted",
          result: [delBut]
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: err.toString(),
        });
      }
    },
};

module.exports = productController;
