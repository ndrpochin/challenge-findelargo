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
      res.redirect("/links");
      //res.status(201).send(`Link added with ID: ${result.oid}`);
    }
  );
});

router.get("/", (req, res) => {
  pool.query("SELECT * FROM links", (error, result) => {
    if (error) {
      throw error;
    }
    res.render("links/list", { links: result.rows });
  });
});

router.get("/delete/:idlink", (req, res) => {
  const { idlink } = req.params;
  pool.query(
    "DELETE FROM links WHERE idlink = $1",
    [idlink],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.redirect("/links");
    }
  );
});

router.get("/edit/:idlink", (req, res) => {
  const { idlink } = req.params;
  pool.query(
    "SELECT * FROM links WHERE idlink = $1",
    [idlink],
    (error, result) => {
      if (error) throw error;
      res.render("links/edit", { link: result.rows[0] });
    }
  );
});

router.post('/edit/:idlink', (req,res) =>{
  const { idlink } = req.params;
  const { title, url, description } = req.body;
  pool.query(
    "UPDATE links SET title = $1, url = $2, description = $3 WHERE idlink = $4",
    [title, url, description, idlink],
    (error, result) => {
      if (error) throw error;
      res.redirect("/links");
    }
  );
})

module.exports = router;
