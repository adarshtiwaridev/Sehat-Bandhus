// src/app/receptionist/dashboard/page.js

"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// NOTE: Global Font Awesome link is required for icons but cannot be placed in the
// component body. For a real Next.js app, this should be in the root layout or imported.
// Assuming Font Awesome is globally available for the classes (e.g., 'fa-solid fa-shapes').

// --- MOCK DATA FOR SIDEBAR (ASP.NET Controls) ---
const mockReceptionist = {
    Name: 'Ms. Sarah Connor', 
    Qualification: 'BBA',
    Experience: '5 years',
    Specialization: 'Front Desk Admin',
    Image: '/assets/img/receptionist/user-thumb-02.jpg', // Placeholder image
    ProfileUrl: 'ProfileSetting.aspx'
};

const ReceptionistDashboard = () => {
    const router = useRouter();

    const handleLogout = (e) => {
        e.preventDefault();
        // Implement actual logout logic here (API call, session clearing, redirect)
        router.push('/Login');
        console.log("Receptionist Logout clicked");
    };

    return (
        // The outer div should handle the overall layout if it were part of a Master/Layout, 
        // but here it serves as the main page wrapper.
        <div className="min-h-screen bg-gray-50 pt-20"> 
            
            {/* Breadcrumb (from Content2) */}
            <div className="bg-gray-100 py-8 mb-8">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center text-center">
                        <div className="w-full">
                            <h2 className="text-2xl font-semibold text-gray-800">Receptionist Dashboard</h2>
                            <nav aria-label="breadcrumb" className="mt-2">
                                <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                    <li className="text-sm">
                                        <Link href="../Default.aspx" className="hover:text-blue-600">Home</Link>
                                    </li>
                                    <li className="text-sm text-gray-700" aria-current="page">Dashboard</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Breadcrumb */}

            {/* Page Content (from Content2) */}
            <div className="py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* Profile Sidebar */}
                        <div className="lg:w-1/4 flex-shrink-0"> 
                            {/* Replaced .theiaStickySidebar with Tailwind sticky and top positioning */}
                            <div className="bg-white shadow rounded-lg p-5 sticky top-20">
                                <div className="border-b pb-4 mb-4">
                                    <div className="profile-info-widget text-center">
                                        <Link href={mockReceptionist.ProfileUrl} id="ProfileId" className="w-20 h-20 rounded-full overflow-hidden inline-block mb-3 border-4 border-gray-200">
                                            {/* DoctorImage1 */}
                                            {/* Using standard img tag or Next Image, assuming asset paths are handled */}
                                            <Image 
                                                src={mockReceptionist.Image} 
                                                alt="User Image" 
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </Link>
                                        <div className="text-center">
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                <Link href={mockReceptionist.ProfileUrl} className="hover:text-blue-600">
                                                    {mockReceptionist.Name}
                                                </Link>
                                            </h3>
                                            <div className="mt-1">
                                                <h5 className="mb-0 text-sm text-gray-600">
                                                    {mockReceptionist.Qualification}, {mockReceptionist.Experience} Experience
                                                </h5>
                                            </div>
                                            {/* doctor-role-badge */}
                                            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 mt-2 rounded-full">
                                                <i className="fa-solid fa-circle text-[8px] mr-1"></i>
                                                {mockReceptionist.Specialization}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="dashboard-widget">
                                    <nav className="space-y-1">
                                        <ul>
                                            {/* Dashboard Link - .active state is applied inline */}
                                            <li>
                                                <Link href="Dashboard.aspx" className="flex items-center p-2 rounded-lg bg-blue-500 text-white font-medium transition">
                                                    <i className="fa-solid fa-shapes w-5 mr-3"></i>
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            {/* Other Links */}
                                            <li>
                                                <Link href="AppointmentRequest.aspx" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                                    <i className="fa-solid fa-calendar-check w-5 mr-3"></i>
                                                    <span>Appointment Requests</span>
                                                </Link>
                                            </li>									
                                            <li>
                                                <Link href="ProfileSetting.aspx" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                                    <i className="fa-solid fa-user-pen w-5 mr-3"></i>
                                                    <span>Profile Settings</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="Changepassword.aspx" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                                    <i className="fa-solid fa-key w-5 mr-3"></i>
                                                    <span>Change Password</span>
                                                </Link>
                                            </li>
                                            <li>
                                                {/* Logout - Use anchor tag with handler for ASP.NET equivalent */}
                                                <a href="../Login.aspx" onClick={handleLogout} className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                                    {/* NOTE: The original used fa-calendar-check, but fa-sign-out makes more sense for Logout */}
                                                    <i className="fa-solid fa-sign-out w-5 mr-3"></i> 
                                                    <span>Logout</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            {/* /Profile Sidebar */}
                        </div>
                                    
                        {/* Main Dashboard Content Area */}
                        <div className="lg:w-3/4 flex-grow">
                            {/* Content area is empty in original file. Adding a placeholder using the style class intent. */}
                            <div className="p-6 bg-white shadow rounded-lg h-full">
                                <div className="dashboard-widget-box">
                                    <div className="dashboard-content-info">
                                        <h4 className="text-gray-900 font-semibold my-1 text-2xl">
                                            <span className="text-[#0F172A] font-semibold text-2xl">Welcome, Receptionist Dashboard!</span>
                                        </h4>
                                    </div>
                                    <p className="text-gray-600 mt-4">Your dashboard statistics and incoming requests would be displayed here.</p>
                                    {/* Additional widgets go here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>		
            {/* /Page Content */}
        </div>
    );
};

export default ReceptionistDashboard;