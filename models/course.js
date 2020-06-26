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
      `SELECT c.id, c.title, c.description, 
        COALESCE(json_agg(json_build_object('firstName', i.first_name, 'lastName', i.last_name))
          FILTER (WHERE i.first_name IS NOT NULL), '[]') AS instructors
        FROM courses c
        LEFT JOIN teaching_assignments t
          ON c.id = t.course_id
        LEFT JOIN instructors i
          ON t.instructor_id = i.id
        WHERE c.id = $1
        GROUP BY c.id, c.title, c.description;`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`No course with id=${id}`, 404);
    }

    return result.rows[0];
  }
}

module.exports = Course;
