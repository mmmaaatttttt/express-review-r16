const { Client } = require("pg");

const db = new Client({
  connectionString: "postgresql:///school"
});

db.connect();

module.exports = db;
