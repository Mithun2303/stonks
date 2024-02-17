const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "felix",
  database: "stonks"
});

module.exports = pool;