// components/AdminPatientDetails.jsx
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
  faChevronLeft,
  faChevronRight,
  faArrowLeft,
  faMagnifyingGlass,
  faPenToSquare,
  faDownload,
  faTrashCan,
  faEye,
  faXmark,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faEye as farEye } from '@fortawesome/free-regular-svg-icons';

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
    sublinks: [
      { href: 'AddMedicine.aspx', label: 'Add Medicine' },
      { href: 'Medicines.aspx', label: 'Medicines' },
    ],
  },
  { href: 'AddDoctorSchedule.aspx', icon: faCalendarCheck, label: 'Add Schedule', active: false },
  { href: 'EditDoctorSchedule.aspx', icon: faPencil, label: 'Edit Schedule', active: false },
  { href: 'Profile.aspx', icon: faUser, label: 'Profile', active: false },
];

// Mock Patient Data
const mockPatient = {
  PID: 789,
  Name: 'Jane C. Doe',
  Image: '/path/to/patient_jane.jpg',
  Age: 32,
  Gender: 'Female',
  BloodGroup: 'O+',
  LastBookingDate: '25 Sep 2025',
};

// Mock Appointments Data
const mockAppointments = [
  { AppointmentId: 101, DoctorId: 1, DoctorImage: '/path/to/dr_a.jpg', Name: 'Dr. A Smith', AppointmentDate: '2025-11-01', ACreatedDate: '2025-10-20', ConsultationFee: 600, Status: 'Upcoming' },
  { AppointmentId: 102, DoctorId: 2, DoctorImage: '/path/to/dr_b.jpg', Name: 'Dr. B Jones', AppointmentDate: '2025-10-15', ACreatedDate: '2025-09-25', ConsultationFee: 750, Status: 'Completed' },
  { AppointmentId: 103, DoctorId: 3, DoctorImage: '/path/to/dr_c.jpg', Name: 'Dr. C Kelly', AppointmentDate: '2025-09-01', ACreatedDate: '2025-08-10', ConsultationFee: 500, Status: 'Cancelled' },
];

// Mock Medical Records Data
const mockMedicalRecords = [
  { RecordId: 1, MedRecordId: 'MR001', StartDate: '2025-09-05', HospitalName: 'City General', Symptoms: 'Fever & Headaches', MedReportFile: '/reports/report_1.pdf' },
  { RecordId: 2, MedRecordId: 'MR002', StartDate: '2025-06-10', HospitalName: 'St. Jude Clinic', Symptoms: 'Ankle Sprain', MedReportFile: '/reports/report_2.pdf' },
];

// --- Helper Functions ---

const formatDate = (dateString, format = 'dd MMM yyyy') => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(/,/g, '');
};

const getStatusBadge = (status) => {
  let classes = 'inline-block px-3 py-1 text-xs font-medium rounded-md';
  if (status === 'Upcoming') classes += ' bg-yellow-100 text-yellow-600';
  else if (status === 'Cancelled') classes += ' bg-red-100 text-red-600';
  else if (status === 'Completed') classes += ' bg-green-100 text-green-600';
  return <span className={classes}>{status}</span>;
};

// --- Main Component ---

