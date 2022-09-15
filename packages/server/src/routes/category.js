const express = require("express");
const router = express.Router();

const { categoryController } = require("../controller");

// -------------------- get all category
router.get("/", categoryController.getCategory);

router.get("/idProduct/:id", categoryController.getCategoryByProduct);

router.post("/addCategory", categoryController.addCategory);

module.exports = router;
