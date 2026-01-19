// src/app/profile/page.js

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- MOCK DATA ---
const mockPatient = {
    name: 'Jane Doe',
    id: 'PT-9876',
    gender: 'Female',
    age: 28,
    imageUrl: '/img/patient-avatar.jpg',
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '9876543210',
    email: 'jane.doe@example.com',
    dob: '1997-08-15',
    bloodGroup: 'A+',
    address: '123 Health Ave',
    city: 'New Delhi',
    state: 'Delhi',
    zip: '110001',
    country: 'India',
};

// --- COMPONENTS ---

const PatientSidebar = ({ patient }) => {
    const router = useRouter();
    const handleLogout = () => {
        // Implement actual logout logic here
        router.push('/logout');
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: 'fa-shapes', active: false },
        { name: 'Doctors', href: '/doctors', icon: 'fa-user-doctor', active: false },
        { name: 'My Appointment', href: '/appointments', icon: 'fa-calendar-check', active: false },
        { name: 'Doctor Suggestions', href: '/doctors-suggestion', icon: 'fa-shield-halved', active: false },
        { name: 'Add Medical Records', href: '/medical-records', icon: 'fa-money-bill-1', active: false },
        { name: 'Vitals', href: '/vitals', icon: 'fa-shield-halved', active: false },
        { name: 'Receipts', href: '/receipts', icon: 'fa-file-lines', active: false },
        { name: 'Profile Settings', href: '/profile', icon: 'fa-user-pen', active: true },
        { name: 'Change Password', href: '/profile/change-password', icon: 'fa-key', active: false },
    ];

    return (
        <div className="bg-white shadow rounded-lg p-5 sticky top-20">
            <div className="border-b pb-4 mb-4">
                <div className="flex items-center space-x-3">
                    <Link href="/profile" className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <img src={patient.imageUrl} alt="Patient Avatar" className="w-full h-full object-cover" />
                    </Link>
                    <div>
                        <Link href="/profile" className="text-lg font-semibold text-black hover:text-blue-600">{patient.name}</Link><br />
                        <p className="text-xs text-gray-600">ID: {patient.id}</p><br />
                        <span className="text-xs text-gray-600 mr-2">{patient.gender}</span>
                        <span className="text-xs text-gray-600">{patient.age} yrs</span>
                    </div>
                </div>
            </div>
            <nav className="space-y-1">
                {navItems.map(item => (
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
    );
};

// --- MAIN COMPONENT ---

const PatientProfile = () => {
    const [profileData, setProfileData] = useState(mockPatient);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile Updated:\n' + JSON.stringify(profileData, null, 2));
        // In a real application, you would send profileData to your backend API here.
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Profile Settings</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                                <li aria-current="page" className="text-gray-700">/ Profile Settings</li>
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
                            <PatientSidebar patient={mockPatient} />
                        </div>
                        {/* /Profile Sidebar */}
                        
                        {/* Profile Form Content */}
                        <div className="lg:w-3/4">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Profile Picture Upload */}
                                    <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                                        <img src={profileData.imageUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-blue-500" />
                                        <div>
                                            <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition inline-block">
                                                Upload New Photo
                                            </label>
                                            <input id="file-upload" type="file" className="hidden" />
                                            <p className="text-xs text-gray-500 mt-1">Allowed JPG or PNG. Max size of 800K</p>
                                        </div>
                                    </div>

                                    {/* Basic Info */}
                                    <h4 className="text-lg font-semibold border-b pb-2 mb-4">Personal Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">First Name</label>
                                            <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">Last Name</label>
                                            <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                                            <input type="tel" id="phone" name="phone" value={profileData.phone} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                                            <input type="email" id="email" name="email" value={profileData.email} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" disabled />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dob">Date of Birth</label>
                                            <input type="date" id="dob" name="dob" value={profileData.dob} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bloodGroup">Blood Group</label>
                                            <select id="bloodGroup" name="bloodGroup" value={profileData.bloodGroup} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
                                                <option value="">Select</option>
                                                <option value="A+">A+</option>
                                                <option value="B+">B+</option>
                                                <option value="O+">O+</option>
                                                <option value="AB+">AB+</option>
                                                <option value="A-">A-</option>
                                                {/* ... other options */}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Address Info */}
                                    <h4 className="text-lg font-semibold border-b pb-2 mb-4 pt-4">Address Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">Address</label>
                                            <input type="text" id="address" name="address" value={profileData.address} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">City</label>
                                            <input type="text" id="city" name="city" value={profileData.city} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">State</label>
                                            <input type="text" id="state" name="state" value={profileData.state} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="zip">ZIP Code</label>
                                            <input type="text" id="zip" name="zip" value={profileData.zip} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">Country</label>
                                            <input type="text" id="country" name="country" value={profileData.country} onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4 flex justify-end">
                                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* /Profile Form Content */}
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

export default PatientProfile;