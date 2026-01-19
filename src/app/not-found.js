import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white border rounded-lg shadow p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">404 — Page Not Found</h1>
        <p className="text-sm text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Go home</Link>
      </div>
    </div>
  );
}
