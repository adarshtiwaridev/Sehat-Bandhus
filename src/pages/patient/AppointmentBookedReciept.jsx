// src/app/receipt/page.js or src/components/AppointmentReceipt.jsx

import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

// Dynamically import the PDF generation libraries only on the client side
// This is necessary because these libraries rely on browser APIs.
let jsPDF;
let html2canvas;

if (typeof window !== 'undefined') {
    import('jspdf').then(mod => { jsPDF = mod.jsPDF; });
    import('html2canvas').then(mod => { html2canvas = mod.default; });
}

// ----------------------------------------------------------------------
// Mock Data Structure (Replace with actual data fetching/props in a real app)
// ----------------------------------------------------------------------

const mockReceiptData = {
    receiptId: 'RPT-20231005-001',
    receiptDate: '05 Oct 2025',
    doctorName: 'Dr. Alice Johnson',
    doctorSpecialization: 'Cardiology',
    appointmentDate: '10 Oct 2025',
    appointmentTime: '10:30 AM',
    patientName: 'John Doe',
    patientAge: 35,
    patientEmail: 'john.doe@example.com',
    patientMobile: '98765-43210',
    patientAddress: '123 Main St, Springfield, USA',
    patientGender: 'Male',
    symptoms: 'Mild chest discomfort and shortness of breath.',
    paymentMethod: 'Credit Card',
    totalFees: '500.00',
};

// ----------------------------------------------------------------------
// Next.js Component
// ----------------------------------------------------------------------

