import { json } from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.auhorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ error: "unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const session = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!session) return res.status(401).json({ error: "unauthorized" });

    if (!session) {
      return res.status(401).json({ error: "Not authorized" });
    }
    req.session = session;
    next();
  } catch (error) {
    return res.status(500).json({ error: "unauthorized" });
  }
};
export const protectAdmin = async (req, res, next) => {
  if (req?.session.role !== "ADMIN") {
    return res.status(403).json({ error: "admin access requied" });
  }
  next();
};

