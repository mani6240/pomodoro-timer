import React, { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

export default function SessionCounter() {
  const { sessions, currentSession } = useContext(TimerContext);
  return (
    <div className="session-info">
      <span>Sessions Completed: {sessions}</span>
      <span> | Current Session: {currentSession}</span>
    </div>
  );
}
