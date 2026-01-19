import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';
import Modal from 'react-modal';
import DoctorList from '../../components/components/DoctorList';
import DoctorForm from '../../components/components/DoctorForm';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- MOCK Data Structures ---
const doctorProfile = { name: "Dr. Jane Doe", imageUrl: "/assets/doctor-image.jpg", profileUrl: "/doctor/profile", qualification: "MBBS, MD", experience: "12 Years", specialty: "Pediatrics" };
const dashboardSummary = { totalPatients: 128, patientsToday: 5, appointmentsToday: 8 };

const mockAppointments = [
    { AppointmentId: 121, PatientName: "Patient A", imgUrl: "/assets/patient-a.jpg", AppointmentDate: "2025-10-10", StartAppointment: "10:00 AM", Status: "Upcoming" },
    { AppointmentId: 122, PatientName: "Patient B", imgUrl: "/assets/patient-b.jpg", AppointmentDate: "2025-10-09", StartAppointment: "Completed", Status: "Completed" },
    { AppointmentId: 123, PatientName: "Patient C", imgUrl: "/assets/patient-c.jpg", AppointmentDate: "2025-10-11", StartAppointment: "11:00 AM", Status: "Upcoming" },
];
const mockRecentPatients = [
    { PatientId: 501, PatientName: "Recent P1", imgUrl: "/assets/p1.jpg", LastVisitDate: "1 Week Ago" },
    { PatientId: 502, PatientName: "Recent P2", imgUrl: "/assets/p2.jpg", LastVisitDate: "3 Days Ago" },
    { PatientId: 503, PatientName: "Recent P3", imgUrl: "/assets/p3.jpg", LastVisitDate: "1 Month Ago" },
    { PatientId: 504, PatientName: "Recent P4", imgUrl: "/assets/p4.jpg", LastVisitDate: "2 Weeks Ago" },
];
const mockWeeklyReport = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    revenueData: [300, 450, 600, 350, 500, 700, 400],
    appointmentData: [5, 7, 10, 6, 8, 12, 7],
};


// --- Reusable Components ---

