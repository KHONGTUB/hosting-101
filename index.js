const express = require("express");

const app = express();
const pool = require("./sql/connection");
const mysql = require("mysql");
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/games", (req, res) => {
  pool.query("SELECT * FROM games", (err, rows) => {
    console.log("rows")
    res.json(rows);
  });
});

app.get("/games/:id", (req, res) => {
  pool.query(`SELECT * FROM games WHERE id = ${req.params.id}`, (err, row) => {
    res.json(row);
  });
});

app.post("/games", (req, res) => {
  const { body } = req;
  const { title, release_year, box_art, trailer, hero, developer } = body;
  pool.query(
    `INSERT INTO games (id, title, release_year, box_art, description, trailer, hero, developer) VALUES (?,?,?,?,?,?,?,?)`,
    [
      null,
      req.body.title,
      req.body.release_year,
      req.body.box_art,
      req.body.description,
      req.body.trailer,
      req.body.hero,
      req.body.developer,
    ],
    (err, status) => {
      res.json(status.insertId);
    }
  );
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
