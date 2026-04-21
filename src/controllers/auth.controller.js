const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//SIGNUP CONTROLLER
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. Check duplicate email
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 5. Create JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        user.password = undefined; // remove password from response

        res.status(201).json({
            message: "User created successfully",
            token,
            user
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//LOGIN CONTROLLER
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3. Create JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        user.password = undefined; // hide password

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};