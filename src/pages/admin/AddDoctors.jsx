
'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faTable,
  faFile,
  faPencil,
  faCircleInfo,
  faCircleUser,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Assuming fe-times is meant to be fa-times/xmark

// Mock Sidebar data for React mapping
const adminSidebarLinks = [
  { href: 'Dashboard.aspx', icon: faHome, label: 'Dashboard', isSubmenu: false },
  { href: 'PatientList.aspx', icon: faUser, label: 'Patient List', isSubmenu: false },
  {
    label: 'Doctors',
    icon: faUserPlus,
    isSubmenu: true,
    active: true,
    sublinks: [
      { href: 'DoctorList.aspx', label: 'Doctor List' },
      { href: 'AddDoctors.aspx', label: 'Add Doctor', active: true },
    ],
  },
  { href: 'Appointments.aspx', icon: faTable, label: 'Appointments', isSubmenu: false },
  {
    label: 'Medicines',
    icon: faFile,
    isSubmenu: true,
    active: true,
    sublinks: [
      { href: 'AddMedicine.aspx', label: 'Add Medicine' },
      { href: 'Medicines.aspx', label: 'Medicines' },
    ],
  },
  { href: 'AddDoctorSchedule.aspx', icon: faTable, label: 'Add Schedule', isSubmenu: false },
  { href: 'EditDoctorSchedule.aspx', icon: faPencil, label: 'Edit Schedule', isSubmenu: false },
  { href: 'Profile.aspx', icon: faUserPlus, label: 'Profile', isSubmenu: false },
];

