
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- SELF-CONTAINED MOCK COMPONENTS (to replace imports) ---

// Card Component
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow ${className}`}>
        {children}
    </div>
);

// Button Component
const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseClasses = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
    
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
        outline: 'bg-transparent border',
    };

    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    return (
        <button onClick={onClick} className={combinedClasses} {...props}>
            {children}
        </button>
    );
};

// Doctor Profile Sidebar Component
const DoctorProfileSidebar = ({ profile, activeItem, onLogout }) => (
    <Card className="profile-sidebar p-4">
        <div className="widget-profile pro-widget-content">
            <div className="flex items-center space-x-4">
                <a href={profile.profileUrl} className="block w-16 h-16 rounded-full overflow-hidden mr-3">
                    <img src={profile.imageUrl} alt="User" width={64} height={64} />
                </a>
                <div className="profile-det-info">
                    <h3 className="text-lg font-semibold text-gray-900">
                        <a href={profile.profileUrl} className="hover:text-blue-600">{profile.name}</a>
                    </h3>
                    <p className="text-sm text-gray-600">{profile.specialty}</p>
                </div>
            </div>
        </div>
        <nav className="dashboard-menu mt-6">
            <ul className="space-y-2">
                {['Appointments', 'My Patients', 'Dashboard'].map(item => (
                    <li key={item}>
                        <a href="#" className={`flex items-center p-2 rounded-md text-gray-700 ${activeItem === item ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
                           {item}
                        </a>
                    </li>
                ))}
                <li>
                    <button onClick={onLogout} className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    </Card>
);

// --- MOCK DATA ---
const doctorProfile = { name: "Dr. Jane Doe", imageUrl: "/assets/doctor-image.jpg", profileUrl: "/doctor/profile", qualification: "MBBS, MD", experience: "12 Years", specialty: "Pediatrics" };
const mockAllAppointments = [
    { AppointmentId: 101, PatientId: "P001", PatientName: "Alice B", imgUrl: "https://placehold.co/56x56/E2E8F0/4A5568?text=AB", AppointmentDate: "2025-10-09", AppointmentTime: "10:00 AM - 11:00 AM", Status: "Upcoming", email: "alice@test.com", Mobileno: "9876543210" },
    { AppointmentId: 102, PatientId: "P002", PatientName: "Bob C", imgUrl: "https://placehold.co/56x56/E2E8F0/4A5568?text=BC", AppointmentDate: "2025-10-08", AppointmentTime: "02:00 PM - 03:00 PM", Status: "Upcoming", email: "bob@test.com", Mobileno: "9876543211" },
    { AppointmentId: 103, PatientId: "P003", PatientName: "Charlie D", imgUrl: "https://placehold.co/56x56/E2E8F0/4A5568?text=CD", AppointmentDate: "2025-10-07", AppointmentTime: "04:00 PM - 05:00 PM", Status: "Completed", email: "charlie@test.com", Mobileno: "9876543212" },
    { AppointmentId: 104, PatientId: "P004", PatientName: "Daisy E", imgUrl: "https://placehold.co/56x56/E2E8F0/4A5568?text=DE", AppointmentDate: "2025-01-01", AppointmentTime: "09:00 AM - 10:00 AM", Status: "Cancelled", email: "daisy@test.com", Mobileno: "9876543213" },
];
const mockMedicalRecords = [
    { MedRecordId: 'MR001', MedStartDate: '2025-10-07', HospitalName: 'General Hospital', Symptoms: 'Fever, Cough', MedReportFile: '/path/to/report1.pdf' },
    { MedRecordId: 'MR002', MedStartDate: '2025-09-15', HospitalName: 'City Clinic', Symptoms: 'Headache', MedReportFile: '/path/to/report2.pdf' },
];


// --- Sub-Components ---

