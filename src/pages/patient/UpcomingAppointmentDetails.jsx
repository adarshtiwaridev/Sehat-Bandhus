// src/app/appointments/[id]/page.js (Assuming dynamic routing based on appointment ID)

"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- MOCK DATA ---
const mockPatient = {
    lName: 'Jane Doe',
    lPatientId: 'PT-9876',
    lGender: 'Female',
    lAge: 28,
    Image2: '/img/patient-avatar.jpg',
};

const mockAppointment = {
    LAppoinemntId: '12345',
    lDoctorName: 'Dr. Michael Johnson',
    lDoctorEmail: 'michael.j@clinic.com',
    lDoctorPhone: '+1 123 456 7890',
    doctorImage: '/img/doctor-michael.jpg',
    lConsulationFee: 750, // Indian Rupee (₹)
    lAppointmentDate: '25 Oct 2025',
    lAppointmentTime: '10:00 AM',
    lAppointmentShift: 'Morning',
    ClinicLocationName: "Adrian’s Dentistry",
    ClinicLocationAddress: "Newyork, United States",
    status: 'Upcoming', // Used for badge
    // HiddenField equivalent
    HiddenAppointmentId: 'APT-12345'
};


// --- COMPONENTS ---

// Reusable Patient Sidebar Component
const PatientSidebar = ({ patient, handleLogout }) => {
    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: 'fa-shapes', active: false },
        { name: 'Doctors', href: '/doctors', icon: 'fa-user-doctor', active: false },
        { name: 'My Appointment', href: '/appointments', icon: 'fa-calendar-check', active: true },
        { name: 'Doctor Suggestions', href: '/doctors-suggestion', icon: 'fa-shield-halved', active: false },
        { name: 'Add Medical Records', href: '/medical-records', icon: 'fa-money-bill-1', active: false },
        { name: 'Vitals', href: '/vitals', icon: 'fa-shield-halved', active: false },
        { name: 'Receipts', href: '/receipts', icon: 'fa-file-lines', active: false },
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

