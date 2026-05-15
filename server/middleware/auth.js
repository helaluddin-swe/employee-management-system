import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    // 1. Fixed typo: authorization
    const authHeader = req.headers.authorization; 
    
    // 2. Added space to "Bearer " safety check
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const session = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!session) {
      return res.status(401).json({ error: "unauthorized" });
    }

    // Attach decoded token data to the request object
    req.session = session;
    next();
  } catch (error) {
    // 4. Changed from 500 to 401 for token validation failures
    return res.status(401).json({ error: "unauthorized" });
  }
};

export const protectAdmin = async (req, res, next) => {
  // Added optional chaining check for req.session safety
  if (!req.session || req.session.role !== "ADMIN") {
    return res.status(403).json({ error: "admin access required" });
  }
  next();
};