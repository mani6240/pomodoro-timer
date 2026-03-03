import React from "react";

export default function ProgressRing({ percentage, size = 180, stroke = 12, color = "#ff5252" }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ display: "block", margin: "0 auto" }}>
      <circle
        stroke="#232526"
        fill="none"
        strokeWidth={stroke}
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
      <circle
        stroke={color}
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.45s ease" }}
      />
    </svg>
  );
}
