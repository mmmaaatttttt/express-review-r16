const db = require("../db");

class Course {
  static async all() {
    const results = await db.query(
      "SELECT id, title, description FROM courses"
    );
    return results.rows;
  }

  static async create({ title, description }) {
    const results = await db.query(
      `INSERT INTO courses (title, description) VALUES ($1, $2)
      RETURNING id, title, description`,
      [title, description]
    );
    return results.rows[0];
  }
}

module.exports = Course;
