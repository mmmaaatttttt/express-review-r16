const jsonschema = require("jsonschema");
const courseSchema = require("../schemas/courseSchema");
const instructorSchema = require("../schemas/instructorSchema");
const ExpressError = require("../expressError");

function ensureValidCourse(req, res, next) {
  const result = jsonschema.validate(req.body, courseSchema);

  if (!result.valid) {
    // pass validation errors to error handler
    //  (the "stack" key is generally the most useful)
    let listOfErrors = result.errors.map(error => error.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  return next();
}

function ensureValidInstructor(req, res, next) {
  const result = jsonschema.validate(req.body, instructorSchema);

  if (!result.valid) {
    // pass validation errors to error handler
    //  (the "stack" key is generally the most useful)
    let listOfErrors = result.errors.map(error => error.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  return next();
}

module.exports = { ensureValidCourse, ensureValidInstructor };