// Cancel Appointment Modal Component (Replaces Panel2 and ModalPopupExtender)
const CancelModal = ({ isVisible, onClose, appointmentId, onConfirmCancel }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    if (!isVisible) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reason.trim() === '') {
            setError('Cancellation reason is required.');
            return;
        }
        setError('');
        onConfirmCancel(appointmentId, reason);
        setReason('');
    };

    return (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black bg-opacity-80 modalBack" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md modalPopup" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center p-5 border-b">
                        <h5 className="modal-title text-xl font-bold text-gray-800">Cancel Appointment</h5>
                        <button type="button" className="text-gray-400 hover:text-gray-600" onClick={onClose}>
                            <i className="fa-solid fa-xmark text-2xl"></i>
                        </button>
                    </div>              
                    <div className="modal-body p-5">
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="txtCancelReason">
                                Reason for Cancellation<span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                id="txtCancelReason" 
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" 
                                rows="4" 
                                value={reason} 
                                onChange={(e) => { setReason(e.target.value); setError(''); }}
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                    </div>
                    <div className="modal-footer p-4 border-t flex justify-end space-x-3">
                        <button type="button" className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 py-2 px-4 rounded-full transition" onClick={onClose}>
                            Close
                        </button>
                        <button type="submit" className="btn bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-full transition">
                            Cancel Appointment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---

const UpcomingAppointmentDetails = () => {
    const router = useRouter();
    const [appointment, setAppointment] = useState(mockAppointment);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

    const handleLogout = () => {
        router.push('/logout');
    };

    const handleOpenCancelModal = (e) => {
        e.preventDefault();
        setIsCancelModalVisible(true);
    };

    const handleConfirmCancel = (appointmentId, reason) => {
        // Implement actual cancellation logic here (API call)
        console.log(`Cancelling appointment ${appointmentId} with reason: ${reason}`);
        
        // Simulate API success
        alert(`Appointment ${appointmentId} successfully cancelled.`);
        setIsCancelModalVisible(false);
        
        // Optional: Redirect back to the appointment list
        // router.push('/appointments');
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                                <li aria-current="page" className="text-gray-700">/ Appointments</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* /Breadcrumb */}

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">
                    <div className="row flex flex-col lg:flex-row gap-6">
                        
                        {/* Profile Sidebar */}
                        <div className="lg:w-1/4">
                            <PatientSidebar patient={mockPatient} handleLogout={handleLogout} />
                        </div>
                        {/* /Profile Sidebar */}
                        
                        {/* Appointment Details Content */}
                        <div className="lg:w-3/4">
                            <div className="flex items-center mb-6">
                                <Link href="/appointments" className="back-arrow text-blue-600 hover:text-blue-800 mr-3">
                                    <i className="fa-solid fa-arrow-left"></i>
                                </Link>
                                <h3 className="text-2xl font-bold text-gray-800">Appointment Details</h3>
                            </div>

                            <div className="appointment-details-wrap">
                                {/* Appointment Detail Card */}
                                <div className="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-100">
                                    <ul className="space-y-4 border-b pb-4 mb-4">
                                        <li className="flex justify-between items-start">
                                            {/* Patient/Doctor Information */}
                                            <div className="flex items-center space-x-4">
                                                <Link href={`/doctors/${appointment.lDoctorName}`} className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                                    <img src={appointment.doctorImage} className="w-full h-full object-cover" alt="Doctor Image" />
                                                </Link>
                                                <div>
                                                    <p className="text-xs text-gray-500">Apt000{appointment.LAppoinemntId}</p>
                                                    <h6 className="text-lg font-semibold text-gray-900">
                                                        <Link href={`/doctors/${appointment.lDoctorName}`} className='hover:text-blue-600'>
                                                            {appointment.lDoctorName}
                                                        </Link>
                                                    </h6>
                                                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                                                        <p><i className="fa-solid fa-envelope w-4 mr-1"></i> {appointment.lDoctorEmail}</p>
                                                        <p><i className="fa-solid fa-phone w-4 mr-1"></i>{appointment.lDoctorPhone}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions and Fees */}
                                            <div className="text-right flex flex-col items-end space-y-3">
                                                <span className="badge bg-yellow-100 text-yellow-800 font-bold px-3 py-1.5 rounded-full text-sm">
                                                    {appointment.status}
                                                </span>
                                                <div className="text-lg font-bold text-gray-800">
                                                    Consultation Fees: ₹{appointment.lConsulationFee}
                                                </div>
                                                <ul className='flex space-x-3'>
                                                    <li>
                                                        <Link href="#" className='w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition'>
                                                            <i className="fa-solid fa-comments"></i>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button 
                                                            onClick={handleOpenCancelModal}
                                                            className='w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition'
                                                            title='Cancel Appointment'
                                                        >
                                                            <i className="fa-solid fa-xmark"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                    
                                    {/* Bottom Details */}
                                    <ul className="detail-card-bottom-info grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <li className='flex flex-col'>
                                            <h6 className='font-semibold text-gray-800 mb-1'>Appointment Date</h6>
                                            <span className="text-gray-600">
                                                {appointment.lAppointmentDate} 
                                            </span>
                                        </li>
                                        <li className='flex flex-col'>
                                            <h6 className='font-semibold text-gray-800 mb-1'>Appointment Time & Shift</h6>
                                            <span className='text-gray-600'>
                                                {appointment.lAppointmentTime} ({appointment.lAppointmentShift})
                                            </span>
                                        </li>
                                        <li className='flex flex-col'>
                                            <h6 className='font-semibold text-gray-800 mb-1'>Clinic Location</h6>
                                            <span className='text-gray-600'>{appointment.ClinicLocationName}</span>
                                        </li>
                                        <li className='flex flex-col'>
                                            <h6 className='font-semibold text-gray-800 mb-1'>Location</h6>
                                            <span className='text-gray-600'>{appointment.ClinicLocationAddress}</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* /Appointment Detail Card */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>      
            {/* /Page Content */}

            {/* Cancel Appointment Modal */}
            <CancelModal 
                isVisible={isCancelModalVisible} 
                onClose={() => setIsCancelModalVisible(false)} 
                appointmentId={appointment.HiddenAppointmentId}
                onConfirmCancel={handleConfirmCancel}
            />
            
            <style jsx global>{`
                /* Global Font-Awesome for icons */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
            `}</style>
        </>
    );
};

export default UpcomingAppointmentDetails;