// File: pages/doctor/ProfileSetting.jsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'; // For notifications (npm install sweetalert2)

// Assuming you have your shared sidebar component
import DoctorProfileSidebar from '../../components/DoctorProfileSidebar'; 

// --- MOCK DATA (Replace with API fetch from your server) ---
const mockProfileData = {
    name: "Dr. Jane Doe",
    qualification: "MBBS, MD",
    experience: 12,
    specialist: "Pediatrics",
    email: "jane.doe@clinic.com",
    phone: "9876543210",
    age: 40,
    gender: 'Female',
    bio: "Experienced pediatrician dedicated to comprehensive child health care.",
    address: "123 Clinic Road",
    city: "Newyork",
    state: "NY",
    country: "USA",
    pincode: 10001,
    imageUrl: "/assets/doctors/doctor-profile.jpg",
};

// --- Custom Form Components (For Reusability) ---
const ProfileSidebarInfo = ({ profile }) => (
    <div className="profile-sidebar doctor-sidebar profile-sidebar-new bg-white shadow-lg rounded-lg p-4">
        {/* Profile Info Widget */}
        <div className="widget-profile pro-widget-content">
            <div className="flex items-center space-x-4">
                <Link href="/doctor/profile" className="booking-doc-img w-16 h-16 rounded-full overflow-hidden mr-3">
                    <Image src={profile.imageUrl} alt="User Image" width={64} height={64} />
                </Link>
                <div className="profile-det-info">
                    <h3 className="text-lg font-semibold text-gray-900">
                        <Link href="/doctor/profile">{profile.name}</Link>
                    </h3>
                    <div className="patient-details">
                        <h5 className="mb-0 text-sm text-gray-600">{profile.qualification}, {profile.experience} Experience</h5>
                    </div>
                    <span className="inline-flex items-center text-xs font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full mt-1">
                        <i className="fa-solid fa-circle text-[8px] mr-1"></i>{profile.specialist}
                    </span>
                </div>
            </div>
        </div>
        
        {/* Navigation Menu (Replaced by the DoctorProfileSidebar Component) */}
        {/* NOTE: The full navigation menu HTML would go here, marked with the 'active' class on Profile Settings */}
        <DoctorProfileSidebar profile={profile} activeItem="Profile Settings" onLogout={() => console.log('Logout')} />
    </div>
);

