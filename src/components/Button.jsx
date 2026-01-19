import * as React from "react"

export const Button = React.forwardRef(
  (
    { className = "", variant = "default", size = "md", ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 shadow-glass backdrop-blur-md",
      outline:
        "border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 shadow-glass backdrop-blur-md",
      ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
    return (
      <button
        ref={ref}
        className={` ${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
