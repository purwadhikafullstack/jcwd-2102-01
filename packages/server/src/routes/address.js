const express = require("express");
const router = express.Router();

const { addressController } = require("../controller");

// -------------------- get address dari user id
router.get("/user/:id", addressController.getAddressUser);

// -------------------- add address
router.post("/add/:idUser", addressController.addAddress);

// -------------------- edit address
router.patch("/:id", addressController.editAddress);

// -------------------- delete address
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
