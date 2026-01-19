import React, { useEffect, useState } from "react";

const TestPage = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch customers (mock API call)
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`/api/customers?page=${page}`);
        const data = await res.json();

        setCustomers(data.customers || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          Customer List
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left w-[80px]">Customer Id</th>
                <th className="py-3 px-4 text-left w-[150px]">Customer Name</th>
                <th className="py-3 px-4 text-left w-[150px]">Company Name</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr
                    key={customer.AppointmentId}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                  >
                    <td className="py-3 px-4 text-gray-700">
                      {customer.AppointmentId}
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {customer.PaitentName}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {customer.CompanyName || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-5 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            ← Previous
          </button>

          <span className="text-gray-700 font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`px-5 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
