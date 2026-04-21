const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/products", require("./src/routes/product.routes"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.listen(8080, () => console.log("Server running on port 8080"));