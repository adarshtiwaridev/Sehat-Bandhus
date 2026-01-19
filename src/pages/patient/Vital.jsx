// src/app/vitals/page.js

"use client";

import React, { useState, useEffect, useCallback } from 'react';
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

const mockLatestVitals = {
    lblLDate: '15 Sep 2025',
    lblBP1: '120/80',
    lblH: 72, // Heart Rate (BPM)
    lblGulcoseLevel: 95, // mg/dl
    lblLTemp: 37.0, // °C
    lblLBMI: 22.5, // kg/m2
    lblLSPo2: 98, // %
};

const mockHistoricalVitals = [
    {
        VId: 3,
        VitalCode: 'VT-003',
        Name: 'Dr. John Smith',
        DoctorImage: '/img/doctor-smith.jpg',
        BMI: 22.5,
        BSA: 1.75,
        RespiratoryRate: 16,
        Pulse: 72,
        SPO2: 98,
        Weight: 65,
        Height: 168,
        Waist: 75,
        CreatedDate: '2025-09-15',
        // Detailed Modal Data
        DoctorImageModal: '/img/doctor-smith.jpg',
        DoctorName: 'Dr. John Smith',
        Qualification: 'MD, FACC',
        Specialization: 'Cardiology',
        Experience: '12 Years',
        BloodPressure: '120/80',
        HeartRate: 72,
        GlucoseLevel: 95,
        Temperature: 37.0,
        BMIModal: 22.5,
        SPO2Modal: 98,
    },
    {
        VId: 2,
        VitalCode: 'VT-002',
        Name: 'Dr. Sarah Lee',
        DoctorImage: '/img/doctor-lee.jpg',
        BMI: 23.1,
        BSA: 1.74,
        RespiratoryRate: 17,
        Pulse: 75,
        SPO2: 97,
        Weight: 67,
        Height: 170,
        Waist: 78,
        CreatedDate: '2025-06-20',
        // Detailed Modal Data
        DoctorImageModal: '/img/doctor-lee.jpg',
        DoctorName: 'Dr. Sarah Lee',
        Qualification: 'MBBS, MD',
        Specialization: 'General Medicine',
        Experience: '8 Years',
        BloodPressure: '125/85',
        HeartRate: 75,
        GlucoseLevel: 90,
        Temperature: 37.1,
        BMIModal: 23.1,
        SPO2Modal: 97,
    },
];

// --- COMPONENTS ---

// Reusable Patient Sidebar Component
const PatientSidebar = ({ patient, handleLogout }) => {
    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: 'fa-shapes', active: false },
        { name: 'Doctors', href: '/doctors', icon: 'fa-user-doctor', active: false },
        { name: 'My Appointment', href: '/appointments', icon: 'fa-calendar-check', active: false },
        { name: 'Doctor Suggestions', href: '/doctors-suggestion', icon: 'fa-shield-halved', active: false },
        { name: 'Add Medical Records', href: '/medical-records', icon: 'fa-money-bill-1', active: false },
        { name: 'Vitals', href: '/vitals', icon: 'fa-shield-halved', active: true },
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

