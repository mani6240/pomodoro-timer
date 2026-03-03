import React from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import QuickNotes from "../components/QuickNotes";
import TaskList from "../components/TaskList";
import FocusModeToggle from "../components/FocusModeToggle";
import "../App.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Developer Productivity Hub</h1>
        <p>Premium tools to help you focus, organize, and get more done.</p>
      </header>
      <main className="dashboard-main">
        <PomodoroTimer />
        <QuickNotes />
        <TaskList />
        <FocusModeToggle />
      </main>
      <footer className="dashboard-footer">
        <span>© 2026 DevHub. All rights reserved.</span>
      </footer>
    </div>
  );
}
