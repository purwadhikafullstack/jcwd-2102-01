const express = require("express");
const router = express.Router();
const fileUploader = require ("../lib/uploader")
const multer = require("multer");

const { categoryController } = require("../controller");

// -------------------- get all category
router.get("/", categoryController.getCategory);

router.post("/api/v1/Category",
fileUploader({
    destinationFolder: "category_images",
    fileType: "image",
    prefix: "POST",
  }).single("image"),
categoryController.addCategory);

router.patch("/api/v1/Category/:id", categoryController.editCategory);

router.delete("/api/v1/Category/:id", categoryController.deleteCategory);

router.get("/idProduct/:id", categoryController.getCategoryByProduct);

module.exports = router;
