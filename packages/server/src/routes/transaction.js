const express = require("express");
const router = express.Router();

const { transactionsController } = require("../controller");

// -------------------- add to Cart
router.post("/addCart/:idUser", transactionsController.addToCart);

// -------------------- Show the cart user
router.get("/getCart/:id", transactionsController.getCartUser);

// -------------------- Show all couriers
router.get("/getCouriers", transactionsController.getAllCouriers);

// -------------------- Create new Transaction
router.post("/newTrasanction/:id_user", transactionsController.newTransaction);

// -------------------- Create new Transaction Transaction List
// router.post("/newTrasanctionList/:id_user/product/:id_product", transactionsController.newTransactionList);

// -------------------- delete address
router.delete("/:id", transactionsController.deleteCart);

module.exports = router;
