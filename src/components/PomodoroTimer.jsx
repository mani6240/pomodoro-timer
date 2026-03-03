import React, { useState, useRef, useEffect } from "react";
import "../App.css";

export default function PomodoroTimer() {
  const initialTime = 25 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setSessions((s) => s + 1);
            alert("Time for a break!");
            return initialTime;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, initialTime]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    clearInterval(timerRef.current);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <section className="pomodoro-section">
      <h2>Pomodoro Timer</h2>
      <div className="timer-display">{minutes}:{seconds}</div>
      <div className="timer-controls">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="session-info">Sessions Completed: {sessions}</div>
    </section>
  );
}
