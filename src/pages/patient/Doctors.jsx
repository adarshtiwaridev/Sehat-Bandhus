// src/app/doctors/page.js

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- MOCK DATA ---
const mockPatient = {
    name: 'Jane Doe',
    id: 'PT-9876',
    gender: 'Female',
    age: 28,
    imageUrl: '/img/patient-avatar.jpg',
};

const mockDoctors = [
    {
        DoctorId: 101,
        Name: 'Dr. John Smith',
        Specialization: 'Cardiologist',
        Qualification: 'MBBS, MD',
        Experience: 10,
        ConsultationFee: 750,
        Address: '123 Main St',
        City: 'New Delhi',
        State: 'Delhi',
        Country: 'India',
        DoctorImage: '/img/doctor-smith.jpg',
        AverageRating: 4.5,
        Schedule: ['Mon', 'Tue', 'Wed', 'Fri']
    },
    {
        DoctorId: 102,
        Name: 'Dr. Sarah Lee',
        Specialization: 'Dermatologist',
        Qualification: 'MBBS, DNB',
        Experience: 7,
        ConsultationFee: 550,
        Address: '45 Lake View',
        City: 'Mumbai',
        State: 'Maharashtra',
        Country: 'India',
        DoctorImage: '/img/doctor-lee.jpg',
        AverageRating: 4.8,
        Schedule: ['Tue', 'Thu', 'Sat']
    },
    {
        DoctorId: 103,
        Name: 'Dr. Alan Grant',
        Specialization: 'Pediatrician',
        Qualification: 'MBBS, DCH',
        Experience: 15,
        ConsultationFee: 1000,
        Address: '30 Park Ave',
        City: 'Bangalore',
        State: 'Karnataka',
        Country: 'India',
        DoctorImage: '/img/doctor-alan.jpg',
        AverageRating: 3.9,
        Schedule: ['Mon', 'Wed', 'Fri', 'Sun']
    },
    // Add more doctors as needed
];

// --- COMPONENTS ---

// Reusable Star Rating Component
const StarRating = ({ rating, readOnly = true }) => {
    const roundedRating = Math.round(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <i
                key={i}
                className={`fa-solid fa-star text-sm mr-0.5 ${i <= roundedRating ? 'text-yellow-400' : 'text-gray-300'}`}
                style={{ cursor: readOnly ? 'default' : 'pointer' }}
            ></i>
        );
    }
    return <div className="flex">{stars}</div>;
};

// --- MAIN COMPONENT ---

const DoctorsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);

    // Filter logic runs whenever the search term changes
    useEffect(() => {
        if (!searchTerm) {
            setFilteredDoctors(mockDoctors);
            return;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        const results = mockDoctors.filter(doctor => {
            // Create a searchable string that mirrors the ASPX page's searchable content
            const searchableText = [
                doctor.Name,
                doctor.Qualification,
                doctor.Specialization,
                doctor.Address,
                doctor.City,
                doctor.State,
                doctor.Country,
                doctor.Experience.toString() + ' Years',
                doctor.ConsultationFee.toString(),
                doctor.AverageRating.toFixed(1).toString(),
            ].join(' ').toLowerCase();

            return searchableText.includes(lowerCaseSearch);
        });

        setFilteredDoctors(results);
    }, [searchTerm]);

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Doctors</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                                <li aria-current="page" className="text-gray-700">/ Doctors</li>
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
                                        <Link href="/dashboard/profile" className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                            <img src={mockPatient.imageUrl} alt="Patient Avatar" className="w-full h-full object-cover" />
                                        </Link>
                                        <div>
                                            <Link href="/dashboard/profile" className="text-lg font-semibold text-black hover:text-blue-600">{mockPatient.name}</Link><br />
                                            <p className="text-xs text-gray-600">ID: {mockPatient.id}</p><br />
                                            <span className="text-xs text-gray-600 mr-2">{mockPatient.gender}</span>
                                            <span className="text-xs text-gray-600">{mockPatient.age} yrs</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Simplified Dashboard Menu */}
                                <nav className="space-y-1">
                                    {[
                                        { name: 'Dashboard', href: '/dashboard', icon: 'fa-shapes', active: false },
                                        { name: 'Doctors', href: '/doctors', icon: 'fa-user-doctor', active: true },
                                        { name: 'My Appointment', href: '/appointments', icon: 'fa-calendar-check', active: false },
                                        { name: 'Doctor Suggestions', href: '/suggestions', icon: 'fa-shield-halved', active: false },
                                        { name: 'Add Medical Records', href: '/medical-records', icon: 'fa-money-bill-1', active: false },
                                        { name: 'Vitals', href: '/vitals', icon: 'fa-shield-halved', active: false },
                                        { name: 'Receipts', href: '/receipts', icon: 'fa-file-lines', active: false },
                                        { name: 'Profile Settings', href: '/profile', icon: 'fa-user-pen', active: false },
                                        { name: 'Change Password', href: '/profile/change-password', icon: 'fa-key', active: false },
                                        { name: 'Logout', href: '/logout', icon: 'fa-sign-out', active: false },
                                    ].map(item => (
                                        <Link key={item.name} href={item.href} className={`flex items-center p-2 rounded-lg transition ${item.active ? 'bg-blue-500 text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                                            <i className={`fa-solid ${item.icon} w-5 mr-3`}></i>
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        {/* /Profile Sidebar */}
                        
                        {/* Doctors List Content */}
                        <div className="lg:w-3/4">
                            <div className="flex justify-between items-center mb-6 flex-wrap">
                                <h3 className="text-2xl font-semibold">Doctors</h3>
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

                            {/* Doctors List Repeater Conversion */}
                            <div className="space-y-6">
                                {filteredDoctors.length > 0 ? (
                                    filteredDoctors.map(doctor => (
                                        <div key={doctor.DoctorId} className="bg-white shadow-md rounded-lg p-5 doctor-card transition hover:shadow-lg">
                                            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                                                
                                                {/* Doctor Image Section */}
                                                <div className="flex-shrink-0">
                                                    <Link href={`/doctors/${doctor.DoctorId}`}>
                                                        <img
                                                            src={doctor.DoctorImage}
                                                            alt="Doctor"
                                                            className="w-28 h-28 object-cover rounded-md border border-gray-200"
                                                        />
                                                    </Link>
                                                </div>
                            
                                                {/* Doctor Details Section */}
                                                <div className="flex-grow text-center md:text-left">
                                                    <h5 className="text-xl font-bold text-gray-900 mb-1">
                                                        <Link href={`/doctors/${doctor.DoctorId}`} className="hover:text-blue-600 transition">
                                                            {doctor.Name}
                                                        </Link>
                                                        <i className="fa-solid fa-circle-check text-green-500 ml-2 text-sm"></i>
                                                    </h5>
                                                    <p className="text-gray-600 mb-1">
                                                        {doctor.Qualification} - **{doctor.Specialization}**
                                                    </p>
                                                    {/* Location */}
                                                    <p className="text-sm text-gray-500 mb-1 flex items-center justify-center md:justify-start">
                                                        <i className="fa-solid fa-location-dot text-blue-500 mr-2"></i> 
                                                        {doctor.Address}, {doctor.City}, {doctor.State}, {doctor.Country}
                                                    </p>
                                                    {/* Rating */}
                                                    <div className="flex items-center justify-center md:justify-start my-2">
                                                        <StarRating rating={doctor.AverageRating} />
                                                        <span className="text-sm text-gray-700 ml-2 font-semibold">
                                                            {doctor.AverageRating.toFixed(1)}
                                                        </span>
                                                    </div>
                                                    {/* Availability */}
                                                    <p className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">
                                                       <i className="fa-solid fa-circle text-[8px] mr-1"></i> Available Days: **{doctor.Schedule.join(', ')}**
                                                    </p>
                                                </div>

                                                {/* Consultation & Booking Section */}
                                                <div className="flex-shrink-0 text-center md:text-right w-full md:w-auto mt-4 md:mt-0">
                                                    <p className="text-sm text-gray-600 mb-1">
                                                        <i className="fa-solid fa-briefcase text-gray-600 mr-2"></i>**{doctor.Experience}** Years of Experience
                                                    </p>
                                                    <p className="text-sm text-gray-600 mb-0">
                                                        Consultation Fees
                                                    </p>
                                                    <h5 className="text-xl font-bold text-orange-600 mb-3">
                                                        <i className="fa-solid fa-indian-rupee-sign mr-2 text-base"></i> **{doctor.ConsultationFee}**
                                                    </h5>
                                                    {/* Book Appointment Button */}
                                                    <Link
                                                        href={`/appointments/book?doctorId=${doctor.DoctorId}`}
                                                        className="btn bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-full text-sm font-medium transition inline-flex items-center"
                                                    >
                                                        <i className="fa-solid fa-calendar-check mr-2"></i> Book Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-md">
                                        No doctors found matching your search criteria.
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* /Doctors List Content */}
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

export default DoctorsList;