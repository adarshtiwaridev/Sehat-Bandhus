// components/AdminShowAppointmentPrescription.jsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  faArrowLeft,
  faEnvelope,
  faPhone,
  faIndianRupeeSign,
  faComments,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

// Dependencies for PDF generation (must be installed via npm/yarn)
// Note: These modules are dynamically imported in the download logic below
let html2canvas;
let jsPDF;

// Dynamic import setup
const loadPdfDependencies = async () => {
    if (!html2canvas) {
        html2canvas = (await import('html2canvas')).default;
    }
    if (!jsPDF) {
        jsPDF = (await import('jspdf')).jsPDF;
    }
};


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

// Mock Appointment/Prescription Data
const mockAppointmentDetails = {
  AppointmentId: 456,
  PatientId: 789,
  DoctorId: 123,
  DoctorImage: '/path/to/dr_profile.jpg',
  DoctorName: 'Dr. John Doe',
  Email: 'john.doe@clinic.com',
  Phone: '+91 98765 43210',
  ConsultationFee: 1000,
  AppointmentDate: '2025-10-01',
  AppointmentTime: '11:00 AM',
  PatientName: 'Jane C. Doe',
  Age: 32,
  Gender: 'Female',
  Qualification: 'MD, General Practice',
  Experience: 15,
  Vitals: {
    PulseRate: 80,
    Temperature: 37.0,
    GL: '95',
    BP: '120/80',
    Spo2: 98,
    BSA: 1.7,
    Height: 165,
    Weight: 60,
    BMI: 22.04,
  },
  Diagnosis: 'Seasonal Allergy (Rhinitis)',
  DoctorSuggestions: 'Maintain hydration, avoid known allergens.',
  LabTest: 'Full Blood Count (FBC)',
};

// Mock Medicine Repeater Data
const mockMedicineList = [
  { MedicineName: 'Cetirizine', Dosage: '10mg', Duration: '5 days', Instruction: 'Once daily after dinner' },
  { MedicineName: 'Nasal Spray', Dosage: '2 sprays', Duration: '7 days', Instruction: 'Twice daily' },
];

// --- Helper Functions ---

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/,/g, '');
};

// --- Main Component ---

