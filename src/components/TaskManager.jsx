import React, { useState } from "react";

export default function TaskManager() {
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
    <div className="tasks-section">
      <h2>Task Manager</h2>
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
    </div>
  );
}
