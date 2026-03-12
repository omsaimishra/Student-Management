import { useState } from "react";
import "./App.css";

/**
 * 🔴 IMPORTANT
 * Replace this with your actual Load Balancer IP
 */
const API_BASE = "/api/students";

export default function App() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [searchRoll, setSearchRoll] = useState("");
  const [students, setStudents] = useState([]);

  // ➕ Add Student
  const addStudent = async () => {
    if (!name || !roll) {
      alert("Enter name and roll number");
      return;
    }

    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        roll: roll, // MUST match backend
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      alert(err);
      return;
    }

    alert("Student added successfully");
    setName("");
    setRoll("");
  };

  // 🔍 Search Student by Roll
const searchStudent = async () => {
  if (!searchRoll) return;

  const res = await fetch(`${API_BASE}/${searchRoll}`);
  const data = await res.json();

  if (!res.ok) {
    alert("Student not found");
    return;
  }

  alert(`Name: ${data.name}\nRoll: ${data.roll_number}`);
};


  // 📥 Fetch All Students
  const fetchStudents = async () => {
    const res = await fetch(API_BASE);
    const data = await res.json();
    setStudents(data);
  };

  return (
    <div className="page">
      <h1>Student Management</h1>
      <p className="subtitle">DemApplication       </p>

      <div className="grid">
        {/* ➕ Add Student */}
        <div className="card">
          <h2>➕ Add Student</h2>

          <label>Student Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
          />

          <label>Roll Number</label>
          <input
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            placeholder="Enter roll number"
          />

          <button onClick={addStudent}>Add Student                    </button>
        </div>

        {/* 🔍 Search Student */}
        <div className="card">
          <h2>🔍 Search Student</h2>

          <label>Roll Number</label>
          <input
            value={searchRoll}
            onChange={(e) => setSearchRoll(e.target.value)}
            placeholder="Enter roll number"
          />

          <button onClick={searchStudent}>Search</button>
        </div>
      </div>

      {/* 👥 All Students */}
      <div className="card full">
        <div className="header">
          <h2>👥 All Students</h2>
          <button onClick={fetchStudents}>Fetch Students</button>
        </div>

        {students.length === 0 ? (
          <p className="muted">Click "Fetch Students" to load the list</p>
        ) : (
          <ul className="list">
            {students.map((s) => (
              <li key={s.id}>
                <strong>{s.name}</strong> — Roll: {s.roll_number}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="api">API Base: /api</p>
    </div>
  );
}
