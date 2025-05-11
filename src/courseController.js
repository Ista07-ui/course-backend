// src/courseController.js

// Placeholder for MySQL connection
// const db = require('./db'); // You'll need to set up your database connection in a separate file

// In-memory array to store course data
let courses = [];

const courseController = {
  /**
   * Create a new course.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  createCourse: (req, res) => {
    // Extract course data from request body
    const newCourse = req.body;
    
    // Simple validation (you can add more robust validation)
    if (!newCourse.title || !newCourse.summary) {
      return res.status(400).json({ message: 'Title and summary are required' });
    }

    // Assign a unique ID (for in-memory storage)
    newCourse.id = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;

    // Add the new course to the in-memory array
    courses.push(newCourse);

    // TODO: Implement database interaction to create a new course in the MySQL database
    // Example: db.query('INSERT INTO courses SET ?', newCourse, (err, result) => { ... });

    res.status(201).json({ message: 'Course created successfully', data: newCourse });
  },


  /**
   * Get all courses.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  getCourses: (req, res) => {
    // TODO: Implement database interaction to fetch all courses from the MySQL database
    // Example: db.query('SELECT * FROM courses', (err, results) => { ... });

    res.status(200).json({ message: 'Courses fetched successfully', data: courses });
  },

  /**
   * Get a course by ID.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  getCourseById: (req, res) => {
    const courseId = req.params.id;
    const id = parseInt(courseId); // Ensure ID is a number

    // Find the course in the in-memory array
    const course = courses.find(c => c.id === id);

    // TODO: Implement database interaction to fetch a course by ID from the MySQL database
    // Example: db.query('SELECT * FROM courses WHERE id = ?', [courseId], (err, result) => { ... });

    if (course) {
      res.status(200).json({ message: 'Course fetched successfully', data: course });
    } else {
      res.status(404).json({ message: `Course with ID ${courseId} not found` });
    }
  },

  /**
   * Update a course by ID.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  updateCourse: (req, res) => {
    const courseId = req.params.id;
    const updatedCourseData = req.body;

    const id = parseInt(courseId); // Ensure ID is a number

    // Find the index of the course in the in-memory array
    const index = courses.findIndex(c => c.id === id);

    // TODO: Implement database interaction to update a course by ID in the MySQL database
    // Example: db.query('UPDATE courses SET ? WHERE id = ?', [updatedCourseData, courseId], (err, result) => { ... });

    if (index !== -1) {
      // Update the course data (merge existing data with updated data)
      courses[index] = { ...courses[index], ...updatedCourseData, id: id }; // Ensure ID remains the same
      res.status(200).json({ message: `Course with ID ${courseId} updated successfully`, data: courses[index] });
    } else {
      res.status(404).json({ message: `Course with ID ${courseId} not found` });
    }
  },
  
  /**
   * Delete a course by ID.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  deleteCourse: (req, res) => {
    const courseId = req.params.id;

    // TODO: Implement database interaction to delete a course by ID from the MySQL database
    // Example: db.query('DELETE FROM courses WHERE id = ?', [courseId], (err, result) => { ... });

    console.log('Deleting course with ID:', courseId);

    // Placeholder response
    res.status(200).json({ message: `Delete course endpoint - Not implemented yet for ID: ${courseId}` });
  },
};

module.exports = courseController;