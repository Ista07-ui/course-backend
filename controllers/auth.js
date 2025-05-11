import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../connections/db.js";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "../utils/mailer.js";

export const registerUser = async (req, res) => {
  const { full_name, email, password, role, phone, avatar_url } = req.body;

  try {
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyToken = uuidv4();

    await pool.query(
      `INSERT INTO users (full_name, email, password, role, phone, avatar_url, verify_token)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        email,
        hashedPassword,
        role || "student",
        phone,
        avatar_url,
        verifyToken,
      ]
    );

    await sendVerificationEmail(email, verifyToken);

    res.status(201).json({
      token: verifyToken,
      message: "Registered successfully. Please verify your email.",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" }); // 404 Not Found
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    }); // 200 OK
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" }); // 500 Server Error
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Verification token required" });
  }

  try {
    const [user] = await pool.query(
      "SELECT id FROM users WHERE verify_token = ?",
      [token]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await pool.query(
      "UPDATE users SET is_verified = TRUE, verify_token = NULL WHERE id = ?",
      [user[0].id]
    );

    res.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
