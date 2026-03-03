import React, { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Stats() {
  const { todaySessions, totalFocusHours, streak, weeklyStats } = useContext(TimerContext);

  return (
    <section className="stats-section">
      <h2>Statistics</h2>
      <div className="stats-summary">
        <div className="stats-pill">
          <span>Today Sessions</span>
          <strong>{todaySessions}</strong>
        </div>
        <div className="stats-pill">
          <span>Total Focus Hours</span>
          <strong>{totalFocusHours}</strong>
        </div>
        <div className="stats-pill">
          <span>Productivity Streak</span>
          <strong>{streak}</strong>
        </div>
      </div>
      <h3 className="stats-subhead">Weekly Sessions</h3>
      <div className="stats-chart-card">
        <div className="stats-bars">
          {weeklyStats.map((stat, idx) => (
            <div key={idx} className="stats-bar-group">
              <div className="stats-bar sessions-bar" style={{ height: `${Math.max(6, stat.sessions * 18)}px` }}></div>
              <div className="stats-day">{days[idx]}</div>
              <div className="stats-value">{stat.sessions}</div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="stats-subhead">Weekly Focus (min)</h3>
      <div className="stats-chart-card">
        <div className="stats-bars">
          {weeklyStats.map((stat, idx) => (
            <div key={idx} className="stats-bar-group">
              <div className="stats-bar focus-bar" style={{ height: `${Math.max(6, Math.floor(stat.focus / 60) * 6)}px` }}></div>
              <div className="stats-day">{days[idx]}</div>
              <div className="stats-value">{Math.floor(stat.focus / 60)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
