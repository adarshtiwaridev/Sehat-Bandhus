import * as React from "react"

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-2xl bg-white/60 shadow-glass backdrop-blur-lg border border-white/40 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
