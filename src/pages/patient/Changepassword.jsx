// src/app/profile/change-password/page.js

"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- MOCK DATA ---
const mockPatient = {
    name: 'Jane Doe',
    id: 'PT-9876',
    gender: 'Female',
    age: 28,
    imageUrl: '/path/to/patient-avatar.jpg',
};

// --- COMPONENTS ---

const ChangePassword = () => {
    const router = useRouter();
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPasswords(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        // Basic Validation (Client-side)
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("New Password and Confirm Password do not match.");
            return;
        }
        if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
             alert("All password fields must be filled.");
            return;
        }
        
        // --- Simulate API Call ---
        console.log("Saving password change:", passwords);
        alert("Password change simulated successfully! Redirecting...");
        
        // In a real application, you would handle the API response and navigation
        // router.push('/profile');
    };

    const handleCancel = () => {
        // Clear form and navigate back, or just navigate
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        router.push('/dashboard'); // Assuming the cancel button navigates away
    };

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Patient Dashboard</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li>
                                    <Link href="/" className="hover:text-blue-600">Home</Link>
                                </li>
                                <li aria-current="page" className="text-gray-700">/ Change Password</li>
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
                                    {[
                                        { name: 'Dashboard', href: '/dashboard', icon: 'fa-solid fa-shapes', active: false },
                                        { name: 'Doctors', href: '/doctors', icon: 'fa-solid fa-user-doctor', active: false },
                                        { name: 'My Appointment', href: '/appointments', icon: 'fa-solid fa-calendar-check', active: false },
                                        { name: 'Profile Settings', href: '/profile', icon: 'fa-solid fa-user-pen', active: false },
                                        { name: 'Change Password', href: '/profile/change-password', icon: 'fa-solid fa-key', active: true },
                                        { name: 'Logout', onClick: () => router.push('/logout'), icon: 'fa-solid fa-solid fa-sign-out', active: false },
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
                            <div className="dashboard-header mb-6">
                                <h3 className="text-2xl font-semibold">Change Password</h3>
                            </div>
                            
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <div className="max-w-md">
                                    <form onSubmit={handleSave}>
                                        {/* Old Password */}
                                        <div className="mb-4">
                                            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                                            <input
                                                id="oldPassword"
                                                type="password"
                                                value={passwords.oldPassword}
                                                onChange={handleInputChange}
                                                className="form-control w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        
                                        {/* New Password */}
                                        <div className="mb-4">
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                            <div className="relative">
                                                <input
                                                    id="newPassword"
                                                    type={showNewPassword ? "text" : "password"}
                                                    value={passwords.newPassword}
                                                    onChange={handleInputChange}
                                                    className="form-control w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                    required
                                                />
                                                <span 
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    title={showNewPassword ? "Hide password" : "Show password"}
                                                >
                                                    <i className={`fa-solid ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="mb-6">
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                            <div className="relative">
                                                <input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={passwords.confirmPassword}
                                                    onChange={handleInputChange}
                                                    className="form-control w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                    required
                                                />
                                                <span 
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    title={showConfirmPassword ? "Hide password" : "Show password"}
                                                >
                                                    <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-start space-x-3 mt-8">
                                            <button 
                                                type="button" 
                                                onClick={handleCancel} 
                                                className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium py-2 px-4 rounded-lg transition"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="btn bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-4 rounded-lg transition"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /Main Content */}
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

export default ChangePassword;