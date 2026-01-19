import * as React from "react"

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`block w-full rounded-lg border border-gray-300 bg-white/80 shadow-glass px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className}`}
      {...props}
    />
  );
});
Input.displayName = "Input";
