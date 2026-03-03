import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
      <NavLink to="/statistics" className={({ isActive }) => isActive ? "active" : ""}>Statistics</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>Settings</NavLink>
    </nav>
  );
}
