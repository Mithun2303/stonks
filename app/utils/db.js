const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "stonks",
  password: "stonks",
  database: "stonks"
});

module.exports = pool;