import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        // 1. Read Authorization header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Login required"
            });
        }
        // 2. Extract token
        const token = authHeader.split(" ")[1];

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach logged-in user info
        req.user = decoded;

        // 5. Allow CRUD operation
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}
