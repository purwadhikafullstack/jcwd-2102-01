const express = require("express");
const router = express.Router();

const { transactionsController } = require("../controller");

// -------------------- add to Cart
router.post("/addCart/:idUser", transactionsController.addToCart);

// -------------------- Show the cart user
router.get("/getCart/:id", transactionsController.getCartUser);

// -------------------- Show all couriers
router.get("/getCouriers", transactionsController.getAllCouriers);

// -------------------- edit address
router.patch("/:id", transactionsController.editAddress);

// -------------------- delete address
router.delete("/:id", transactionsController.deleteCart);

module.exports = router;
