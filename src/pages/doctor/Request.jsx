// File: pages/doctor/Request.jsx (Appointment Requests Page)

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Modal from 'react-modal'; 
import Swal from 'sweetalert2'; 

// Assuming you have your shared sidebar component
import DoctorProfileSidebar from '../../components/DoctorProfileSidebar'; 

// --- MOCK DATA (Replaces server-side data) ---
const doctorProfile = { name: "Dr. Jane Doe", imageUrl: "/assets/doctor-image.jpg", profileUrl: "/doctor/profile", qualification: "MBBS, MD", experience: "12 Years", specialty: "Pediatrics" };
const mockAllAppointments = [
    { AppointmentId: 101, PaitentName: "Alice B", imgUrl: "/assets/patient-1.jpg", AppointmentDate: "2025-10-09", AppointmentTime: "10:00 AM - 11:00 AM", Status: "Upcoming", PatientId: 501 },
    { AppointmentId: 102, PaitentName: "Bob C", imgUrl: "/assets/patient-2.jpg", AppointmentDate: "2025-10-08", AppointmentTime: "02:00 PM - 03:00 PM", Status: "Upcoming", PatientId: 502 },
    { AppointmentId: 103, PaitentName: "Charlie D", imgUrl: "/assets/patient-3.jpg", AppointmentDate: "2025-10-07", AppointmentTime: "04:00 PM - 05:00 PM", Status: "Completed", PatientId: 503 },
    { AppointmentId: 104, PaitentName: "Daisy E", imgUrl: "/assets/patient-4.jpg", AppointmentDate: "2025-01-01", AppointmentTime: "09:00 AM - 10:00 AM", Status: "Upcoming", PatientId: 504 },
];
const mockMedicalRecords = [
    { MedRecordId: 1, MedStartDate: '01/01/2025', HospitalName: 'City Clinic', Symptoms: 'Fever', MedReportFile: '/assets/report1.pdf' },
];

// --- Reusable Components ---