// Vital Details Modal Component (Replaces Panel1 and ModalPopupExtender)
const VitalDetailsModal = ({ isVisible, onClose, vital }) => {
    if (!isVisible || !vital) return null;

    return (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black bg-opacity-80 modalBack" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col modalPopup" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b">
                    <h5 className="modal-title text-xl font-bold text-gray-800">Medical Details</h5>
                    <button type="button" className="text-gray-400 hover:text-gray-600" onClick={onClose}>
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </button>
                </div>
                <div className="modal-body p-5 overflow-y-auto">
                    {/* Doctor Info and Date */}
                    <div className="flex justify-between items-start border-b pb-4 mb-4">
                        <div className="flex items-center space-x-4">
                            <span className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                                <img src={vital.DoctorImageModal} alt="Doctor" className="w-full h-full object-cover" />
                            </span>
                            <div className="name-detail">
                                <h5 className='text-lg font-semibold'>{vital.DoctorName}</h5>
                                <ul className='text-sm text-gray-600 space-y-1'>
                                    <li>Qualification: {vital.Qualification}</li>
                                    <li>{vital.Specialization}</li>
                                    <li>{vital.Experience}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="date-cal text-right">
                            <p className='text-sm text-gray-600'>
                                <span><i className="fa-solid fa-calendar-days mr-2"></i>Created Date</span>
                                <span className='font-medium text-gray-800'>{new Date(vital.CreatedDate).toLocaleDateString('en-GB')}</span>
                            </p>
                        </div>
                    </div>
                    
                    {/* Vitals Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-red-50 p-3 rounded-lg text-center border-l-4 border-red-500">
                            <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-syringe mr-1"></i>Blood Pressure</span>
                            <h3 className='text-xl font-bold text-gray-900 mt-1'>{vital.BloodPressure} <span className='text-sm font-normal'>mmHg</span></h3>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg text-center border-l-4 border-orange-500">
                            <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-heart mr-1"></i>Heart Rate</span>
                            <h3 className='text-xl font-bold text-gray-900 mt-1'>{vital.HeartRate} <span className='text-sm font-normal'>bpm</span></h3>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center border-l-4 border-blue-500">
                            <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-notes-medical mr-1"></i>Glucose Level</span>
                            <h3 className='text-xl font-bold text-gray-900 mt-1'>{vital.GlucoseLevel} <span className='text-sm font-normal'>mg/dl</span></h3>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg text-center border-l-4 border-amber-500">
                            <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-temperature-high mr-1"></i>Body Temp.</span>
                            <h3 className='text-xl font-bold text-gray-900 mt-1'>{vital.Temperature} <span className='text-sm font-normal'>°C</span></h3>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center border-l-4 border-purple-500">
                            <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-user-pen mr-1"></i>BMI</span>
                            <h3 className='text-xl font-bold text-gray-900 mt-1'>{vital.BMIModal} <span className='text-sm font-normal'>kg/m²</span></h3>
                        </div>
                        <div className="bg-cyan-50 p-3 rounded-lg text-center border-l-4 border-cyan-500">
                            <span><i className="fa-solid fa-highlighter mr-1"></i>SPo2</span>
                            <h3 className='text-xl font-bold text-gray-900 mt-1'>{vital.SPO2Modal} <span className='text-sm font-normal'>%</span></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---

const VitalsPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVitals, setFilteredVitals] = useState(mockHistoricalVitals);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedVital, setSelectedVital] = useState(null);

    // Search Filtering Logic
    useEffect(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        const results = mockHistoricalVitals.filter(vital => {
            const searchableText = [
                vital.VitalCode,
                vital.Name,
                vital.BMI.toString(),
                new Date(vital.CreatedDate).toLocaleDateString(),
            ].join(' ').toLowerCase();

            return searchableText.includes(lowerCaseSearch);
        });
        setFilteredVitals(results);
    }, [searchTerm]);

    const handleLogout = () => {
        router.push('/logout');
    };

    const handleViewVitals = useCallback((vital) => {
        setSelectedVital(vital);
        setIsModalVisible(true);
    }, []);
    
    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false);
        setSelectedVital(null);
    }, []);


    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Vitals</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                                <li aria-current="page" className="text-gray-700">/ Vitals</li>
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
                        
                        {/* Vitals Content */}
                        <div className="lg:w-3/4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Medical Details</h3>
                                {/* Search Input (moved to top-right) */}
                                <div className="relative w-full max-w-xs">
                                    <input
                                        type="text"
                                        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search Vitals..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                </div>
                            </div>
                            
                            {/* Latest Vitals Dashboard Card */}
                            <div className="bg-white shadow rounded-lg p-5 mb-6 border border-gray-100">
                                <div className="flex justify-between items-center border-b pb-3 mb-4">
                                    <h6 className='text-lg font-semibold text-gray-800'>Latest Vitals</h6>
                                    <p className='text-sm text-gray-600'>
                                        <i className="fa-solid fa-calendar-check mr-2"></i>Latest Vital on : 
                                        <span className='font-medium text-gray-800 ml-1'>{mockLatestVitals.lblLDate}</span>
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {/* Blood Pressure */}
                                    <div className="bg-red-50 p-3 rounded-lg text-center border-l-4 border-red-500">
                                        <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-syringe mr-1"></i>Blood Pressure</span>
                                        <h3 className='text-xl font-bold text-gray-900 mt-1'>{mockLatestVitals.lblBP1} <span className='text-sm font-normal'>mm/Hg</span></h3>
                                    </div>
                                    {/* Heart Rate */}
                                    <div className="bg-orange-50 p-3 rounded-lg text-center border-l-4 border-orange-500">
                                        <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-heart mr-1"></i>Heart Rate</span>
                                        <h3 className='text-xl font-bold text-gray-900 mt-1'>{mockLatestVitals.lblH} <span className='text-sm font-normal'>Bpm</span></h3>
                                    </div>
                                    {/* Glucose Level */}
                                    <div className="bg-blue-50 p-3 rounded-lg text-center border-l-4 border-blue-500">
                                        <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-notes-medical mr-1"></i>Glucose Level</span>
                                        <h3 className='text-xl font-bold text-gray-900 mt-1'>{mockLatestVitals.lblGulcoseLevel} <span className='text-sm font-normal'>mg/dl</span></h3>
                                    </div>
                                    {/* Body Temp */}
                                    <div className="bg-amber-50 p-3 rounded-lg text-center border-l-4 border-amber-500">
                                        <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-temperature-high mr-1"></i>Body Temp.</span>
                                        <h3 className='text-xl font-bold text-gray-900 mt-1'>{mockLatestVitals.lblLTemp} <span className='text-sm font-normal'>°C</span></h3>
                                    </div>
                                    {/* BMI */}
                                    <div className="bg-purple-50 p-3 rounded-lg text-center border-l-4 border-purple-500">
                                        <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-user-pen mr-1"></i>BMI</span>
                                        <h3 className='text-xl font-bold text-gray-900 mt-1'>{mockLatestVitals.lblLBMI} <span className='text-sm font-normal'>kg/m²</span></h3>
                                    </div>
                                    {/* SPo2 */}
                                    <div className="bg-cyan-50 p-3 rounded-lg text-center border-l-4 border-cyan-500">
                                        <span className='text-sm font-medium text-gray-700'><i className="fa-solid fa-highlighter mr-1"></i>SPo2</span>
                                        <h3 className='text-xl font-bold text-gray-900 mt-1'>{mockLatestVitals.lblLSPo2} <span className='text-sm font-normal'>%</span></h3>
                                    </div>
                                </div>
                            </div>

                            {/* Historical Vitals Table */}
                            <div className="bg-white shadow rounded-lg overflow-x-auto">
                                <table className="table table-center min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor Name</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BSA</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resp. Rate</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pulse Rate</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SPO2</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added on</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredVitals.length > 0 ? (
                                            filteredVitals.map(vital => (
                                                <tr key={vital.VId} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                                        <button onClick={() => handleViewVitals(vital)} className="hover:underline">{vital.VitalCode}</button>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <Link href={`/doctors/${vital.Name}`} className="flex items-center space-x-2">
                                                                <img className="w-8 h-8 rounded-full object-cover" src={vital.DoctorImage} alt="Doctor"/>
                                                                <span className="text-sm font-medium text-gray-900 hover:text-blue-600">{vital.Name}</span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{vital.BMI} kg/m²</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{vital.BSA} m²</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{vital.RespiratoryRate} rpm</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{vital.Pulse} bpm</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{vital.SPO2} %</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{vital.Weight}Kg</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{vital.Height}cm</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{vital.Waist}cm</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(vital.CreatedDate).toLocaleDateString('en-GB')}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                        <button 
                                                            onClick={() => handleViewVitals(vital)} 
                                                            className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-100 transition"
                                                            title="View Details"
                                                        >
                                                            <i className="fa-solid fa-link text-sm"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="12" className="px-4 py-4 text-center text-gray-500">No vital records found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* /Vitals Content */}
                    </div>
                </div>
            </div>      
            {/* /Page Content */}

            {/* Vital Details Modal */}
            <VitalDetailsModal isVisible={isModalVisible} onClose={handleCloseModal} vital={selectedVital} />
            
            <style jsx global>{`
                /* Global Font-Awesome for icons */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
            `}</style>
        </>
    );
};

export default VitalsPage;