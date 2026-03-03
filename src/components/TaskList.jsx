import React, { useState } from "react";
import "../App.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, done: false }]);
      setInput("");
    }
  };
  const toggleTask = idx => {
    setTasks(tasks.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
  };
  return (
    <section className="tasks-section">
      <h2>Task List</h2>
      <div className="task-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, idx) => (
          <li key={idx} className={task.done ? "done" : ""} onClick={() => toggleTask(idx)}>
            {task.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
