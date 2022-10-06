const express = require("express");
const fileUploader = require("../lib/uploader");
const router = express.Router();

const { transactionsController } = require("../controller");

// -------------------- add to Cart
router.post("/api/v1/Cart/:idUser", transactionsController.addToCart);

// -------------------- Serve Custom Order
router.post("/api/v1/CustomOrder", transactionsController.serveCustomOrder);

// -------------------- Show the cart user
router.get("/api/v1/Carts/:idUser", transactionsController.getCartUser);

// -------------------- Show all couriers
router.get("/api/v1/Couriers", transactionsController.getAllCouriers);

// -------------------- Create new Transaction
router.post("/api/v1/Trasanction/:idUser", transactionsController.newTransaction);

// -------------------- Get All Transaction
router.post("/api/v1/Trasanctions", transactionsController.getAllTransaction);

// -------------------- Get Transaction Order
router.post("/api/v1/user/:idUser/invoice/:noInvoice", transactionsController.getUserTransactionOrder);

// -------------------- Change transaction status
router.patch("/api/v1/invoice/:noInvoice", transactionsController.editTransactionStatus);

// -------------------- Upload Payment proof
router.post(
  "/api/v1/payment/:noInvoice",
  fileUploader({
    destinationFolder: "payment_images",
    fileType: "image",
    prefix: "POST",
  }).single("image"),
  transactionsController.uploadPayment
);

// -------------------- Upload Recipes
router.post(
  "/api/v1/recipes/:idUser",
  fileUploader({
    destinationFolder: "recipes_images",
    fileType: "image",
    prefix: "POST",
  }).single("image"),
  transactionsController.uploadRecipe
);

// -------------------- delete Cart
router.delete("/:id", transactionsController.deleteCart);

// -------------------- edit Transaction List
router.post("/api/v1/recipes/transactionList/:id", transactionsController.editTransactionList);

// -------------------- delete Transaction List
router.post("/api/v2/recipes/transactionList/:id", transactionsController.deleteTransaction);

module.exports = router;
