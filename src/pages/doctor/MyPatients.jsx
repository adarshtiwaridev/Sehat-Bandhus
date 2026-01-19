// File: pages/doctor/MyPatients.jsx (The main content page)

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Assuming you have your shared components
import DoctorProfileSidebar from '../../components/DoctorProfileSidebar'; 
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

// --- MOCK Data Structures (Replace with API fetch from your server) ---
const doctorProfile = { name: "Dr. Jane Doe", imageUrl: "/assets/doctor-image.jpg", profileUrl: "/doctor/profile", qualification: "MBBS, MD", experience: "12 Years", specialty: "Pediatrics" };
const mockAllPatients = [
    { AppointmentId: 101, PatientName: "Adam Smith", imgUrl: "/assets/patient-1.jpg", PatientAge: 32, PatientGender: "Male", BloodGroup: "A+", AppointmentTime: "10:00 AM - 11:00 AM", address: "New York", lastbookingdate: "2025-09-20", IsActive: 1 },
    { AppointmentId: 102, PatientName: "Bella Chen", imgUrl: "/assets/patient-2.jpg", PatientAge: 25, PatientGender: "Female", BloodGroup: "B-", AppointmentTime: "09:00 AM - 10:00 AM", address: "Boston", lastbookingdate: "2025-08-15", IsActive: 1 },
    { AppointmentId: 103, PatientName: "Charlie Brown", imgUrl: "/assets/patient-3.jpg", PatientAge: 50, PatientGender: "Male", BloodGroup: "O+", AppointmentTime: "11:00 AM - 12:00 PM", address: "Chicago", lastbookingdate: "2024-12-01", IsActive: 0 },
    { AppointmentId: 104, PatientName: "Daisy Lee", imgUrl: "/assets/patient-4.jpg", PatientAge: 19, PatientGender: "Female", BloodGroup: "AB+", AppointmentTime: "02:00 PM - 03:00 PM", address: "Miami", lastbookingdate: "2025-09-01", IsActive: 1 },
    { AppointmentId: 105, PatientName: "Ethan Hunt", imgUrl: "/assets/patient-5.jpg", PatientAge: 72, PatientGender: "Male", BloodGroup: "A-", AppointmentTime: "04:00 PM - 05:00 PM", address: "Seattle", lastbookingdate: "2025-05-10", IsActive: 0 },
];
// --- Sub-Components ---

