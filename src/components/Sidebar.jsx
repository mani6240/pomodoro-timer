import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Dev Pomodoro</h2>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/statistics" className={({ isActive }) => isActive ? "active" : ""}>Statistics</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>Settings</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
      </nav>
    </aside>
  );
}
