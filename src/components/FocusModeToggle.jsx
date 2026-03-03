import React, { useState } from "react";
import "../App.css";

export default function FocusModeToggle() {
  const [focus, setFocus] = useState(false);
  return (
    <section className="focus-section">
      <h2>Focus Mode</h2>
      <button className={focus ? "focus-on" : "focus-off"} onClick={() => setFocus(f => !f)}>
        {focus ? "Focus ON" : "Focus OFF"}
      </button>
      <div className="focus-desc">{focus ? "Notifications muted, distractions hidden." : "Normal mode."}</div>
    </section>
  );
}
