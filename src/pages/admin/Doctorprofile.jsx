// components/AdminDoctorProfile.jsx
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
  faStar as fasStar,
  faEnvelope,
  faPhone,
  faIndianRupeeSign,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Empty star for rating

// Utility function for date formatting
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

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

// Mock Doctor Profile Data
const mockDoctorProfile = {
  DoctorId: 101,
  Image: '/path/to/doctor_profile.jpg',
  Name: 'Dr. John Smith',
  Email: 'john.smith@clinic.com',
  Specialization: 'Cardiology',
  Experience: 12,
  Age: 45,
  Gender: 'Male',
  TotalAppointments: 450,
  ConsultationFee: 1000,
  AverageRating: 4,
  Bio: 'Dr. Smith is a dedicated cardiologist focusing on preventive heart care and non-invasive treatments. He has over 12 years of experience and is highly rated by his patients.',
  Qualification: 'MBBS, MD - Cardiology, FACC',
};

// Mock Schedule Data
const mockSchedule = [
  { Day: 'Monday', Shift1: '09:00 AM - 12:00 PM', Shift2: '02:00 PM - 05:00 PM', Shift3: '-', SlotDuration: 15 },
  { Day: 'Tuesday', Shift1: '09:00 AM - 12:00 PM', Shift2: '-', Shift3: '-', SlotDuration: 15 },
  { Day: 'Wednesday', Shift1: '09:00 AM - 12:00 PM', Shift2: '02:00 PM - 05:00 PM', Shift3: '-', SlotDuration: 15 },
  { Day: 'Thursday', Shift1: '09:00 AM - 12:00 PM', Shift2: '-', Shift3: '-', SlotDuration: 15 },
  { Day: 'Friday', Shift1: '09:00 AM - 12:00 PM', Shift2: '02:00 PM - 05:00 PM', Shift3: '-', SlotDuration: 15 },
];

// Mock Appointment Data (limited list for the tab)
const mockAppointments = [
  { Ptname: 'Alice Brown', imgUrl: '/path/to/pt_a.jpg', AppointmentDate: '2025-10-15', AppointmentTime: '10:15 AM', Status: 'Upcoming', ConsulationFee: 1000 },
  { Ptname: 'Bob Green', imgUrl: '/path/to/pt_b.jpg', AppointmentDate: '2025-10-10', AppointmentTime: '02:00 PM', Status: 'Completed', ConsulationFee: 1000 },
  { Ptname: 'Charlie Day', imgUrl: '/path/to/pt_c.jpg', AppointmentDate: '2025-10-05', AppointmentTime: '09:30 AM', Status: 'Cancelled', ConsulationFee: 1000 },
];

// Mock Review Data
const mockReviews = [
  { Ptname: 'Alice Brown', imgUrl: '/path/to/pt_a.jpg', Rating: 5, Comment: 'Excellent service and very knowledgeable doctor.', RatingCreatedDate: '2025-09-20' },
  { Ptname: 'Eve Davis', imgUrl: '/path/to/pt_d.jpg', Rating: 4, Comment: 'Friendly, but the waiting time was a bit long.', RatingCreatedDate: '2025-09-01' },
];

// --- Helper Components ---

const StatusBadge = ({ status }) => {
  let classes = 'inline-block px-3 py-1 text-xs font-medium rounded';
  if (status === 'Upcoming') classes += ' bg-yellow-100 text-yellow-600';
  else if (status === 'Cancelled') classes += ' bg-red-100 text-red-600';
  else if (status === 'Completed') classes += ' bg-green-100 text-green-600';
  return <span className={classes}>{status}</span>;
};

