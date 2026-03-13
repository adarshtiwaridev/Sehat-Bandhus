"use client";
// This is a error file
import React from "react";

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Something went wrong it is  😵</h2>
      <p>{error?.message}</p>
      <button
        onClick={() => reset()}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
