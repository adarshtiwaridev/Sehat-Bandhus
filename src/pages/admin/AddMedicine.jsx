// components/AdminAddMedicine.jsx
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
} from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
    active: true,
    sublinks: [
      { href: 'AddMedicine.aspx', label: 'Add Medicine', active: true },
      { href: 'Medicines.aspx', label: 'Medicines' },
    ],
  },
  { href: 'AddDoctorSchedule.aspx', icon: faCalendarCheck, label: 'Add Schedule', active: false },
  { href: 'EditDoctorSchedule.aspx', icon: faPencil, label: 'Edit Schedule', active: false },
  { href: 'Profile.aspx', icon: faUserPlus, label: 'Profile', active: false },
];

const AdminAddMedicine = () => {
  const [formData, setFormData] = useState({
    MedicineName: '',
    Composition: '',
  });
  const [errors, setErrors] = useState({});
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: true });

  // Tailwind CSS Class Mapping
  const formControlClass = 'form-control w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500';
  const errorTextClass = 'text-red-500 text-xs mt-1';
  const buttonPrimaryClass = 'bg-blue-600 text-white hover:bg-blue-700 transition duration-150 py-2 px-4 rounded-md font-semibold';
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';

  // --- Handlers ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change if it exists
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.MedicineName.trim()) {
      newErrors.MedicineName = 'Medicine name is required';
    }
    if (!formData.Composition.trim()) {
      newErrors.Composition = 'Composition is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form is valid. Submitting data:', formData);
      // Actual API call or data submission logic goes here
      alert(`Medicine Added: ${formData.MedicineName} (Mock Submission)`);
      // Reset form
      setFormData({ MedicineName: '', Composition: '' });
    } else {
      console.log('Form has errors:', errors);
    }
  };

  return (
    <>
      <Head>
        <title>Add Medicine - Admin</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50 pt-16">
        {/* Sidebar (Fixed width for Admin dashboard layout) */}
        <div className="sidebar fixed w-64 bg-white shadow-lg h-full overflow-y-auto z-10 hidden md:block">
          <div className="sidebar-inner h-full">
            <div className="p-4" id="sidebar-menu">
              <ul className="space-y-1">
                {adminSidebarLinks.map((item) => (
                  <li key={item.label}>
                    {item.isSubmenu ? (
                      <div>
                        <button
                          onClick={() => setShowSubmenu(prev => ({ ...prev, [item.label]: !prev[item.label] }))}
                          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition ${
                            item.active || item.sublinks.some(sub => sub.active) ? 'bg-gray-100 text-gray-800' : 'text-gray-600'
                          }`}
                        >
                          <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                          <span>{item.label}</span>
                          <FontAwesomeIcon icon={faChevronDown} className={`ml-auto w-3 h-3 transition-transform ${showSubmenu[item.label] ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`ml-4 mt-1 space-y-1 ${showSubmenu[item.label] ? 'block' : 'hidden'}`}>
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
                  <h3 className="text-2xl font-bold mb-1">Add Product</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li className="breadcrumb-item"><a href="index.html" className="hover:text-blue-600">Dashboard</a></li>
                    <li className="breadcrumb-item active text-gray-800 font-semibold">Add Product</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
                        
            <div className="row">
              <div className="col-sm-12 w-full">
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-6">
                    <form onSubmit={handleSubmit}>
                      {/* Add Medicine Form */}
                      
                      {/* Hidden field is not needed in React for state */}
                      <div className="mb-6">
                        <div className="flex flex-wrap -mx-3">
                          
                          {/* Medicine Name */}
                          <div className="w-full lg:w-1/2 px-3 mb-4">
                            <div className="mb-3">
                              <label className="block text-sm font-medium mb-1">
                                Medicine Name<span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="MedicineName"
                                value={formData.MedicineName}
                                onChange={handleChange}
                                className={formControlClass}
                              />
                              {errors.MedicineName && <p className={errorTextClass}>{errors.MedicineName}</p>}
                            </div>
                          </div>
                          
                          {/* Composition */}
                          <div className="w-full lg:w-1/2 px-3 mb-4">
                            <div className="mb-3">
                              <label className="block text-sm font-medium mb-1">
                                Composition <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="Composition"
                                value={formData.Composition}
                                onChange={handleChange}
                                className={formControlClass}
                              />
                              {errors.Composition && <p className={errorTextClass}>{errors.Composition}</p>}
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      
                      {/* Submit Section */}
                      <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                          type="submit"
                          className={buttonPrimaryClass}
                        >
                          Add Medicine
                        </button>
                      </div>
                    </form>
                    {/* /Add Medicine */}
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

export default AdminAddMedicine;