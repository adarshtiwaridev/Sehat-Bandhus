// src/app/appointments/page.js or src/components/MyAppointments.jsx

"use client"; // This component uses client-side hooks and interactions

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- MOCK DATA STRUCTURES & FAKE API CALLS ---

const mockPatient = {
    name: 'Jane Doe',
    id: 'PT-9876',
    gender: 'Female',
    age: 28,
    imageUrl: '/path/to/patient-avatar.jpg',
};

const mockAppointments = [
    { AppointmentId: 101, Status: 'Upcoming', DoctorId: 5, Name: 'Dr. Emily Rose', Email: 'emily@clinic.com', Phone: '555-1234', AppointmentDate: '2025-10-15T10:00:00', AppointmentTime: '10:00 AM - 11:00 AM', DoctorImage: '/img/doctor-emily.jpg', HasReview: false },
    { AppointmentId: 102, Status: 'Upcoming', DoctorId: 8, Name: 'Dr. John Smith', Email: 'john@clinic.com', Phone: '555-5678', AppointmentDate: '2025-10-20T14:30:00', AppointmentTime: '02:30 PM - 03:30 PM', DoctorImage: '/img/doctor-john.jpg', HasReview: false },
    { AppointmentId: 201, Status: 'Cancelled', DoctorId: 3, Name: 'Dr. Alice Brown', Email: 'alice@clinic.com', Phone: '555-9012', AppointmentDate: '2025-09-01T11:00:00', AppointmentTime: '11:00 AM - 12:00 PM', DoctorImage: '/img/doctor-alice.jpg', HasReview: false },
    { AppointmentId: 301, Status: 'Completed', DoctorId: 5, Name: 'Dr. Emily Rose', Email: 'emily@clinic.com', Phone: '555-1234', AppointmentDate: '2025-08-10T09:00:00', AppointmentTime: '09:00 AM - 10:00 AM', DoctorImage: '/img/doctor-emily.jpg', HasReview: true },
    { AppointmentId: 302, Status: 'Completed', DoctorId: 12, Name: 'Dr. Robert Lee', Email: 'robert@clinic.com', Phone: '555-3456', AppointmentDate: '2025-07-25T16:00:00', AppointmentTime: '04:00 PM - 05:00 PM', DoctorImage: '/img/doctor-robert.jpg', HasReview: false },
];

const mockReviews = [
    { DoctorId: 5, AppointmentId: 301, Comment: "Excellent doctor, very attentive and helpful.", Rating: 5, DoctorImage: '/img/doctor-emily.jpg', Name: 'Dr. Emily Rose', imgUrl: mockPatient.imageUrl, Ptname: mockPatient.name },
];

// FAKE API function to simulate the server-side calls
const fetchAppointments = (status) => new Promise(resolve => {
    setTimeout(() => {
        const filtered = mockAppointments.filter(a => a.Status === status);
        resolve(filtered);
    }, 500);
});

const fetchReview = (doctorId, appointmentId) => new Promise(resolve => {
    setTimeout(() => {
        const review = mockReviews.find(r => r.DoctorId === doctorId && r.AppointmentId === appointmentId);
        resolve(review ? [review] : []);
    }, 300);
});

// --- CUSTOM RATING COMPONENT (Replacement for AjaxControlToolkit:Rating) ---

const RatingStar = ({ rating, sizeClass = 'w-5 h-5', readOnly = false, onRate }) => {
    const stars = Array(5).fill(0).map((_, index) => {
        const starValue = index + 1;
        let starClass = 'text-gray-300'; // empty

        if (starValue <= rating) {
            starClass = 'text-yellow-400'; // filled
        }

        return (
            <span
                key={index}
                className={`cursor-pointer ${sizeClass}`}
                onClick={() => !readOnly && onRate && onRate(starValue)}
            >
                <i className={`fa-solid fa-star ${starClass}`}></i>
            </span>
        );
    });

    return <div className="flex">{stars}</div>;
};

// --- MODAL COMPONENTS (Replacement for ModalPopupExtender) ---

const ModalWrapper = ({ children, onClose, title }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[10000]" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full m-4" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between items-center">
                <h5 className="text-xl font-semibold text-gray-800">{title}</h5>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
                    <i className="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>
            {children}
        </div>
    </div>
);