// Component for the Profile Sidebar
const DoctorProfileSidebar = ({ profile, activeItem, onLogout }) => (
    <div className="profile-sidebar doctor-sidebar profile-sidebar-new bg-white shadow-lg rounded-lg p-4">
        {/* Profile Info Widget */}
        <div className="widget-profile pro-widget-content">
            <div className="flex items-center space-x-4">
                <Link href={profile.profileUrl} className="block w-16 h-16 rounded-full overflow-hidden mr-3">
                    <Image src={profile.imageUrl} alt="User Image" width={64} height={64} />
                </Link>
                <div className="profile-det-info">
                    <h3 className="text-lg font-semibold text-gray-900">
                        <Link href="doctor-profile.html" className="hover:text-blue-600">{profile.name}</Link>
                    </h3>
                    <div className="patient-details">
                        <h5 className="mb-0 text-sm text-gray-600">{profile.qualification}, {profile.experience} Experience</h5>
                    </div>
                    <span className="inline-flex items-center text-xs font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full mt-1">
                        <i className="fa-solid fa-circle text-[8px] mr-1"></i>{profile.specialty}
                    </span>
                </div>
            </div>
        </div>
        
        {/* Navigation Menu */}
        <div className="dashboard-widget mt-6">
            <nav className="dashboard-menu">
                <ul>
                    {[
                        { name: 'Dashboard', href: 'Dashboard.aspx', icon: 'fa-solid fa-shapes' },
                        { name: 'Requests', href: 'Request.aspx', icon: 'fa-solid fa-calendar-check' },
                        { name: 'Appointments', href: 'ViewAppointment.aspx', icon: 'fa-solid fa-calendar-days' },
                        { name: 'Available Timings', href: 'AvaliableTiming.aspx', icon: 'fa-solid fa-calendar-day' },
                        { name: 'My Patients', href: 'MyPatients.aspx', icon: 'fa-solid fa-user-injured' },
                        { name: 'Reviews', href: 'Reviews.aspx', icon: 'fas fa-star' },
                        { name: 'Profile Settings', href: 'ProfileSetting.aspx', icon: 'fa-solid fa-user-pen' },
                        // Avoid leading slash here so `/doctor/${item.href.replace(...)} ` doesn't produce double slashes
                        { name: 'Change Password', href: 'Login', icon: 'fa-solid fa-key' },
                    ].map((item) => (
                        <li key={item.name} className={`p-2 rounded-md ${activeItem === item.name ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}>
                            <Link href={`/doctor/${item.href.replace('.aspx', '')}`} className="flex items-center space-x-3">
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                    {/* Logout LinkButton */}
                    <li>
                        <button onClick={onLogout} className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left space-x-3">
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
);

// Appointment Table Row Component
const AppointmentTableItem = ({ appointment, onAction }) => {
    const isCompleted = appointment.Status === "Completed";
    const isUpcoming = appointment.Status === "Upcoming";
    
    // Function to format the date correctly
    const formattedDate = new Date(appointment.AppointmentDate).toLocaleDateString('en-GB'); 

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            {/* Patient Info */}
            <td className="p-4 flex items-center space-x-3">
                <Link href="/doctor/Request" className="block w-10 h-10 rounded-full overflow-hidden">
                    <Image src={appointment.imgUrl} alt="Patient Img" width={40} height={40} />
                </Link>
                <div>
                    <span className="text-xs text-gray-500">APT000{appointment.AppointmentId}</span>
                    <h5 className="text-base font-medium text-gray-900">
                        <Link href="/doctor/Request" className="hover:text-blue-600">{appointment.PatientName}</Link>
                    </h5>
                </div>
            </td>

            {/* Date & Time */}
            <td className="p-4">
                <div className="text-sm">
                    <h6 className="font-semibold text-gray-700">
                        {formattedDate}
                        {isCompleted && (
                             <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Accepted</span>
                        )}
                    </h6>
                    <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-1 inline-block">{appointment.StartAppointment}</span>
                </div>
            </td>

            {/* Actions */}
            <td className="p-4">
                <div className="flex items-center space-x-2">
                    {isUpcoming && (
                        <>
                            <button title="Accept" className="text-green-500 hover:text-green-600 p-1" onClick={() => onAction(appointment.AppointmentId, 'Accept')}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button title="Reject" className="text-red-500 hover:text-red-600 p-1" onClick={() => onAction(appointment.AppointmentId, 'Reject')}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </>
                    )}
                    {isCompleted && (
                        <>
                            <Link href={`/doctor/start?AppointmentId=${appointment.AppointmentId}`} className="text-blue-500 hover:text-blue-600 p-1">
                                <i className="fa-solid fa-link"></i>
                            </Link>
                            <button title="Print" className="text-gray-500 hover:text-gray-600 p-1">
                                <i className="fa-solid fa-print"></i>
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
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
    
    const modalBackClass = "fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[111]";
    const modalPopupClass = "bg-white border-2 border-black rounded-xl p-6 w-full max-w-md shadow-2xl";

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={modalPopupClass}
            overlayClassName={modalBackClass}
            ariaHideApp={false}
        >
            <h5 className="text-xl font-semibold border-b pb-2 mb-4">Cancel Appointment</h5>
            <form onSubmit={handleSubmit}>
                <label htmlFor="cancelReason" className="block text-sm font-medium mb-2 text-black">
                    Reason for Cancellation<span className="text-red-500">*</span>
                </label>
                <textarea
                    id="cancelReason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="form-textarea w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
                    rows="4"
                ></textarea>
                
                <div className="flex justify-end space-x-3 border-t pt-4">
                    <button type="button" onClick={onClose} className="btn bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                        Close
                    </button>
                    <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        Cancel Appointment
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// Chart Display Component
const ChartDisplay = ({ data, chartType }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: chartType === 'revenue' ? 'Revenue' : 'Appointments',
                data: chartType === 'revenue' ? data.revenueData : data.appointmentData,
                backgroundColor: chartType === 'revenue' ? 'rgba(54, 162, 235, 0.6)' : 'rgba(255, 159, 64, 0.6)',
                borderColor: chartType === 'revenue' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false, // Title is handled by the card header
            },
        },
    };

    return <Bar options={options} data={chartData} />;
};


// --- Main Dashboard Component ---
export default function DoctorDashboard() {
    const [appointments, setAppointments] = useState(mockAppointments);
    const [report, setReport] = useState(mockWeeklyReport);
    const [activeChartTab, setActiveChartTab] = useState('revenue');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const router = useRouter();
  const { user } = useSelector((state) => state.auth);
    
    useEffect(() => {
        // In a real app, you would fetch data here
        console.log(`Dashboard data loaded. Start Week: ${report.labels[0]}`);
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await fetch('/api/doctor');
            const json = await res.json();
            if (json.success) setDoctors(json.data || []);
        } catch (err) {
            console.error('Failed to fetch doctors', err);
        }
    };

    const handleOpenCreateDoctor = () => {
        setEditingDoctor(null);
        setIsDoctorModalOpen(true);
    };

    const handleEditDoctor = (doctor) => {
        setEditingDoctor(doctor);
        setIsDoctorModalOpen(true);
    };

    const handleDeleteDoctor = async (id) => {
        if (!confirm('Delete this doctor?')) return;
        try {
            const res = await fetch(`/api/doctor/${id}`, { method: 'DELETE' });
            const json = await res.json();
            if (json.success) fetchDoctors();
        } catch (err) { console.error(err); }
    };

    const handleSaveDoctor = async (payload) => {
        try {
            if (editingDoctor && editingDoctor._id) {
                const res = await fetch(`/api/doctor/${editingDoctor._id}`, { method: 'PUT', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
                const json = await res.json();
                if (json.success) {
                    setIsDoctorModalOpen(false);
                    fetchDoctors();
                }
            } else {
                const res = await fetch('/api/doctor', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
                const json = await res.json();
                if (json.success) {
                    setIsDoctorModalOpen(false);
                    fetchDoctors();
                }
            }
        } catch (err) { console.error(err); }
    };

    const handleAppointmentAction = (appointmentId, action) => {
        if (action === 'Accept') {
            alert(`Accepting Appointment ID: ${appointmentId}. (API call needed here)`);
        } else if (action === 'Reject') {
            setAppointmentToCancel(appointmentId);
            setIsModalOpen(true);
        }
    };

    const handleCancelSubmit = (appointmentId, reason) => {
        // Replace with actual API call to reject appointment
        console.log(`Rejecting appointment ${appointmentId} with reason: ${reason}`);
        setIsModalOpen(false);
        setAppointmentToCancel(null);
    };

    const handleLogout = () => {
        // Replace with actual logout API call and redirection
        console.log("Logging out...");
        router.push('/authpage');
    };

    // Find the next upcoming appointment for the dedicated card
    const nextAppointment = mockAppointments.find(a => a.Status === 'Upcoming') || { 
        AppointmentId: 'N/A', PatientName: 'No Upcoming Appt.', StartAppointment: 'N/A', imgUrl: '/assets/default-patient.jpg' 
    };

    return (
        <>
            <Head><title>Doctor Dashboard</title></Head>

            {/* Breadcrumb Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">Doctor Dashboard</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center text-sm space-x-2">
                            <li><Link href="/Default" className="text-blue-600 hover:underline">Home</Link></li>
                            <li className="text-gray-500" aria-current="page">Dashboard</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <motion.div
                className="content py-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        
                        {/* Profile Sidebar (Left Column) */}
                        <div className="w-full lg:w-1/3 xl:w-1/4 px-4">
                            <DoctorProfileSidebar profile={doctorProfile} activeItem="Dashboard" onLogout={handleLogout} />
                        </div>

                        {/* Main Content (Right Columns) */}
                        <div className="w-full lg:w-2/3 xl:w-3/4 px-4">
                            <div className="flex flex-wrap -mx-4">
                                
                                {/* 1. Summary Cards */}
                                <div className="w-full xl:w-4/12 px-4 flex flex-col space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                                        {/* Total Patients Card */}
                                        <Card className="p-4 flex justify-between items-center glass-card">
                                            <div>
                                                <h6 className="text-sm font-medium text-gray-500">Total Patient</h6>
                                                <h4 className="text-2xl font-semibold text-gray-900 mt-1">{dashboardSummary.totalPatients}</h4>
                                            </div>
                                            <div className="p-3 rounded-full bg-blue-100 text-blue-600"><i className="fa-solid fa-user-injured text-xl"></i></div>
                                        </Card>

                                        {/* Patients Today Card */}
                                        <Card className="p-4 flex justify-between items-center glass-card">
                                            <div>
                                                <h6 className="text-sm font-medium text-gray-500">Patients Today</h6>
                                                <h4 className="text-2xl font-semibold text-gray-900 mt-1">{dashboardSummary.patientsToday}</h4>
                                            </div>
                                            <div className="p-3 rounded-full bg-green-100 text-green-600"><i className="fa-solid fa-user-clock text-xl"></i></div>
                                        </Card>

                                        {/* Appointments Today Card */}
                                        <Card className="p-4 flex justify-between items-center glass-card">
                                            <div>
                                                <h6 className="text-sm font-medium text-gray-500">Appointments Today</h6>
                                                <h4 className="text-2xl font-semibold text-gray-900 mt-1">{dashboardSummary.appointmentsToday}</h4>
                                            </div>
                                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600"><i className="fa-solid fa-calendar-days text-xl"></i></div>
                                        </Card>

                                    </div>
                                </div>

                                {/* 2. Appointment Table */}
                                <div className="w-full xl:w-8/12 px-4 mt-6 xl:mt-0">
                                    <Card className="p-6 glass-card">
                                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                                            <h5 className="text-xl font-semibold text-gray-900">Appointment</h5>
                                            <Link href="/doctor/Request" className="text-blue-600 text-sm hover:underline">View All</Link>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {appointments.slice(0, 4).map((appointment) => (
                                                        <AppointmentTableItem 
                                                            key={appointment.AppointmentId} 
                                                            appointment={appointment} 
                                                            onAction={handleAppointmentAction} 
                                                        />
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                                </div>
                                
                                {/* 3. Weekly Overview/Chart */}
                                <div className="w-full xl:w-5/12 px-4 mt-6">
                                    <Card className="p-6 h-full glass-card">
                                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                                            <h5 className="text-xl font-semibold text-gray-900">Weekly Overview</h5>
                                            <h6 className="text-sm text-gray-500">{report.labels[0]} - {report.labels[report.labels.length - 1]}</h6>
                                        </div>
                                        
                                        <div className="flex space-x-3 mb-4">
                                            <button 
                                                className={`px-3 py-1 text-sm rounded ${activeChartTab === 'revenue' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                onClick={() => setActiveChartTab('revenue')}
                                            >Revenue</button>
                                            <button 
                                                className={`px-3 py-1 text-sm rounded ${activeChartTab === 'appointment' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                onClick={() => setActiveChartTab('appointment')}
                                            >Appointments</button>
                                        </div>
                                        
                                        <div style={{ height: '300px' }}>
                                            <ChartDisplay data={report} chartType={activeChartTab} />
                                        </div>
                                    </Card>
                                </div>

                                {/* 4. Upcoming Appointment Card */}
                                <div className="w-full xl:w-7/12 px-4 mt-6">
                                    <Card className="p-6 glass-card">
                                        <div className="border-b pb-3 mb-4">
                                            <h5 className="text-xl font-semibold text-gray-900">Upcoming Appointment</h5>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <span className="w-12 h-12 rounded-full overflow-hidden block">
                                                    <Image src={nextAppointment.imgUrl} alt="Patient Avatar" width={48} height={48} />
                                                </span>
                                                <div>
                                                    <span className="text-xs text-gray-500 block">APT000{nextAppointment.AppointmentId}</span>
                                                    <h6 className="text-base font-medium text-gray-900">{nextAppointment.PatientName}</h6>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-gray-500 block">Today</span>
                                                <h6 className="text-lg font-semibold text-gray-900">{nextAppointment.StartAppointment}</h6>
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                                            <Button variant="default" className="bg-green-500 hover:bg-green-600">Chat Now</Button>
                                            <Button variant="default">Start Appointment</Button>
                                        </div>
                                    </Card>
                                </div>
                                
                                {/* 5. Recent Patients Card */}
                                <div className="w-full xl:w-7/12 px-4 mt-6">
                                    <Card className="p-6 h-full glass-card">
                                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                                            <h5 className="text-xl font-semibold text-gray-900">Recent Patients</h5>
                                            <Link href="/doctor/MyPatients" className="text-blue-600 text-sm hover:underline">View All</Link>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {mockRecentPatients.map((patient) => (
                                                <div key={patient.PatientId} className="p-3 border border-gray-100 rounded-lg text-center hover:shadow-md transition-shadow">
                                                    <Link href="/doctor/PatientProfile" className="flex justify-center mb-2">
                                                        <Image src={patient.imgUrl} alt="Patient" width={50} height={50} className="rounded-full" />
                                                    </Link>
                                                    <h5 className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                                        <Link href="/doctor/PatientProfile">{patient.PatientName}</Link>
                                                    </h5>
                                                    <span className="text-xs text-gray-500 block">ID: P000{patient.PatientId}</span>
                                                    <p className="text-xs text-gray-400 mt-1">Last Appointment: {patient.LastVisitDate}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                                {/* 6. Doctors Management */}
                                <div className="w-full px-4 mt-6">
                                    <Card className="p-6 glass-card">
                                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                                            <h5 className="text-xl font-semibold text-gray-900">Doctors</h5>
                                            <div className="flex items-center space-x-2">
                                                <Button onClick={handleOpenCreateDoctor} variant="default" size="sm">Add Doctor</Button>
                                            </div>
                                        </div>
                                        <DoctorList doctors={doctors} onEdit={handleEditDoctor} onDelete={handleDeleteDoctor} />
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </motion.div>

            {/* Cancel Appointment Modal */}
            <AppointmentCancelModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCancelSubmit}
                appointmentId={appointmentToCancel}
            />

            <Modal isOpen={isDoctorModalOpen} onRequestClose={() => setIsDoctorModalOpen(false)} ariaHideApp={false} className="bg-white rounded p-6 max-w-2xl mx-auto mt-16">
                <h3 className="text-lg font-semibold mb-4">{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</h3>
                <DoctorForm initial={editingDoctor || {}} onCancel={() => setIsDoctorModalOpen(false)} onSave={handleSaveDoctor} />
            </Modal>
        </>
    );
}