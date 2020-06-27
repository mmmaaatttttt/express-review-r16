const express = require("express");
const Instructor = require("../models/Instructor");
const { ensureValidInstructor } = require("../middleware/validation");

const router = new express.Router();

// TODO: use async / await instead!

// get all instructors
router.get("/", function (req, res, next) {
  Instructor.all()
    .then(results => res.json({ instructors: results.rows }))
    .catch(err => next(err));
});

// add an instructor
router.post("/", ensureValidInstructor, async function (req, res, next) {
  Instructor.create(req.body)
    .then(result => res.json({ instructor: result.rows[0] }))
    .catch(err => next(err));
});

module.exports = router;