// Appointment Request Card Component (Replaces <ItemTemplate>)
const AppointmentRequestCard = ({ appointment, onAction }) => {
    const isUpcoming = appointment.Status === "Upcoming";
    const isCompleted = appointment.Status === "Completed";
    const formattedDate = new Date(appointment.AppointmentDate).toLocaleDateString('en-GB');
    
    return (
        <div className="appointment-wrap bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-6">
            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
                
                {/* Patient Information */}
                <li className="col-span-1">
                    <div className="flex items-center space-x-4">
                        <Link href="/patient-profile.html" className="block w-14 h-14 rounded-full overflow-hidden">
                            <Image src={appointment.imgUrl} alt="User Image" width={56} height={56} />
                        </Link>
                        <div className="patient-info">
                            <p className="text-sm text-gray-500">APT000{appointment.AppointmentId}</p>
                            <h6><Link href="/patient-profile.html" className="text-lg font-semibold text-gray-900 hover:text-blue-600">{appointment.PaitentName}</Link></h6>
                        </div>
                    </div>
                </li>
                
                {/* Appointment Info (Date/Time) */}
                <li className="col-span-1">
                    <div className="appointment-info text-sm text-gray-700">
                        <p className="font-medium">
                            {formattedDate} 
                            {isCompleted && (
                                // Tailwind equivalent of badge text-bg-success
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Accepted</span>
                            )}
                        </p>
                        <p className="text-gray-500 text-base">{appointment.AppointmentTime}</p>
                    </div>
                </li>
                
                {/* Actions */}
                <li className="col-span-1 md:col-span-2">
                    <ul className="flex flex-wrap space-x-4 justify-end">
                        {/* Accept/Reject Links (Visible only if Status is Upcoming) */}
                        {isUpcoming && (
                            <>
                                <li>
                                    <button onClick={() => onAction(appointment.AppointmentId, 'Accept')} className="accept-link text-green-600 hover:text-green-800 flex items-center space-x-1 font-medium">
                                        <i className="fa-solid fa-check"></i><span>Accept</span>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => onAction(appointment.AppointmentId, 'Reject')} className="reject-link text-red-600 hover:text-red-800 flex items-center space-x-1 font-medium">
                                        <i className="fa-solid fa-xmark"></i><span>Reject</span>
                                    </button>
                                </li>
                            </>
                        )}
                        
                        {/* Completed Actions (Visible only if Status is Completed) */}
                        {isCompleted && (
                            <>
                                <li>
                                    <Link href={`/doctor/start?AppointmentId=${appointment.AppointmentId}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                        <i className="fa-solid fa-link mr-1"></i>Start Appt.
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => onAction(appointment.PatientId, appointment.AppointmentId, 'ViewReport')} className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
                                        <i className="fa-solid fa-print mr-1"></i>Report
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

// Modal for Cancellation (Replaces Panel2/ModalPopupExtender1)
const AppointmentCancelModal = ({ isOpen, onClose, onSubmit, appointmentId }) => {
    const [reason, setReason] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (reason.trim()) {
            onSubmit(appointmentId, reason);
            setReason('');
        }
    };
    
    // Inline Tailwind styles replacing custom modalBack/modalPopup CSS
    const modalBackClass = "fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[1040]";
    const modalPopupClass = "bg-white border-[3px] border-black rounded-xl w-full max-w-lg shadow-2xl p-6";

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={modalPopupClass}
            overlayClassName={modalBackClass}
            ariaHideApp={false}
        >
            <div className="modal-content">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h5 className="text-xl font-semibold">Cancel Appointment</h5>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-xl" title="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="txtCancelReason" className="form-label mb-2 block text-sm font-medium text-black">
                            Reason for Cancellation<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="txtCancelReason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                            className="form-textarea w-full rounded-md border-gray-300 shadow-sm mb-4"
                            rows="4"
                        ></textarea>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-3 border-t">
                        <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Cancel Appointment
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

// Medical Report View Modal (Replaces Panel3/ModalPopExtender3)
const MedicalReportModal = ({ isOpen, onClose, records }) => {
    // Inline Tailwind styles replacing custom modalPopup CSS
    const modalPopupClass = "bg-white border-[3px] border-black rounded-xl w-full max-w-4xl mx-auto mt-10 shadow-2xl p-6";
    const modalBackClass = "fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[1040]";

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            className={modalPopupClass} 
            overlayClassName={modalBackClass} 
            ariaHideApp={false}
        >
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-2xl font-semibold">View Medical Record For Appointment</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-xl" title="Close">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">ID</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Hospital Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Symptoms</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {records.map(record => (
                            <tr key={record.MedRecordId}>
                                <td className="px-4 py-2 text-sm text-blue-600 cursor-pointer">{record.MedRecordId}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{new Date(record.MedStartDate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{record.HospitalName}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{record.Symptoms}</td>
                                <td className="px-4 py-2 flex space-x-2">
                                    <a href={record.MedReportFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700" title="View Report">
                                        <i className="fa-solid fa-eye"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
};    

// --- Main Page Component ---
export default function AppointmentRequestsPage() {
    const [appointments, setAppointments] = useState([]);
    const [filterPeriod, setFilterPeriod] = useState('Today'); // Today, Last7days, ThisMonth
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);
    const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
    const [reportsData, setReportsData] = useState([]);
    const router = useRouter();

    // 1. Data Fetching (Replaces AJAX calls and DropDownList1_SelectedIndexChanged)
    const getAppointmentRequests = useCallback(async (period) => {
        // In a real app, you would fetch data from your API Route here
        // const response = await fetch(`/api/doctor/requests?period=${period}`);
        // const data = await response.json();
        
        // Mocking filtering based on period
        const filtered = mockAllAppointments.filter(a => {
            // Simplified mock: just returns all upcoming appointments regardless of period
            if (period === 'Today' || period === 'Last7days' || period === 'ThisMonth') {
                return a.Status === 'Upcoming' || a.Status === 'Completed'; 
            }
            return true;
        });

        setAppointments(filtered);
    }, []);

    useEffect(() => {
        // Initial page load: Load data for the default selected period ("Today")
        getAppointmentRequests(filterPeriod); 
    }, [filterPeriod, getAppointmentRequests]);
    
    // 2. Action Handlers (Replaces RptAppointment_ItemCommand)
    const handleAppointmentAction = (appointmentId, action, patientId = null) => {
        if (action === 'Accept') {
            // Logic for acceptance (Replace with API call)
            Swal.fire('Accepted!', `Appointment ${appointmentId} accepted.`, 'success');
        } else if (action === 'Reject') {
            // Open modal for rejection reason
            setAppointmentToCancel(appointmentId);
            setIsModalOpen(true);
        } else if (action === 'ViewReport') {
            // Show medical reports for the completed appointment
            setReportsData(mockMedicalRecords); // Set data for modal
            setIsReportsModalOpen(true);
        }
    };
    
    // 3. Modal Submit Handler (Replaces BtnCancelAppointment_Click)
    const handleCancelSubmit = (appointmentId, reason) => {
        // Replace with actual API call to cancel the appointment
        console.log(`Cancelling appointment ${appointmentId} with reason: ${reason}`);
        Swal.fire('Cancelled!', `Appointment ${appointmentId} has been cancelled.`, 'success');
        setIsModalOpen(false);
    };

    return (
        <>
            <Head><title>Appointment Requests</title></Head>

            {/* Breadcrumb Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">Request</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center text-sm space-x-2">
                            <li><Link href="/Default" className="text-blue-600 hover:underline">Home</Link></li>
                            <li className="text-gray-500" aria-current="page">Request</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        
                        {/* Profile Sidebar (Left Column) */}
                        <div className="w-full lg:w-1/3 xl:w-1/4 px-4 sticky top-6">
                            <DoctorProfileSidebar profile={doctorProfile} activeItem="Requests" onLogout={() => router.push('/authpage')} />
                        </div>

                        {/* Main Content (Right Column) */}
                        <div className="w-full lg:w-2/3 xl:w-3/4 px-4">
                            
                            {/* Header and Dropdown Filter */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-semibold">Requests</h3>
                                
                                {/* Dropdown Filter (Replaces asp:DropDownList) */}
                                <ul>
                                    <li>
                                        <select 
                                            value={filterPeriod}
                                            onChange={(e) => setFilterPeriod(e.target.value)}
                                            className="bg-white border border-gray-300 h-9 rounded-md text-sm cursor-pointer justify-center text-center px-3"
                                            style={{ minWidth: '150px' }} // Custom width style
                                        >
                                            <option value="Today">Todays</option>
                                            <option value="Last7days">Last 7 days</option>
                                            <option value="ThisMonth">This Month</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Appointment List */}
                            <div className="space-y-6">
                                {appointments.length > 0 ? (
                                    appointments.map(appt => (
                                        <AppointmentRequestCard key={appt.AppointmentId} appointment={appt} onAction={handleAppointmentAction} />
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow">No appointment requests found for this period.</div>
                                )}
                            </div>
                            
                            {/* Load More Button */}
                            {appointments.length > 5 && ( // Example condition for showing Load More
                                <div className="text-center mt-6">
                                    <button className="btn bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Load More</button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            
            {/* Modals */}
            <AppointmentCancelModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleCancelSubmit} 
                appointmentId={appointmentToCancel} 
            />
            <MedicalReportModal 
                isOpen={isReportsModalOpen} 
                onClose={() => setIsReportsModalOpen(false)} 
                records={reportsData} 
            />
        </>
    );
}