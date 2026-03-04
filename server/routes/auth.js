// filepath: server/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../middleware/auth.js";

const router = express.Router();

// In production replace with a real DB
const ADMIN = {
  username: "admin",
  // password: "admin123" (hashed below)
  passwordHash: bcrypt.hashSync("admin123", 10),
};

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN.username) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, ADMIN.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });

  res.json({ success: true, username });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

// GET /api/auth/me
router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ user: null });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded.username });
  } catch {
    res.json({ user: null });
  }
});

export default router;
