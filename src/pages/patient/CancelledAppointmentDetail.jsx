// src/app/appointments/cancelled/[id]/page.js (Dynamic Route Component)

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// --- MOCK DATA STRUCTURES ---

const mockPatient = {
    name: 'Jane Doe',
    id: 'PT-9876',
    gender: 'Female',
    age: 28,
    imageUrl: '/path/to/patient-avatar.jpg',
};

const mockAppointmentDetails = {
    AppointmentId: 201,
    DoctorId: 3,
    DoctorName: 'Dr. Alice Brown',
    DoctorEmail: 'alice@clinic.com',
    DoctorPhone: '555-9012',
    DoctorImage: '/img/doctor-alice.jpg',
    PatientName: mockPatient.name,
    ConsultationFee: 50.00,
    PaymentMode: 'Razorpay',
    AppointmentDate: '2025-09-01', // YYYY-MM-DD
    AppointmentTime: '11:00 AM - 12:00 PM',
    CancellationReason: 'Patient had a conflicting schedule.',
    CancelledBy: 'Patient', // Or 'Doctor'
    CancelDate: '2025-08-30',
};

// FAKE API function to simulate fetching data
const fetchAppointmentDetails = (id) => new Promise(resolve => {
    setTimeout(() => {
        // In a real app, you'd fetch the specific detail by ID
        if (id.toString() === '201') {
            resolve(mockAppointmentDetails);
        } else {
            resolve(null);
        }
    }, 500);
});

// --- MODAL COMPONENT (Replacement for ModalPopupExtender) ---

