import React, { useContext, useEffect, useState } from "react";
import { TimerContext } from "../context/TimerContext";

export default function Settings() {
  const {
    workDuration,
    breakDuration,
    longBreakDuration,
    autoStart,
    sound,
    applyTimerSettings
  } = useContext(TimerContext);

  const [draft, setDraft] = useState({
    workDuration,
    breakDuration,
    longBreakDuration,
    autoStart,
    sound
  });
  const [showAppliedMessage, setShowAppliedMessage] = useState(false);

  useEffect(() => {
    setDraft({
      workDuration,
      breakDuration,
      longBreakDuration,
      autoStart,
      sound
    });
  }, [workDuration, breakDuration, longBreakDuration, autoStart, sound]);

  const updateDraft = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    applyTimerSettings(draft);
    setShowAppliedMessage(true);
    setTimeout(() => setShowAppliedMessage(false), 2000);
  };

  return (
    <section className="settings-section">
      <h2>Settings</h2>
      <p className="settings-intro">
        Fine-tune focus cycles and automation to match your working style.
      </p>
      <div className="settings-panel">
        <label className="settings-row">
          <span>
            Work Duration (min)
            <small className="settings-hint">Main deep-work session length</small>
          </span>
          <input
            type="number"
            value={draft.workDuration}
            onChange={(e) => updateDraft("workDuration", Number(e.target.value))}
            min={1}
            max={60}
          />
        </label>
        <label className="settings-row">
          <span>
            Break Duration (min)
            <small className="settings-hint">Short recovery between sessions</small>
          </span>
          <input
            type="number"
            value={draft.breakDuration}
            onChange={(e) => updateDraft("breakDuration", Number(e.target.value))}
            min={1}
            max={30}
          />
        </label>
        <label className="settings-row">
          <span>
            Long Break Duration (min)
            <small className="settings-hint">Extended break after 4 sessions</small>
          </span>
          <input
            type="number"
            value={draft.longBreakDuration}
            onChange={(e) => updateDraft("longBreakDuration", Number(e.target.value))}
            min={1}
            max={60}
          />
        </label>
      </div>
      <div className="settings-toggles">
        <label className="settings-check">
          <input
            type="checkbox"
            checked={draft.autoStart}
            onChange={(e) => updateDraft("autoStart", e.target.checked)}
          />
          Auto-start next session
        </label>
        <label className="settings-check">
          <input
            type="checkbox"
            checked={draft.sound}
            onChange={(e) => updateDraft("sound", e.target.checked)}
          />
          Notification sound
        </label>
      </div>
      <div className="settings-actions">
        <button type="button" onClick={handleApply}>Apply</button>
      </div>
      {showAppliedMessage && (
        <p className="settings-message">Your timer was changed</p>
      )}
    </section>
  );
}
