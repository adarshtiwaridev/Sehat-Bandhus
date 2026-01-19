 // src/app/receptionist/profile-setting/page.js 

"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// --- MOCK DATA FOR SIDEBAR ---
const mockReceptionist = {
    Name: 'Ms. Sarah Connor', 
    Qualification: 'BBA',
    Experience: '5 years',
    Specialization: 'Front Desk Admin',
    Image: '/assets/img/receptionist/user-thumb-02.jpg', // Placeholder image
    ProfileUrl: 'ProfileSetting.aspx' // Used for internal links
};

const ProfileSetting = () => {
    const router = useRouter();

    const handleLogout = (e) => {
        e.preventDefault();
        router.push('/Login');
        console.log("Receptionist Logout clicked");
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20"> 
            
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-8 mb-8">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center text-center">
                        <div className="w-full">
                            <h2 className="text-2xl font-semibold text-gray-800">Profile Settings</h2>
                            <nav aria-label="breadcrumb" className="mt-2">
                                <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                    <li className="text-sm">
                                        <Link href="../Default.aspx" className="hover:text-blue-600">Home</Link>
                                    </li>
                                    <li className="text-sm text-gray-700" aria-current="page">Profile Settings</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Breadcrumb */}

            {/* Page Content */}
            <div className="py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* Profile Sidebar */}
                        <div className="lg:w-1/4 flex-shrink-0"> 
                            <div className="bg-white shadow rounded-lg p-5 sticky top-20">
                                <div className="border-b pb-4 mb-4">
                                    <div className="profile-info-widget text-center">
                                        <Link href={mockReceptionist.ProfileUrl} className="w-20 h-20 rounded-full overflow-hidden inline-block mb-3 border-4 border-gray-200">
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
                                            <li>
                                                <Link href="Dashboard.aspx" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                                    <i className="fa-solid fa-shapes w-5 mr-3"></i>
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="AppointmentRequest.aspx" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                                    <i className="fa-solid fa-calendar-check w-5 mr-3"></i>
                                                    <span>Appointment Requests</span>
                                                </Link>
                                            </li>									
                                            {/* Profile Settings Link - active state */}
                                            <li className="active">
                                                <Link href="ProfileSetting.aspx" className="flex items-center p-2 rounded-lg bg-blue-500 text-white font-medium transition">
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
                                                <a href="../Login.aspx" onClick={handleLogout} className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                                    <i className="fa-solid fa-sign-out w-5 mr-3"></i> 
                                                    <span>Logout</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                                    
                        {/* Main Profile Content Area (ContentPlaceHolder1) */}
                        <div className="lg:w-3/4 flex-grow">
                            <div className="p-6 bg-white shadow rounded-lg">
                                <h4 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Basic Information</h4>
                                
                                {/* Form / Content for Profile Setting */}
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Name Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                                            <input type="text" id="name" defaultValue={mockReceptionist.Name} className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                                        </div>
                                        {/* Qualification Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="qualification">Qualification</label>
                                            <input type="text" id="qualification" defaultValue={mockReceptionist.Qualification} className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                                        </div>
                                    </div>
                                    
                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                                        <input type="email" id="email" defaultValue="sarah.connor@clinic.com" className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>

                                    {/* Update Button (Replacement for ASP:Button) */}
                                    <div className="pt-4">
                                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>		
            {/* /Page Content */}
        </div>
    );
};

export default ProfileSetting;