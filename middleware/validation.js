const jsonschema = require("jsonschema");
const ExpressError = require("../expressError");

function checkAgainstSchema(schema) {
  return function (req, res, next) {
    const result = jsonschema.validate(req.body, schema);

    if (!result.valid) {
      // pass validation errors to error handler
      //  (the "stack" key is generally the most useful)
      let listOfErrors = result.errors.map(error => error.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }

    return next();
  };
}

module.exports = { checkAgainstSchema };
