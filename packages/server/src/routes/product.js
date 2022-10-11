const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");
const multer = require("multer");

const { productController } = require("../controller");
// // router.get("/", postController.getAllPost);

router.get("/", productController.getProductPaging);

router.get("/api/v1/products/admin", productController.getProductPagingAdminRacik);

router.get("/productDetail/:code", productController.getProductById);

router.get("/productImage/:id", productController.getProductImageById);

//! -- Jason -- 
router.get("/api/v1/productsAdmin", productController.getProductPagingAdmin);

router.get("/api/v1/units", productController.getUnit);

router.post("/api/v1/product",
fileUploader({
    destinationFolder: "product_images",
    fileType: "image",
    prefix: "POST",
  }).single("image"),
productController.addProduct);

router.patch("/:id",
fileUploader({
  destinationFolder: "product_images",
  fileType: "image",
  prefix: "POST",
}).single("image_url"),
productController.editProduct);

router.patch("/api/v1/product/:id", productController.deleteButtonProduct)

router.post("/api/v1/product/:id", productController.convertionButton)

module.exports = router;
