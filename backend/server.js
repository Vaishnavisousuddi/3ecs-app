const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 8080;

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "testdb"
});

app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
