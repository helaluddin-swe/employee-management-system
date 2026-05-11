import { checkLimit } from "../utils/checkLimit.js";

export const ipRateLimiter = async (req, res, next) => {
  // FIXED: Changed user.ip to req.ip
  const key = `ip_${req.ip}`; 
  const limit = 15;
  const windowMs = 60 * 1000; // 1 minute

  const status = await checkLimit(key, limit, windowMs);

  if (!status.allowed) {
    return res.status(429).json({
      error: "Too many requests from this IP address. Please try again in 1 minute."
    });
  }
  next();
};

export const userRateLimiter = async (req, res, next) => {
  const userId = req.session?.userId?.toString();

  if (!userId) {
    return res.status(401).json({ error: "Login required" });
  }

  const key = `user_${userId}`;
  const limit = 30;
  const windowMs = 60 * 1000; // 1 minute

  const status = await checkLimit(key, limit, windowMs);

  if (!status.allowed) {
    return res.status(429).json({
      error: "Your account request limit has been exceeded. Please try again later."
    });
  }
  next();
};