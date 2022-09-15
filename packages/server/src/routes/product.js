const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");

const { productController } = require("../controller");
// // router.get("/", postController.getAllPost);

router.get("/", productController.getProductPaging);

// router.get("/user/:id", postController.getPostByUser);

router.get("/productDetail/:code", productController.getProductById);

router.get("/productImage/:id", productController.getProductImageById);


module.exports = router;
