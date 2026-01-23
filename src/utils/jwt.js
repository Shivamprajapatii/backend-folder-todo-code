import jwt from "jsonwebtoken";
// Create token
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};
// Verify token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

