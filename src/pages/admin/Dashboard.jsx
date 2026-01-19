// components/AdminDashboard.jsx
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
  faUsers,
  faCreditCard,
  faMoneyBillWave,
  faFolder,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

// --- Mock Data ---

// Sidebar Navigation
const adminSidebarLinks = [
  { href: 'Dashboard.aspx', icon: faHome, label: 'Dashboard', active: true },
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

// Mock Dashboard Summary Data (replaces C# Label values)
const mockSummaryData = {
  TotalDoctors: 50,
  TotalPatients: 1200,
  TotalAppointments: 350,
  TotalRevenue: 1500000, // In rupees (₹)
};

// Mock Appointment Data (replaces Repeater data source)
const mockAppointments = [
  {
    DoctorId: 1,
    DoctorImage: '/path/to/dr_a.jpg',
    Name: 'Dr. John Doe',
    Specialization: 'Cardiology',
    Ptname: 'Alice Smith',
    imgUrl: '/path/to/pt_a.jpg',
    AppointmentDate: '2025-10-09',
    AppointmentTime: '10:00 AM',
    Status: 'Upcoming',
    ConsulationFee: 800,
  },
  {
    DoctorId: 2,
    DoctorImage: '/path/to/dr_b.jpg',
    Name: 'Dr. Jane Miler',
    Specialization: 'Dermatology',
    Ptname: 'Bob Johnson',
    imgUrl: '/path/to/pt_b.jpg',
    AppointmentDate: '2025-10-08',
    AppointmentTime: '02:30 PM',
    Status: 'Completed',
    ConsulationFee: 650,
  },
  {
    DoctorId: 3,
    DoctorImage: '/path/to/dr_c.jpg',
    Name: 'Dr. Sam Wilson',
    Specialization: 'Neurology',
    Ptname: 'Charlie Brown',
    imgUrl: '/path/to/pt_c.jpg',
    AppointmentDate: '2025-10-07',
    AppointmentTime: '11:00 AM',
    Status: 'Cancelled',
    ConsulationFee: 400,
  },
];

// --- Helper Functions and Components ---

const ChartPlaceholder = ({ title, data }) => {
  // Mock data for visualization based on the original AJAX calls
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = [100, 150, 200, 180, 250, 300, 280, 350, 400, 380, 450, 500]; // K's
  const doctorData = [10, 12, 15, 16, 18, 20, 21, 23, 25, 26, 28, 30];
  const patientData = [100, 150, 250, 300, 400, 550, 700, 850, 1000, 1100, 1200, 1300];

  const chartData = title === 'Revenue' ? revenueData : doctorData;
  const chartLabels = labels.slice(0, chartData.length);
  
  // Custom CSS to Tailwind translation:
  const cardHeaderClass = 'flex justify-between items-center p-4 border-b';

  return (
    <div className="card bg-white shadow-lg rounded-lg">
      <div className={cardHeaderClass}>
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <div className="card-body p-4">
        {/* Placeholder for Chart */}
        <div className="h-80 w-full bg-gray-100 flex flex-col justify-center items-center rounded-md text-gray-500">
          <p className="font-semibold mb-2">Chart Placeholder: {title}</p>
          <p className="text-xs">Visualizing: {chartLabels.join(', ')}</p>
          {title !== 'Revenue' && <p className="text-xs">Lines: Doctors vs. Patients</p>}
          <p className="text-xs text-red-500">Requires Chart.js or equivalent library.</p>
        </div>
      </div>
    </div>
  );
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const AdminDashboard = () => {
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: false });
  const data = mockSummaryData;

  // Function to calculate a mock width for the progress bar (based on mock max values)
  const getProgressWidth = (value, max = 2000000) => {
    return `${Math.min((value / max) * 100, 100)}%`;
  };

  // Tailwind CSS Class Mapping
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const cardHeaderClass = 'flex justify-between items-center p-4 border-b';

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
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
              <div className="flex flex-wrap items-center">
                <div className="w-full">
                  <h3 className="text-2xl font-bold mb-1">Welcome Admin!</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="Dashboard.aspx" className="hover:text-blue-600">Dashboard /</a></li>
                    <li className="text-gray-800 font-semibold">&nbsp; Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            {/* Summary Widgets */}
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* Total Doctors */}
              <div className="w-full sm:w-1/2 xl:w-1/4 px-3 mb-4">
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 border border-blue-600">
                        <FontAwesomeIcon icon={faUsers} className="text-xl" />
                      </span>
                      <div className="text-right">
                        <h3 className="text-2xl font-bold text-gray-800">{data.TotalDoctors}</h3>
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6 className="text-sm text-gray-500 mb-2">
                        <a href="DoctorList.aspx" className='hover:text-blue-600'>Doctors</a>
                      </h6>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: getProgressWidth(data.TotalDoctors, 100) }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Total Patients */}
              <div className="w-full sm:w-1/2 xl:w-1/4 px-3 mb-4">
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 border border-green-600">
                        <FontAwesomeIcon icon={faCreditCard} className="text-xl" />
                      </span>
                      <div className="text-right">
                        <h3 className="text-2xl font-bold text-gray-800">{data.TotalPatients}</h3>
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6 className="text-sm text-gray-500 mb-2">
                        <a href="PatientList.aspx" className='hover:text-green-600'>Patients</a>
                      </h6>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-600 h-1.5 rounded-full"
                          style={{ width: getProgressWidth(data.TotalPatients, 2000) }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Total Appointments */}
              <div className="w-full sm:w-1/2 xl:w-1/4 px-3 mb-4">
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 border border-red-600">
                        <FontAwesomeIcon icon={faCalendarCheck} className="text-xl" />
                      </span>
                      <div className="text-right">
                        <h3 className="text-2xl font-bold text-gray-800">{data.TotalAppointments}</h3>
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6 className="text-sm text-gray-500 mb-2">
                        <a href="Appointments.aspx" className='hover:text-red-600'>Appointments</a>
                      </h6>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-red-600 h-1.5 rounded-full"
                          style={{ width: getProgressWidth(data.TotalAppointments, 500) }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Total Revenue */}
              <div className="w-full sm:w-1/2 xl:w-1/4 px-3 mb-4">
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 border border-yellow-600">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="text-xl" />
                      </span>
                      <div className="text-right">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {formatCurrency(data.TotalRevenue)}
                        </h3>
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6 className="text-sm text-gray-500 mb-2">Revenue</h6>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-yellow-600 h-1.5 rounded-full"
                          style={{ width: getProgressWidth(data.TotalRevenue, 2000000) }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="row">
              <div className="col-md-12 col-lg-6 w-full lg:w-1/2 px-3 mb-6">
                <ChartPlaceholder title="Revenue" />
              </div>
              <div className="col-md-12 col-lg-6 w-full lg:w-1/2 px-3 mb-6">
                <ChartPlaceholder title="Doctors & Patients" />
              </div>
            </div>

            {/* Appointment List Table */}
            <div className="row">
              <div className="col-md-12 w-full px-3">
                <div className="card card-table bg-white shadow-lg rounded-lg">
                  <div className={cardHeaderClass}>
                    <h4 className="text-lg font-semibold">Appointment List</h4>
                    <a href="Appointments.aspx" className='text-blue-600 hover:text-blue-800 text-sm'>View All</a>
                  </div>
                  <div className="card-body p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speciality</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {mockAppointments.map((appt) => (
                            <tr key={appt.DoctorId}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex items-center">
                                  <a href={`Doctorprofile.aspx?DoctorId=${appt.DoctorId}`} className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <img className="w-full h-full object-cover rounded-full" src={appt.DoctorImage} alt="Doctor Image" />
                                  </a>
                                  <a href={`Doctorprofile.aspx?DoctorId=${appt.DoctorId}`} className="hover:text-blue-600 font-medium">{appt.Name}</a>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{appt.Specialization}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex items-center">
                                  <a href="#" className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <img className="w-full h-full object-cover rounded-full" src={appt.imgUrl} alt="Patient Image" />
                                  </a>
                                  <a href="#" className="hover:text-blue-600 font-medium">{appt.Ptname}</a>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {new Date(appt.AppointmentDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                                <span className="text-blue-600 block text-xs">{appt.AppointmentTime}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <StatusBadge status={appt.Status} />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ₹{appt.ConsulationFee}
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

// Reusable Status Badge Component
const StatusBadge = ({ status }) => {
  let classes = 'inline-block px-3 py-1 text-xs font-medium rounded';
  if (status === 'Upcoming') {
    classes += ' bg-yellow-100 text-yellow-600';
  } else if (status === 'Cancelled') {
    classes += ' bg-red-100 text-red-600';
  } else if (status === 'Completed') {
    classes += ' bg-green-100 text-green-600';
  }
  return <span className={classes}>{status}</span>;
};

export default AdminDashboard;