const AdminShowAppointmentPrescription = () => {
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: false });
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const appt = mockAppointmentDetails;

  // --- PDF Generation Logic (Replaces client-side script) ---
  const downloadReport = useCallback(async (event) => {
    event.preventDefault();
    await loadPdfDependencies(); // Ensure dependencies are loaded

    console.log("PDF download triggered.");

    const receipt = document.getElementById('Print-Report');
    if (!receipt) {
        alert('Error: Report element not found.');
        return;
    }

    try {
        const canvas = await html2canvas(receipt, {
            useCORS: true,
            willReadFrequently: true,
            scale: 1.5, // Increase scale for better quality
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Add the image, ensuring it starts at the top left corner (0, 0)
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save('MedicalReportPre.pdf');
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Check console for details.");
    }

    // Original ASP.NET redirection after 10s:
    // setTimeout(() => { window.location.href = "PatientList.aspx"; }, 10000);
    // In React, better to just close the modal.
    setTimeout(() => { setIsPrescriptionModalOpen(false); }, 500);

  }, []);

  // --- Tailwind Class Mapping & Custom Styles ---

  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const headerFixedClass = 'z-[111]';
  const modalBackdropClass = 'fixed inset-0 bg-black bg-opacity-80 z-[1040]';
  const modalPopupClass = 'bg-white border-3 border-solid border-black p-4 rounded-xl shadow-2xl';
  const btnPrimaryHoverClass = 'hover:bg-[#00d0f1] hover:border-[#00d0f1]';
  const tableHeaderClass = 'p-2 border font-medium bg-gray-50';
  const tableDataClass = 'p-2 border text-sm';
  const detailItemClass = 'p-4 border-b border-gray-200 last:border-b-0';
  const detailBottomItemClass = 'p-4 border-r border-gray-200 last:border-r-0 w-1/2';


  const handleToggleSubmenu = (label) => {
    setShowSubmenu(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // --- Modal Component ---

  const PrescriptionModal = () => {
    if (!isPrescriptionModalOpen) return null;

    return (
      <>
        <div className={modalBackdropClass} />
        <div className="fixed inset-0 flex items-center justify-center z-[1050]">
          <div className="modal-dialog modal-dialog-centered max-w-4xl w-full">
            <div className={`${modalPopupClass}`}>
              <div className="flex justify-between items-center pb-3 border-b border-gray-300 mb-4 pt-2">
                <h3 className="text-xl font-semibold">View Details</h3>
                <button type="button" className="text-gray-500 hover:text-gray-900 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center" onClick={() => setIsPrescriptionModalOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} className="w-4 h-4 text-gray-800" />
                </button>
              </div>
              <div className="modal-body pb-0 max-h-[70vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h5><span className="font-semibold">{formatDate(appt.AppointmentDate)}</span></h5>
                  <button type="button" onClick={downloadReport} className={`btn bg-blue-600 text-white py-2 px-4 rounded-md transition ${btnPrimaryHoverClass}`}>
                    Download
                  </button>
                </div>
                
                {/* Printable Report Area */}
                <div id="Print-Report" className="p-4 border border-gray-300 rounded-lg">
                  <div className="hospital-addr text-center mb-6 border-b pb-4">
                    <img src="../assets/img/logo.png" alt="logo" className="h-10 mx-auto mb-2" />
                    <h5 className="text-sm font-semibold text-gray-800 mb-1">16, Wardlow, Buxton, Derbyshire, SK17 8RW. Phone : 01298 872268</h5>
                    <p className="text-xs text-gray-600">Monday to Sunday - 09:30am to 12:00pm</p>
                  </div>
                  
                  {/* Doctor & Appointment Info */}
                  <div className="flex flex-wrap -mx-2 mb-6">
                    <div className="w-1/2 px-2">
                      <div className="text-sm">
                        <h6 className="font-semibold text-gray-800 mb-1">{appt.DoctorName}</h6>
                        <p className="text-gray-600">{appt.Qualification}, {appt.Experience}&nbsp;Year EXP.</p>
                      </div>
                    </div>
                    <div className="w-1/2 px-2 text-right">
                      <p className="text-sm text-gray-700 mb-1"><span>Appointment Date: </span><span className='font-medium'>{formatDate(appt.AppointmentDate)}</span></p>
                      <p className="text-sm text-gray-700"><span>Appointment Time: </span><span className='font-medium'>{appt.AppointmentTime}</span></p>
                    </div>
                  </div>
                  
                  {/* Patient Details */}
                  <div className="patient-id border-t border-b py-3 mb-6">
                    <h6 className="font-semibold text-gray-800 mb-2">Patient Details</h6>
                    <div className="flex justify-between text-sm">
                      <h6 className="font-semibold text-gray-900">{appt.PatientName}</h6>
                      <ul className="list-none p-0 flex space-x-4">
                        <li>{appt.Age}&nbsp;Y / &nbsp;{appt.Gender}</li>
                        <li>Patient / Appointment ID: PT000{appt.PatientId} / AT000{appt.AppointmentId}</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Appointment Notes (Vitals, Diagnosis, Suggestions, Lab Test) */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 border-b pb-1">Appointment Note</h3>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full md:w-1/2 px-2">
                            <h5 className="font-semibold text-base mb-2">Vitals</h5>
                            <ul className="list-none p-0 text-sm text-gray-700 space-y-1">
                                <li><span>Pulse Rate: </span>{appt.Vitals.PulseRate}&nbsp;Bpm</li>
                                <li><span>Temperature: </span>{appt.Vitals.Temperature}&nbsp;°C</li>
                                <li><span>GL: </span>{appt.Vitals.GL}&nbsp;mg/dl</li>
                                <li><span>BP: </span>{appt.Vitals.BP}&nbsp;mmHg</li>
                                <li><span>Spo2: </span>{appt.Vitals.Spo2}&nbsp;%</li>
                                <li><span>BSA: </span>{appt.Vitals.BSA}&nbsp;m²</li>
                                <li><span>Height: </span>{appt.Vitals.Height}&nbsp;cm</li>
                                <li><span>Weight: </span>{appt.Vitals.Weight}&nbsp;Kg</li>
                                <li><span>Body Mass Index: </span>{appt.Vitals.BMI}&nbsp;kg/m²</li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 px-2 space-y-4">
                            <div>
                                <h5 className="font-semibold text-base mb-2">Diagnosis</h5>
                                <p className="text-sm text-gray-700">{appt.Diagnosis}</p>
                            </div>
                            <div>
                                <h5 className="font-semibold text-base mb-2">Doctor Suggestions</h5>
                                <p className="text-sm text-gray-700">{appt.DoctorSuggestions}</p>
                            </div>
                            <div>
                                <h5 className="font-semibold text-base mb-2">Lab Test</h5>
                                <p className="text-sm text-gray-700">{appt.LabTest}</p>
                            </div>
                        </div>
                    </div>
                  </div>
                  
                  {/* Medicine Table */}
                  <div className="invoice-item mb-6">
                    <div className="table-responsive">
                      <table className="min-w-full border border-gray-300">
                        <thead>
                          <tr className='bg-gray-50'>
                            <th className={tableHeaderClass}>SNO.</th>
                            <th className={tableHeaderClass}>Medicine Name</th>
                            <th className={tableHeaderClass}>Dosage</th>
                            <th className={tableHeaderClass}>Duration</th>
                            <th className={tableHeaderClass}>Instruction</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockMedicineList.map((med, index) => (
                            <tr key={index}>
                              <td className={tableDataClass}>{index + 1}</td>
                              <td className={tableDataClass}>{med.MedicineName}</td>
                              <td className={tableDataClass}>{med.Dosage}</td>
                              <td className={tableDataClass}>{med.Duration}</td>
                              <td className={tableDataClass}>{med.Instruction}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="flex flex-wrap items-center pt-4 border-t border-gray-300">
                    <div className="w-1/2">
                        <h6 className="font-semibold text-gray-800 mb-2">Scan to download report</h6>
                        <img src="../assets/img/scan.png" alt="scan" className="h-24 w-24 border p-1" />
                    </div>
                    <div className="w-1/2 text-right">
                        <h6 className="font-semibold text-gray-800 mb-1">{appt.DoctorName}</h6>
                        <p className="text-sm text-gray-600">{appt.Qualification}</p>
                    </div>
                  </div>
                  
                  {/* Page Footer */}
                  <ul className="flex justify-center mt-4 text-xs text-gray-500 list-none p-0">
                    <li>Page 01 of 02 (Mock)</li>
                  </ul>
                  
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
        <title>Show Prescription - Admin</title>
      </Head>

      <PrescriptionModal />

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
                    <li className="text-gray-800 font-semibold">&nbsp;Show Prescription</li>
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
                        <a href="PatientList.aspx" className="text-gray-600 hover:text-blue-600">
                          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                        </a>
                        <h4 className="text-xl font-semibold">Appointment Details</h4>
                      </div>
                    </div>
                    
                    {/* Appointment Detail Card */}
                    <div className="appointment-details-wrap">
                      <div className="appointment-wrap appointment-detail-card border border-gray-200 rounded-lg p-4">
                        <ul className="list-none p-0 flex flex-col md:flex-row md:space-x-4">
                          {/* Doctor Info */}
                          <li className="p-4 border-b md:border-b-0 md:border-r border-gray-200 md:w-1/3">
                            <div className="flex items-start space-x-3">
                              <a href="#">
                                <img src={appt.DoctorImage} alt="Doctor" className="w-16 h-16 rounded-full object-cover"/>
                              </a>
                              <div className="patient-infos">
                                <p className="text-sm text-gray-500">APT000{appt.AppointmentId}</p>
                                <h6 className="text-lg font-semibold hover:text-blue-600">
                                  <a href="#">{appt.DoctorName}</a>
                                </h6>
                                <div className="mail-info-patient text-sm text-gray-600">
                                  <ul className="list-none p-0 space-y-1 mt-1">
                                    <li className="flex items-center"><FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 mr-2" />{appt.Email}</li>
                                    <li className="flex items-center"><FontAwesomeIcon icon={faPhone} className="w-3 h-3 mr-2" />{appt.Phone}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>

                          {/* Status & Fees */}
                          <li className="p-4 border-b md:border-b-0 md:border-r border-gray-200 md:w-1/3 flex flex-col justify-center items-center md:items-start space-y-2">
                            <div className="flex flex-col items-center md:items-start">
                              <span className="bg-green-600 text-white inline-block px-3 py-1 text-xs font-medium rounded-md">Completed</span>
                              <div className="mt-2 text-gray-700">
                                <h6 className="text-sm font-semibold flex items-center">
                                  Consultation Fees: 
                                  <FontAwesomeIcon icon={faIndianRupeeSign} className="w-3 h-3 mx-1" />
                                  <span className='font-bold'>{appt.ConsultationFee}</span>
                                </h6>
                              </div>
                              <a href="#" className='text-gray-500 hover:text-blue-600'>
                                <FontAwesomeIcon icon={faComments} className="w-4 h-4 mr-1" />
                                View Messages
                              </a>
                            </div>
                          </li>
                        </ul>

                        {/* Bottom Info Row */}
                        <ul className="list-none p-0 flex flex-wrap -mx-2 border-t border-gray-200">
                          <li className={`${detailBottomItemClass} px-2`}>
                            <h6 className="font-semibold mb-1 text-gray-700">Appointment Date &amp; Time</h6>
                            <span className="text-base text-gray-900">{formatDate(appt.AppointmentDate)} - {appt.AppointmentTime}</span>
                          </li>
                          <li className={`${detailBottomItemClass} px-2 flex items-center justify-center md:justify-end`}>
                            <button onClick={() => setIsPrescriptionModalOpen(true)} className={`btn bg-blue-600 text-white py-2 px-4 rounded-md transition ${btnPrimaryHoverClass} text-sm font-semibold`}>
                              View Prescription
                            </button>
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
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default AdminShowAppointmentPrescription;