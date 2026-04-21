// src/controllers/product.controller.js

const Product = require("../models/product.model");

// 📌 CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    // 1️⃣ Validate input
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // 2️⃣ Create product (THIS IS THE CODE YOU ASKED FOR)
    const newProduct = await Product.create({
      name,
      price,
      createdBy: req.user.id   // << 🔥 THIS IS THE LINE
    });

    // 3️⃣ Send response
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};