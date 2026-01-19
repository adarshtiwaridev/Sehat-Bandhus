// components/AdminCancelAppointment.jsx
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
  faArrowLeft,
  faEnvelope,
  faPhone,
  faIndianRupeeSign,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
  { href: 'Profile.aspx', icon: faUserPlus, label: 'Profile', active: false },
];

// Mock Appointment Details (replaces data bound by C# labels)
const mockAppointmentDetails = {
  AppointmentId: 456,
  DoctorImage: '/path/to/doctor_img.jpg',
  DoctorName: 'Dr. John Doe',
  DoctorEmail: 'john.doe@clinic.com',
  DoctorPhone: '+91 98765 43210',
  PatientName: 'Jane Smith',
  ConsultationFee: 750,
  PaymentMode: 'Online',
  AppointmentDate: '2025-10-10',
  AppointmentTime: '11:30 AM (Shift 2)',
  CancellationReason: 'Patient had a schedule conflict.',
  CancelDate: '2025-10-05',
};

// --- Helper Functions ---

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const CancelAppointmentDetails = () => {
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: false });
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);

  const appt = mockAppointmentDetails;

  // --- Tailwind CSS Class Mapping & Custom Styles ---

  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';

  // .form-control
  const formControlClass = 'mb-1';

  // .modalBack
  const modalBackdropClass = isReasonModalOpen ? 'fixed inset-0 bg-black opacity-80 z-[1040]' : 'hidden';

  // .modalPopup
  const modalPopupClass = 'bg-white border-3 border-solid border-black pt-0 px-2 rounded-xl shadow-2xl';

  // Custom styles for appointment card details (approximation)
  const detailItemClass = 'p-3 border-b border-gray-200 last:border-b-0';
  const detailBottomItemClass = 'p-4 border-r border-gray-200 last:border-r-0 w-1/2';
  const badgeRedClass = 'bg-red-600 text-white inline-block px-3 py-1 text-xs font-medium rounded-md';

  // --- Modal Component (Cancellation Reason) ---

  const ReasonModal = () => {
    if (!isReasonModalOpen) return null;
    
    return (
      <>
        <div className={modalBackdropClass} />
        <div className="fixed inset-0 flex items-center justify-center z-[1050]">
          <div className="modal-dialog modal-dialog-centered max-w-lg w-full">
            <div className={`modal-content ${modalPopupClass}`}>
              <div className="flex justify-between items-center p-4 border-b">
                <h5 className="text-xl font-semibold">Cancellation Reason</h5>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-900"
                  onClick={() => setIsReasonModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xl" />
                </button>
              </div>
              <div className="modal-body p-4">
                <div className="reason-of-rejection">
                  <p className="text-gray-800 mb-2">{appt.CancellationReason}</p>
                  <span className="text-red-500 text-sm">
                    Cancelled By You on {formatDate(appt.CancelDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Cancelled Appointment Details - Admin</title>
      </Head>

      <ReasonModal />
      
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
                  <h3 className="text-2xl font-bold mb-1">List of Patient</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="Dashboard.aspx" className="hover:text-blue-600">Dashboard /</a></li>
                    <li className="text-gray-800 font-semibold">&nbsp;Cancelled Appointment</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
                        
            <div className="row">
              <div className="col-sm-12 w-full">
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-6">
                    <div className="dashboard-header mb-4 border-b pb-4">
                      <div className="flex items-center space-x-3">
                        <a href="Appointments.aspx" className="text-gray-600 hover:text-blue-600">
                          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                        </a>
                        <h4 className="text-xl font-semibold">Appointment Cancellation Details</h4>
                      </div>
                    </div>
                    
                    {/* Appointment Detail Card */}
                    <div className="appointment-wrap appointment-detail-card border border-gray-200 rounded-lg p-4">
                      <ul className="list-none p-0 mb-4 flex flex-col md:flex-row md:space-x-4">
                        {/* Doctor Info */}
                        <li className={`${detailItemClass} md:w-1/3`}>
                          <div className="flex items-center space-x-3">
                            <img src={appt.DoctorImage} alt="Doctor" className="w-16 h-16 rounded-full object-cover"/>
                            <div>
                              <p className="text-sm text-gray-500">APT000{appt.AppointmentId}</p>
                              <h6 className="text-lg font-semibold hover:text-blue-600">
                                <a href="#">{appt.DoctorName}</a>
                              </h6>
                              <div className="text-sm text-gray-600">
                                <ul className="list-none p-0 space-y-1 mt-1">
                                  <li className="flex items-center"><FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 mr-2" />{appt.DoctorEmail}</li>
                                  <li className="flex items-center"><FontAwesomeIcon icon={faPhone} className="w-3 h-3 mr-2" />{appt.DoctorPhone}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>

                        {/* Patient Name */}
                        <li className={`${detailItemClass} md:w-1/3 flex items-center justify-center`}>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Patient Name</p>
                            <ul className="list-none p-0 flex justify-center font-medium text-lg">
                              <li>{appt.PatientName}</li>
                            </ul>
                          </div>
                        </li>

                        {/* Status & Fees */}
                        <li className={`${detailItemClass} md:w-1/3 text-center md:text-right flex flex-col justify-center items-center md:items-end space-y-2`}>
                          <div className="flex flex-col items-center md:items-end">
                            {/* Status Badge & Reason Button */}
                            <div className="flex items-center space-x-2">
                                <span className={badgeRedClass}>Cancelled</span>
                                <button
                                    type="button"
                                    onClick={() => setIsReasonModalOpen(true)}
                                    className="bg-white text-blue-600 hover:text-blue-800 underline text-sm font-medium"
                                >
                                    Reason
                                </button>
                            </div>
                            
                            <div className="mt-2 text-gray-700">
                              <h6 className="text-sm font-semibold flex items-center">
                                Consultation Fees: 
                                <FontAwesomeIcon icon={faIndianRupeeSign} className="w-3 h-3 mx-1" />
                                <span className='font-bold'>{appt.ConsultationFee}</span>
                              </h6>
                            </div>
                            <div className="text-gray-700 text-sm">
                              <h6>Payment Mode: <span className='font-semibold'>{appt.PaymentMode}</span></h6>
                            </div>
                          </div>
                        </li>
                      </ul>

                      {/* Bottom Info Row */}
                      <ul className="list-none p-0 flex flex-wrap -mx-2 detail-card-bottom-info border-t border-gray-200">
                        <li className={`${detailBottomItemClass} px-2`}>
                          <h6 className="font-semibold mb-1 text-gray-700">Appointment Date</h6>
                          <span className="text-base text-gray-900">{formatDate(appt.AppointmentDate)}</span>
                        </li>
                        <li className={`${detailBottomItemClass} px-2`}>
                          <h6 className="font-semibold mb-1 text-gray-700">Appointment Time &amp; Shift</h6>
                          <span className="text-base text-gray-900">{appt.AppointmentTime}</span>
                        </li>
                      </ul>
                    </div>
                    {/* /Appointment Detail Card */}
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

export default CancelAppointmentDetails;