// components/AdminPatientList.jsx
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
  faEye,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faEye as farEye } from '@fortawesome/free-regular-svg-icons';

// --- Mock Data ---

// Sidebar Navigation
const adminSidebarLinks = [
  { href: 'Dashboard.aspx', icon: faHome, label: 'Dashboard', active: false },
  { href: 'PatientList.aspx', icon: faUser, label: 'Patient List', active: true },
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

// Mock Patient List Data
const mockPatients = [
  {
    PatientId: 123,
    Ptname: 'Alice Brown',
    imgUrl: '/path/to/patient_alice.jpg',
    age: 30,
    Gender: 'Female',
    address: '10 Downing St, London',
    Mobileno: '9876543210',
    Dates: '2023-11-05',
    TotalCompletedAF: 5500,
  },
  {
    PatientId: 124,
    Ptname: 'Robert White',
    imgUrl: '/path/to/patient_robert.jpg',
    age: 55,
    Gender: 'Male',
    address: '221B Baker St, London',
    Mobileno: '9988776655',
    Dates: '2024-01-20',
    TotalCompletedAF: 8200,
  },
];

// --- Helper Functions ---

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(/,/g, '');
};

const formatCurrency = (amount) => {
  return `₹${amount}`;
};

// --- Main Component ---

const AdminPatientList = () => {
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: false });

  // Tailwind CSS Class Mapping
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const tableHeaderClass = 'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
  const tableDataClass = 'px-4 py-4 whitespace-nowrap text-sm text-gray-700';
  
  // Custom CSS to Tailwind translation:
  // .btn-primary:hover -> applied via Tailwind JIT configuration (hover:bg-[#00d0f1] hover:border-[#00d0f1])
  const btnInfoLight = 'bg-blue-100 text-blue-600 hover:bg-blue-200 transition';
  const btnDangerLight = 'bg-red-100 text-red-600 hover:bg-red-200 transition';
  const actionContainerClass = 'flex items-center space-x-1';


  const handleToggleSubmenu = (label) => {
    setShowSubmenu(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleDelete = (patientId) => {
      console.log(`Deleting patient ID: ${patientId}`);
      alert(`Patient ${patientId} scheduled for deletion (Mock action).`);
      // In a real app: trigger modal confirmation, then API call to delete/deactivate.
  };

  return (
    <>
      <Head>
        <title>Patient List - Admin</title>
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
                  <h3 className="text-2xl font-bold mb-1">List of Patient</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="Dashboard.aspx" className="hover:text-blue-600">Dashboard /</a></li>
                    <li className="text-gray-800 font-semibold">&nbsp;Patients</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            
            <div className="row">
              <div className="col-sm-12 w-full">
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className={tableHeaderClass}>Patient ID</th>
                            <th className={tableHeaderClass}>Patient Name</th>
                            <th className={tableHeaderClass}>Age</th>
                            <th className={tableHeaderClass}>Gender</th>
                            <th className={tableHeaderClass}>Address</th>
                            <th className={tableHeaderClass}>Mobile No.</th>
                            <th className={tableHeaderClass}>Created Date</th>
                            <th className={tableHeaderClass}>Paid</th>
                            <th className={tableHeaderClass}>Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* GridView/TemplateField Content Mapped to JSX */}
                          {mockPatients.map((patient) => (
                            <tr key={patient.PatientId}>
                              <td className={tableDataClass}>PT000{patient.PatientId}</td>
                              <td className={tableDataClass}>
                                <div className="flex items-center">
                                  <a href="Profile.aspx" className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <img className="w-full h-full object-cover rounded-full" src={patient.imgUrl} alt="Patient Image" />
                                  </a>
                                  <a href="Profile.aspx" className="text-gray-900 hover:text-blue-600 font-medium">{patient.Ptname}</a>
                                </div>
                              </td>
                              <td className={tableDataClass}>{patient.age}</td>
                              <td className={tableDataClass}>{patient.Gender}</td>
                              <td className={tableDataClass}>{patient.address}</td>
                              <td className={tableDataClass}>{patient.Mobileno}</td>
                              <td className={tableDataClass}>{formatDate(patient.Dates)}</td>
                              <td className={tableDataClass}>{formatCurrency(patient.TotalCompletedAF)}</td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className={actionContainerClass}>
                                  {/* View Button */}
                                  <a href={`PatientDetails.aspx?PatientId=${patient.PatientId}`} className={`btn btn-sm p-2 rounded-md ${btnInfoLight}`}>
                                    <FontAwesomeIcon icon={farEye} className="w-4 h-4" />
                                  </a>
                                  {/* Delete Button */}
                                  <button
                                    onClick={() => handleDelete(patient.PatientId)}
                                    className={`btn btn-sm p-2 rounded-md ${btnDangerLight}`}
                                  >
                                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                  </button>
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

export default AdminPatientList;