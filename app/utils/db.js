const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "mithun2303",
  database: "stonks",
  connectionLimit: 10,
  timeout: 600000
});

module.exports = pool;