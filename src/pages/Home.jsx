
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TimerContext } from "../context/TimerContext";
import Timer from "../components/Timer";
import Controls from "../components/Controls";
import SessionCounter from "../components/SessionCounter";
import TaskManager from "../components/TaskManager";

export default function Home() {
  const { todaySessions, totalFocusHours, streak } = useContext(TimerContext);

  return (
    <main className="dashboard-main page-single">
      <section className="about-section home-section">
        <div className="home-hero">
          <p className="home-eyebrow">Focus System</p>
          <div className="home-hero-content">
            <h2>Developer Productivity Hub</h2>
            <p className="home-desc">
              Run focused sprints, track progress, and keep your tasks organized in one premium workspace.
            </p>
          </div>
          <div className="home-actions">
            <Link to="/statistics" className="home-btn home-btn-primary">View Statistics</Link>
            <Link to="/settings" className="home-btn home-btn-ghost">Tune Settings</Link>
          </div>
        </div>

        <div className="home-metrics">
          <div className="home-metric">
            <span>Today Sessions</span>
            <strong>{todaySessions}</strong>
          </div>
          <div className="home-metric">
            <span>Total Focus Hours</span>
            <strong>{totalFocusHours}</strong>
          </div>
          <div className="home-metric">
            <span>Current Streak</span>
            <strong>{streak}</strong>
          </div>
        </div>

        <div className="home-stack">
          <div className="home-card">
            <h3>Pomodoro Timer</h3>
            <Timer />
            <Controls />
            <SessionCounter />
          </div>
          <div className="home-card">
            <h3>Task Manager</h3>
            <TaskManager />
          </div>
          <div className="home-card">
            <h3>Focus Playbook</h3>
            <div className="home-playbook">
              <div className="home-tip">
                <h4>1. Plan one clear target</h4>
                <p>Choose one meaningful task before starting the timer to reduce switching costs.</p>
              </div>
              <div className="home-tip">
                <h4>2. Sprint in short cycles</h4>
                <p>Work in focused rounds, then take deliberate breaks to keep energy high.</p>
              </div>
              <div className="home-tip">
                <h4>3. Review and adjust daily</h4>
                <p>Use your stats to tune session durations and improve consistency over time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
