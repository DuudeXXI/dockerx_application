const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const cors = require("cors");
const socketIo = require('socket.io');
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");

app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.static(__dirname + "/public/styles"));
app.use(express.json());
app.use(express.static("public"));

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "127.0.0.1",
  user: "root",
  database: "dockerx_db",
  password: "DockerX2023",
  multipleStatements: true,
});

app.get("/", (req, res) => {
  const sql = `SELECT COUNT(*) AS count FROM controllers;
               SELECT * FROM controllers AS data_test;`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    connection.query(sql, (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error("Error executing query:", queryErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(results);
    });
  });
});

app.get("/api/", (req, res) => {
  const controllerId = req.query.id;
  const sql = "SELECT * FROM controllers WHERE controller_id = ?";
  const values = [controllerId];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    connection.query(sql, values, (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error("Error executing query:", queryErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(results);
    });
  });
});

app.post("/register", (req, res) => {
  const sql = `INSERT INTO controllers SET ?`;
  const controller = {
    dec_lat: req.body.dec_lat,
    dec_lng: req.body.dec_lng,
  };

  if (
    !isNaN(controller.dec_lat) &&
    !isNaN(controller.dec_lng) &&
    controller.dec_lat.toString().length > 1 &&
    controller.dec_lng.toString().length > 1
  ) {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting MySQL connection from pool:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      connection.query(sql, controller, (queryErr, results) => {
        connection.release(); // Release the connection back to the pool

        if (queryErr) {
          console.error("Error executing query:", queryErr);
          res.status(500).send("Internal Server Error");
          return;
        }

        console.log("Sent successfully");
        res.sendStatus(200);
      });
    });
  } else {
    console.log("kazkas negerai");
    res.status(400).send("Bad Request");
  }
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { dec_lat, dec_lng, controller_status } = req.body;

  const values = [dec_lat, dec_lng, controller_status, id];
  const query =
    "UPDATE controllers SET dec_lat = ?, dec_lng = ?, controller_status = ? WHERE controller_id = ?";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    connection.query(query, values, (queryErr, result) => {
      connection.release(); // Release the connection back to the pool

      if (queryErr) {
        console.error("Error updating data:", queryErr);
        res.status(500).json({ error: "Error updating data" });
      } else {
        console.log("Data updated successfully");
        res.json({ message: "Data updated successfully" });
      }
    });
  });
});

app.post("/statusdata", (req, res) => {
  const { lockStatus, alarmStatus, controllerId } = req.body;
  // Use the connection pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Update the database based on the received data
    const values = [lockStatus, alarmStatus, controllerId];
    const sql =
      "UPDATE controllers SET lock_status = ?, alarm_status = ? WHERE controller_id = ?";

    connection.query(sql, values, (queryErr, results) => {
      connection.release(); // Release the connection back to the pool

      if (queryErr) {
        console.error("Error updating database:", queryErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.sendStatus(200); // Send a success response
    });
  });
});

app.listen(port, () => {
  console.log("API Service running...");
});

//FUNCTIONS
function updateDatabase(controllerId, newLockStatus, newAlarmStatus, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err);
      return;
    }

    const updateQuery =
      "UPDATE controllers SET lock_status = ?, alarm_status = ? WHERE id = ?";
    const updateValues = [newLockStatus, newAlarmStatus, controllerId];

    connection.query(updateQuery, updateValues, (updateErr, results) => {
      connection.release();

      if (updateErr) {
        callback(updateErr);
      } else {
        callback(null);
      }
    });
  });
}
