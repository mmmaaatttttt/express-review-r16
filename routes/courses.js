const express = require("express");
const Course = require("../models/Course");

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

// add a course
// router.post("/")

module.exports = router;
