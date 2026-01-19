// src/app/doctors-suggestion/page.js

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- MOCK DATA ---
const mockPatient = {
    name: 'Jane Doe',
    id: 'PT-9876',
    gender: 'Female',
    age: 28,
    imageUrl: '/img/patient-avatar.jpg',
};

const mockSuggestions = [
    {
        DoctorId: 201,
        Name: 'Dr. Michael Brown',
        Specialization: 'Neurologist',
        Qualification: 'MBBS, MD',
        Experience: 8,
        DoctorImage: '/img/doctor-michael.jpg',
        DoctorSuggestions: 'Based on your recent headache and tremor records, a Neurologist is highly recommended for consultation.',
    },
    {
        DoctorId: 202,
        Name: 'Dr. Emily Carter',
        Specialization: 'Endocrinologist',
        Qualification: 'MBBS, DM',
        Experience: 12,
        DoctorImage: '/img/doctor-emily.jpg',
        DoctorSuggestions: 'Your consistent high glucose levels suggest you should consult an Endocrinologist for diabetes management.',
    },
    {
        DoctorId: 203,
        Name: 'Dr. David Wilson',
        Specialization: 'General Physician',
        Qualification: 'MBBS',
        Experience: 5,
        DoctorImage: '/img/doctor-david.jpg',
        DoctorSuggestions: 'For general health check-up and initial diagnosis of fever, a General Physician is suitable.',
    },
];

// --- COMPONENTS ---

