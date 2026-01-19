// src/app/profile/page.js
// Note: This is an updated and combined version of the previous PatientProfile.aspx logic

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- MOCK DATA ---
const mockPatient = {
    // Sidebar data
    lName: 'Jane Doe',
    lPatientId: 'PT-9876',
    lGender: 'Female',
    lAge: 28,
    Image2: '/img/patient-avatar.jpg',
    
    // Form data
    Name: 'Jane Doe',
    DOB: '1997-08-15',
    Mobile: '9876543210',
    Email: 'jane.doe@example.com',
    BloodG: 'A+',
    Age: 28,
    Gender: 'Female',
    Address: '123 Health Ave, Near City Hospital',
    City: 'New Delhi',
    State: 'Delhi',
    Country: 'India',
    Pincode: '110001',
    Image1: '/img/patient-avatar.jpg', // Current profile image
};

// --- COMPONENTS ---

const PatientSidebar = ({ patient, handleLogout }) => {
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


// --- MAIN COMPONENT ---

const ProfileSettings = () => {
    const router = useRouter();
    const [profile, setProfile] = useState(mockPatient);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfile(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        // Optional: Show local preview of the selected image
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfile(prev => ({ ...prev, Image1: event.target.result }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        // Basic validation example
        if (!profile.Name || !profile.Mobile || !profile.Email) {
            setErrorMessage('Name, Mobile, and Email fields are required.');
            return;
        }

        // Simulate API call to update profile
        console.log('Updating profile:', profile);
        console.log('New file:', selectedFile);

        // In a real app, this would be an async API call (e.g., Axios/fetch)
        alert('Profile Updated Successfully (Mock)!');
        // Clear file input after successful upload simulation
        setSelectedFile(null);
    };

    const handleLogout = () => {
        // Implement actual logout logic here
        router.push('/logout');
    };

    // Helper component for form input
    const FormInput = ({ id, label, required, type = 'text', textMode, children }) => (
        <div className="form-wrap mb-2">
            <label className="col-form-label block text-sm font-medium text-gray-700 mb-1" htmlFor={id}>
                {label}{required && <span className="text-red-500">*</span>}
            </label>
            {children || (
                <input 
                    type={type} 
                    id={id} 
                    name={id} 
                    value={profile[id] || ''} 
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500" 
                    required={required}
                    // Apply phone/number type based on TextMode
                    {...(textMode === 'Phone' && { type: 'tel' })}
                    {...(textMode === 'Number' && { type: 'number' })}
                    {...(textMode === 'Email' && { type: 'email' })}
                />
            )}
        </div>
    );

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
                    <div className="row flex flex-col lg:flex-row gap-6">
                        
                        {/* Profile Sidebar */}
                        <div className="lg:w-1/4">
                            <PatientSidebar patient={profile} handleLogout={handleLogout} />
                        </div>
                        {/* /Profile Sidebar */}
                        
                        {/* Profile Form Content */}
                        <div className="lg:w-3/4">
                            
                            {/* Error Message */}
                            {errorMessage && (
                                <p className="text-red-600 font-bold text-lg mb-4 bg-red-100 p-3 rounded-lg">{errorMessage}</p>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                {/* Image Upload Section */}
                                <div className="bg-white shadow rounded-lg p-5 mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-500">
                                            <img src={profile.Image1 || '/img/default-avatar.jpg'} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <h5 className="text-lg font-medium text-gray-800">Profile Image</h5>
                                            <div className="flex items-center space-x-3 mt-2">
                                                <label htmlFor="FileUpload1" className="cursor-pointer bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition inline-block">
                                                    Upload New 
                                                </label>
                                                <input id="FileUpload1" type="file" onChange={handleFileChange} className="hidden" accept=".jpg,.png,.jpeg" />
                                                
                                                {selectedFile && <span className="text-sm text-gray-600">{selectedFile.name}</span>}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Accepted format jpg, png, jpeg</p>
                                        </div>          
                                    </div>          
                                </div>
                
                                {/* Information Section */}
                                <div className="setting-title border-b pb-2 mb-4">
                                    <h5 className="text-xl font-semibold text-gray-800">Information</h5>
                                </div>
                            
                                <div className="bg-white shadow rounded-lg p-5 mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <FormInput id="Name" label="Name" required />
                                        <FormInput id="DOB" label="Date of Birth" required type="date" />
                                        <FormInput id="Mobile" label="Mobile Number" required textMode="Phone" />
                                        <FormInput id="Email" label="Email Address" required textMode="Email" />
                                        <FormInput id="BloodG" label="Blood Group" required>
                                            <select 
                                                id="BloodG" 
                                                name="BloodG" 
                                                value={profile.BloodG || ''} 
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option value="">Select Group</option>
                                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                                    <option key={group} value={group}>{group}</option>
                                                ))}
                                            </select>
                                        </FormInput>
                                        <FormInput id="Age" label="Age" required textMode="Number" />
                                        <FormInput id="Gender" label="Gender" required>
                                            <select 
                                                id="Gender" 
                                                name="Gender" 
                                                value={profile.Gender || ''} 
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </FormInput>
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className="setting-title border-b pb-2 mb-4">
                                    <h5 className="text-xl font-semibold text-gray-800">Address</h5>
                                </div>
                                <div className="bg-white shadow rounded-lg p-5 mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <FormInput id="Address" label="Address" required />
                                        </div>
                                        <FormInput id="City" label="City" required />
                                        <FormInput id="State" label="State" required />
                                        <FormInput id="Country" label="Country" required />
                                        <FormInput id="Pincode" label="Pincode" required textMode="Number" />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3">
                                    <Link href="/profile" className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 py-2 px-6 rounded-full transition">
                                        Cancel
                                    </Link>
                                    <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-full transition">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
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

export default ProfileSettings;