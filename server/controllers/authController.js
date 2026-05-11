import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // FIXED: Check if the user's DB role matches the role they sent in the request
    if (role && user.role !== role.toUpperCase()) {
      return res.status(403).json({ error: `Access denied. You are not an ${role}` });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    };

    // jwt.sign is usually synchronous; await is optional but fine
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.json({ user: payload, token });
  } catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
};

export const session = (req, res) => {
  // If using 'protect' middleware, user data is usually in req.user
  return res.json({ user: req.user || req.session });
};

export const changePassword = async (req, res) => {
  try {
    // Use req.user (from protect middleware) instead of req.session
    const userId = req.user?.userId || req.session?.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Both passwords are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash and save
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save(); 

    return res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Update failed" });
  }
};