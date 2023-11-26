const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");

app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.static(__dirname + "/public/styles"));
app.use(express.json());
app.use(express.static("public"));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "dockerx_db",
  password: "DockerX2023",
  multipleStatements: true
});

// app.get("/", (req, res) => {
//   const sql = "SELECT COUNT(*) AS count FROM controllers";
//   connection.query(sql, (err, results) => {
//     if (err) throw err;

//     const count = results[0].count;
//     // res.sendFile(__dirname + "/index.html");
//     res.json(count);
//   });
// });
app.get("/", (req, res) => {
  let sql = `SELECT COUNT(*) AS count FROM controllers;
             SELECT * FROM controllers AS data_test;`
  connection.query(sql, (err, results) => {
    if (err) throw err;

    const count = results;
    res.json(count);
});
});

app.get("/api/", (req, res) => {

  const controllerId = req.query.id;
  const sql = `SELECT * FROM controllers WHERE controller_id = ?;`
  const values = [controllerId];
  connection.query(sql,values,(err, results) => {
    if (err) throw err;

    res.json(results);
});
});

app.post("/register", (req, res) => {
  const sql = `INSERT INTO controllers SET ?`;
  const controller = {
    dec_lat: req.body.dec_lat,
    dec_lng: req.body.dec_lng,
  };
  console.log(controller.dec_lat.length);
  if (!isNaN(controller.dec_lat) &&
      !isNaN(controller.dec_lng) &&
      controller.dec_lat.length > 1 &&
      controller.dec_lng.length > 1) {
    connection.query(sql, controller, (err, results) => {
      if (err) throw err
      console.log("Sent successfully");
    });
  } else {
    console.log("kazkas negerai");
  }
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { dec_lat, dec_lng, controller_status } = req.body;

  const values = [dec_lat, dec_lng, controller_status, id];
  const query = 'UPDATE controllers SET dec_lat = ?, dec_lng = ?, controller_status = ? WHERE controller_id = ?';

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('Data updated successfully');
      res.json({ message: 'Data updated successfully' });
    }
  });
});

app.listen(port, () => {
  console.log("API Service running...");
});