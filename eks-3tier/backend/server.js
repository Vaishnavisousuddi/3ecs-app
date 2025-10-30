const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Define Notes model
const Note = sequelize.define("Note", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
});

// Sync DB and table
sequelize.sync().then(() => console.log("✅ DB synced"));

app.get("/", (req, res) => res.send("CloudBook API is running!"));

// API: Get all notes
app.get("/notes", async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

// API: Create a note
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const newNote = await Note.create({ title, content });
  res.json(newNote);
});

// API: Delete a note
app.delete("/notes/:id", async (req, res) => {
  await Note.destroy({ where: { id: req.params.id } });
  res.send("🗑️ Note deleted");
});

app.listen(8080, () => console.log("🚀 CloudBook backend running on port 8080"));
