import Link from "next/link";

export default function Page404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
        
        {/* Icon / Visual */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 text-xl font-semibold">
          404
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or may have been moved.
          Don’t worry, your care journey continues.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
          >
            Go to Home
          </Link>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