const AppointmentReceipt = () => {
    // Use state or props for the data
    const [receiptData] = useState(mockReceiptData);
    const receiptRef = useRef(null);

    // Function to handle the PDF download
    const downloadReceipt = async (event) => {
        event.preventDefault();

        if (!receiptRef.current || !html2canvas || !jsPDF) {
            console.error('PDF libraries not loaded or element not found.');
            return;
        }

        const receiptElement = receiptRef.current;

        try {
            // Use html2canvas to convert the HTML element to a canvas/image
            const canvas = await html2canvas(receiptElement, {
                scale: 2, // Increased scale for better resolution
                useCORS: true,
                willReadFrequently: true,
                logging: false,
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Initialize jsPDF
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            // Add the image to the PDF
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

            // Save the PDF
            pdf.save(`receipt-${receiptData.receiptId}.pdf`);

            // Redirect after a short delay (optional, as per original logic)
            setTimeout(() => {
                window.location.href = "/dashboard"; // Use Next.js routing path
            }, 5000);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <>
            <Head>
                <title>Receipt View</title>
                {/* Include Font Awesome for icons */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                    integrity="sha512-..."
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </Head>

            {/* Breadcrumb - Mimicking the original structure */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Receipt View</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li>
                                    <Link href="/" className="hover:text-primary-color">
                                        Home
                                    </Link>
                                </li>
                                <li aria-current="page" className="text-gray-700">
                                    / Receipt
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* /Breadcrumb */}

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">
                    {/* Receipt Header and Download Button */}
                    <div className="max-w-4xl mx-auto flex justify-between items-center py-5">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-600">
                                Receipt Id
                                <small className="text-sm font-normal ml-2 text-gray-500">
                                    <i className="fa-solid fa-angle-double-right mr-1"></i> ID: {receiptData.receiptId}
                                </small>
                            </h3>
                        </div>
                        <span>
                            <button
                                onClick={downloadReceipt}
                                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-150 shadow-md"
                            >
                                <i className="fa-solid fa-download mr-2"></i> Download
                            </button>
                        </span>
                    </div>

                    {/* Invoice Container - Main Receipt Body */}
                    <div className="invoice-container max-w-4xl mx-auto p-5 border border-gray-300 bg-white shadow-lg rounded-xl">
                        <div id="Print-Receipt" ref={receiptRef}>
                            {/* The table structure is preserved but with Tailwind CSS styling and React data */}
                            <table className="min-w-full border-collapse" style={{ fontFamily: 'Arial, sans-serif' }}>
                                <thead>
                                    <tr>
                                        <td colSpan="2" className="p-3">
                                            <div className="max-h-12">
                                                {/* Replace with Next.js Image component and actual logo path */}
                                                <img src="/assets/img/logo.svg" alt="logo" className="max-h-12" />
                                            </div>
                                        </td>
                                        <td colSpan="2" className="text-right text-2xl font-bold p-3">
                                            Appointment Receipt
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Clinic Info & Receipt Details */}
                                    <tr className="border-t border-gray-200">
                                        <td colSpan="2" className="p-3 text-sm text-gray-700">
                                            <strong>Clinic Name:</strong> XYZ <br />
                                            <strong>Clinic Address:</strong> XYZ, A, B, C <br />
                                            <strong>Email:</strong> xyz@gmail.com <br />
                                            <strong>Mobile:</strong> XX-XX-XX-XX-XX
                                        </td>
                                        <td colSpan="2" className="text-right p-3 text-sm text-gray-700">
                                            <strong>Receipt Id:</strong> {receiptData.receiptId} <br />
                                            <strong>Receipt Date:</strong> {receiptData.receiptDate}
                                        </td>
                                    </tr>
                                    {/* Doctor Info */}
                                    <tr className="border-t border-gray-200">
                                        <td colSpan="2" className="p-3 text-sm"><strong>Doctor Name:</strong> {receiptData.doctorName}</td>
                                        <td colSpan="2" className="p-3 text-sm"><strong>Speciality:</strong> {receiptData.doctorSpecialization}</td>
                                    </tr>
                                    {/* Appointment Details */}
                                    <tr className="border-t border-gray-200">
                                        <td colSpan="2" className="p-3 text-sm"><strong>Appointment Date:</strong> {receiptData.appointmentDate}</td>
                                        <td colSpan="2" className="p-3 text-sm"><strong>Appointment Time:</strong> {receiptData.appointmentTime}</td>
                                    </tr>
                                    {/* Patient Name & Age */}
                                    <tr className="border-t border-gray-200">
                                        <td colSpan="2" className="p-3 text-sm"><strong>Patient Name:</strong> {receiptData.patientName}</td>
                                        <td colSpan="2" className="p-3 text-sm"><strong>Age:</strong> {receiptData.patientAge}</td>
                                    </tr>
                                    {/* Patient Contact */}
                                    <tr className="border-t border-gray-200">
                                        <td colSpan="2" className="p-3 text-sm"><strong>Email:</strong> {receiptData.patientEmail}</td>
                                        <td colSpan="2" className="p-3 text-sm"><strong>Mobile No:</strong> {receiptData.patientMobile}</td>
                                    </tr>
                                    {/* Patient Address & Gender */}
                                    <tr className="border-t border-gray-200">
                                        <td colSpan="3" className="p-3 text-sm"><strong>Address:</strong> {receiptData.patientAddress}</td>
                                        <td colSpan="1" className="p-3 text-sm"><strong>Gender:</strong> {receiptData.patientGender}</td>
                                    </tr>
                                    {/* Symptoms */}
                                    <tr className="border-t border-gray-200">
                                        <td colSpan="4" className="p-3 text-sm"><strong>Symptoms:</strong> {receiptData.symptoms}</td>
                                    </tr>
                                    {/* Payment Method */}
                                    <tr className="border-t border-gray-200">
                                        <td colSpan="4" className="p-3 text-right text-sm"><strong>Payment Method:</strong> {receiptData.paymentMethod}</td>
                                    </tr>
                                    {/* Total Amount */}
                                    <tr className="border-t border-gray-300">
                                        <td colSpan="4" className="p-3 text-right text-lg font-bold text-green-600">
                                            <strong>Total Amount:</strong> ₹{receiptData.totalFees}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
        </>
    );
};

export default AppointmentReceipt;