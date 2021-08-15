const { Pool, Client } = require("pg");
const { db } = require("./keys");
const { promisify } = require("util");

// Configuring Programmatically
const pool = new Pool({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: db.port,
});

pool.query("SELECT now()", (err, res) => {
  console.log(err, res);
  pool.end;
});

const client = new Client({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: db.port,
});

client.connect();

client.on("connect", () => {
  console.log("Database connection");
});

client.on("end", () => {
  console.log("Connection end");
});

client.query("SELECT * FROM users", (err, res) => {
  console.log(err, res.rows);
  client.end();
});

//Promisify pool querys
//pool.query = promisify(pool.query)

module.exports = {
  pool,
  client,
};