const AdminAddDoctors = () => {
  // State for all form inputs
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    Gender: '',
    Email: '',
    MobileNo: '',
    Specialist: '',
    Qualification: '',
    Experience: '',
    ConsultationFee: '',
    Address: '',
    Country: '',
    State: '',
    City: '',
    Pincode: '',
    FileUpload1: null,
    Bio: '',
    CreatePassword: '',
    ConfirmPassword: '',
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('oneA');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Tailwind classes mapping:
  const formControlClass = 'form-control w-full p-2 border border-gray-300 rounded-md';
  const errorTextClass = 'text-red-500 text-xs mt-1';
  const navLinkColor = '#5bc0de';

  // Handler for all input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Validation Logic (Replaces ASP.NET Validators)
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'Name',
      'Age',
      'Email',
      'MobileNo',
      'Specialist',
      'Qualification',
      'Experience',
      'ConsultationFee',
      'Address',
      'Country',
      'State',
      'City',
      'Pincode',
      'FileUpload1',
      'Bio',
      'CreatePassword',
      'ConfirmPassword',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} required`;
      }
    });

    // Custom Gender Validation (Replaces CustomValidator1)
    if (!formData.Gender) {
      newErrors.Gender = 'Select a gender';
    }

    // Password match validation
    if (formData.CreatePassword && formData.ConfirmPassword && formData.CreatePassword !== formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Passwords do not match';
    }
    
    // Simple Email validation
    if (formData.Email && !/\S+@\S+\.\S+/.test(formData.Email)) {
        newErrors.Email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission Handler (Replaces OnClick="Add_Doctor")
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid. Submitting data:', formData);
      // Actual API call or data submission logic goes here
      alert('Doctor Profile Created (Mock Submission)');
    } else {
      console.log('Form has errors:', errors);
      alert('Please fill all required fields correctly.');
    }
  };

  return (
    <>
      <Head>
        <title>Add Doctor - Doccure Admin</title>
      </Head>

      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <div className="sidebar fixed w-64 bg-white shadow-lg h-full overflow-y-auto z-10 hidden md:block">
          <div className="sidebar-inner h-full">
            <div className="p-4" id="sidebar-menu">
              <ul className="space-y-1">
                {adminSidebarLinks.map((item) => (
                  <li key={item.label}>
                    {item.isSubmenu ? (
                      // Submenu structure (simplified display logic)
                      <div className="group">
                        <button
                          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition ${
                            item.active ? 'bg-gray-100 text-gray-800' : 'text-gray-600'
                          }`}
                        >
                          <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                          <span>{item.label}</span>
                          <span className="ml-auto text-sm">►</span>
                        </button>
                        <ul className={`ml-4 mt-1 space-y-1 ${item.active ? 'block' : 'hidden group-hover:block'}`}>
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
                          item.active ? 'bg-gray-100 text-gray-800' : 'text-gray-600'
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
        <div className="page-wrapper flex-1 md:ml-64 bg-gray-50 p-4">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header mb-6">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full sm:w-auto">
                  <h3 className="text-2xl font-bold mb-1">Add Doctor</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li>
                      <a href="Dashboard.aspx" className="hover:text-blue-600">
                        Dashboard /
                      </a>
                    </li>
                    <li className="text-gray-800 font-semibold"> Add Doctor</li>
                  </ul>
                </div>
                <div className="w-full sm:w-auto mt-4 sm:mt-0">
                  <a href="AddDoctorSchedule.aspx" className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                    Add Doctor Schedule
                  </a>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-sm-12 w-full">
                <div className="row">
                  <div className="w-full">
                    <div className="bg-white shadow-lg rounded-lg">
                      <div className="p-6">
                        {/* Custom tabs starts */}
                        <div className="custom-tabs-container">
                          {/* Nav tabs starts */}
                          <ul className="flex border-b border-gray-200" id="customTab2" role="tablist">
                            {[
                              { id: 'oneA', icon: faCircleInfo, label: 'Personal Details' },
                              { id: 'twoA', icon: faCircleUser, label: 'Profile and Bio' },
                              { id: 'fourA', icon: faLock, label: 'Create Password' },
                            ].map((tab) => (
                              <li key={tab.id} className="nav-item">
                                <button
                                  id={`tab-${tab.id}`}
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
                                    <label className="block text-sm font-medium mb-1">
                                      Doctor Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="Name"
                                      value={formData.Name}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.Name && <p className={errorTextClass}>{errors.Name}</p>}
                                  </div>
                                  {/* Age */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Age <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="Age"
                                      value={formData.Age}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.Age && <p className={errorTextClass}>{errors.Age}</p>}
                                  </div>
                                  {/* Gender */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Gender<span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex justify-around items-center w-full mt-2">
                                      {['Male', 'Female', 'Other'].map((gender) => (
                                        <label
                                          key={gender}
                                          className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                                        >
                                          <input
                                            type="radio"
                                            name="Gender"
                                            value={gender}
                                            checked={formData.Gender === gender}
                                            onChange={(e) => setFormData({ ...formData, Gender: e.target.value })}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                          />
                                          <span className="text-base">{gender}</span>
                                        </label>
                                      ))}
                                    </div>
                                    {errors.Gender && <p className={errorTextClass}>{errors.Gender}</p>}
                                  </div>
                                  {/* Email ID */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Email ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="email"
                                      name="Email"
                                      value={formData.Email}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.Email && <p className={errorTextClass}>{errors.Email}</p>}
                                  </div>
                                  {/* Mobile Number */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Mobile Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="MobileNo"
                                      value={formData.MobileNo}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.MobileNo && <p className={errorTextClass}>{errors.MobileNo}</p>}
                                  </div>
                                  {/* Specialist */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Specialist <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="Specialist"
                                      value={formData.Specialist}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.Specialist && <p className={errorTextClass}>{errors.Specialist}</p>}
                                  </div>
                                  {/* Qualification */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Qualification <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="Qualification"
                                      value={formData.Qualification}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.Qualification && <p className={errorTextClass}>{errors.Qualification}</p>}
                                  </div>
                                  {/* Experience */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Experience <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="Experience"
                                      value={formData.Experience}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.Experience && <p className={errorTextClass}>{errors.Experience}</p>}
                                  </div>
                                  {/* Consultation Fee */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Consultation Fee <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="ConsultationFee"
                                      value={formData.ConsultationFee}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.ConsultationFee && <p className={errorTextClass}>{errors.ConsultationFee}</p>}
                                  </div>
                                  {/* Address */}
                                  <div className="w-full lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Address <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                      name="Address"
                                      value={formData.Address}
                                      onChange={handleChange}
                                      className={`${formControlClass} h-[83px]`}
                                    ></textarea>
                                    {errors.Address && <p className={errorTextClass}>{errors.Address}</p>}
                                  </div>
                                  {/* Country */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="Country"
                                      value={formData.Country}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.Country && <p className={errorTextClass}>{errors.Country}</p>}
                                  </div>
                                  {/* State */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      State <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="State"
                                      value={formData.State}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.State && <p className={errorTextClass}>{errors.State}</p>}
                                  </div>
                                  {/* City */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="City"
                                      value={formData.City}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.City && <p className={errorTextClass}>{errors.City}</p>}
                                  </div>
                                  {/* Postal Code */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Postal Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="Pincode"
                                      value={formData.Pincode}
                                      onChange={handleChange}
                                      className={formControlClass}
                                    />
                                    {errors.Pincode && <p className={errorTextClass}>{errors.Pincode}</p>}
                                  </div>
                                </div>
                              </div>

                              {/* Tab 2: Profile and Bio */}
                              <div
                                id="twoA"
                                className={`transition-opacity duration-300 ${activeTab === 'twoA' ? 'block' : 'hidden'}`}
                                role="tabpanel"
                              >
                                <div className="flex flex-wrap -mx-3">
                                  {/* Upload Section */}
                                  <div className="w-full px-3 text-center mb-6">
                                    <div className="mb-3">
                                      <div className="border border-gray-300 rounded-md p-8 bg-gray-50 text-center shadow-sm">
                                        <div className="text-gray-600 font-semibold mb-2">
                                          Upload Photo <span className="text-red-500">*</span>
                                        </div>
                                        <input
                                          type="file"
                                          name="FileUpload1"
                                          onChange={handleChange}
                                          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                      </div>
                                    </div>
                                    {errors.FileUpload1 && <p className={errorTextClass}>{errors.FileUpload1}</p>}
                                  </div>

                                  {/* Bio Section */}
                                  <div className="w-full px-3">
                                    <div className="mb-3">
                                      <label className="block text-sm font-medium mb-1">
                                        About <span className="text-red-500">*</span>
                                      </label>
                                      <textarea
                                        name="Bio"
                                        value={formData.Bio}
                                        onChange={handleChange}
                                        className={`${formControlClass} shadow-sm h-32`}
                                      ></textarea>
                                      {errors.Bio && <p className={errorTextClass}>{errors.Bio}</p>}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Tab 3: Create Password */}
                              <div
                                id="fourA"
                                className={`transition-opacity duration-300 ${activeTab === 'fourA' ? 'block' : 'hidden'}`}
                                role="tabpanel"
                              >
                                <div className="flex flex-wrap -mx-3">
                                  {/* Create Password */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Create Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex items-center">
                                      <input
                                        type={showPassword1 ? 'text' : 'password'}
                                        name="CreatePassword"
                                        value={formData.CreatePassword}
                                        onChange={handleChange}
                                        className={`${formControlClass} pr-10`}
                                      />
                                      <span
                                        onClick={() => setShowPassword1(!showPassword1)}
                                        className="absolute right-0 inset-y-0 flex items-center px-3 cursor-pointer text-gray-800"
                                      >
                                        <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} className="w-4 h-4" />
                                      </span>
                                    </div>
                                    {errors.CreatePassword && <p className={errorTextClass}>{errors.CreatePassword}</p>}
                                  </div>
                                  {/* Confirm Password */}
                                  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                      Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex items-center">
                                      <input
                                        type={showPassword2 ? 'text' : 'password'}
                                        name="ConfirmPassword"
                                        value={formData.ConfirmPassword}
                                        onChange={handleChange}
                                        className={`${formControlClass} pr-10`}
                                      />
                                      <span
                                        onClick={() => setShowPassword2(!showPassword2)}
                                        className="absolute right-0 inset-y-0 flex items-center px-3 cursor-pointer text-gray-800"
                                      >
                                        <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} className="w-4 h-4" />
                                      </span>
                                    </div>
                                    {errors.ConfirmPassword && <p className={errorTextClass}>{errors.ConfirmPassword}</p>}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Card actions starts */}
                            <div className="flex space-x-2 justify-end mt-6 border-t pt-4">
                              <a href="AddDoctors.aspx" className="btn bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition">
                                Cancel
                              </a>
                              <button
                                type="submit"
                                className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                              >
                                Create Doctor Profile
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

export default AdminAddDoctors;