const RatingStars = ({ rating }) => {
  const stars = [];
  // Use Tailwind colors directly instead of custom CSS/images
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= rating;
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={isFilled ? fasStar : farStar}
        className={`w-4 h-4 cursor-pointer mx-0.5 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    );
  }
  return <div className="flex items-center">{stars}</div>;
};

const AdminDoctorProfile = () => {
  const [activeTab, setActiveTab] = useState('per_details_tab');
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: false });
  const doctor = mockDoctorProfile;

  // Tailwind CSS Class Mapping & Custom Styles
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  
  // Custom styles for info blocks
  const cliniInfoClass = 'mb-4 text-sm text-gray-700';
  const cliniInfoListItemClass = 'block leading-8 text-[#4E4852]'; // Adjusted color slightly
  const starStyleClasses = 'w-5 h-5 mx-0.5 cursor-pointer block bg-no-repeat bg-contain'; // Replicating .ratingStar, but using Tailwind colors for filled/empty in JSX

  const handleToggleSubmenu = (label) => {
    setShowSubmenu(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <Head>
        <title>Doctor Profile - Admin</title>
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
                        <ul className={`ml-4 mt-1 space-y-1 ${item.label === 'Medicines' || item.label === 'Doctors' ? 'block' : 'hidden'}`}>
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
                    <li className="text-gray-800 font-semibold">&nbsp;Doctor Profile</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-md-12 w-full">
                <div className="profile-header bg-white shadow-lg rounded-t-lg p-6 mb-4 border-b">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-start">
                    {/* Doctor Info Left */}
                    <div className="flex items-start space-x-4">
                      <div className="doctor-img w-24 h-24 flex-shrink-0">
                        <img 
                          src={doctor.Image} 
                          className="w-full h-full object-cover rounded-full border border-gray-200" 
                          alt="Doctor Image" 
                        />
                      </div>
                      <div className="doc-info-cont">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {doctor.Name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-1">{doctor.Email}</p>
                        <p className="text-sm text-gray-700 mb-0">
                          {doctor.Specialization} | {doctor.Experience} year Experience
                        </p>
                        <p className="text-sm text-gray-700 mb-0">
                          Age: {doctor.Age} &nbsp;&nbsp; Gender: {doctor.Gender}
                        </p>
                        <p className="text-sm text-gray-700 mb-0">
                          Total Appointments: {doctor.TotalAppointments}
                        </p>
                      </div>
                    </div>

                    {/* Doctor Info Right */}
                    <div className="doc-info-right flex flex-col items-start md:items-end space-y-3">
                      <div className={cliniInfoClass}>
                        <ul className="list-none p-0">
                          <li className={cliniInfoListItemClass}>
                            Consulation Fee: 
                            <FontAwesomeIcon icon={faIndianRupeeSign} className="w-2 h-2 mx-1" />
                            <span className="font-semibold">{doctor.ConsultationFee}</span> 
                          </li>
                        </ul>
                      </div>
                      <div className="doctor-action">
                        <div className="rating">
                            <RatingStars rating={doctor.AverageRating} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Tabs */}
                <div className="profile-menu">
                  <ul className="flex border-b border-gray-200 list-none p-0">
                    {[
                      { id: 'per_details_tab', label: 'Education' },
                      { id: 'Schedule_tab', label: 'Schedule' },
                      { id: 'per_Appointments_tab', label: 'Doctor Appointments' },
                      { id: 'review_tab', label: 'Reviews' },
                    ].map((tab) => (
                      <li key={tab.id} className="nav-item">
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`block py-3 px-4 text-sm font-medium border-b-2 transition ${
                            activeTab === tab.id
                              ? 'border-blue-600 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-blue-600'
                          }`}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="tab-content profile-tab-cont pt-4">
                  
                  {/* Tab 1: Education (About Me & Qualification) */}
                  <div id="per_details_tab" className={`transition-opacity duration-300 ${activeTab === 'per_details_tab' ? 'block' : 'hidden'}`}>
                    <div className="row">
                      <div className="col-lg-12 w-full">
                        <div className="card bg-white shadow-md rounded-lg mb-4">
                          <div className="card-body p-6">
                            
                            {/* About Details */}
                            <div className="widget mb-6">
                              <h4 className="text-lg font-semibold border-b pb-2 mb-3">About Me</h4>
                              <p className="text-gray-700">{doctor.Bio}</p>
                            </div>
                            
                            {/* Education Details */}
                            <div className="widget mb-6">
                              <h4 className="text-lg font-semibold border-b pb-2 mb-3">Education</h4>
                              <div className="experience-box">
                                <ul className="list-none p-0 space-y-3">
                                  <li className='flex items-start'>
                                    <div className="w-3 h-3 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                    <div className="ml-4 flex-1">
                                      <div className="font-semibold text-gray-800">{doctor.Qualification}</div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            
                            {/* Address Details */}
                            <div className="widget">
                              <h4 className="text-lg font-semibold border-b pb-2 mb-3">Address</h4>
                              <div className="experience-box">
                                <ul className="list-none p-0 space-y-3">
                                  <li className='flex items-start'>
                                    <div className="w-3 h-3 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                    <div className="ml-4 flex-1 text-gray-700">
                                        {doctor.Address} {doctor.City} {doctor.State} {doctor.Country} - {doctor.Pincode}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Doctor Personal Details Tab */}
                  
                  {/* Tab 2: Schedule */}
                  <div id="Schedule_tab" className={`transition-opacity duration-300 ${activeTab === 'Schedule_tab' ? 'block' : 'hidden'}`}>
                    <div className="card bg-white shadow-md rounded-lg">
                      <div className="card-body p-6 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 text-center text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-2 border font-medium">Day</th>
                              <th className="p-2 border font-medium">Shift 1</th>
                              <th className="p-2 border font-medium">Shift 2</th>
                              <th className="p-2 border font-medium">Shift 3</th>
                              <th className="p-2 border font-medium">Slot Duration</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {mockSchedule.map((schedule, index) => (
                              <tr key={index}>
                                <td className="p-2 border font-medium">{schedule.Day}</td>
                                <td className="p-2 border">{schedule.Shift1}</td>
                                <td className="p-2 border">{schedule.Shift2}</td>
                                <td className="p-2 border">{schedule.Shift3}</td>
                                <td className="p-2 border">{schedule.SlotDuration} min</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* /Doctor Schedule*/}
                  
                  {/* Tab 3: Doctor Appointments */}
                  <div id="per_Appointments_tab" className={`transition-opacity duration-300 ${activeTab === 'per_Appointments_tab' ? 'block' : 'hidden'}`}>
                    <div className="card bg-white shadow-md rounded-lg">
                      <div className="card-body p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Time</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {mockAppointments.map((appt, index) => (
                                  <tr key={index}>
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
                  {/* /Doctor Appointments */}
                  
                  {/* Tab 4: Doctor Reviews */}
                  <div id="review_tab" className={`transition-opacity duration-300 ${activeTab === 'review_tab' ? 'block' : 'hidden'}`}>
                    <div className="card bg-white shadow-md rounded-lg">
                        <div className="card-header bg-blue-600 text-white text-center rounded-t-lg p-3">
                            <h4 className="text-lg font-semibold">Patient Reviews</h4>
                        </div>
                        <div className="card-body p-6">
                            <ul className="list-none p-0 space-y-4">
                                {mockReviews.map((review, index) => (
                                    <li key={index} className="pb-4 border-b last:border-b-0">
                                        <div className="comment flex items-start">
                                            <img 
                                                src={review.imgUrl} 
                                                className="w-10 h-10 rounded-full border flex-shrink-0 object-cover" 
                                                alt="User Image"
                                            />
                                            <div className="comment-body ml-3 flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-bold text-gray-900">{review.Ptname}</span>
                                                    <span className="text-xs text-gray-500">
                                                        Reviewed {formatDate(review.RatingCreatedDate)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <RatingStars rating={review.Rating} />
                                                </div>
                                                <p className="text-gray-600 mt-2">
                                                    {review.Comment}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                  </div>
                  {/* /Doctor Reviews */}

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

export default AdminDoctorProfile;