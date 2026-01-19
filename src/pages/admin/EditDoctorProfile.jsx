// components/AdminEditDoctorProfile.jsx
'use client';

import React, { useState, useEffect } from 'react';
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
  faCircleInfo,
  faCircleUser,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

// --- Mock Data ---

// Sidebar Navigation (Same as previous Admin components)
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
  { href: 'Profile.aspx', icon: faUser, label: 'Profile', active: false },
];

// Mock Doctor Data for Editing (pre-filled form)
const mockDoctorData = {
  DoctorId: 101,
  DoctorImage: '/path/to/doctor_profile.jpg',
  Name: 'Dr. Evelyn Reed',
  Age: 38,
  Gender: 'Female',
  Email: 'evelyn.r@clinic.com',
  MobileNo: '9999999999',
  Specialist: 'Pediatrics',
  Qualification: 'MBBS, MD (Pediatrics)',
  Experience: 10,
  ConsultationFee: 950,
  Address: '456 Oak Lane',
  Country: 'India',
  State: 'Maharashtra',
  City: 'Mumbai',
  Pincode: '400001',
  Bio: 'Highly dedicated pediatrician with a focus on child development and preventative care.',
};

// --- Main Component ---

const AdminEditDoctorProfile = () => {
  const [formData, setFormData] = useState(mockDoctorData);
  const [activeTab, setActiveTab] = useState('oneA');
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: true });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [errors, setErrors] = useState({});

  // Tailwind classes mapping:
  const formControlClass = 'form-control w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500';
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const navLinkColor = '#5bc0de';

  // Handler for all input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: ''}));
    }
  };
  
  // Mock validation for demonstration
  const validateForm = () => {
    const newErrors = {};
    
    if (activeTab === 'oneA') {
        const requiredFields = ['Name', 'Age', 'Email', 'MobileNo', 'Specialist', 'Experience', 'ConsultationFee', 'Address', 'Country', 'State', 'City', 'Pincode'];
        requiredFields.forEach(field => {
            if (!formData[field]) newErrors[field] = 'Required';
        });
    } else if (activeTab === 'twoA') {
        if (!formData.Bio) newErrors.Bio = 'Bio is required';
        // File upload check skipped for simplicity
    } else if (activeTab === 'fourA') {
        if (formData.NewPassword && formData.NewPassword !== formData.ConfirmPassword) {
            newErrors.ConfirmPassword = 'Passwords do not match';
        }
        if (formData.PreviousPassword && (!formData.NewPassword || !formData.ConfirmPassword)) {
            newErrors.NewPassword = 'New password and confirm password are required to change password.';
        }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission Handler (Replaces OnClick="EditDoctorProfile")
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid. Submitting update for Doctor ID:', formData.DoctorId, formData);
      alert('Doctor Profile Updated (Mock Submission)');
    } else {
      console.log('Form validation failed.');
      alert('Please check all fields in the active tab.');
    }
  };

  const handleToggleSubmenu = (label) => {
    setShowSubmenu(prev => ({ ...prev, [label]: !prev[label] }));
  };


  return (
    <>
      <Head>
        <title>Edit Doctor Profile - Admin</title>
      </Head>

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
                        <ul className={`ml-4 mt-1 space-y-1 ${showSubmenu[item.label] || item.label === 'Medicines' ? 'block' : 'hidden'}`}>
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
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full sm:w-auto">
                  <h3 className="text-2xl font-bold mb-1">Edit Doctor Profile</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="Dashboard.aspx" className="hover:text-blue-600">Dashboard /</a></li>
                    <li className="text-gray-800 font-semibold">&nbsp; Edit Doctor Profile</li>
                  </ul>
                </div>
                <div className="w-full sm:w-auto mt-4 sm:mt-0">
                  <a href="EditDoctorSchedule.aspx" className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                    Edit Doctor Schedule
                  </a>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            
            <div className="row">
              <div className="col-sm-12 w-full">
                <div className="row">
                  <div className="col-xl-12 w-full">
                    <div className="card bg-white shadow-lg rounded-lg">
                      <div className="card-body p-6">
                        {/* Custom tabs starts */}
                        <div className="custom-tabs-container">
                          {/* Nav tabs starts */}
                          <ul className="flex border-b border-gray-200 list-none p-0" id="customTab2" role="tablist">
                            {[
                              { id: 'oneA', icon: faCircleInfo, label: 'Personal Details' },
                              { id: 'twoA', icon: faCircleUser, label: 'Profile and Bio' },
                              { id: 'fourA', icon: faLock, label: 'Account Details' },
                            ].map((tab) => (
                              <li key={tab.id} className="nav-item">
                                <button
                                  onClick={() => setActiveTab(tab.id)}
                                  className={`flex items-center py-3 px-4 text-sm font-medium border-b-2 transition ${
                                    activeTab === tab.id
                                      ? 'border-blue-500 text-blue-500'
                                      : 'border-transparent text-gray-500 hover:text-blue-400'
                                  }`}
                                  style={{ color: activeTab === tab.id ? navLinkColor : '' }}
                                  role="tab"
                                >
                                  <FontAwesomeIcon
                                    icon={tab.icon}
                                    className="w-3 h-3 mr-2"
                                    style={{ color: navLinkColor }}
                                  />
                                  {tab.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                          {/* Nav tabs ends */}

                          {/* Tab content starts */}
                          <form onSubmit={handleSubmit}>
                            <div className="tab-content pt-4">
                              {/* Tab 1: Personal Details */}
                              <div
                                id="oneA"
                                className={`transition-opacity duration-300 ${activeTab === 'oneA' ? 'block' : 'hidden'}`}
                                role="tabpanel"
                              >
                                <div className="flex flex-wrap -mx-3">
                                  {/* Doctor Name */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Doctor Name <span className="text-red-500">*</span></label>
                                    <input type="text" name="Name" value={formData.Name} onChange={handleChange} className={formControlClass} />
                                    {errors.Name && <p className="text-red-500 text-xs mt-1">{errors.Name}</p>}
                                  </div>
                                  {/* Age */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Age <span className="text-red-500">*</span></label>
                                    <input type="text" name="Age" value={formData.Age} onChange={handleChange} className={formControlClass} />
                                    {errors.Age && <p className="text-red-500 text-xs mt-1">{errors.Age}</p>}
                                  </div>
                                  {/* Gender (Replaced with a simple input for mock purposes, ideally a dropdown) */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Gender<span className="text-red-500">*</span></label>
                                    <input type="text" name="Gender" value={formData.Gender} onChange={handleChange} className={formControlClass} />
                                    {errors.Gender && <p className="text-red-500 text-xs mt-1">{errors.Gender}</p>}
                                  </div>
                                  {/* Email ID */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Email ID <span className="text-red-500">*</span></label>
                                    <input type="email" name="Email" value={formData.Email} onChange={handleChange} className={formControlClass} />
                                    {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email}</p>}
                                  </div>
                                  {/* Mobile Number */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Mobile Number <span className="text-red-500">*</span></label>
                                    <input type="text" name="MobileNo" value={formData.MobileNo} onChange={handleChange} className={formControlClass} />
                                    {errors.MobileNo && <p className="text-red-500 text-xs mt-1">{errors.MobileNo}</p>}
                                  </div>
                                  {/* Specialist */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Specialist<span className="text-red-500">*</span></label>
                                    <input type="text" name="Specialist" value={formData.Specialist} onChange={handleChange} className={formControlClass} />
                                    {errors.Specialist && <p className="text-red-500 text-xs mt-1">{errors.Specialist}</p>}
                                  </div>
                                  {/* Qualification */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Qualification</label>
                                    <input type="text" name="Qualification" value={formData.Qualification} onChange={handleChange} className={formControlClass} />
                                    {errors.Qualification && <p className="text-red-500 text-xs mt-1">{errors.Qualification}</p>}
                                  </div>
                                  {/* Experience */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Experience<span className="text-red-500">*</span></label>
                                    <input type="text" name="Experience" value={formData.Experience} onChange={handleChange} className={formControlClass} />
                                    {errors.Experience && <p className="text-red-500 text-xs mt-1">{errors.Experience}</p>}
                                  </div>
                                  {/* Consultation Fee */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Consultation Fee<span className="text-red-500">*</span></label>
                                    <input type="text" name="ConsultationFee" value={formData.ConsultationFee} onChange={handleChange} className={formControlClass} />
                                    {errors.ConsultationFee && <p className="text-red-500 text-xs mt-1">{errors.ConsultationFee}</p>}
                                  </div>
                                  {/* Address */}
                                  <div className="w-full lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <textarea name="Address" value={formData.Address} onChange={handleChange} className={`${formControlClass} h-24`}></textarea>
                                    {errors.Address && <p className="text-red-500 text-xs mt-1">{errors.Address}</p>}
                                  </div>
                                  {/* Country */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Country</label>
                                    <input type="text" name="Country" value={formData.Country} onChange={handleChange} className={formControlClass} />
                                    {errors.Country && <p className="text-red-500 text-xs mt-1">{errors.Country}</p>}
                                  </div>
                                  {/* State */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">State</label>
                                    <input type="text" name="State" value={formData.State} onChange={handleChange} className={formControlClass} />
                                    {errors.State && <p className="text-red-500 text-xs mt-1">{errors.State}</p>}
                                  </div>
                                  {/* City */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <input type="text" name="City" value={formData.City} onChange={handleChange} className={formControlClass} />
                                    {errors.City && <p className="text-red-500 text-xs mt-1">{errors.City}</p>}
                                  </div>
                                  {/* Postal Code */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                                    <input type="text" name="Pincode" value={formData.Pincode} onChange={handleChange} className={formControlClass} />
                                    {errors.Pincode && <p className="text-red-500 text-xs mt-1">{errors.Pincode}</p>}
                                  </div>
                                </div>
                              </div>

                              {/* Tab 2: Profile and Bio */}
                              <div
                                id="twoA"
                                className={`transition-opacity duration-300 ${activeTab === 'twoA' ? 'block' : 'hidden'}`}
                                role="tabpanel"
                              >
                                <div className="flex flex-wrap items-start -mx-3">
                                  {/* Doctor Image Preview */}
                                  <div className="w-full sm:w-1/4 px-3 text-center mb-4">
                                    <img 
                                      src={formData.DoctorImage} 
                                      className="img-fluid rounded shadow-sm border w-full max-h-44 object-cover mx-auto" 
                                      alt="Doctor Profile" 
                                    />
                                  </div>

                                  {/* Upload Section */}
                                  <div className="w-full sm:w-1/2 px-3 text-center sm:text-left mb-4">
                                    <div className="border border-gray-300 rounded p-5 bg-gray-50 shadow-sm">
                                      <div className="text-gray-600 font-semibold mb-2">
                                        Upload New Photo
                                      </div>
                                      <input 
                                        type="file" 
                                        name="DoctorImageFile" 
                                        onChange={handleChange} 
                                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                      />
                                    </div>
                                  </div>
                                  
                                  {/* Bio Section */}
                                  <div className="w-full px-3 mt-4">
                                    <label className="block text-sm font-bold mb-1">Bio</label>
                                    <textarea name="Bio" value={formData.Bio} onChange={handleChange} className={`${formControlClass} shadow-sm h-32`}></textarea>
                                    {errors.Bio && <p className="text-red-500 text-xs mt-1">{errors.Bio}</p>}
                                  </div>
                                </div>
                              </div>

                              {/* Tab 3: Account Details (Password Change) */}
                              <div
                                id="fourA"
                                className={`transition-opacity duration-300 ${activeTab === 'fourA' ? 'block' : 'hidden'}`}
                                role="tabpanel"
                              >
                                <div className="flex flex-wrap -mx-3">
                                  {/* Old Password */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Old Password</label>
                                    <div className="relative flex items-center">
                                      <input type={showPassword1 ? 'text' : 'password'} name="PreviousPassword" value={formData.PreviousPassword || ''} onChange={handleChange} className={`${formControlClass} pr-10`} />
                                      <span onClick={() => setShowPassword1(!showPassword1)} className="absolute right-0 inset-y-0 flex items-center px-3 cursor-pointer text-gray-800">
                                        <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} className="w-4 h-4" />
                                      </span>
                                    </div>
                                    {errors.PreviousPassword && <p className="text-red-500 text-xs mt-1">{errors.PreviousPassword}</p>}
                                  </div>
                                  {/* New Password */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">New Password</label>
                                    <div className="relative flex items-center">
                                      <input type={showPassword2 ? 'text' : 'password'} name="NewPassword" value={formData.NewPassword || ''} onChange={handleChange} className={`${formControlClass} pr-10`} />
                                      <span onClick={() => setShowPassword2(!showPassword2)} className="absolute right-0 inset-y-0 flex items-center px-3 cursor-pointer text-gray-800">
                                        <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} className="w-4 h-4" />
                                      </span>
                                    </div>
                                    {errors.NewPassword && <p className="text-red-500 text-xs mt-1">{errors.NewPassword}</p>}
                                  </div>
                                  {/* Confirm Password */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                                    <div className="relative flex items-center">
                                      <input type={showPassword3 ? 'text' : 'password'} name="ConfirmPassword" value={formData.ConfirmPassword || ''} onChange={handleChange} className={`${formControlClass} pr-10`} />
                                      <span onClick={() => setShowPassword3(!showPassword3)} className="absolute right-0 inset-y-0 flex items-center px-3 cursor-pointer text-gray-800">
                                        <FontAwesomeIcon icon={showPassword3 ? faEyeSlash : faEye} className="w-4 h-4" />
                                      </span>
                                    </div>
                                    {errors.ConfirmPassword && <p className="text-red-500 text-xs mt-1">{errors.ConfirmPassword}</p>}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Card actions starts */}
                            <div className="flex justify-between items-center mt-6 border-t pt-4">
                              <a href="DoctorList.aspx" className="btn bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition">
                                Back
                              </a>
                              <button
                                type="submit"
                                className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                              >
                                Update Doctor Profile
                              </button>
                            </div>
                            {/* Card actions ends */}
                          </form>
                          {/* Tab content ends */}
                        </div>
                        {/* Custom tabs ends */}
                      </div>
                    </div>
                  </div>
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

export default AdminEditDoctorProfile;