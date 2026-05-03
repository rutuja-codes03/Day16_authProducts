const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth.controller");
const { getAllUsers } = require("../controllers/auth.controller");
// AUTH ROUTES
router.post("/signup", signup);
router.post("/login", login);

router.get("/users", getAllUsers);
module.exports = router;