// Component for a single patient card
const PatientCard = ({ patient }) => {
    // Split the time string: "10:00 AM - 11:00 AM" => ["10:00 AM", "11:00 AM"]
    const [startTime, endTime] = patient.AppointmentTime.split(" - ");
    const lastBookingDate = new Date(patient.lastbookingdate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    
    // Convert relative URL paths to Next.js Link format
    const profileLink = "/doctor/PatientProfile"; 

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2 flex">
            <Card className="appointment-wrap appointment-grid-wrap glass-card p-4 flex-1 flex flex-col">
                <ul className="space-y-3 flex-grow">
                    <li>
                        <div className="flex items-start space-x-3">
                            <Link href={profileLink} className="w-16 h-16 rounded-full overflow-hidden block shrink-0">
                                <Image src={patient.imgUrl} alt="User Image" width={64} height={64} />
                            </Link>
                            <div className="patient-info">
                                <p className="text-sm text-gray-500 searchable">APT000{patient.AppointmentId}</p>
                                <h6 className="text-lg font-semibold searchable hover:text-blue-600">
                                    <Link href={profileLink}>{patient.PatientName}</Link>
                                </h6>
                                <ul className="text-xs text-gray-600 mt-1 space-y-0.5">
                                    <li className="searchable">Age: {patient.PatientAge} / {patient.PatientGender}</li>
                                    <li className="searchable">Blood Group: {patient.BloodGroup}</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="appointment-info border-t pt-3 border-gray-200">
                        <p className="text-xs text-gray-600 searchable mb-1"><i className="fa-solid fa-clock mr-1"></i>
                           Last Visit: {lastBookingDate}
                        </p>
                        <p className="text-xs text-gray-600 searchable mb-1">Last Shift: {startTime} - {endTime}</p>
                        <p className="mb-0 text-xs text-gray-600 searchable"><i className="fa-solid fa-location-dot mr-1"></i>{patient.address}</p>
                    </li>
                </ul>
                <div className="appointment-action border-t pt-3 border-gray-200 mt-3">
                    <div className="patient-book">
                        <p className="text-xs text-gray-600"><i className="fa-solid fa-calendar-days mr-1"></i>
                           Last Booking on: {lastBookingDate}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default function MyPatients() {
    const [patients, setPatients] = useState([]);
    const [activeTab, setActiveTab] = useState(1); // 1 for Active, 0 for Inactive
    const [searchTerm, setSearchTerm] = useState('');
    const [patientsToShow, setPatientsToShow] = useState(6); // For Load More functionality
    
    const router = useRouter();

    // 1. Data Fetching Logic
    const getAppointment = useCallback(async (isActive) => {
        // Mocking the data filtering based on the 'isActive' status
        const filteredData = mockAllPatients.filter(p => p.IsActive === isActive);
        setPatients(filteredData);
        setPatientsToShow(6); // Reset load more count on tab change
    }, []);

    useEffect(() => {
        // Initial page load data (Active patients)
        getAppointment(1); 
    }, [getAppointment]);
    
    const handleTabClick = (isActiveValue) => {
        setActiveTab(isActiveValue);
        getAppointment(isActiveValue);
    };

    const handleLoadMore = () => {
        setPatientsToShow(prev => prev + 6);
    };

    const handleLogout = () => {
        router.push('/authpage'); // Navigate to the login/auth page
    };

    // 2. Client-Side Search
    const filteredPatients = useMemo(() => {
        if (!searchTerm) return patients;
        const lowerCaseSearch = searchTerm.toLowerCase();

        return patients.filter(patient => 
            Object.values(patient).some(value => 
                String(value).toLowerCase().includes(lowerCaseSearch)
            )
        );
    }, [patients, searchTerm]);

    const activeCount = mockAllPatients.filter(p => p.IsActive === 1).length;
    const inactiveCount = mockAllPatients.filter(p => p.IsActive === 0).length;
    
    // Slice the array for Load More functionality
    const currentPatients = filteredPatients.slice(0, patientsToShow);

    return (
        <>
            <Head><title>My Patients</title></Head>

            {/* Breadcrumb Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">My Patients</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center text-sm space-x-2">
                            <li><Link href="/Default" className="text-blue-600 hover:underline">Home</Link></li>
                            <li className="text-gray-500" aria-current="page">My Patients</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        
                        {/* Profile Sidebar (Left Column) */}
                        <div className="w-full lg:w-1/3 xl:w-1/4 px-4 mb-6 lg:mb-0">
                             <DoctorProfileSidebar profile={doctorProfile} activeItem="My Patients" onLogout={handleLogout} />
                        </div>

                        {/* Main Content (Right Column) */}
                        <div className="w-full lg:w-2/3 xl:w-3/4 px-4">
                            
                            {/* Dashboard Header & Search */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className="text-2xl font-semibold">My Patients</h3>
                                <div className="relative w-full sm:w-auto">
                                    <input 
                                        type="text" 
                                        className="form-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                        placeholder="Search Patients..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                </div>
                            </div>
                            
                            {/* Tab Navigation (Active / Inactive) */}
                            <div className="border-b border-gray-200 mb-6">
                                <ul className="flex space-x-2 sm:space-x-6" role="tablist">
                                    <li role="presentation">
                                        <button 
                                            onClick={() => handleTabClick(1)} 
                                            className={`nav-link px-2 sm:px-4 py-2 text-sm font-medium transition-colors duration-150 ${activeTab === 1 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                            role="tab"
                                        >
                                            Active <span>({activeCount})</span>
                                        </button>
                                    </li>
                                    <li role="presentation">
                                        <button 
                                            onClick={() => handleTabClick(0)} 
                                            className={`nav-link px-2 sm:px-4 py-2 text-sm font-medium transition-colors duration-150 ${activeTab === 0 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                            role="tab"
                                        >
                                            Inactive <span>({inactiveCount})</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Patient Grid Content */}
                            <div className="tab-content">
                                <div className="flex flex-wrap -mx-2">
                                    
                                    {currentPatients.length > 0 ? (
                                        currentPatients.map(patient => (
                                            <PatientCard key={patient.AppointmentId} patient={patient} />
                                        ))
                                    ) : (
                                        <div className="w-full p-4 text-center text-gray-500">
                                            No patients found for this criteria.
                                        </div>
                                    )}

                                </div>
                                
                                {/* Load More Button */}
                                {filteredPatients.length > patientsToShow && (
                                    <div className="text-center mt-6">
                                        <Button onClick={handleLoadMore} variant="default" size="sm" className="px-6 py-2 rounded-lg">
                                            Load More
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}