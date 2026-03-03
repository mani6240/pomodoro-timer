import React, { useState } from "react";
import "../App.css";

export default function QuickNotes() {
  const [note, setNote] = useState("");
  return (
    <section className="notes-section">
      <h2>Quick Notes</h2>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Jot down ideas, todos, or reminders..."
      />
    </section>
  );
}