const CancellationReasonModal = ({ isVisible, onClose, reason, cancelDate, cancelledBy }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[10000]" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full m-4" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h5 className="text-xl font-semibold text-gray-800">Cancellation Reason</h5>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
                <div className="p-5">
                    <div className="text-sm text-gray-700 mb-3">
                        <p>{reason}</p>
                    </div>
                    <span className="text-red-500 text-xs font-medium">
                        Cancelled By {cancelledBy} on {new Date(cancelDate).toLocaleDateString('en-GB')}
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const CancelledAppointmentDetail = () => {
    const router = useRouter();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showReasonModal, setShowReasonModal] = useState(false);
    // router.query may be empty on first render; read safely
    const appointmentId = router?.query?.id ?? router?.query?.appointmentId ?? null;

    useEffect(() => {
        // 💡 FIX: Add a guard clause to ensure appointmentId is valid before fetching.
        if (appointmentId) {
            setLoading(true);
            fetchAppointmentDetails(appointmentId).then(data => {
                setAppointment(data);
                setLoading(false);
            }).catch(e => {
                console.error("Error fetching detail:", e);
                setLoading(false);
            });
        } 
        // If appointmentId is not present yet (e.g., initial render), stay in loading state.
        // We only set loading to false if a fetch attempt completes or fails.

    }, [appointmentId]); // Depend on appointmentId

    // Fallback if data is still loading or ID is missing initially
    // if (loading || !appointmentId) {
    //     return <div className="text-center py-20 text-gray-500">Loading appointment details...</div>;
    // }
    
    // if (!appointment) {
    //     return <div className="text-center py-20 text-red-500">Appointment #{appointmentId} not found or is not cancelled.</div>;
    // }
    const formattedDate = new Date(new Date()).toLocaleDateString('en-GB');

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li>
                                    <Link href="/" className="hover:text-blue-600">Home</Link>
                                </li>
                                <li>
                                    <Link href="/appointments" className="hover:text-blue-600">Appointments</Link>
                                </li>
                                <li aria-current="page" className="text-gray-700">/ Details</li>
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
                        
                        {/* Profile Sidebar (Re-used from previous component) */}
                        <div className="lg:w-1/4">
                            <div className="bg-white shadow rounded-lg p-5 sticky top-20">
                                <div className="border-b pb-4 mb-4">
                                    <div className="flex items-center space-x-3">
                                        <Link href="/profile" className="w-16 h-16 rounded-full overflow-hidden">
                                            <img src={mockPatient.imageUrl} alt="Patient Avatar" className="w-full h-full object-cover" />
                                        </Link>
                                        <div>
                                            <Link href="/profile" className="text-lg font-semibold text-black hover:text-blue-600">{mockPatient.name}</Link>
                                            <p className="text-xs text-gray-600">ID: {mockPatient.id}</p>
                                            <p className="text-xs text-gray-600">{mockPatient.gender} - {mockPatient.age} yrs</p>
                                        </div>
                                    </div>
                                </div>
                                <nav className="space-y-1">
                                    {[
                                        { name: 'Dashboard', href: '/dashboard', icon: 'fa-solid fa-shapes' },
                                        { name: 'My Appointment', href: '/appointments', icon: 'fa-solid fa-calendar-check', active: true },
                                        { name: 'Logout', onClick: () => router.push('/logout'), icon: 'fa-solid fa-sign-out' },
                                    ].map(item => (
                                        <Link key={item.name} href={item.href || '#'} onClick={item.onClick} className={`flex items-center p-2 rounded-lg transition ${item.active ? 'bg-blue-500 text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                                            <i className={`${item.icon} w-5 mr-3`}></i>
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        {/* /Profile Sidebar */}
                        
                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            <div className="dashboard-header flex items-center mb-6">
                                <Link href="/appointments" className="text-gray-500 hover:text-blue-500 mr-4">
                                    <i className="fa-solid fa-arrow-left text-xl"></i>
                                </Link>
                                <h3 className="text-2xl font-semibold">Appointment Details</h3>
                            </div>

                            {/* Appointment Detail Card */}
                            <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-100">
                                {/* Doctor Info and Status */}
                                <div className="flex justify-between items-start flex-wrap gap-4 border-b pb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                            <img src={appointment?.DoctorImage} alt="Doctor" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">#Apt000{appointment?.AppointmentId}</p>
                                            <h4 className="text-lg font-semibold text-gray-800">{appointment?.DoctorName}</h4>
                                            <ul className="text-xs text-gray-600 space-y-1 mt-1">
                                                <li><i className="fa-solid fa-envelope mr-1 text-blue-500"></i>{appointment?.DoctorEmail}</li>
                                                <li><i className="fa-solid fa-phone mr-1 text-blue-500"></i>{appointment?.DoctorPhone}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Cancelled</span>
                                            <button onClick={() => setShowReasonModal(true)} className="text-sm text-gray-600 hover:text-blue-600 underline" style={{marginBottom: 0}}>
                                                Reason
                                            </button>
                                        </div>
                                        <h6 className="text-sm font-medium text-gray-700">
                                            Consultation Fees: <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>{appointment?.ConsultationFee.toFixed(2)}
                                        </h6>
                                        <h6 className="text-xs text-gray-600 mt-1">
                                            Payment Mode: <span className="font-medium text-gray-800">{appointment?.PaymentMode}</span>
                                        </h6>
                                    </div>
                                </div>

                                {/* Patient Details */}
                                <div className="border-b pb-4">
                                    <h6 className="text-sm font-semibold text-gray-700 mb-1">Patient Name</h6>
                                    <p className="text-base text-gray-800">{appointment?.PatientName}</p>
                                </div>

                                {/* Appointment Schedule & Reschedule */}
                                <div className="flex justify-between items-center flex-wrap gap-4 pt-2">
                                    <div className="min-w-[150px]">
                                        <h6 className="text-sm font-semibold text-gray-700">Appointment Date</h6>
                                        <span className="text-base font-medium text-gray-800">{formattedDate}</span>
                                    </div>
                                    <div className="min-w-[150px]">
                                        <h6 className="text-sm font-semibold text-gray-700">Appointment Time &amp; Shift</h6>
                                        <span className="text-base font-medium text-gray-800">{appointment?.AppointmentTime}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mr-2">Status: Reschedule</span>
                                        <Link href={`/appointments/book?doctorId=${appointment?.DoctorId}`} className="inline-block px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full text-sm font-medium transition">
                                            Reschedule Appointment
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* /Appointment Detail Card */}
                        </div>
                        {/* /Main Content */}
                    </div>
                </div>
            </div>      
            {/* /Page Content */}
            
            {/* Cancellation Reason Modal */}
            <CancellationReasonModal
                isVisible={showReasonModal}
                onClose={() => setShowReasonModal(false)}
                reason={appointment?.CancellationReason}
                cancelDate={appointment?.CancelDate}
                cancelledBy={appointment?.CancelledBy}
            />

            <style jsx global>{`
                /* Global Font-Awesome for icons */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
            `}</style>
        </>
    );
};

export default CancelledAppointmentDetail;