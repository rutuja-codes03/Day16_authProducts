const Product = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const { name, price } = req.body;

  const product = await Product.create({
    name,
    price,
    createdBy: req.user.id
  });

  res.status(201).json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};