// --- MAIN COMPONENT ---

const AppointmentsDashboard = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [appointments, setAppointments] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal State
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showViewReviewModal, setShowViewReviewModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    // Review State
    const [reviewData, setReviewData] = useState({ doctorId: null, appointmentId: null, rating: 1, comment: '' });
    const [viewReview, setViewReview] = useState(null);
    const [cancelReason, setCancelReason] = useState('');
    const [cancelAppointmentIds, setCancelAppointmentIds] = useState({ doctorId: null, appointmentId: null });
    
    // Count Mocks (Replacement for lblUpcoming, etc.)
    const counts = useMemo(() => ({
        Upcoming: mockAppointments.filter(a => a.Status === 'Upcoming').length,
        Cancelled: mockAppointments.filter(a => a.Status === 'Cancelled').length,
        Completed: mockAppointments.filter(a => a.Status === 'Completed').length,
    }), []);


    // Data Fetching based on tab change
    const loadAppointments = useCallback(async (status) => {
        setLoading(true);
        try {
            const data = await fetchAppointments(status);
            setAppointments(prev => ({ ...prev, [status]: data }));
            console.log(`Loaded ${status} appointments:`, data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load and tab switching
    useEffect(() => {
        if (!appointments[activeTab]) {
            loadAppointments(activeTab);
        }
    }, [activeTab, loadAppointments, appointments]);


    // Handlers for Modals
    const handleOpenReviewModal = (doctorId, appointmentId) => {
        setReviewData({ doctorId, appointmentId, rating: 1, comment: '' });
        setShowReviewModal(true);
    };

    const handleAddReview = () => {
        // Simulate AJAX call to save review
        console.log("Submitting Review:", reviewData);
        alert(`Review for Appointment ${reviewData.appointmentId} added with rating ${reviewData.rating}. (Simulated)`);
        
        // Close modal and refresh the completed list (in a real app)
        setShowReviewModal(false);
        setReviewData({ doctorId: null, appointmentId: null, rating: 1, comment: '' });
    };

    const handleOpenCancelModal = (doctorId, appointmentId) => {
        setCancelAppointmentIds({ doctorId, appointmentId });
        setShowCancelModal(true);
    };

    const handleCancelAppointment = () => {
        if (!cancelReason.trim()) {
            alert("Cancellation reason is required.");
            return;
        }
        // Simulate AJAX call to cancel appointment
        console.log(`Cancelling Appointment ${cancelAppointmentIds.appointmentId} with reason: ${cancelReason}`);
        alert(`Appointment ${cancelAppointmentIds.appointmentId} cancelled. (Simulated)`);

        // Close modal and refresh lists (in a real app)
        setShowCancelModal(false);
        setCancelReason('');
        setCancelAppointmentIds({ doctorId: null, appointmentId: null });
    };

    const handleViewReview = async (doctorId, appointmentId) => {
        try {
            const reviewDetails = await fetchReview(doctorId, appointmentId);
            if (reviewDetails.length > 0) {
                setViewReview(reviewDetails[0]);
                setShowViewReviewModal(true);
            } else {
                alert("Review not found.");
            }
        } catch (error) {
            console.error("Error fetching review:", error);
        }
    };
    
    // Search Functionality (Replacement for jQuery .keyup and .toggle)
    const filteredAppointments = useMemo(() => {
        const currentList = appointments[activeTab] || [];
        if (!searchTerm) return currentList;

        const lowerSearch = searchTerm.toLowerCase();
        return currentList.filter(apt => 
            apt.Name.toLowerCase().includes(lowerSearch) ||
            apt.AppointmentId.toString().includes(lowerSearch) ||
            apt.AppointmentTime.toLowerCase().includes(lowerSearch)
        );
    }, [appointments, activeTab, searchTerm]);
    
    
    // --- UI RENDERING HELPERS ---

    // Helper to render the dynamic action buttons for each appointment status
    const renderExtraDetails = (apt) => {
        if (activeTab === 'Upcoming') {
            return (
                <>
                    <li className="text-sm text-gray-500 hidden md:block">
                        <ul className="space-y-1">
                            <li><i className="fa-solid fa-envelope mr-2"></i><a href={`mailto:${apt.Email}`} className="hover:text-blue-500">{apt.Email}</a></li>
                            <li><i className="fa-solid fa-phone mr-2"></i>{apt.Phone}</li>
                        </ul>
                    </li>
                    <li className="flex items-center space-x-2">
                        <Link href={`/appointments/upcoming/${apt.AppointmentId}`} className="text-gray-500 hover:text-blue-500 p-2 border rounded-full transition">
                            <i className="fa-solid fa-eye"></i>
                        </Link>
                        <button type="button" onClick={() => handleOpenCancelModal(apt.DoctorId, apt.AppointmentId)} className="text-red-500 hover:bg-red-50 p-2 border rounded-full transition">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </li>
                </>
            );
        } else if (activeTab === 'Cancelled') {
            return (
                <>
                    <li className="text-sm text-gray-500 hidden md:block">
                        <ul className="space-y-1">
                            <li><i className="fa-solid fa-envelope mr-2"></i><a href={`mailto:${apt.Email}`} className="hover:text-blue-500">{apt.Email}</a></li>
                            <li><i className="fa-solid fa-phone mr-2"></i>{apt.Phone}</li>
                        </ul>
                    </li>
                    <li>
                        <Link href={`/appointments/reschedule?aptId=${apt.AppointmentId}`} className="btn-primary-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm transition">
                            Reschedule
                        </Link>
                    </li>
                </>
            );
        } else if (activeTab === 'Completed') {
            return (
                <li className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    {!apt.HasReview ? (
                        <button type="button" onClick={() => handleOpenReviewModal(apt.DoctorId, apt.AppointmentId)} className="btn-secondary-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded-full text-sm transition">
                            Add Review
                        </button>
                    ) : (
                        <button type="button" onClick={() => handleViewReview(apt.DoctorId, apt.AppointmentId)} className="btn-secondary-sm bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-full text-sm transition">
                            View Review
                        </button>
                    )}
                    <Link href="/doctors" className="btn-dark-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-full text-sm transition">
                        Book Again
                    </Link>
                    <Link href={`/appointments/completed/${apt.AppointmentId}`} className="btn-primary-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm transition">
                        View Details
                    </Link>
                </li>
            );
        }
        return null;
    };
    
    // --- MAIN RENDER ---
    
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
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* Profile Sidebar */}
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
                                    {/* Simplified navigation menu */}
                                    {[
                                        { name: 'Dashboard', href: '/dashboard', icon: 'fa-solid fa-shapes' },
                                        { name: 'Doctors', href: '/doctors', icon: 'fa-solid fa-user-doctor' },
                                        { name: 'My Appointment', href: '/appointments', icon: 'fa-solid fa-calendar-check', active: true },
                                        { name: 'Receipts', href: '/receipts', icon: 'fa-solid fa-file-lines' },
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
                            <div className="dashboard-header flex justify-between items-center flex-wrap mb-4">
                                <h3 className="text-2xl font-semibold">Appointments</h3>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className="form-control pl-10 pr-4 py-2 border rounded-full text-sm" 
                                        placeholder="Search" 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                </div>
                            </div>

                            {/* Appointment Tabs */}
                            <div className="bg-white shadow rounded-lg p-2 mb-6">
                                <ul className="flex space-x-4 border-b border-gray-200" role="tablist">
                                    {['Upcoming', 'Cancelled', 'Completed'].map(status => (
                                        <li key={status} role="presentation">
                                            <button 
                                                className={`px-4 py-2 text-sm font-medium border-b-2 transition ${activeTab === status ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                                                onClick={() => setActiveTab(status)}
                                                role="tab"
                                            >
                                                {status}
                                                <span className="ml-1 text-xs font-bold">({counts[status]})</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Appointment List Content */}
                            <div className="space-y-4">
                                {loading ? (
                                    <p className="text-center text-gray-500 py-10">Loading appointments...</p>
                                ) : filteredAppointments.length === 0 ? (
                                    <p className="text-center text-gray-500 py-10">No {activeTab} appointments found.</p>
                                ) : (
                                    filteredAppointments.map(apt => (
                                        <div key={apt.AppointmentId} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between flex-wrap gap-4 border border-gray-100">
                                            
                                            {/* Patient Info (Doctor in this context) */}
                                            <div className="flex items-center space-x-3 min-w-[200px] flex-grow">
                                                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                                    <img src={apt.DoctorImage} alt="Doctor Image" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">#Apt{apt.AppointmentId}</p>
                                                    <h6 className="font-semibold text-gray-800">{apt.Name}</h6>
                                                </div>
                                            </div>

                                            {/* Appointment Details */}
                                            <div className="min-w-[150px]">
                                                <p className="text-sm font-medium text-gray-800">
                                                    <i className="fas fa-calendar-check fa-xs mr-2 text-blue-500"></i>
                                                    {new Date(apt.AppointmentDate).toLocaleDateString('en-GB')}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    <i className="fa-solid fa-clock mr-2 text-blue-500"></i>
                                                    {apt.AppointmentTime}
                                                </p>
                                            </div>

                                            {/* Action Buttons (Dynamic) */}
                                            <div className="flex space-x-3 items-center ml-auto">
                                                {renderExtraDetails(apt)}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        {/* /Main Content */}
                    </div>
                </div>
            </div>      
            {/* /Page Content */}
            
            {/* --- Modals --- */}
            
            {/* Add Review Modal */}
            {showReviewModal && (
                <ModalWrapper title="Add Review" onClose={() => setShowReviewModal(false)}>
                    <div className="p-5 space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Rating <span className="text-red-500">*</span></label>
                            <RatingStar 
                                rating={reviewData.rating}
                                sizeClass="w-6 h-6"
                                onRate={(r) => setReviewData(prev => ({ ...prev, rating: r }))}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Comments <span className="text-red-500">*</span></label>
                            <textarea 
                                className="form-control w-full p-2 border rounded-lg text-sm" 
                                rows="3" 
                                value={reviewData.comment}
                                onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="modal-footer p-4 border-t flex justify-end space-x-3">
                        <button type="button" onClick={() => setShowReviewModal(false)} className="btn-secondary px-4 py-2 rounded">Cancel</button>
                        <button type="button" onClick={handleAddReview} className="btn-info bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add Review</button>
                    </div>
                </ModalWrapper>
            )}

            {/* View Review Modal */}
            {showViewReviewModal && viewReview && (
                <ModalWrapper title="Review Details" onClose={() => setShowViewReviewModal(false)}>
                    <div className="p-5 space-y-4">
                        <div className="grid grid-cols-3 gap-4 border-b pb-3 mb-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500">Review for</label>
                                <div className="flex items-center mt-1">
                                    <img src={viewReview.DoctorImage} alt="Doctor" className="w-6 h-6 rounded-full mr-2" />
                                    <h6 className="text-sm font-medium">{viewReview.Name}</h6>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500">Review By</label>
                                <div className="flex items-center mt-1">
                                    <img src={viewReview.imgUrl} alt="Patient" className="w-6 h-6 rounded-full mr-2" />
                                    <h6 className="text-sm font-medium">{viewReview.Ptname}</h6>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500">Rating</label>
                                <RatingStar rating={viewReview.Rating} sizeClass="w-4 h-4" readOnly={true} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Review</label>
                            <p className="text-sm text-gray-600 mt-1">{viewReview.Comment}</p>
                        </div>
                    </div>
                </ModalWrapper>
            )}

            {/* Cancel Appointment Modal */}
            {showCancelModal && (
                <ModalWrapper title="Cancel Appointment" onClose={() => setShowCancelModal(false)}>
                    <div className="p-5 space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Reason for Cancellation<span className="text-red-500">*</span></label>
                            <textarea 
                                className="form-control w-full p-2 border rounded-lg text-sm" 
                                rows="3" 
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer p-4 border-t flex justify-end space-x-3">
                        <button type="button" onClick={() => setShowCancelModal(false)} className="btn-secondary px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Close</button>
                        <button type="button" onClick={handleCancelAppointment} className="btn-primary bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cancel Appointment</button>
                    </div>
                </ModalWrapper>
            )}
            
            <style jsx global>{`
                /* Global Font-Awesome for icons */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
            `}</style>
        </>
    );
};

export default AppointmentsDashboard;