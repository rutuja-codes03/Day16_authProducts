const express = require("express");
const router = express.Router();

const {
    createProduct,
    deleteProduct
} = require("../controllers/product.controller");

const { verifyToken } = require("../middleware/auth.middleware");

// ✅ ONLY logged-in users can create product
router.post("/", verifyToken, createProduct);

// ✅ ONLY logged-in users can delete product
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;