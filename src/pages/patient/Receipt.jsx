// src/app/receipts/page.js

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// Note: In a real Next.js project, you'd install these via npm:
// npm install html2canvas jspdf

// --- MOCK DATA ---
const mockPatient = {
    lName: 'Jane Doe',
    lPatientId: 'PT-9876',
    lGender: 'Female',
    lAge: 28,
    Image2: '/img/patient-avatar.jpg',
};

const mockReceipts = [
    {
        ReceiptId: 'RPT-00121',
        DoctorId: 101,
        DoctorImage: '/img/doctor-smith.jpg',
        Name: 'Dr. John Smith',
        AppointmentDate: '2025-09-10',
        AppointmentCreatedDate: '2025-09-08',
        ConsulationFee: 750,
        RID: 'RPT-00121-DET',
        // Detailed Receipt Info (for modal)
        DoctorSpecialization: 'Cardiologist',
        AppointmentTime: '10:30 AM',
        PatientName: 'Jane Doe',
        PatientAge: 28,
        PatientEmail: 'jane.doe@example.com',
        PatientMobile: '9876543210',
        PatientAddress: '123 Health Ave, New Delhi',
        PatientGender: 'Female',
        Symptoms: 'Chest pain and fatigue.',
        PaymentMethod: 'Online UPI',
        TotalFees: 750,
    },
    {
        ReceiptId: 'RPT-00120',
        DoctorId: 102,
        DoctorImage: '/img/doctor-lee.jpg',
        Name: 'Dr. Sarah Lee',
        AppointmentDate: '2025-08-25',
        AppointmentCreatedDate: '2025-08-20',
        ConsulationFee: 550,
        RID: 'RPT-00120-DET',
        DoctorSpecialization: 'Dermatologist',
        AppointmentTime: '04:00 PM',
        PatientName: 'Jane Doe',
        PatientAge: 28,
        PatientEmail: 'jane.doe@example.com',
        PatientMobile: '9876543210',
        PatientAddress: '123 Health Ave, New Delhi',
        PatientGender: 'Female',
        Symptoms: 'Skin rash and itching.',
        PaymentMethod: 'Credit Card',
        TotalFees: 550,
    },
];

// --- COMPONENTS ---

