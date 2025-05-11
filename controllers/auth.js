import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../connections/db.js";

export const registerUser = async (req, res) => {
  const { full_name, email, password, role, phone, avatar_url } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already registered" }); // 409 Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (full_name, email, password, role, phone, avatar_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [full_name, email, hashedPassword, role || "student", phone, avatar_url]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    }); // 201 Created
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error" }); // 500 Server Error
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
