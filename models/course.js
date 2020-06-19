const db = require("../db");

class Course {
  static async all() {
    const results = await db.query(
      "SELECT id, title, description FROM courses"
    );
    return results.rows;
  }
}

module.exports = Course;
