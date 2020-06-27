const express = require("express");
const Course = require("../models/Course");
const { ensureValidCourse } = require("../middleware/validation");

const router = new express.Router();

// get all courses
router.get("/", async function (req, res, next) {
  try {
    const courses = await Course.all();
    return res.json({ courses });
  } catch (err) {
    next(err);
  }
});

// get a single course
router.get("/:id", async function (req, res, next) {
  try {
    const course = await Course.get(req.params.id);
    return res.json({ course });
  } catch (err) {
    next(err);
  }
});

// add a course
router.post("/", ensureValidCourse, async function (req, res, next) {
  try {
    const course = await Course.create(req.body);
    return res.json({ course });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
