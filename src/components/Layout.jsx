import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main>{children}</main>
    </div>
  );
}
