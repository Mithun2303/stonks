const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "mithun2303",
  database: "stonks"
});

module.exports = pool;