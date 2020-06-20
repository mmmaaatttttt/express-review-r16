const db = require("../db");
const ExpressError = require("../expressError");

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

  static async get(id) {
    const result = await db.query(
      `SELECT c.id, c.title, c.description, i.first_name, i.last_name
        FROM courses c
        LEFT JOIN teaching_assignments t
          ON c.id = t.course_id
        LEFT JOIN instructors i
          ON t.instructor_id = i.id
        WHERE c.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`No course with id=${id}`, 404);
    }

    const { title, description } = result.rows[0];
    const instructors = result.rows
      .map(row => ({
        first_name: row.first_name,
        last_name: row.last_name
      }))
      .filter(row => row.first_name && row.last_name);
    return { id, title, description, instructors };
  }
}

module.exports = Course;
