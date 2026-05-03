require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/product.routes");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});