const PatientSidebar = ({ patient, handleLogout }) => {
    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: 'fa-shapes', active: false },
        { name: 'Doctors', href: '/doctors', icon: 'fa-user-doctor', active: false },
        { name: 'My Appointment', href: '/appointments', icon: 'fa-calendar-check', active: false },
        { name: 'Doctor Suggestions', href: '/doctors-suggestion', icon: 'fa-shield-halved', active: false },
        { name: 'Add Medical Records', href: '/medical-records', icon: 'fa-money-bill-1', active: false },
        { name: 'Vitals', href: '/vitals', icon: 'fa-shield-halved', active: false },
        { name: 'Receipts', href: '/receipts', icon: 'fa-file-lines', active: true },
        { name: 'Profile Settings', href: '/profile', icon: 'fa-user-pen', active: false },
        { name: 'Change Password', href: '/profile/change-password', icon: 'fa-key', active: false },
    ];

    return (
        <div className="profile-sidebar patient-sidebar profile-sidebar-new bg-white shadow rounded-lg sticky top-20">
            <div className="widget-profile pro-widget-content p-5 border-b">
                <div className="profile-info-widget flex items-center space-x-3">
                    <Link href="/profile" className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                        <img src={patient.Image2} alt="Patient Avatar" className="w-full h-full object-cover" />
                    </Link>
                    <div>
                        <Link href="/profile" className="text-lg font-semibold text-black hover:text-blue-600">{patient.lName}</Link><br />
                        <p className="text-xs text-gray-600">{patient.lPatientId}</p>                                               
                        <span className="text-xs text-gray-600 mr-2">{patient.lGender}</span>
                        <span className="text-xs text-gray-600">{patient.lAge} yrs</span>
                    </div>
                </div>
            </div>
            <div className="dashboard-widget p-5">
                <nav className="dashboard-menu space-y-1">
                    <ul>
                        {navItems.map(item => (
                            <li key={item.name} className={item.active ? 'active' : ''}>
                                <Link href={item.href} className={`flex items-center p-2 rounded-lg transition ${item.active ? 'bg-blue-500 text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                                    <i className={`fa-solid ${item.icon} w-5 mr-3`}></i>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button onClick={handleLogout} className="flex items-center p-2 rounded-lg transition text-gray-700 hover:bg-gray-100 w-full text-left">
                                <i className="fa-solid fa-sign-out w-5 mr-3"></i>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

// Detailed Receipt Modal Component
const ReceiptModal = ({ isVisible, onClose, receipt }) => {
    if (!isVisible || !receipt) return null;

    const downloadReceipt = async (e) => {
        e.preventDefault();
        const receiptElement = document.getElementById('Print-Receipt');
        if (!receiptElement) return;

        // Use a slight timeout to ensure all elements are rendered before capture
        setTimeout(async () => {
            const canvas = await html2canvas(receiptElement, { scale: 2, useCORS: true, willReadFrequently: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                compress: true
            });
            pdf.addImage(imgData, 'jpeg', 0, 0, imgWidth, imgHeight);
            pdf.save(`receipt-${receipt.ReceiptId}.pdf`);

            // Original code redirected after 10s, which isn't necessary in React
            // window.location.href = "/receipts"; 

        }, 500);
    };

    const formattedRDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black bg-opacity-80 modalBack" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col modalPopup" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-bold">View Receipt</h3>
                    <button type="button" className="text-gray-400 hover:text-gray-600" onClick={onClose}>
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </button>
                </div>
                <div className="modal-body p-5 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="font-semibold">{new Date(receipt.AppointmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h5>
                        <button onClick={downloadReceipt} className="btn bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-full transition">
                            <i className="fa-solid fa-download mr-2"></i> Download
                        </button>
                    </div>

                    {/* Receipt Content for Print */}
                    <div id="Print-Receipt" className="bg-white p-5 border border-gray-200 rounded-lg">
                        <table className="min-w-full table-auto border border-gray-300" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <thead>
                                <tr className="border-b">
                                    <td colSpan="2" className="p-4">
                                        <div className="invoice-logo">
                                            <img src="/img/logo.svg" alt="logo" style={{ maxHeight: '50px' }} />
                                        </div>
                                    </td>
                                    <td colSpan="2" className="p-4 text-right text-2xl font-bold text-gray-800">
                                        Appointment Receipt
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td colSpan="2" className="p-4 text-sm">
                                        <strong>Clinic Name:</strong> XYZ <br />
                                        <strong>Clinic Address:</strong> XYZ, A, B, C <br />
                                        <strong>Email:</strong> xyz@gmail.com <br />
                                        <strong>Mobile:</strong> XX-XX-XX-XX-XX
                                    </td>
                                    <td colSpan="2" className="p-4 text-right text-sm">
                                        <strong>Receipt Id:</strong> {receipt.ReceiptId} <br />
                                        <strong>Receipt Date:</strong> {formattedRDate}
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td colSpan="2" className="p-4 text-sm"><strong>Doctor Name:</strong> {receipt.Name}</td>
                                    <td colSpan="2" className="p-4 text-sm"><strong>Speciality:</strong> {receipt.DoctorSpecialization}</td>
                                </tr>
                                <tr className="border-b">
                                    <td colSpan="2" className="p-4 text-sm"><strong>Appointment Date:</strong> {new Date(receipt.AppointmentDate).toLocaleDateString()}</td>
                                    <td colSpan="2" className="p-4 text-sm"><strong>Appointment Time:</strong> {receipt.AppointmentTime}</td>
                                </tr>
                                <tr className="border-b">
                                    <td colSpan="2" className="p-4 text-sm"><strong>Patient Name:</strong> {receipt.PatientName}</td>
                                    <td colSpan="2" className="p-4 text-sm"><strong>Age:</strong> {receipt.PatientAge}</td>
                                </tr>
                                <tr className="border-b">
                                    <td colSpan="2" className="p-4 text-sm"><strong>Email:</strong> {receipt.PatientEmail}</td>
                                    <td colSpan="2" className="p-4 text-sm"><strong>Mobile No:</strong> {receipt.PatientMobile}</td>
                                </tr>
                                <tr className="border-b">
                                    <td colSpan="3" className="p-4 text-sm"><strong>Address:</strong> {receipt.PatientAddress}</td>
                                    <td colSpan="1" className="p-4 text-sm"><strong>Gender:</strong> {receipt.PatientGender}</td>
                                </tr>
                                <tr className="border-b">
                                    <td colSpan="4" className="p-4 text-sm"><strong>Symptoms:</strong> {receipt.Symptoms}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="p-4 text-right text-sm"><strong>Payment Method:</strong> {receipt.PaymentMethod}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="p-4 text-right text-xl font-bold text-green-600">
                                        <strong>Total Amount:</strong> ₹{receipt.TotalFees}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* End Receipt Content */}
                </div>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---

const ReceiptsPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredReceipts, setFilteredReceipts] = useState(mockReceipts);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    // Search Filtering Logic
    useEffect(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        const results = mockReceipts.filter(receipt => {
            const searchableText = [
                receipt.ReceiptId,
                receipt.Name,
                new Date(receipt.AppointmentDate).toLocaleDateString(),
                new Date(receipt.AppointmentCreatedDate).toLocaleDateString(),
                receipt.ConsulationFee.toString(),
            ].join(' ').toLowerCase();

            return searchableText.includes(lowerCaseSearch);
        });
        setFilteredReceipts(results);
    }, [searchTerm]);

    const handleLogout = () => {
        router.push('/logout');
    };

    const handleViewReceipt = useCallback((receipt) => {
        setSelectedReceipt(receipt);
        setIsModalVisible(true);
    }, []);
    
    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false);
        setSelectedReceipt(null);
    }, []);


    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Receipts</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                                <li aria-current="page" className="text-gray-700">/ Receipts</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* /Breadcrumb */}

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* Profile Sidebar */}
                        <div className="lg:w-1/4">
                            <PatientSidebar patient={mockPatient} handleLogout={handleLogout} />
                        </div>
                        {/* /Profile Sidebar */}
                        
                        {/* Receipts Content */}
                        <div className="lg:w-3/4">
                            <h3 className="text-2xl font-bold mb-4">Receipts</h3>

                            {/* Search Input */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    className="form-control w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search by ID, Doctor, or Date..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>
                            </div>

                            {/* Receipts Table */}
                            <div className="bg-white shadow rounded-lg overflow-x-auto">
                                <table className="table table-center min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked on</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredReceipts.length > 0 ? (
                                            filteredReceipts.map(receipt => (
                                                <tr key={receipt.ReceiptId} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                                        <button 
                                                            onClick={() => handleViewReceipt(receipt)} 
                                                            className="hover:underline"
                                                        >
                                                            {receipt.ReceiptId}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <Link href={`/doctors/${receipt.DoctorId}`} className="flex items-center space-x-2">
                                                                <img className="w-8 h-8 rounded-full object-cover" src={receipt.DoctorImage} alt="Doctor"/>
                                                                <span className="text-sm font-medium text-gray-900 hover:text-blue-600">{receipt.Name}</span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(receipt.AppointmentDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(receipt.AppointmentCreatedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                                        ₹ {receipt.ConsulationFee}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="action-item">
                                                            <button 
                                                                onClick={() => handleViewReceipt(receipt)} 
                                                                className="md w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-100 transition"
                                                                title="View Details"
                                                            >
                                                                <i className="fa-solid fa-link text-sm"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No receipts found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-8">
                                <ul className="flex items-center space-x-2 text-sm">
                                    {/* Simplified static pagination links */}
                                    <li><Link href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition"><i className="fa-solid fa-chevron-left fa-xs"></i></Link></li>
                                    <li><Link href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">1</Link></li>
                                    <li><Link href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold">2</Link></li>
                                    <li><Link href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">3</Link></li>
                                    <li><Link href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition">...</Link></li>
                                    <li><Link href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition"><i className="fa-solid fa-chevron-right fa-xs"></i></Link></li>
                                </ul>
                            </div>
                            {/* /Pagination */}
                        </div>
                        {/* /Receipts Content */}
                    </div>
                </div>
            </div>      
            {/* /Page Content */}

            {/* Receipt View Modal (Replaces ModalPopupExtender) */}
            <ReceiptModal isVisible={isModalVisible} onClose={handleCloseModal} receipt={selectedReceipt} />
            
            <style jsx global>{`
                /* Global Font-Awesome for icons */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
            `}</style>
        </>
    );
};

export default ReceiptsPage;