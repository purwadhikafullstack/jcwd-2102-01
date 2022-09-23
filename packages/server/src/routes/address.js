const express = require("express");
const router = express.Router();

const { addressController } = require("../controller");

// -------------------- get address dari user id
router.get("/user/:id", addressController.getAddressUser);

// -------------------- get address dari address id (default address)
router.get("/addressid/:id", addressController.getAddressId);

// -------------------- add address
router.post("/add/:idUser", addressController.addAddress);

// -------------------- edit address
router.patch("/:id", addressController.editAddress);

// -------------------- delete address
router.patch("/api/v1/address/:idAddress/user/:idUser", addressController.deleteAddress);

// -------------------- delete address
// router.delete("/:id", addressController.deleteAddress);

module.exports = router;