// --- Main Page Component ---
export default function ProfileSettingPage() {
    const [formData, setFormData] = useState(mockProfileData);
    const router = useRouter();

    // Load data on component mount
    // useEffect(() => {
    //     // Fetch actual profile data from API here
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        // 1. Validation (add actual client-side validation here)
        if (!formData.name || !formData.email) {
            Swal.fire('Error', 'Please fill in all required fields.', 'error');
            return;
        }

        // 2. API Call (Replaces OnClick="BtnUpdate_Click")
        console.log('Updating Profile with data:', formData);
        // fetch('/api/doctor/update-profile', { method: 'POST', body: JSON.stringify(formData) })
        // .then(res => res.json())
        // .then(data => {
        
        Swal.fire('Success', 'Profile updated successfully!', 'success');
        // })
    };

    const handleCancel = () => {
        // Reloads the initial state (or navigates away)
        setFormData(mockProfileData);
        router.push('/doctor/ProfileSetting'); // Refresh/Reset page
    };
    
    // Handle file upload click (replaces asp:FileUpload logic)
    const handleFileUploadClick = () => {
        document.getElementById('profile-image-upload').click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('File selected:', file.name);
            // Implement logic to upload file or preview image here
        }
    };


    return (
        <>
            <Head>
                <title>Profile Settings</title>
            </Head>

            {/* Breadcrumb Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">Doctor Profile</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center text-sm space-x-2">
                            <li><Link href="/Default" className="text-blue-600 hover:underline">Home</Link></li>
                            <li className="text-gray-500" aria-current="page">Doctor Profile Setting</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">

                    <div className="flex flex-wrap -mx-4">
                        
                        {/* Profile Sidebar (Left Column) */}
                        <div className="w-full lg:w-1/3 xl:w-1/4 px-4 sticky top-6">
                            <ProfileSidebarInfo profile={formData} />
                        </div>

                        {/* Main Content (Right Column) */}
                        <div className="w-full lg:w-2/3 xl:w-3/4 px-4">
                            <form onSubmit={handleSave}>
                                
                                {/* Profile Settings */}
                                <div className="dashboard-header mb-6">
                                    <h3 className="text-2xl font-semibold">Profile Settings</h3>
                                </div>
                                
                                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                                    
                                    {/* Change Avatar */}
                                    <div className="change-avatar img-upload flex items-center space-x-6 border-b pb-6">
                                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500 overflow-hidden">
                                            <i className="fa-solid fa-file-image"></i>
                                            {/* In a real app, replace i tag with Image component displaying current photo */}
                                        </div>
                                        <div className="upload-img">
                                            <h5 className="text-lg font-semibold mb-1">Profile Image</h5>
                                            <div className="flex items-center space-x-3">
                                                <button type="button" onClick={handleFileUploadClick} className="btn bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700">
                                                    Upload New 
                                                </button>
                                                {/* Hidden File Input (Replaces asp:FileUpload) */}
                                                <input 
                                                    type="file" 
                                                    id="profile-image-upload" 
                                                    className="hidden upload" 
                                                    onChange={handleFileChange} 
                                                    accept=".jpg,.png,.jpeg"
                                                />
                                                <button type="button" className="btn text-red-500 hover:text-red-700 text-sm">
                                                    Remove
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">Your Image should Below 4 MB, Accepted format jpg,png,jpeg</p>
                                        </div>
                                    </div>
                                    
                                    {/* Information Section */}
                                    <div className="setting-title border-b pb-3 mb-4">
                                        <h5 className="text-xl font-semibold">Information</h5>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Name */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* Specialization */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Specialization <span className="text-red-500">*</span></label>
                                            <input type="text" name="specialist" value={formData.specialist} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* Qualification */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Qualification<span className="text-red-500">*</span></label>
                                            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* Experience */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Experience <span className="text-red-500">*</span></label>
                                            <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* Email */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* Phone */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Phone<span className="text-red-500">*</span></label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* Age */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Age <span className="text-red-500">*</span></label>
                                            <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* Gender */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
                                            <select name="gender" value={formData.gender} onChange={handleChange} className="form-select w-full border-gray-300 rounded-md shadow-sm mt-1 p-2.5" required>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                        {/* Bio */}
                                        <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                            <div className="form-wrap">
                                                <label className="col-form-label block text-sm font-medium text-gray-700">Bio <span className="text-red-500">*</span></label>
                                                <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" className="form-textarea w-full border-gray-300 rounded-md shadow-sm mt-1" required></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Section */}
                                    <div className="setting-title border-b pb-3 pt-6 mb-4">
                                        <h5 className="text-xl font-semibold">Address</h5>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {/* Address */}
                                        <div className="lg:col-span-4">
                                            <div className="form-wrap">
                                                <label className="col-form-label block text-sm font-medium text-gray-700">Address<span className="text-red-500">*</span></label>
                                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                            </div>
                                        </div>
                                        {/* City */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">City<span className="text-red-500">*</span></label>
                                            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* State */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">State<span className="text-red-500">*</span></label>
                                            <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* Country */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Country<span className="text-red-500">*</span></label>
                                            <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                        {/* Pincode */}
                                        <div className="form-wrap">
                                            <label className="col-form-label block text-sm font-medium text-gray-700">Pincode<span className="text-red-500">*</span></label>
                                            <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} className="form-input w-full border-gray-300 rounded-md shadow-sm mt-1" required />
                                        </div>
                                    </div>
                                    
                                    {/* Buttons */}
                                    <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
                                        <button type="button" onClick={handleCancel} className="btn bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}