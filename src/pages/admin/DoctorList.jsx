// components/AdminDoctorList.jsx
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
  faTrash,
  faEye,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faEye as farEye } from '@fortawesome/free-regular-svg-icons'; // For the eye icon

// --- Mock Data ---

// Sidebar Navigation
const adminSidebarLinks = [
  { href: 'Dashboard.aspx', icon: faHome, label: 'Dashboard', active: false },
  { href: 'PatientList.aspx', icon: faUser, label: 'Patient List', active: false },
  {
    label: 'Doctors',
    icon: faUserPlus,
    isSubmenu: true,
    active: true,
    sublinks: [
      { href: 'DoctorList.aspx', label: 'Doctor List', active: true },
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

// Mock Doctor List Data
const mockDoctors = [
  {
    DoctorId: 1,
    DoctorCode: 'DOC001',
    DoctorImage: '/path/to/dr_a.jpg',
    Name: 'Dr. John Doe',
    Specialization: 'Cardiology',
    ConsultationFee: 800,
    createdDate: '2023-01-15',
    TotalDoctorAppointmentsAmount: 45000,
  },
  {
    DoctorId: 2,
    DoctorCode: 'DOC002',
    DoctorImage: '/path/to/dr_b.jpg',
    Name: 'Dr. Sarah Connor',
    Specialization: 'Dermatology',
    ConsultationFee: 650,
    createdDate: '2023-05-20',
    TotalDoctorAppointmentsAmount: 32500,
  },
  {
    DoctorId: 3,
    DoctorCode: 'DOC003',
    DoctorImage: '/path/to/dr_c.jpg',
    Name: 'Dr. Alex Smith',
    Specialization: 'Neurology',
    ConsultationFee: 1100,
    createdDate: '2024-03-01',
    TotalDoctorAppointmentsAmount: 66000,
  },
];

// --- Helper Functions and Components ---

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(/,/g, '');
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const AdminDoctorList = () => {
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: true, Medicines: false });
  const [message, setMessage] = useState(''); // Replaces ASP:Label Message

  // Tailwind CSS Class Mapping
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const tableHeaderClass = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
  const tableDataClass = 'px-6 py-4 whitespace-nowrap text-sm text-gray-700';

  // Custom CSS to Tailwind translation:
  // .gap-1, .d-inline-flex -> flex items-center space-x-1
  // .bg-danger-light -> bg-red-100 text-red-600 hover:bg-red-200
  // .bg-success-light -> bg-green-100 text-green-600 hover:bg-green-200
  // .bg-info-light -> bg-blue-100 text-blue-600 hover:bg-blue-200

  // Mock action handlers
  const handleDelete = (doctorId) => {
    console.log(`Deleting doctor ID: ${doctorId}`);
    setMessage(`Doctor ${doctorId} scheduled for deletion (Mock action).`);
    // In a real app: trigger modal confirmation, then API call to delete/deactivate.
  };

  return (
    <>
      <Head>
        <title>Doctor List - Admin</title>
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
                          onClick={() => setShowSubmenu(prev => ({ ...prev, [item.label]: !prev[item.label] }))}
                          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition ${
                            item.active || showSubmenu[item.label] ? sidebarActiveClass : 'text-gray-600'
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
                                  sublink.active ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-600'
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
                  <h3 className="text-2xl font-bold mb-1">List of Doctors</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="Dashboard.aspx" className="hover:text-blue-600">Dashboard /</a></li>
                    <li className="text-gray-800 font-semibold">&nbsp; Doctor</li>
                  </ul>
                </div>
                <div className="w-full sm:w-auto mt-4 sm:mt-0">
                  <a href="AddDoctors.aspx" className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                    Add Doctor
                  </a>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            {/* Server Message */}
            {message && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded font-bold">
                    {message}
                </div>
            )}
            
            <div className="row">
              <div className="col-sm-12 w-full">
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-6">
                    <div className="table-responsive">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className={tableHeaderClass}>Doctor ID</th>
                            <th className={tableHeaderClass}>Doctor Name</th>
                            <th className={tableHeaderClass}>Speciality</th>
                            <th className={tableHeaderClass}>Consultation Fee</th>
                            <th className={tableHeaderClass}>Member Since</th>
                            <th className={tableHeaderClass}>Earned Amount</th>
                            <th className={tableHeaderClass}>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* Repeater Content Mapped to React JSX */}
                          {mockDoctors.map((doctor) => (
                            <tr key={doctor.DoctorId}>
                              <td className={tableDataClass}>
                                {doctor.DoctorCode}
                              </td>
                              <td className={tableDataClass}>
                                <div className="flex items-center">
                                  <a href={`Doctorprofile.aspx?DoctorId=${doctor.DoctorId}`} className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <img 
                                      src={doctor.DoctorImage} 
                                      alt="Doctor Image" 
                                      className="w-full h-full object-cover rounded-full" 
                                    />
                                  </a>
                                  <a href="Profile.aspx" className='text-gray-900 hover:text-blue-600 font-medium'>
                                    {doctor.Name}
                                  </a>
                                </div>
                              </td>
                              <td className={tableDataClass}>{doctor.Specialization}</td>
                              <td className={tableDataClass}>{formatCurrency(doctor.ConsultationFee)}</td>
                              <td className={tableDataClass}>{formatDate(doctor.createdDate)}</td>
                              <td className={tableDataClass}>{formatCurrency(doctor.TotalDoctorAppointmentsAmount)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex items-center space-x-1">
                                  {/* Delete Button */}
                                  <button
                                    onClick={() => handleDelete(doctor.DoctorId)}
                                    className="btn btn-sm p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                                  >
                                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                  </button>
                                  
                                  {/* Edit Link */}
                                  <a
                                    href={`/Admin/EditDoctorProfile.aspx?DoctorId=${doctor.DoctorId}`}
                                    className="btn btn-sm p-2 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition"
                                  >
                                    <FontAwesomeIcon icon={faPencil} className="w-4 h-4" />
                                  </a>
                                  
                                  {/* View Profile Link */}
                                  <a
                                    href={`Doctorprofile.aspx?DoctorId=${doctor.DoctorId}`}
                                    className="btn btn-sm p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                                  >
                                    <FontAwesomeIcon icon={farEye} className="w-4 h-4" />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default AdminDoctorList;