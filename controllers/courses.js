import pool from "../connections/db.js";

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const {
      search,
      language,
      sortBy,
      sortOrder,
      limit = 10,
      page = 1,
    } = req.query;

    let baseQuery = "SELECT * FROM courses";
    const conditions = [];
    const params = [];

    // Search
    if (search) {
      conditions.push("(title LIKE ? OR summary LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    // Filter
    if (language) {
      conditions.push("language = ?");
      params.push(language);
    }

    // Where clause
    if (conditions.length > 0) {
      baseQuery += " WHERE " + conditions.join(" AND ");
    }

    // Sort
    const validSortFields = ["price", "average_review", "created_at", "title"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : null;
    const order = sortOrder === "desc" ? "DESC" : "ASC";

    if (sortField) {
      baseQuery += ` ORDER BY ${sortField} ${order}`;
    }

    // Pagination
    const limitInt = parseInt(limit, 10) || 10;
    const offset = (parseInt(page, 10) - 1) * limitInt;
    baseQuery += " LIMIT ? OFFSET ?";
    params.push(limitInt, offset);

    const [rows] = await pool.query(baseQuery, params);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM courses WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Course not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error while creating course:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create course
export const createCourse = async (req, res) => {
  try {
    const course = req.body;
    const fields = [
      "title",
      "summary",
      "description",
      "price",
      "cover_url",
      "language",
      "estimation",
      "is_having_certificate",
      "total_review_count",
      "average_review",
      "total_video_count",
    ];
    const values = fields.map((f) => course[f]);

    await pool.query(
      `INSERT INTO courses (${fields.join(
        ", "
      )}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values
    );

    res.status(201).json({ message: "Course created successfully" });
  } catch (err) {
    console.error("Error while creating course:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const course = req.body;
    const { id } = req.params;

    const [result] = await pool.query("SELECT * FROM courses WHERE id = ?", [
      id,
    ]);
    if (result.length === 0)
      return res.status(404).json({ error: "Course not found" });

    await pool.query("UPDATE courses SET ? WHERE id = ?", [course, id]);

    res.json({ message: "Course updated successfully" });
  } catch (err) {
    console.error("Error while creating course:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM courses WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Course not found" });

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Error while creating course:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
