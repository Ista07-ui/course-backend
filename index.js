import express from "express";
import dotenv from "dotenv";
import courseRoutes from "./routes/courses.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/courses", courseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
