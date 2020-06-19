const db = require("../db");

class Instructor {
  static all() {
    const results = db.query(
      "SELECT id, first_name, last_name FROM instructors"
    );
    return results;
  }

  static create({ first_name, last_name }) {
    const result = db.query(
      `INSERT INTO instructors (first_name, last_name)
       VALUES ($1, $2)
       RETURNING id, first_name, last_name`,
      [first_name, last_name]
    );
    return result;
  }
}

module.exports = Instructor;
