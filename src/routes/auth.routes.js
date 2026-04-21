const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth.middleware");
const { createProduct } = require("../controllers/product.controller");

// ✔ Protected route
router.post("/", verifyToken, createProduct);

module.exports = router;