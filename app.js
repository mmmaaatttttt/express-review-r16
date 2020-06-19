const express = require("express");
const courseRoutes = require("./routes/courses");

const app = express();
app.use(express.json());

app.use("/courses", courseRoutes);

app.get("/", function (req, res) {
  return res.json({ success: true });
});

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({ error: err });
});

module.exports = app;
