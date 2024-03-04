const mysql = require("mysql2");

  const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "DockerX2023",
    database: "dockerx_db",
    multipleStatements: true
  });

  module.exports = pool;

  // const pool = mysql.createPool({
  //   connectionLimit: 5,
  //   host: "127.0.0.1",
  //   user: "root",
  //   database: "dockerx_db",
  //   password: "DockerX2023",
  //   multipleStatements: true,
  // });

  // mysql -h dockerx-sql.cvwesem48g7g.eu-north-1.rds.amazonaws.com -u dockerx-sql -p
