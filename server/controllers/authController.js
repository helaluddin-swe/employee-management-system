import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
// login for employee and admin
export const login = async (req, res) => {
  try {
    const { email, password, role_type } = req.body;
    if (!email || !password) {
      return res.status(404).json({ error: "Emil and password requied" });
    }
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (role_type === "admin" && role_type !== "ADMIN") {
      return res.status(401).json({
        error: "Not authorized as admin",
      });
    }
    if (role_type === "employee" && role_type !== "EMPLOYEE") {
      return res.status(401).json({
        error: "Not authorized as EMPLOYEE",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid" });
    }
    const payload = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.json({ user: payload, token });
  } catch (error) {
    return res.status(500).json({ error: "login failed" });
  }
};

// <SessionProvider session=
export const session = (req, res) => {
  const session = req.session;
  return res.json({ user: session });
};

// change password
export const changePassword = async (req, res) => {
  try {
    const session = req.session;
    const { currentPassword, newPassword } = req.body;
    if (!changePassword || !newPassword) {
      return res.status(400).json({ error: "both password are requied" });
    }
    const user = await User.findById(session.userId);
    if (!user) return res.json({ error: "user not found" });
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(404).json({ error: "current password is incorrent" });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(session.userId, { password: hashed });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed " });
  }
};
