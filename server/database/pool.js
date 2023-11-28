const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "127.0.0.1",
    user: "root",
    database: "dockerx_db",
    password: "DockerX2023",
    multipleStatements: true,
  });

  module.exports = pool;