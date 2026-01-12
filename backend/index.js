const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/**
 * TEMP IN-MEMORY DATA
 * (Will replace with MySQL tomorrow)
 */
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "mysql",        // or mysql container name if using docker-compose
  user: "student",
  password: "studentpass",
  database: "studentdb"
});


/**
 * Health Check
 */
app.get("/", (req, res) => {
  res.send("Student Management API is running");
});

/**
 * Add Student
 */
app.post("/api/students", async (req, res) => {
  const { name, roll } = req.body;

  if (!name || !roll) {
    return res.status(400).json({ message: "Name and Roll required" });
  }

  try {
    const [exists] = await db.query(
      "SELECT * FROM students WHERE roll_number = ?",
      [roll]
    );

    if (exists.length > 0) {
      return res.status(409).json({ message: "Roll number already exists" });
    }

    await db.query(
      "INSERT INTO students (name, roll_number) VALUES (?, ?)",
      [name, roll]
    );

    res.status(201).json({ name, roll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

/**
 * Get All Students
 */
app.get("/api/students", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM students");
  res.json(rows);
});

/**
 * Search Student by Roll
 */
app.get("/api/students/:roll", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM students WHERE roll_number = ?",
    [req.params.roll]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(rows[0]);
});
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
