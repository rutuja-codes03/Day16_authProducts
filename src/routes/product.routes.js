const express = require("express");
const router = express.Router();

const { getAllProducts, createProduct, deleteProduct } =
  require("../controllers/product.controller");

const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", getAllProducts);           // Public
router.post("/", verifyToken, createProduct); // Protected
router.delete("/:id", verifyToken, deleteProduct); // Protected

module.exports = router;