import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Middleware to protect routes (User authentication)
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user and attach to req object
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next(); // ✅ Authorized, continue
    } catch (error) {
      console.error("Authentication Error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

/**
 * Middleware for Admin Access Control
 */
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next(); // ✅ User is admin
  } else {
    return res.status(403).json({ message: "Access Denied. Admins only!" });
  }
};
