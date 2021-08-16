const { response } = require("express");
const express = require("express");

const router = express.Router();

const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
  };
  pool.query(
    "INSERT INTO links (title, url, description, iduser) VALUES ($1, $2, $3, $4)",
    [title, url, description, 1],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Link added with ID: ${result.oid}`);
    }
  );
});

router.get('/add', (req, res) => {
    //res.send('Holaa links')
    res.render('links/add');
})

router.post('/add', (req, res) => {
    res.send('received');
})
module.exports = router;
