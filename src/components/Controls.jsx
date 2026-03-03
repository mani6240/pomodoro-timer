import React, { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

export default function Controls() {
  const { isRunning, startTimer, pauseTimer, resetTimer, skipBreak } = useContext(TimerContext);
  return (
    <div className="timer-controls">
      <button type="button" className="btn-start" onClick={startTimer} disabled={isRunning}>Start</button>
      <button type="button" className="btn-pause" onClick={pauseTimer} disabled={!isRunning}>Pause</button>
      <button type="button" className="btn-reset" onClick={resetTimer}>Reset</button>
      <button type="button" className="btn-skip" onClick={skipBreak}>Skip</button>
    </div>
  );
}