const AdminPatientDetails = () => {
  const [activeTab, setActiveTab] = useState('prescription');
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: false });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [addForm, setAddForm] = useState({});
  const [editForm, setEditForm] = useState({});
  const patient = mockPatient;

  // --- Tailwind Class Mapping & Custom Styles ---
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const headerFixedClass = 'z-[111]';
  const formControlClass = 'mb-1 w-full p-2 border border-gray-300 rounded-md';
  const modalBackdropClass = 'fixed inset-0 bg-black bg-opacity-80 z-[1040]';
  const modalPopupClass = 'bg-white border-3 border-solid border-black pt-0 px-2 rounded-xl shadow-2xl';
  const delIconClass = 'w-11 h-11 flex items-center justify-center rounded-full bg-[#FFE8E8] text-red-600 text-2xl';
  const modalHeaderClass = 'flex justify-between items-center pb-4 pt-4 border-b border-gray-300';
  const btnCloseClass = 'w-6 h-6 rounded-full bg-[#465D7C] text-white flex items-center justify-center text-sm p-0 shadow-none';

  // --- Modal Handlers ---

  const openAddModal = () => setIsAddModalOpen(true);
  const openEditModal = (recordId) => {
    const record = mockMedicalRecords.find(r => r.RecordId === recordId);
    if (record) {
      setSelectedRecordId(recordId);
      // Pre-fill edit form with mock data
      setEditForm({ StartDate: record.StartDate, HospitalName: record.HospitalName, Symptoms: record.Symptoms, FileUpload2: null });
      setIsEditModalOpen(true);
    }
  };
  const openDeleteModal = (recordId) => {
    setSelectedRecordId(recordId);
    setIsDeleteModalOpen(true);
  };

  // Mock Form Submissions
  const handleAddRecord = (e) => {
    e.preventDefault();
    console.log('Adding medical record:', addForm);
    setIsAddModalOpen(false);
  };
  const handleUpdateRecord = (e) => {
    e.preventDefault();
    console.log('Updating medical record:', selectedRecordId, editForm);
    setIsEditModalOpen(false);
  };
  const handleDeleteRecord = () => {
    console.log('Deleting medical record:', selectedRecordId);
    setIsDeleteModalOpen(false);
  };

  const handleToggleSubmenu = (label) => {
    setShowSubmenu(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // --- Modal Components ---

  const AddMedicalRecordModal = () => {
    if (!isAddModalOpen) return null;
    // Simple controlled component changes for Add modal form
    const handleAddChange = (e) => {
        const { name, value, files } = e.target;
        setAddForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
    };

    return (
      <>
        <div className={modalBackdropClass} />
        <div className="fixed inset-0 flex items-center justify-center z-[1050]">
          <div className="modal-dialog modal-dialog-centered max-w-lg w-full">
            <div className={`${modalPopupClass} p-6`}>
              <div className={modalHeaderClass}>
                <h3 className="text-xl font-semibold">Add Medical Record</h3>
                <button type="button" className={btnCloseClass} onClick={() => setIsAddModalOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <form onSubmit={handleAddRecord}>
                <div className="modal-body">
                  <div className="flex flex-wrap -mx-2 mt-4">
                    <div className="w-full md:w-1/2 px-2 mb-2">
                      <label className="block text-sm font-medium mb-1">Start Date<span className="text-red-500">*</span></label>
                      <input type="date" name="txtDate" onChange={handleAddChange} className={formControlClass} required />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-2">
                      <label className="block text-sm font-medium mb-1">Hospital Name <span className="text-red-500">*</span></label>
                      <input type="text" name="txtHospitalName" onChange={handleAddChange} className={formControlClass} required />
                    </div>
                    <div className="w-full px-2 mb-2">
                      <label className="block text-sm font-medium mb-1">Symptoms <span className="text-red-500">*</span></label>
                      <input type="text" name="Symptoms" onChange={handleAddChange} className={formControlClass} required />
                    </div>
                    <div className="w-full px-2 mb-2">
                      <label className="block text-sm font-medium mb-1">Upload File <span className="text-red-500">*</span></label>
                      <input type="file" name="FileUpload1" onChange={handleAddChange} className={formControlClass} required />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                  <button type="button" className="btn bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Add Medical Record</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  const EditMedicalRecordModal = () => {
    if (!isEditModalOpen) return null;
    
    // Simple controlled component changes for Edit modal form
    const handleEditChange = (e) => {
        const { name, value, files } = e.target;
        setEditForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
    };

    return (
      <>
        <div className={modalBackdropClass} />
        <div className="fixed inset-0 flex items-center justify-center z-[1050]">
          <div className="modal-dialog modal-dialog-centered max-w-lg w-full">
            <div className={`${modalPopupClass} p-6`}>
              <div className={modalHeaderClass}>
                <h3 className="text-xl font-semibold">Edit Medical Record</h3>
                <button type="button" className={btnCloseClass} onClick={() => setIsEditModalOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <form onSubmit={handleUpdateRecord}>
                <div className="modal-body">
                  <div className="flex flex-wrap -mx-2 mt-4">
                    <div className="w-full md:w-1/2 px-2 mb-2">
                      <label className="block text-sm font-medium mb-1">Start Date<span className="text-red-500">*</span></label>
                      <input type="date" name="txtEStartDate" value={editForm.StartDate || ''} onChange={handleEditChange} className={formControlClass} required />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-2">
                      <label className="block text-sm font-medium mb-1">Hospital Name <span className="text-red-500">*</span></label>
                      <input type="text" name="txtEHospital" value={editForm.HospitalName || ''} onChange={handleEditChange} className={formControlClass} required />
                    </div>
                    <div className="w-full px-2 mb-2">
                      <label className="block text-sm font-medium mb-1">Symptoms <span className="text-red-500">*</span></label>
                      <input type="text" name="txtESymptoms" value={editForm.Symptoms || ''} onChange={handleEditChange} className={formControlClass} required />
                    </div>
                    <div className="w-full px-2 mb-2">
                      <label className="block text-sm font-medium mb-1">Upload File <span className="text-red-500">*</span></label>
                      <input type="file" name="FileUpload2" onChange={handleEditChange} className={formControlClass} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                  <button type="button" className="btn bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Edit Medical Record</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  const DeleteMedicalRecordModal = () => {
    if (!isDeleteModalOpen) return null;

    return (
      <>
        <div className={modalBackdropClass} />
        <div className="fixed inset-0 flex items-center justify-center z-[1050]">
          <div className="modal-dialog modal-dialog-centered max-w-sm">
            <div className={`bg-white rounded-lg shadow-xl p-6 ${modalPopupClass}`}>
              <div className="modal-body p-4 text-center">
                <span className={`mx-auto mb-4 ${delIconClass}`}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
                <h3 className="text-xl font-bold mb-2">Delete Record</h3>
                <p className="text-gray-600 mb-4">Are you sure you want to delete this record?</p>
                <div className="flex justify-center flex-wrap space-x-3 h-12">
                  <button type="button" className="btn bg-gray-700 text-white py-2 px-4 rounded-full hover:bg-gray-800 transition" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                  <button type="button" className="btn bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition" onClick={handleDeleteRecord}>Yes Delete</button>
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
        <title>Patient Details - Admin</title>
      </Head>

      <AddMedicalRecordModal />
      <EditMedicalRecordModal />
      <DeleteMedicalRecordModal />

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
                    <div className="appointment-patient">
                      
                      {/* Patient Info Header */}
                      <div className="dashboard-header mb-4 border-b pb-4">
                        <div className="flex items-center space-x-3">
                          <a href="PatientList.aspx" className="text-gray-600 hover:text-blue-600">
                            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                          </a>
                          <h4 className="text-xl font-semibold">Patient Details</h4>
                        </div>
                      </div>
                      
                      {/* Patient Profile Card */}
                      <div className="patient-wrap flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-6">
                        <div className="patient-info flex items-center space-x-4">
                          <img src={patient.Image} alt="Patient" className="w-20 h-20 rounded-full object-cover border" />
                          <div className="user-patient">
                            <h6 className="text-sm text-gray-500">PT000{patient.PID}</h6>
                            <h5 className="text-xl font-bold text-gray-900">{patient.Name}</h5>
                            <ul className="flex space-x-4 text-sm list-none p-0 mt-1">
                              <li><span>Years&nbsp;</span><span className='font-medium'>{patient.Age}</span></li>
                              <li><span className='font-medium'>{patient.Gender}</span></li>
                              <li><span className='font-medium'>{patient.BloodGroup}</span></li>
                            </ul>
                          </div>
                        </div>
                        <div className="patient-book text-right">
                          <p className="text-sm text-gray-500 flex items-center justify-end">
                            {/* Replaced 'isax isax-calendar-1' with FontAwesome icon placeholder */}
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            Last Booking 
                          </p>
                          <p className="font-semibold text-base mt-1">{patient.LastBookingDate}</p>
                        </div>
                      </div>

                      {/* Appointment Tabs */}
                      <div className="appointment-tabs user-tab mb-4 border-b border-gray-200">
                        <ul className="nav flex list-none p-0" role="tablist">
                          {['Appointments', 'Medical Records'].map((tabName, index) => {
                            const id = tabName === 'Appointments' ? 'prescription' : 'medical';
                            const isActive = activeTab === id;
                            return (
                              <li key={id} className="nav-item">
                                <button
                                  onClick={() => setActiveTab(id)}
                                  className={`py-2 px-4 text-sm font-medium border-b-2 transition ${
                                    isActive
                                      ? 'border-blue-600 text-blue-600'
                                      : 'border-transparent text-gray-500 hover:text-blue-600'
                                  }`}
                                  role="tab"
                                >
                                  {tabName}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {/* /Appoitment Tabs */}

                      <div className="tab-content pt-0">
                        
                        {/* Appointments Tab Content */}
                        <div className={`tab-pane fade ${activeTab === 'prescription' ? 'active show block' : 'hidden'}`} id="prescription" role="tabpanel">
                          
                          {/* Search Bar */}
                          <div className="flex justify-between items-center mb-4">
                            <div className="relative w-1/3 min-w-40">
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-md pr-10" placeholder="Search" />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" /></span>
                            </div>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appt Date</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {mockAppointments.map((appt) => (
                                  <tr key={appt.AppointmentId}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm"><a className="text-blue-600 hover:underline" href="#">APT000{appt.AppointmentId}</a></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                      <div className="flex items-center">
                                        <a href={`Doctorprofile.aspx?DoctorId=${appt.DoctorId}`} className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                          <img className="w-full h-full object-cover rounded-full" src={appt.DoctorImage} alt="Doctor Image" />
                                        </a>
                                        <a href={`Doctorprofile.aspx?DoctorId=${appt.DoctorId}`} className="hover:text-blue-600">{appt.Name}</a>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(appt.AppointmentDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(appt.ACreatedDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">₹ {appt.ConsultationFee}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                      <div className="detail-badge-info">{getStatusBadge(appt.Status)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                      {/* Action Buttons */}
                                      {appt.Status === 'Completed' && (
                                        <a href={`ShowAppointmentPrescription.aspx?AppointmentId=${appt.AppointmentId}`} className="btn bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md transition">
                                          <FontAwesomeIcon icon={farEye} className="w-3 h-3" />
                                        </a>
                                      )}
                                      {appt.Status === 'Cancelled' && (
                                        <a href={`CancelAppointment.aspx?AppointmentId=${appt.AppointmentId}`} className="btn bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md transition">
                                          <FontAwesomeIcon icon={farEye} className="w-3 h-3" />
                                        </a>
                                      )}
                                      {appt.Status === 'Upcoming' && (
                                        <a href={`UpcomingAppointment.aspx?AppointmentId=${appt.AppointmentId}`} className="btn bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md transition">
                                          <FontAwesomeIcon icon={farEye} className="w-3 h-3" />
                                        </a>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          
                          {/* Pagination Placeholder */}
                          <div className="flex justify-end mt-4">
                            <ul className="flex space-x-1 text-sm list-none p-0">
                              <li><a href="#" className="page-link px-3 py-1 border border-gray-300 rounded-l-md text-blue-600 hover:bg-gray-100"><FontAwesomeIcon icon={faChevronLeft} /></a></li>
                              <li><a href="#" className="page-link px-3 py-1 border border-gray-300 text-blue-600 hover:bg-gray-100">1</a></li>
                              <li><a href="#" className="page-link px-3 py-1 border border-gray-300 bg-blue-600 text-white font-semibold">2</a></li>
                              <li><a href="#" className="page-link px-3 py-1 border border-gray-300 text-blue-600 hover:bg-gray-100">3</a></li>
                              <li><a href="#" className="page-link px-3 py-1 border border-gray-300 text-blue-600 hover:bg-gray-100">...</a></li>
                              <li><a href="#" className="page-link px-3 py-1 border border-gray-300 rounded-r-md text-blue-600 hover:bg-gray-100"><FontAwesomeIcon icon={faChevronRight} /></a></li>
                            </ul>
                          </div>
                        </div>
                        {/* /Appointments Tab Content */}

                        {/* Medical Records Tab Content */}
                        <div className={`tab-pane fade ${activeTab === 'medical' ? 'active show block' : 'hidden'}`} id="medical" role="tabpanel">
                          
                          {/* Search & Add Button */}
                          <div className="flex justify-between items-center mb-4">
                            <div className="relative w-1/3 min-w-40">
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-md pr-10" placeholder="Search" />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" /></span>
                            </div>
                            <button type="button" onClick={openAddModal} className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                              Add Medical Record
                            </button>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRecordId</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symptoms</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {mockMedicalRecords.map((record) => (
                                  <tr key={record.RecordId}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{record.MedRecordId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(record.StartDate, 'dd/MM/yyyy')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{record.HospitalName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{record.Symptoms}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-2">
                                      <button onClick={() => openEditModal(record.RecordId)} className="btn bg-green-100 text-green-600 hover:bg-green-200 p-2 rounded-md transition">
                                        <FontAwesomeIcon icon={faPenToSquare} className="w-3 h-3" />
                                      </button>
                                      <a href={record.MedReportFile} download className="btn bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md transition">
                                        <FontAwesomeIcon icon={faDownload} className="w-3 h-3" />
                                      </a>
                                      <button onClick={() => openDeleteModal(record.RecordId)} className="btn bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-md transition">
                                        <FontAwesomeIcon icon={faTrashCan} className="w-3 h-3" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {/* Pagination Placeholder */}
                          <div className="flex justify-end mt-4">
                            <ul className="flex space-x-1 text-sm list-none p-0">
                              {/* Pagination links here */}
                            </ul>
                          </div>
                        </div>
                        {/* /Medical Records Tab Content */}
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

export default AdminPatientDetails;