// Pagination Component (Static for this conversion)
const Pagination = () => (
    <div className="flex justify-center mt-8">
        <ul className="flex items-center space-x-2 text-sm">
            <li>
                <Link href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition">
                    <i className="fa-solid fa-chevron-left fa-xs"></i>
                </Link>
            </li>
            {[1, 2, 3, 4, '...', 10].map((page, index) => (
                <li key={index}>
                    <Link 
                        href="#" 
                        className={`flex items-center justify-center w-8 h-8 rounded-full transition ${
                            page === 2 ? 'bg-blue-600 text-white font-semibold' : 
                            'border border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {page}
                    </Link>
                </li>
            ))}
            <li>
                <Link href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition">
                    <i className="fa-solid fa-chevron-right fa-xs"></i>
                </Link>
            </li>
        </ul>
    </div>
);


// --- MAIN COMPONENT ---

const DoctorSuggestions = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState(mockSuggestions);

    // Search logic using React state and filtering
    useEffect(() => {
        if (!searchTerm) {
            setFilteredSuggestions(mockSuggestions);
            return;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        const results = mockSuggestions.filter(doctor => {
            // Combine all searchable fields into one string
            const searchableText = [
                doctor.Name,
                doctor.Specialization,
                doctor.Qualification,
                doctor.DoctorSuggestions,
                doctor.Experience.toString() + ' Years',
            ].join(' ').toLowerCase();

            return searchableText.includes(lowerCaseSearch);
        });

        setFilteredSuggestions(results);
    }, [searchTerm]);

    const handleLogout = () => {
        // Implement actual logout logic here (e.g., clear tokens, redirect)
        router.push('/logout');
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Doctor Suggestions</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                                <li aria-current="page" className="text-gray-700">/ Doctor Suggestions</li>
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
                                        <Link href="/profile" className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                            <img src={mockPatient.imageUrl} alt="Patient Avatar" className="w-full h-full object-cover" />
                                        </Link>
                                        <div>
                                            <Link href="/profile" className="text-lg font-semibold text-black hover:text-blue-600">{mockPatient.name}</Link><br />
                                            <p className="text-xs text-gray-600">ID: {mockPatient.id}</p><br />
                                            <span className="text-xs text-gray-600 mr-2">{mockPatient.gender}</span>
                                            <span className="text-xs text-gray-600">{mockPatient.age} yrs</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Dashboard Menu */}
                                <nav className="space-y-1">
                                    {[
                                        { name: 'Dashboard', href: '/dashboard', icon: 'fa-shapes', active: false },
                                        { name: 'Doctors', href: '/doctors', icon: 'fa-user-doctor', active: false },
                                        { name: 'My Appointment', href: '/appointments', icon: 'fa-calendar-check', active: false },
                                        { name: 'Doctor Suggestions', href: '/doctors-suggestion', icon: 'fa-shield-halved', active: true },
                                        { name: 'Add Medical Records', href: '/medical-records', icon: 'fa-money-bill-1', active: false },
                                        { name: 'Vitals', href: '/vitals', icon: 'fa-shield-halved', active: false },
                                        { name: 'Receipts', href: '/receipts', icon: 'fa-file-lines', active: false },
                                        { name: 'Profile Settings', href: '/profile', icon: 'fa-user-pen', active: false },
                                        { name: 'Change Password', href: '/profile/change-password', icon: 'fa-key', active: false },
                                    ].map(item => (
                                        <Link key={item.name} href={item.href} className={`flex items-center p-2 rounded-lg transition ${item.active ? 'bg-blue-500 text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                                            <i className={`fa-solid ${item.icon} w-5 mr-3`}></i>
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                     <button onClick={handleLogout} className="flex items-center p-2 rounded-lg transition text-gray-700 hover:bg-gray-100 w-full text-left">
                                        <i className="fa-solid fa-sign-out w-5 mr-3"></i>
                                        <span>Logout</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                        {/* /Profile Sidebar */}
                        
                        {/* Suggestions Content */}
                        <div className="lg:w-3/4">
                            <div className="flex justify-between items-center mb-6 flex-wrap">
                                <h3 className="text-2xl font-bold">Doctor Suggestions</h3>
                                <div className="relative w-full sm:w-64">
                                    <input
                                        type="text"
                                        className="form-control w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                </div>
                            </div>

                            {/* Suggestions List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredSuggestions.length > 0 ? (
                                    filteredSuggestions.map(doctor => (
                                        <div key={doctor.DoctorId} className="bg-white shadow-md border-0 p-4 rounded-xl h-full transition hover:shadow-lg">
                                            <div className="flex items-start">
                                                <img src={doctor.DoctorImage} alt="Doctor"
                                                     className="rounded-full flex-shrink-0 mr-4 border border-gray-200"
                                                     style={{width: '70px', height: '70px', objectFit: 'cover'}} />
                                                <div className="flex-grow">
                                                    <h5 className="mb-1 text-lg font-semibold text-gray-800 searchable">{doctor.Name}</h5>
                                                    <small className="d-block text-gray-600 searchable">
                                                        <i className="fa-solid fa-user-md mr-1 text-blue-500"></i>
                                                        **{doctor.Specialization}**
                                                    </small>
                                                    <small className="d-block text-gray-500 searchable">
                                                        <i className="fa-solid fa-certificate mr-1 text-blue-500"></i>
                                                        {doctor.Qualification}
                                                    </small>
                                                    <small className="d-block text-gray-500 searchable">
                                                        <i className="fa-solid fa-briefcase mr-1 text-blue-500"></i>
                                                        {doctor.Experience} Years Experience
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-gray-100">
                                                <p className="text-sm text-gray-700">
                                                    <i className="fa-solid fa-comments mr-2 text-blue-500"></i>
                                                    {doctor.DoctorSuggestions}
                                                </p>
                                                <div className="text-right mt-3">
                                                    <Link href={`/doctors/${doctor.DoctorId}`} className="text-sm font-medium text-blue-600 hover:underline">
                                                        View Profile &rarr;
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="md:col-span-2 text-center py-10 text-gray-500 bg-white rounded-xl shadow-md">
                                        No doctor suggestions found matching your search.
                                    </div>
                                )}
                            </div>
                            {/* /Suggestions List */}

                            {/* Pagination */}
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
            
            <style jsx global>{`
                /* Global Font-Awesome for icons */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
            `}</style>
        </>
    );
};

export default DoctorSuggestions;