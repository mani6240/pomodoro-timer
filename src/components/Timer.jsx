import React, { useContext, useMemo } from "react";
import { TimerContext } from "../context/TimerContext";
import ProgressRing from "./ProgressRing";

const quotes = [
  "Stay focused, stay sharp!",
  "Small steps lead to big results.",
  "Your code, your craft, your time.",
  "Breaks boost your brainpower.",
  "Consistency beats intensity.",
  "One Pomodoro at a time!"
];

export default function Timer() {
  const { timeLeft, mode, workDuration, breakDuration, longBreakDuration, switchMode, isRunning } = useContext(TimerContext);
  const ringSize = 200;
  const total =
    mode === "focus"
      ? workDuration * 60
      : mode === "longBreak"
      ? longBreakDuration * 60
      : breakDuration * 60;
  const percentage = ((total - timeLeft) / total) * 100;
  const runningGreen = `hsl(145, 95%, ${Math.min(68, 42 + percentage * 0.25)}%)`;
  const progressColor = mode === "focus" ? runningGreen : "#40c4ff";
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const quote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

  return (
    <div className="timer-widget">
      <div className="mode-switch">
        <button
          type="button"
          className={mode === "focus" ? "active" : ""}
          onClick={() => switchMode("focus")}
        >
          Work
        </button>
        <button
          type="button"
          className={mode === "break" ? "active" : ""}
          onClick={() => switchMode("break")}
        >
          Break
        </button>
        <button
          type="button"
          className={mode === "longBreak" ? "active" : ""}
          onClick={() => switchMode("longBreak")}
        >
          Long Break
        </button>
      </div>
      <div
        className={`timer-ring-wrap ${isRunning ? "running" : ""}`}
        style={{ "--ring-accent": progressColor }}
      >
        {/* Animated glowing effect */}
        <div className="pomodoro-ring-glow"></div>
        {/* Static 25:00 ring background */}
        <div className="timer-ring-layer timer-ring-bg">
          <ProgressRing percentage={100} size={ringSize} stroke={14} color="#444" />
        </div>
        {/* Animated progress ring */}
        <div className="timer-ring-layer timer-ring-progress">
          <ProgressRing percentage={percentage} size={ringSize} stroke={14} color={progressColor} />
        </div>
        {/* Timer value overlay */}
        <div className={`timer-display ${mode}`}>{minutes}:{seconds}</div>
      </div>
      <div className="timer-quote">{quote}</div>
    </div>
  );
}
