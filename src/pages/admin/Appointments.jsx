// components/AdminAppointments.jsx
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
import { faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
  { href: 'Appointments.aspx', icon: faCalendarCheck, label: 'Appointments', active: true },
  {
    label: 'Medicines',
    icon: faBookMedical,
    isSubmenu: true,
    active: false, // Setting Medicines as *not* active on Appointments page
    sublinks: [
      { href: 'AddMedicine.aspx', label: 'Add Medicine' },
      { href: 'Medicines.aspx', label: 'Medicines' },
    ],
  },
  { href: 'AddDoctorSchedule.aspx', icon: faCalendarCheck, label: 'Add Schedule', active: false },
  { href: 'EditDoctorSchedule.aspx', icon: faPencil, label: 'Edit Schedule', active: false },
  { href: 'Profile.aspx', icon: faUserPlus, label: 'Profile', active: false },
];

// Mock Appointment Data (replaces Repeater data source)
const mockAppointments = [
  {
    AppointmentId: 101,
    DoctorId: 1,
    DoctorImage: '/path/to/dr_a.jpg',
    Name: 'Dr. Marcus Dixon',
    Specialization: 'Cardiology',
    Ptname: 'John Smith',
    imgUrl: '/path/to/pt_a.jpg',
    AppointmentDate: '2025-10-15',
    AppointmentTime: '10:00 AM',
    Status: 'Upcoming',
    ConsulationFee: 500,
  },
  {
    AppointmentId: 102,
    DoctorId: 2,
    DoctorImage: '/path/to/dr_b.jpg',
    Name: 'Dr. Lisa Ray',
    Specialization: 'Dermatology',
    Ptname: 'Alice Brown',
    imgUrl: '/path/to/pt_b.jpg',
    AppointmentDate: '2025-10-01',
    AppointmentTime: '02:30 PM',
    Status: 'Completed',
    ConsulationFee: 750,
  },
  {
    AppointmentId: 103,
    DoctorId: 3,
    DoctorImage: '/path/to/dr_c.jpg',
    Name: 'Dr. Sam Wilson',
    Specialization: 'Neurology',
    Ptname: 'Bob Green',
    imgUrl: '/path/to/pt_c.jpg',
    AppointmentDate: '2025-09-25',
    AppointmentTime: '11:45 AM',
    Status: 'Cancelled',
    ConsulationFee: 400,
  },
];

const formatDate = (dateString, timeString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const datePart = date.toLocaleDateString('en-US', options).replace(/,/g, '');
    return (
        <>
            {datePart}
            <span className="text-blue-600 block text-xs">{timeString}</span>
        </>
    );
};

const AdminAppointments = () => {
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: false });
  const [currentPage, setCurrentPage] = useState(1); // Mock pagination state
  const totalPages = 5; // Mock total pages

  // Tailwind CSS Class Mapping
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const tableHeaderClass = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
  const tableDataClass = 'px-6 py-4 whitespace-nowrap text-sm text-gray-900';

  // Custom CSS to Tailwind translation:
  // div.dt-layout-row1 -> flex justify-between items-center w-full my-3
  // .badge-solid-green -> text-green-600 bg-green-100 border-none px-3 py-1 font-medium leading-tight rounded-md

  const getStatusBadge = (status) => {
    let classes = 'inline-block px-3 py-1 text-xs font-medium rounded-md';
    if (status === 'Upcoming') {
      classes += ' bg-yellow-100 text-yellow-600';
    } else if (status === 'Cancelled') {
      classes += ' bg-red-100 text-red-600';
    } else if (status === 'Completed') {
      classes += ' bg-green-100 text-green-600';
    }
    return <span className={classes}>{status}</span>;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // In a real app, this would trigger data fetch for the new page
      console.log(`Navigating to page ${newPage}`);
    }
  };

  return (
    <>
      <Head>
        <title>Appointments - Admin</title>
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
                  <h3 className="text-2xl font-bold mb-1">Appointments</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="Dashboard.aspx" className="hover:text-blue-600">Dashboard</a></li>
                    <li className="text-gray-800 font-semibold">/ &nbsp; Appointments</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-md-12 w-full">
                {/* Recent Orders Card */}
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-6">
                    <div className="table-responsive">
                      {/* Top Pagination Row - Translated from dt-layout-row1 */}
                      <div className="flex justify-end items-center w-full my-3">
                        {/* Placeholder for DataTables search/length options */}
                        <div className="flex items-center space-x-2">
                           {/* You would insert a search input or dropdown here */}
                        </div>
                      </div>

                      {/* Appointments Table */}
                      <div className="mt-5">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className={tableHeaderClass}>Doctor Name</th>
                              <th className={tableHeaderClass}>Speciality</th>
                              <th className={tableHeaderClass}>Patient Name</th>
                              <th className={tableHeaderClass}>Appointment Time</th>
                              <th className={tableHeaderClass}>Status</th>
                              <th className={tableHeaderClass}>Amount</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {/* Repeater content mapped here */}
                            {mockAppointments.map((appt) => (
                              <tr key={appt.AppointmentId}>
                                <td className={tableDataClass}>
                                  <div className="flex items-center">
                                    <a href={`Doctorprofile.aspx?DoctorId=${appt.DoctorId}`} className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                      <img className="w-full h-full object-cover" src={appt.DoctorImage} alt="Doctor Image" />
                                    </a>
                                    <a href={`Doctorprofile.aspx?DoctorId=${appt.DoctorId}`} className="hover:text-blue-600 font-medium">
                                      {appt.Name}
                                    </a>
                                  </div>
                                </td>
                                <td className={tableDataClass}>{appt.Specialization}</td>
                                <td className={tableDataClass}>
                                  <div className="flex items-center">
                                    <a href="#" className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                      <img className="w-full h-full object-cover" src={appt.imgUrl} alt="Patient Image" />
                                    </a>
                                    <a href="#" className="hover:text-blue-600 font-medium">{appt.Ptname}</a>
                                  </div>
                                </td>
                                <td className={tableDataClass}>
                                  {formatDate(appt.AppointmentDate, appt.AppointmentTime)}
                                </td>
                                <td className={tableDataClass}>
                                  {getStatusBadge(appt.Status)}
                                </td>
                                <td className={tableDataClass}>
                                  ₹ {appt.ConsulationFee}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Bottom Pagination Row - Translated from dt-layout-row1 */}
                      <div className="flex justify-end items-center w-full my-3">
                        <div className="flex space-x-1">
                          {/* Previous Button */}
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`page-link px-3 py-1 border border-gray-300 rounded-l-md text-sm hover:bg-gray-100 transition ${
                              currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600'
                            }`}
                          >
                            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" /> Previous
                          </button>

                          {/* Page Number (Active) */}
                          <span className="px-3 py-1 border-t border-b border-gray-300 bg-blue-600 text-white text-sm font-semibold">
                            {currentPage}
                          </span>

                          {/* Next Button */}
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`page-link px-3 py-1 border border-gray-300 rounded-r-md text-sm hover:bg-gray-100 transition ${
                              currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600'
                            }`}
                          >
                            Next <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Recent Orders */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default AdminAppointments;