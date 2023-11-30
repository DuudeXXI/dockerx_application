const express = require("express");
const cors = require("cors");
// const { v4: uuid } = require("uuid");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const socketIo = require("socket.io");
const server = require("http").createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public/styles"));
app.use(express.json());
app.use(express.static("public"));

const pool = require("./database/pool");

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id} `);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`A user disconnected: ${socket.id} `);
  });
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

// console.log(err.code);  we will need to use it
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
        connection.release();

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
  let values;
  let query;
  
  if (dec_lat == null || dec_lng == null) {
    values = [controller_status, id];
    query =
      "UPDATE controllers SET controller_status = ? WHERE controller_id = ?";
  } else {
    values = [dec_lat, dec_lng, controller_status, id];
    query =
      "UPDATE controllers SET dec_lat = ?, dec_lng = ?, controller_status = ? WHERE controller_id = ?";
  }
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    connection.query(query, values, (queryErr, result) => {
      connection.release();

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

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection from pool:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const values = [lockStatus, alarmStatus, controllerId];
    const sql =
      "UPDATE controllers SET lock_status = ?, alarm_status = ? WHERE controller_id = ?";

    connection.query(sql, values, (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error("Error updating database:", queryErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      io.emit("statusUpdate", { lockStatus, alarmStatus, controllerId });

      res.sendStatus(200);
    });
  });
});

server.listen(port, () => {
  console.log("Socket.io and API services working...");
});
// app.listen(port, () => {
//   console.log("API Service running...");
// });

//FUNCTIONS