// Custom Modal Component
const CustomModal = ({ isOpen, onClose, children, className = '' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start pt-10 z-[1040]" onClick={onClose}>
            <div className={`bg-white rounded-xl shadow-2xl p-6 ${className}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};


// Appointment Item Component
const AppointmentItem = ({ appointment, onAction }) => {
    const isUpcoming = appointment.Status === "Upcoming";
    const isCompleted = appointment.Status === "Completed";
    
    const [shiftStart, shiftEnd] = appointment.AppointmentTime.split(" - ");
    const appointmentTime = shiftEnd || appointment.AppointmentTime;

    let patientLink = "/doctor/PatientProfile"; 
    
    return (
        <Card className="appointment-wrap glass-card border border-gray-200 p-4 md:p-6 mb-6">
            <ul className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
                
                {/* 1. Patient Information */}
                <li className="col-span-1 lg:col-span-2">
                    <div className="flex items-center space-x-4">
                        <a href={patientLink} className="block w-14 h-14 rounded-full overflow-hidden shrink-0">
                            <img src={appointment.imgUrl} alt="User" width={56} height={56} className="object-cover w-full h-full" />
                        </a>
                        <div className="patient-info">
                            <p className="text-sm text-gray-500 searchable">APT000{appointment.AppointmentId}</p>
                            <h6 className="text-lg font-semibold text-gray-900 searchable hover:text-blue-600">
                                <a href={patientLink}>{appointment.PatientName}</a>
                            </h6>
                        </div>
                    </div>
                </li>
                
                {/* 2. Date/Time Info */}
                <li className="col-span-1">
                    <div className="appointment-info text-sm text-gray-700">
                        <p className="font-medium searchable">
                            <i className="fas fa-calendar-check fa-xs mr-1"></i>
                            {new Date(appointment.AppointmentDate).toLocaleDateString('en-GB')}
                        </p>
                        <p className="text-gray-500 text-base searchable mt-1">
                            <i className="fa-solid fa-clock mr-1"></i>
                            {appointmentTime}
                        </p>
                    </div>
                </li>

                {/* 3. Contact Info */}
                <li className="col-span-1">
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="searchable truncate"><i className="fa-solid fa-envelope mr-1"></i>{appointment.email}</li>
                        <li className="searchable"><i className="fa-solid fa-phone mr-1"></i>{appointment.Mobileno}</li>
                    </ul>
                </li>
                
                {/* 4. Actions */}
                <li className="col-span-1">
                    <ul className="flex flex-wrap gap-2 justify-start md:justify-end items-center">
                        {isUpcoming && (
                            <>
                                <li>
                                    <Button onClick={() => onAction(appointment.AppointmentId, 'Accept')} variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 text-xs font-medium">
                                        <i className="fa-solid fa-check mr-1"></i>Accept
                                    </Button>
                                </li>
                                <li>
                                    <Button onClick={() => onAction(appointment.AppointmentId, 'Reject')} variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 text-xs font-medium">
                                        <i className="fa-solid fa-xmark mr-1"></i>Reject
                                    </Button>
                                </li>
                            </>
                        )}
                        {isCompleted && (
                            <li>
                                <Button onClick={() => onAction(appointment.PatientId, 'ViewReport')} variant="outline" size="sm" className="text-gray-600 border-gray-400 hover:bg-gray-100 text-xs font-medium">
                                    <i className="fa-solid fa-print mr-1"></i>Report
                                </Button>
                            </li>
                        )}
                    </ul>
                </li>
            </ul>
        </Card>
    );
};

// Modal for Cancellation
const AppointmentCancelModal = ({ isOpen, onClose, onSubmit, appointmentId }) => {
    const [reason, setReason] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (reason.trim()) {
            onSubmit(appointmentId, reason);
            setReason('');
        }
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} className="w-full max-w-lg">
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
                        className="form-textarea w-full rounded-md border-gray-300 shadow-sm"
                        rows="4"
                    ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3 pt-3 border-t">
                    <Button type="button" onClick={onClose} variant="secondary" size="sm">Close</Button>
                    <Button type="submit" variant="primary" size="sm">Cancel Appointment</Button>
                </div>
            </form>
        </CustomModal>
    );
};

// Medical Report Modal
const MedicalReportModal = ({ isOpen, onClose, records }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} className="w-full max-w-4xl">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-2xl font-semibold">View Medical Record</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-900 text-xl" title="Close">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">ID</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Hospital</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Symptoms</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {records.map(record => (
                            <tr key={record.MedRecordId}>
                                <td className="px-4 py-2 text-sm text-blue-600 cursor-pointer">{record.MedRecordId}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{new Date(record.MedStartDate).toLocaleDateString('en-GB')}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{record.HospitalName}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{record.Symptoms}</td>
                                <td className="px-4 py-2">
                                    <a href={record.MedReportFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700" title="View Report">
                                        <i className="fa-solid fa-eye"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CustomModal>
    );
};

// Simple Notification Component to replace Swal
const Notification = ({ message, type, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
    };

    return (
        <div className={`fixed top-5 right-5 text-white px-6 py-3 rounded-lg shadow-lg z-50 ${colors[type]}`}>
            {message}
        </div>
    );
};


// --- Main Page Component ---
export default function ViewAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeStatus, setActiveStatus] = useState('Upcoming');
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);
    const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
    const [notification, setNotification] = useState(null);

    const counts = useMemo(() => ({
        Upcoming: mockAllAppointments.filter(a => a.Status === 'Upcoming').length,
        Cancelled: mockAllAppointments.filter(a => a.Status === 'Cancelled').length,
        Completed: mockAllAppointments.filter(a => a.Status === 'Completed').length,
    }), []);

    const getAppointments = useCallback(async (status) => {
        const filtered = mockAllAppointments.filter(a => a.Status === status);
        setAppointments(filtered);
    }, []);

    useEffect(() => {
        getAppointments(activeStatus); 
    }, [activeStatus, getAppointments]);
    
    const handleStatusChange = (status) => {
        setActiveStatus(status);
    };

    const filteredAppointments = useMemo(() => {
        if (!searchTerm) return appointments;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return appointments.filter(appt => 
            appt.PatientName.toLowerCase().includes(lowerCaseSearch) ||
            String(appt.AppointmentId).includes(lowerCaseSearch) ||
            appt.AppointmentTime.toLowerCase().includes(lowerCaseSearch)
        );
    }, [appointments, searchTerm]);

    const handleAppointmentAction = (id, action) => {
        if (action === 'Accept') {
            setNotification({ message: `Appointment ${id} accepted.`, type: 'success' });
        } else if (action === 'Reject') {
            setAppointmentToCancel(id);
            setIsCancelModalOpen(true);
        } else if (action === 'ViewReport') {
            setIsReportsModalOpen(true);
        }
    };
    
    const handleCancelSubmit = (appointmentId, reason) => {
        console.log(`Cancelling appointment ${appointmentId} with reason: ${reason}`);
        setNotification({ message: `Appointment ${appointmentId} cancelled.`, type: 'success' });
        setIsCancelModalOpen(false);
        getAppointments(activeStatus);
    };

    const handleLogout = () => {
        // In a real app, this would clear tokens/session.
        // For this environment, we simulate a redirect.
        window.location.href = '/authpage';
    };

    return (
        <>
            {notification && <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification(null)} />}
            
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">Appointments</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center text-sm space-x-2">
                            <li><a href="/Default" className="text-blue-600 hover:underline">Home</a></li>
                            <li className="text-gray-500" aria-current="page">Appointments</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="content py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        
                        <div className="w-full lg:w-1/3 xl:w-1/4 px-4 mb-6 lg:mb-0">
                            <DoctorProfileSidebar profile={doctorProfile} activeItem="Appointments" onLogout={handleLogout} />
                        </div>

                        <div className="w-full lg:w-2/3 xl:w-3/4 px-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className="text-2xl font-semibold">Appointments</h3>
                                <div className="relative w-full sm:w-auto">
                                    <input 
                                        type="text" 
                                        className="form-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="Search..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                </div>
                            </div>
                            
                            <div className="appointment-tab-head border-b border-gray-200 mb-6">
                                <ul className="flex space-x-2 sm:space-x-6" role="tablist">
                                    {['Upcoming', 'Completed', 'Cancelled'].map((status) => (
                                        <li key={status} role="presentation">
                                            <button 
                                                onClick={() => handleStatusChange(status)} 
                                                className={`nav-link px-2 sm:px-4 py-2 text-sm font-medium transition-colors duration-150 ${activeStatus === status ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                                role="tab"
                                            >
                                                {status} ({counts[status]})
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="tab-content">
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map(appointment => (
                                        <AppointmentItem key={appointment.AppointmentId} appointment={appointment} onAction={handleAppointmentAction} />
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow">No {activeStatus.toLowerCase()} appointments found.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <AppointmentCancelModal 
                isOpen={isCancelModalOpen} 
                onClose={() => setIsCancelModalOpen(false)} 
                onSubmit={handleCancelSubmit} 
                appointmentId={appointmentToCancel} 
            />
            <MedicalReportModal 
                isOpen={isReportsModalOpen} 
                onClose={() => setIsReportsModalOpen(false)} 
                records={mockMedicalRecords} 
            />
        </>
    );
}

