import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://backend-service:8080"; // Kubernetes backend service

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  const fetchNotes = async () => {
    const res = await axios.get(`${API_URL}/notes`);
    setNotes(res.data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/notes`, form);
    setForm({ title: "", content: "" });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/notes/${id}`);
    fetchNotes();
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>📝 CloudBook</h1>
      <form onSubmit={addNote}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px", height: "80px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Add Note</button>
      </form>

      <h2>My Notes</h2>
      {notes.map(n => (
        <div key={n.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "8px" }}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>
          <button onClick={() => deleteNote(n.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
