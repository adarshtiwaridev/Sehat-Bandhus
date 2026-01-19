// components/AdminProfile.jsx
'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faCalendarCheck,
  faBookMedical,
  faPencil,
  faChevronDown,
  faLocationDot,
  faEdit,
  faEye,
  faEyeSlash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

// --- Mock Data ---

// Sidebar Navigation
const adminSidebarLinks = [
  { href: 'Dashboard.aspx', icon: faHome, label: 'Dashboard', active: false },
  { href: 'PatientList.aspx', icon: faUser, label: 'Patient List', active: false },
  {
    label: 'Doctors',
    icon: faUserPlus,
    isSubmenu: true,
    sublinks: [
      { href: 'DoctorList.aspx', label: 'Doctor List' },
      { href: 'AddDoctors.aspx', label: 'Add Doctor' },
    ],
  },
  { href: 'Appointments.aspx', icon: faCalendarCheck, label: 'Appointments', active: false },
  {
    label: 'Medicines',
    icon: faBookMedical,
    isSubmenu: true,
    sublinks: [
      { href: 'AddMedicine.aspx', label: 'Add Medicine' },
      { href: 'Medicines.aspx', label: 'Medicines' },
    ],
  },
  { href: 'AddDoctorSchedule.aspx', icon: faCalendarCheck, label: 'Add Schedule', active: false },
  { href: 'EditDoctorSchedule.aspx', icon: faPencil, label: 'Edit Schedule', active: false },
  { href: 'Profile.aspx', icon: faUser, label: 'Profile', active: true },
];

// Mock Admin Profile Data
const mockAdmin = {
  AdminImage: '/path/to/admin_profile.jpg',
  Name: 'Michael P. Williams',
  Email: 'admin@clinic.com',
  Address: '123 Admin Tower',
  City: 'New Delhi',
  State: 'Delhi',
  Pincode: '110001',
  Country: 'India',
  Bio: 'Clinic Administrator responsible for managing doctor and patient data.',
  DOB: '1985-06-15',
  Mobile: '98765 43210',
};

