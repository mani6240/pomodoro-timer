import React, { createContext, useState, useRef, useEffect } from "react";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Timer state
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [autoStart, setAutoStart] = useState(false);
  const [sound, setSound] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [currentSession, setCurrentSession] = useState(1);
  const [mode, setMode] = useState("focus"); // focus, break, or longBreak
  // Persistent statistics
  const [focusSeconds, setFocusSeconds] = useState(() => {
    const saved = localStorage.getItem("focusSeconds");
    return saved ? Number(saved) : 0;
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? Number(saved) : 0;
  });
  const [weeklyStats, setWeeklyStats] = useState(() => {
    const saved = localStorage.getItem("weeklyStats");
    return saved ? JSON.parse(saved) : Array(7).fill({ sessions: 0, focus: 0 });
  });
  const timerRef = useRef(null);
  const alarmContextRef = useRef(null);
  const alarmTimeoutRef = useRef(null);

  // Advanced timer logic
  // Save statistics to localStorage
  useEffect(() => {
    localStorage.setItem("focusSeconds", focusSeconds);
    localStorage.setItem("streak", streak);
    localStorage.setItem("weeklyStats", JSON.stringify(weeklyStats));
  }, [focusSeconds, streak, weeklyStats]);

  useEffect(() => {
    return () => {
      if (alarmTimeoutRef.current) {
        clearTimeout(alarmTimeoutRef.current);
      }
      if (alarmContextRef.current) {
        alarmContextRef.current.close();
        alarmContextRef.current = null;
      }
    };
  }, []);

  // Helper: get today's index (0=Sun, 6=Sat)
  const getTodayIndex = () => new Date().getDay();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            if (mode === "focus") {
              setFocusSeconds((fs) => fs + 1);
              setWeeklyStats((stats) => {
                const idx = getTodayIndex();
                const updated = [...stats];
                updated[idx] = {
                  sessions: updated[idx].sessions,
                  focus: updated[idx].focus + 1
                };
                return updated;
              });
            }
            return prev - 1;
          } else {
            clearInterval(timerRef.current);
            if (mode === "focus") {
              const nextCompletedSessions = sessions + 1;
              const nextSessionNumber = currentSession + 1;
              const useLongBreak = nextCompletedSessions % 4 === 0;

              setSessions(nextCompletedSessions);
              setCurrentSession(nextSessionNumber);
              setStreak((st) => st + 1);
              setMode(useLongBreak ? "longBreak" : "break");
              setTimeLeft((useLongBreak ? longBreakDuration : breakDuration) * 60);
              if (sound) playSound();
              if (autoStart) setIsRunning(true);
              else setIsRunning(false);
              setWeeklyStats((stats) => {
                const idx = getTodayIndex();
                const updated = [...stats];
                updated[idx] = {
                  sessions: updated[idx].sessions + 1,
                  focus: updated[idx].focus
                };
                return updated;
              });
            } else {
              if (sound) playSound();
              setMode("focus");
              setTimeLeft(workDuration * 60);
              if (autoStart) setIsRunning(true);
              else setIsRunning(false);
            }
            return prev;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode, sessions, currentSession, workDuration, breakDuration, longBreakDuration, autoStart, sound]);

  const stopAlarmSound = () => {
    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current = null;
    }
    if (alarmContextRef.current) {
      alarmContextRef.current.close();
      alarmContextRef.current = null;
    }
  };

  // Play a 10-second built-in chime alarm (no external file dependency)
  const playSound = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    stopAlarmSound();
    const ctx = new AudioCtx();
    alarmContextRef.current = ctx;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const totalDuration = 10;
    const chimeInterval = 1;
    const chimeCount = Math.floor(totalDuration / chimeInterval);

    for (let i = 0; i < chimeCount; i += 1) {
      const startAt = ctx.currentTime + i * chimeInterval;
      const notes = [988, 1318];

      notes.forEach((frequency, noteIndex) => {
        const noteStart = startAt + noteIndex * 0.22;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.value = frequency;

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.18, noteStart + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.2);
      });
    }

    alarmTimeoutRef.current = setTimeout(() => {
      stopAlarmSound();
    }, (totalDuration + 0.4) * 1000);
  };

  const startTimer = () => {
    stopAlarmSound();
    setIsRunning(true);
  };
  const pauseTimer = () => {
    setIsRunning(false);
  };
  const resetTimer = () => {
    stopAlarmSound();
    setIsRunning(false);
    setTimeLeft(workDuration * 60);
    setMode("focus");
    setCurrentSession(1);
    setStreak(0);
  };
  const skipBreak = () => {
    stopAlarmSound();
    setMode("focus");
    setTimeLeft(workDuration * 60);
    setIsRunning(false);
  };

  const switchMode = (nextMode) => {
    if (!["focus", "break", "longBreak"].includes(nextMode)) return;

    stopAlarmSound();
    setMode(nextMode);
    if (nextMode === "focus") {
      setTimeLeft(workDuration * 60);
    } else if (nextMode === "break") {
      setTimeLeft(breakDuration * 60);
    } else {
      setTimeLeft(longBreakDuration * 60);
    }
    setIsRunning(false);
  };

  const applyTimerSettings = (nextSettings) => {
    const nextWork = clamp(Number(nextSettings.workDuration), 1, 60);
    const nextBreak = clamp(Number(nextSettings.breakDuration), 1, 30);
    const nextLongBreak = clamp(Number(nextSettings.longBreakDuration), 1, 60);

    setWorkDuration(nextWork);
    setBreakDuration(nextBreak);
    setLongBreakDuration(nextLongBreak);
    setAutoStart(Boolean(nextSettings.autoStart));
    setSound(Boolean(nextSettings.sound));

    if (mode === "focus") {
      setTimeLeft(nextWork * 60);
    } else if (mode === "break") {
      setTimeLeft(nextBreak * 60);
    } else {
      setTimeLeft(nextLongBreak * 60);
    }

    setIsRunning(false);
  };

  // Statistics
  const totalFocusHours = (focusSeconds / 3600).toFixed(2);
  const todaySessions = weeklyStats[getTodayIndex()]?.sessions || 0;

  return (
    <TimerContext.Provider value={{
      workDuration, setWorkDuration,
      breakDuration, setBreakDuration,
      longBreakDuration, setLongBreakDuration,
      autoStart, setAutoStart,
      sound, setSound,
      timeLeft, setTimeLeft,
      isRunning, setIsRunning,
      sessions, setSessions,
      currentSession, setCurrentSession,
      mode, setMode,
      applyTimerSettings,
      switchMode,
      startTimer, pauseTimer, resetTimer, skipBreak,
      totalFocusHours, todaySessions, streak,
      weeklyStats
    }}>
      {children}
    </TimerContext.Provider>
  );
}

