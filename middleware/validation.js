const jsonschema = require("jsonschema");
const courseSchema = require("../schemas/courseSchema");
const instructorSchema = require("../schemas/instructorSchema");
const ExpressError = require("../expressError");

function ensureValidCourse(req, res, next) {
  _validationHelper(courseSchema, req, res, next);
}

function ensureValidInstructor(req, res, next) {
  _validationHelper(instructorSchema, req, res, next);
}

function _validationHelper(schema, req, res, next) {
  const result = jsonschema.validate(req.body, schema);

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