// --- Main Component ---

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('per_details_tab');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: false });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [profileData, setProfileData] = useState(mockAdmin);
  const [passwordForm, setPasswordForm] = useState({});
  const [errors, setErrors] = useState({});

  // Tailwind CSS Class Mapping & Custom Styles
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const navLinkColor = '#5bc0de';
  
  // Custom input group styling approximations
  const inputGroupTextClass = 'bg-white border border-[#00d0f1] text-gray-800 cursor-pointer';
  const formControlClass = 'form-control border-r-0 border border-gray-300 rounded-l-md p-2 focus:ring-0 focus:outline-none';
  const inputContainerClass = 'flex w-full items-center border border-[#00d0f1] rounded-md';

  const handleToggleSubmenu = (label) => {
    setShowSubmenu(prev => ({ ...prev, [label]: !prev[label] }));
  };
  
  // Handler for Profile Edit Form inputs
  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData(prev => ({ 
        ...prev, 
        [name]: files ? files[0] : value 
    }));
  };

  // Handler for Password Form inputs
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  // Mock Password Change Submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    if (!passwordForm.oldPassword) newErrors.oldPassword = "Old Password required";
    if (!passwordForm.newPassword) newErrors.newPassword = "New Password required";
    if (!passwordForm.confirmPassword) newErrors.confirmPassword = "Confirm Password required";

    if (passwordForm.newPassword && passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "New and Confirm Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Password change failed due to validation errors.');
    } else {
      console.log('Password change initiated:', passwordForm);
      alert('Password updated successfully (Mock action).');
      setPasswordForm({});
    }
  };
  
  // Mock Profile Update Submission
  const handleProfileUpdate = (e) => {
      e.preventDefault();
      // In a real app, this would send formData to the backend
      console.log("Updating admin profile:", profileData);
      setIsEditModalOpen(false);
      alert('Profile updated successfully (Mock action).');
  };

  const formattedDOB = profileData.DOB ? new Date(profileData.DOB).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : '';
  
  // --- Edit Profile Modal Component ---
  const EditPersonalDetailsModal = () => {
    if (!isEditModalOpen) return null;

    return (
      <div className="fixed inset-0 z-[1050] bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
        <div className="modal-dialog modal-dialog-centered max-w-lg w-full m-4" role="document">
          <div className="bg-white rounded-lg shadow-xl p-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <h5 className="text-xl font-semibold">Personal Details</h5>
              <button type="button" className="text-gray-500 hover:text-gray-900" onClick={() => setIsEditModalOpen(false)} aria-label="Close">
                <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleProfileUpdate}>
              <div className="modal-body py-4">
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full sm:w-1/2 px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" name="Name" value={profileData.Name} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">DOB</label>
                    <input type="date" name="DOB" value={profileData.DOB} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">Email ID</label>
                    <input type="email" name="Email" value={profileData.Email} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">Mobile</label>
                    <input type="text" name="Mobile" value={profileData.Mobile} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-full px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">Upload Image</label>
                    <input type="file" name="FileUpload1" onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-full px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea name="Bio" value={profileData.Bio} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md h-20"></textarea>
                  </div>
                  <div className="w-full px-2">
                    <h5 className="text-lg font-semibold mt-2 mb-3 border-b pb-1">Address</h5>
                  </div>
                  <div className="w-full px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input type="text" name="Address" value={profileData.Address} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input type="text" name="City" value={profileData.City} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input type="text" name="State" value={profileData.State} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                    <input type="text" name="Pincode" value={profileData.Pincode} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="w-full sm:w-1/2 px-2 mb-3">
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input type="text" name="Country" value={profileData.Country} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Admin Profile</title>
      </Head>

      <EditPersonalDetailsModal />

      <div className="flex min-h-screen bg-gray-50 pt-16">
        {/* Sidebar */}
        <div className="sidebar fixed w-64 bg-white shadow-lg h-full overflow-y-auto z-10 hidden md:block">
          <div className="sidebar-inner h-full">
            <div className="p-4" id="sidebar-menu">
              <ul className="space-y-1">
                {adminSidebarLinks.map((item) => (
                  <li key={item.label}>
                    {item.isSubmenu ? (
                      <div>
                        <button
                          onClick={() => handleToggleSubmenu(item.label)}
                          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition ${
                            item.active || showSubmenu[item.label] ? sidebarActiveClass : 'text-gray-600'
                          }`}
                        >
                          <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                          <span>{item.label}</span>
                          <FontAwesomeIcon icon={faChevronDown} className={`ml-auto w-3 h-3 transition-transform ${showSubmenu[item.label] ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`ml-4 mt-1 space-y-1 ${item.label === 'Medicines' ? 'block' : 'hidden'}`}>
                          {item.sublinks.map((sublink) => (
                            <li key={sublink.label}>
                              <a
                                href={sublink.href}
                                className={`block p-2 rounded-lg hover:bg-blue-50 transition ${
                                  sublink.active ? 'text-blue-600 font-semibold' : 'text-gray-600'
                                }`}
                              >
                                {sublink.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className={`flex items-center p-3 rounded-lg hover:bg-gray-100 transition ${
                          item.active ? sidebarActiveClass : 'text-gray-600'
                        }`}
                      >
                        <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                        <span>{item.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* /Sidebar */}

        {/* Page Wrapper */}
        <div className="page-wrapper flex-1 md:ml-64 p-4">
          <div className="content container-fluid">
            
            {/* Page Header */}
            <div className="page-header mb-6">
              <div className="flex flex-wrap items-center">
                <div className="w-full">
                  <h3 className="text-2xl font-bold mb-1">Profile</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="Dashboard.aspx" className="hover:text-blue-600">Dashboard /</a></li>
                    <li className="text-gray-800 font-semibold">&nbsp; Profile</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            
            <div className="row">
              <div className="col-md-12 w-full">
                {/* Profile Header */}
                <div className="profile-header bg-white shadow-lg rounded-t-lg p-6 mb-4 border-b">
                  <div className="flex items-center space-x-4">
                    <div className="profile-image w-24 h-24 flex-shrink-0">
                      <a href="#">
                        <img src={profileData.AdminImage} className="w-full h-full object-cover rounded-full border border-gray-200" alt="Admin Image" />
                      </a>
                    </div>
                    <div className="profile-user-info">
                      <h4 className="text-xl font-bold text-gray-900 mb-0">{profileData.Name}</h4>
                      <h6 className="text-sm text-gray-500 mb-1">{profileData.Email}</h6>
                      <div className="text-sm text-gray-700 mb-1">
                        <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 mr-1" />
                        {profileData.Address}
                      </div>
                      <div className="text-sm text-gray-600">{profileData.Bio}</div>
                    </div>
                  </div>
                </div>

                {/* Profile Menu Tabs */}
                <div className="profile-menu">
                  <ul className="nav nav-tabs nav-tabs-solid flex border-b border-gray-200 list-none p-0 mb-4">
                    <li className="nav-item">
                      <button onClick={() => setActiveTab('per_details_tab')} className={`block py-3 px-4 text-sm font-medium border-b-2 transition ${activeTab === 'per_details_tab' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}>
                        About
                      </button>
                    </li>
                    <li className="nav-item">
                      <button onClick={() => setActiveTab('password_tab')} className={`block py-3 px-4 text-sm font-medium border-b-2 transition ${activeTab === 'password_tab' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}>
                        Password
                      </button>
                    </li>
                  </ul>
                </div>
                
                <div className="tab-content profile-tab-cont">
                  {/* Tab 1: Personal Details (About) */}
                  <div id="per_details_tab" className={`transition-opacity duration-300 ${activeTab === 'per_details_tab' ? 'block' : 'hidden'}`}>
                    <div className="row">
                      <div className="col-lg-12 w-full">
                        <div className="card bg-white shadow-md rounded-lg">
                          <div className="card-body p-6">
                            <h5 className="text-lg font-semibold mb-3 flex justify-between items-center border-b pb-2">
                              <span>Personal Details</span> 
                              <button onClick={() => setIsEditModalOpen(true)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                <FontAwesomeIcon icon={faEdit} className="w-3 h-3 mr-1" />Edit
                              </button>
                            </h5>
                            <div className="space-y-1">
                              <div className="flex border-b border-gray-100 py-2">
                                <p className="w-1/3 text-sm text-gray-500">Name</p>
                                <p className="w-2/3 text-sm font-medium text-gray-800">{profileData.Name}</p>
                              </div>
                              <div className="flex border-b border-gray-100 py-2">
                                <p className="w-1/3 text-sm text-gray-500">Date of Birth</p>
                                <p className="w-2/3 text-sm font-medium text-gray-800">{formattedDOB}</p>
                              </div>
                              <div className="flex border-b border-gray-100 py-2">
                                <p className="w-1/3 text-sm text-gray-500">Email ID</p>
                                <p className="w-2/3 text-sm font-medium text-gray-800">{profileData.Email}</p>
                              </div>
                              <div className="flex border-b border-gray-100 py-2">
                                <p className="w-1/3 text-sm text-gray-500">Mobile</p>
                                <p className="w-2/3 text-sm font-medium text-gray-800">{profileData.Mobile}</p>
                              </div>
                              <div className="flex pt-2">
                                <p className="w-1/3 text-sm text-gray-500">Address</p>
                                <p className="w-2/3 text-sm font-medium text-gray-800">
                                  {profileData.Address}<br />
                                  {profileData.City},<br />
                                  {profileData.State} - {profileData.Pincode},<br />
                                  {profileData.Country}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Personal Details Tab */}
                  
                  {/* Tab 2: Change Password */}
                  <div id="password_tab" className={`transition-opacity duration-300 ${activeTab === 'password_tab' ? 'block' : 'hidden'}`}>
                    <div className="card bg-white shadow-md rounded-lg">
                      <div className="card-body p-6">
                        <h5 className="text-lg font-semibold mb-4 border-b pb-2">Change Password</h5>
                        <form onSubmit={handlePasswordSubmit}>
                          <div className="row">
                            <div className="col-md-10 col-lg-6 w-full lg:w-1/2">
                              {/* Old Password */}
                              <div className="mb-3">
                                <label className="block text-sm font-medium mb-1">Old Password</label>
                                <div className={inputContainerClass}>
                                  <input 
                                    type={showPassword1 ? 'text' : 'password'}
                                    name="oldPassword"
                                    value={passwordForm.oldPassword || ''}
                                    onChange={handlePasswordChange}
                                    className={`${formControlClass} border-none`}
                                  />
                                  <span onClick={() => setShowPassword1(!showPassword1)} className={`w-10 h-10 flex items-center justify-center cursor-pointer border-l ${inputGroupTextClass}`}>
                                    <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} className="w-4 h-4 text-gray-800" />
                                  </span>
                                </div>
                                {errors.oldPassword && <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>}
                              </div>

                              {/* New Password */}
                              <div className="mb-3">
                                <label className="block text-sm font-medium mb-1">New Password</label>
                                <div className={inputContainerClass}>
                                  <input 
                                    type={showPassword2 ? 'text' : 'password'}
                                    name="newPassword"
                                    value={passwordForm.newPassword || ''}
                                    onChange={handlePasswordChange}
                                    className={`${formControlClass} border-none`}
                                  />
                                  <span onClick={() => setShowPassword2(!showPassword2)} className={`w-10 h-10 flex items-center justify-center cursor-pointer border-l ${inputGroupTextClass}`}>
                                    <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} className="w-4 h-4 text-gray-800" />
                                  </span>
                                </div>
                                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                              </div>

                              {/* Confirm Password */}
                              <div className="mb-3">
                                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                                <div className={inputContainerClass}>
                                  <input 
                                    type={showPassword3 ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword || ''}
                                    onChange={handlePasswordChange}
                                    className={`${formControlClass} border-none`}
                                  />
                                  <span onClick={() => setShowPassword3(!showPassword3)} className={`w-10 h-10 flex items-center justify-center cursor-pointer border-l ${inputGroupTextClass}`}>
                                    <FontAwesomeIcon icon={showPassword3 ? faEyeSlash : faEye} className="w-4 h-4 text-gray-800" />
                                  </span>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                              </div>

                              <button type="submit" className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mt-2">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* /Change Password Tab */}
                </div>
              </div>
            </div>
            
          </div> 
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default AdminProfile;