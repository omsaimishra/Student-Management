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
let students = [];

/**
 * Health Check
 */
app.get("/", (req, res) => {
  res.send("Student Management API is running");
});

/**
 * Add Student
 */
app.post("/api/students", (req, res) => {
  const { name, roll } = req.body;

  if (!name || !roll) {
    return res.status(400).json({ message: "Name and Roll required" });
  }

  const exists = students.find((s) => s.roll === roll);
  if (exists) {
    return res.status(409).json({ message: "Roll number already exists" });
  }

  const student = { name, roll };
  students.push(student);

  res.status(201).json(student);
});

/**
 * Get All Students
 */
app.get("/api/students", (req, res) => {
  res.json(students);
});

/**
 * Search Student by Roll
 */
app.get("/api/students/:roll", (req, res) => {
  const student = students.find((s) => s.roll === req.params.roll);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
