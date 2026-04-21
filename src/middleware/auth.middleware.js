const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Step 1: Check if token exists => Reads token from headers
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Step 2: Extract token => Extracts actual JWT
    const token = authHeader.split(" ")[1];

    try {
        // Step 3: Verify token => Verifies using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Step 4: Attach user info to request => Gets user data from token
        req.user = decoded; // user = {id, role} Without that, req.user will be undefined → destructuring error.

        // Step 5: Allow request to continue => Calls next() to continue
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token or expired token" });
    }   
};