import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import courseRoutes from "./routes/courses.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend domain
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
