import Link from 'next/link';

export default function Page404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white border rounded-lg shadow p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">404 — Page Not Found</h1>
        <p className="text-sm text-gray-600 mb-4">Sorry, we couldn't find that page.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Go home</Link>
      </div>
    </div>
  );
}
