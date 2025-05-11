const express = require('express');
const router = express.Router();
const courseController = require('./courseController');

// POST /course (Create Course)
router.post('/', courseController.createCourse);

// GET /course (Get All Courses)
router.get('/', courseController.getCourses);

// GET /course/:id (Get Course by ID)
router.get('/:id', courseController.getCourseById);

// PUT /course/:id (Update Course)
router.put('/:id', courseController.updateCourse);

// DELETE /course/:id (Delete Course)
router.delete('/:id', courseController.deleteCourse);

module.exports = router;