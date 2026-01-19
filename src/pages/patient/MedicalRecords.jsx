// components/MedicalRecords.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShapes,
  faUserDoctor,
  faCalendarCheck,
  faShieldHalved,
  faMoneyBill1,
  faFileLines,
  faUserPen,
  faKey,
  faLockOpen,
  faTimes,
  faMagnifyingGlass,
  faPenToSquare,
  faDownload,
  faTrashCan,
  faXmark,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

// Mock Data (Replaces C# server-side data/logic)
const mockPatient = {
  name: 'John Doe',
  patientId: 'PID12345',
  gender: 'Male',
  age: '45 yrs',
  image: '/path/to/patient/img.jpg', // Placeholder image source
};

const mockRecords = [
  {
    RecordId: 1,
    MedRecordId: 'MR001',
    StartDate: '2025-05-10',
    HospitalName: 'City General',
    Symptoms: 'Fever, cough',
    MedReportFile: '/path/to/report1.pdf',
  },
  {
    RecordId: 2,
    MedRecordId: 'MR002',
    StartDate: '2025-07-22',
    HospitalName: 'Apex Clinic',
    Symptoms: 'Severe headache',
    MedReportFile: '/path/to/report2.pdf',
  },
  {
    RecordId: 3,
    MedRecordId: 'MR003',
    StartDate: '2025-09-01',
    HospitalName: 'Wellness Center',
    Symptoms: 'Sprained ankle',
    MedReportFile: '/path/to/report3.pdf',
  },
];

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '/');
};


const MedicalRecords = () => {
  // State for Modals and Data
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(mockRecords);

  // --- Modal Form States (simplified for demonstration)
  const [addForm, setAddForm] = useState({ date: '', hospital: '', symptoms: '', file: null });
  const [editForm, setEditForm] = useState({ date: '', hospital: '', symptoms: '', file: null });

  // --- Event Handlers for UI (Replaces ASP.NET events and logic)

  // Client-side Search Logic (replaces the jQuery function)
  useEffect(() => {
    if (!searchTerm) {
      setFilteredRecords(mockRecords);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = mockRecords.filter((record) => {
      // Check if any searchable field contains the search term
      return (
        record.MedRecordId.toLowerCase().includes(lowerCaseSearch) ||
        formatDate(record.StartDate).toLowerCase().includes(lowerCaseSearch) ||
        record.HospitalName.toLowerCase().includes(lowerCaseSearch) ||
        record.Symptoms.toLowerCase().includes(lowerCaseSearch)
      );
    });
    setFilteredRecords(results);
  }, [searchTerm]);

  const handleLogout = () => {
    console.log('Logging out...');
    // Actual logout logic (e.g., clearing auth token, redirect) goes here
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    console.log('Adding medical record:', addForm);
    // Add logic to save data to backend/state
    setIsAddModalOpen(false);
    // Reset form fields
    setAddForm({ date: '', hospital: '', symptoms: '', file: null });
  };

  const handleEditRecord = (e) => {
    e.preventDefault();
    console.log('Updating medical record:', selectedRecordId, editForm);
    // Add logic to update data in backend/state
    setIsEditModalOpen(false);
    setSelectedRecordId(null);
  };

  const handleDeleteRecord = () => {
    console.log('Deleting medical record:', selectedRecordId);
    // Add logic to delete data in backend/state
    setIsDeleteModalOpen(false);
    setSelectedRecordId(null);
  };

  const openEditModal = (recordId) => {
    const record = mockRecords.find(r => r.RecordId === recordId);
    if (record) {
      setEditForm({
        date: record.StartDate,
        hospital: record.HospitalName,
        symptoms: record.Symptoms,
        file: null, // File upload usually can't be pre-filled
      });
      setSelectedRecordId(recordId);
      setIsEditModalOpen(true);
    }
  };

  const openDeleteModal = (recordId) => {
    setSelectedRecordId(recordId);
    setIsDeleteModalOpen(true);
  };


  // Tailwind Classes mapping to original CSS/Bootstrap styles

  // .header.header-fixed
  const headerFixed = 'z-[111]';

  // .form-control + margin-bottom:5px !important;
  const formControl = 'mb-1';

  // .modalBack
  const modalBackdropClass = 'fixed inset-0 bg-black opacity-80 z-[1040]';

  // .modalPopup
  const modalPopupClass = 'bg-white border-3 border-solid border-black pt-0 px-2 rounded-xl shadow-2xl';

  // .del-icon
  const delIcon = 'w-11 h-11 flex items-center justify-center rounded-full bg-[#FFE8E8] text-red-600 text-2xl';

  // --- Reusable Modal Components ---

  const AddMedicalRecordModal = () => {
    if (!isAddModalOpen) return null;

    return (
      <>
        <div className={modalBackdropClass} />
        <div className="fixed inset-0 flex items-center justify-center z-[1050]">
          <div className="modal-dialog modal-dialog-centered max-w-lg w-full">
            <div className={`modal-content ${modalPopupClass}`}>
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">Add Medical Record</h3>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-900"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xl" />
                </button>
              </div>
              <form onSubmit={handleAddRecord}>
                <div className="modal-body p-4">
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-2">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="txtDate">
                          Start Date<span className="text-red-600">*</span>
                        </label>
                        <input
                          id="txtDate"
                          type="date"
                          className={`w-full p-2 border border-gray-300 rounded-md ${formControl}`}
                          required
                          value={addForm.date}
                          onChange={(e) => setAddForm({ ...addForm, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-1">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="txtHospitalName">
                          Hospital Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="txtHospitalName"
                          type="text"
                          className={`w-full p-2 border border-gray-300 rounded-md ${formControl}`}
                          required
                          value={addForm.hospital}
                          onChange={(e) => setAddForm({ ...addForm, hospital: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full px-2 mb-1">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="Symptoms">
                          Symptoms <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="Symptoms"
                          type="text"
                          className={`w-full p-2 border border-gray-300 rounded-md ${formControl}`}
                          required
                          value={addForm.symptoms}
                          onChange={(e) => setAddForm({ ...addForm, symptoms: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full px-2 mb-1">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="FileUpload1">
                          Upload File <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="FileUpload1"
                          type="file"
                          className={`w-full p-2 border border-gray-300 rounded-md ${formControl}`}
                          required
                          onChange={(e) => setAddForm({ ...addForm, file: e.target.files[0] })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border-t">
                  <button
                    type="button"
                    className="btn bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    Add Medical Record
                  </button>
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

    const currentRecord = mockRecords.find(r => r.RecordId === selectedRecordId) || {};

    return (
      <>
        <div className={modalBackdropClass} />
        <div className="fixed inset-0 flex items-center justify-center z-[1050]">
          <div className="modal-dialog modal-dialog-centered max-w-lg w-full">
            <div className={`modal-content ${modalPopupClass}`}>
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">Edit Medical Record</h3>
                {/* HiddenField is replaced by state 'selectedRecordId' */}
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-900"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xl" />
                </button>
              </div>
              <form onSubmit={handleEditRecord}>
                <div className="modal-body p-4">
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-2">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="txtEStartDate">
                          Start Date<span className="text-red-600">*</span>
                        </label>
                        <input
                          id="txtEStartDate"
                          type="date"
                          className={`w-full p-2 border border-gray-300 rounded-md ${formControl}`}
                          required
                          value={editForm.date || currentRecord.StartDate || ''}
                          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-1">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="txtEHospital">
                          Hospital Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="txtEHospital"
                          type="text"
                          className={`w-full p-2 border border-gray-300 rounded-md ${formControl}`}
                          required
                          value={editForm.hospital || currentRecord.HospitalName || ''}
                          onChange={(e) => setEditForm({ ...editForm, hospital: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full px-2 mb-1">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="txtESymptoms">
                          Symptoms <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="txtESymptoms"
                          type="text"
                          className={`w-full p-2 border border-gray-300 rounded-md ${formControl}`}
                          required
                          value={editForm.symptoms || currentRecord.Symptoms || ''}
                          onChange={(e) => setEditForm({ ...editForm, symptoms: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full px-2 mb-1">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="FileUpload2">
                          Upload File <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="FileUpload2"
                          type="file"
                          className={`w-full p-2 border border-gray-300 rounded-md ${formControl}`}
                          required={!currentRecord.MedReportFile} // Require file if none exists
                          onChange={(e) => setEditForm({ ...editForm, file: e.target.files[0] })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border-t">
                  <button
                    type="button"
                    className="btn bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    Edit Medical Record
                  </button>
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
            <div className="bg-white rounded-lg shadow-xl">
              <div className="p-6 text-center">
                <span className={`mx-auto mb-4 ${delIcon}`}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
                <h3 className="text-xl font-bold mb-2">Delete Record</h3>
                <p className="text-gray-600 mb-4">Are you sure you want to delete this record?</p>
                <div className="flex justify-center flex-wrap gap-3 h-12">
                  <button
                    type="button"
                    className="btn bg-gray-700 text-white py-2 px-4 rounded-full hover:bg-gray-800 transition"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
                    onClick={handleDeleteRecord}
                  >
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // The entire ASPX content is now wrapped in the main React component
  return (
    <>
      <Head>
        <title>Medical Records</title>
        {/* External CSS/JS would be managed via Next.js <Link> or global styles in a real app */}
      </Head>

      {/* Modals are rendered here using conditional rendering */}
      <AddMedicalRecordModal />
      <EditMedicalRecordModal />
      <DeleteMedicalRecordModal />

      <div className="min-h-screen bg-gray-50">
        {/* Main Wrapper */}
        <div className="main-wrapper">
          {/* Header */}
          <header className={`header header-custom header-one fixed w-full top-0 ${headerFixed} bg-white shadow-md`}>
            <div className="container mx-auto px-4">
              <nav className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <button id="mobile_btn" className="lg:hidden text-gray-800 mr-4">
                    <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
                    <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
                    <span className="block w-6 h-0.5 bg-gray-800"></span>
                  </button>
                  <a href="../Default.aspx" className="navbar-brand logo">
                    {/* Placeholder for logo */}
                    <img src="../assets/img/logo-01.svg" className="max-h-8" alt="Logo" />
                  </a>
                </div>

                <div className="hidden lg:block">
                  <ul className="flex space-x-6 main-nav">
                    <li className="font-semibold text-blue-600">
                      <a href="../Default.aspx">Home</a>
                    </li>
                    <li>
                      <a href="../Contact.aspx" className="hover:text-blue-600">Contact Us</a>
                    </li>
                    <li>
                      <a href="../About.aspx" className="hover:text-blue-600">About Us</a>
                    </li>
                    {/* Simplified login/signup handling */}
                  </ul>
                </div>

                <ul className="flex items-center space-x-4">
                  <li className="hidden sm:block">
                    <a href="../Signup.aspx" className="btn bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition">
                      <i className="feather-user mr-2"></i>Register
                    </a>
                  </li>
                  <li className="hidden sm:block">
                    {/* HyperLink and LinkButton logic condensed */}
                    <a href="../Login.aspx" className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                      <i className="feather-lock mr-2"></i>Login
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                      <FontAwesomeIcon icon={faLockOpen} className="w-4 h-4 mr-2" />
                      Log Out
                    </button>
                  </li>

                  {/* User Menu Dropdown */}
                  <li className="relative">
                    <button className="dropdown-toggle nav-link p-0 flex items-center">
                      <span className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={mockPatient.image} className="w-full h-full object-cover" alt="User Image" />
                      </span>
                    </button>
                    {/* Actual dropdown menu would require state for visibility */}
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden">
                      <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="../Patients/Dashboard.aspx">Dashboard</a>
                      <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="../Patients/Profile.aspx">Profile Settings</a>
                      <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  </li>
                  {/* /User Menu */}
                </ul>
              </nav>
            </div>
          </header>
          {/* /Header */}

          <div className="pt-24"> {/* Added padding top to account for fixed header */}
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-6">
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center inner-banner">
                  <h2 className="text-2xl font-bold mb-2">Medical Records</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="flex space-x-2 text-sm text-gray-500">
                      <li className="breadcrumb-item">
                        <a href="../Default.aspx" className="hover:text-blue-600">Home</a>
                      </li>
                      <li className="breadcrumb-item text-blue-600" aria-current="page">
                        Medical Records
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/* /Breadcrumb */}

            {/* Page Content */}
            <div className="content py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                  {/* Profile Sidebar */}
                  <div className="w-full lg:w-1/3 xl:w-1/4 px-4 mb-8 lg:mb-0">
                    <div className="bg-white shadow-lg rounded-lg profile-sidebar">
                      <div className="p-4 border-b">
                        <div className="flex items-center">
                          <a href="Profile.aspx" className="w-16 h-16 rounded-full overflow-hidden mr-4">
                            <img src={mockPatient.image} alt="Patient Profile" className="w-full h-full object-cover" />
                          </a>
                          <div>
                            <a href="Profile.aspx" className="text-lg font-semibold text-black hover:text-blue-600">
                              {mockPatient.name}
                            </a>
                            <p className="text-sm text-gray-600">{mockPatient.patientId}</p>
                            <span className="text-sm text-gray-600 mr-2">{mockPatient.gender}</span>
                            <span className="text-sm text-gray-600">{mockPatient.age}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <nav className="dashboard-menu">
                          <ul>
                            {[
                              { href: 'Dashboard.aspx', icon: faShapes, label: 'Dashboard' },
                              { href: 'Doctors.aspx', icon: faUserDoctor, label: 'Doctors' },
                              { href: 'BookedAppointment.aspx', icon: faCalendarCheck, label: 'My Appointment' },
                              { href: 'DoctorsSuggestion.aspx', icon: faShieldHalved, label: 'Doctor Suggestions' },
                              {
                                href: 'MedicalRecords.aspx',
                                icon: faMoneyBill1,
                                label: 'Add Medical Records',
                                active: true,
                              },
                              { href: 'Vital.aspx', icon: faShieldHalved, label: 'Vitals' },
                              { href: 'Receipt.aspx', icon: faFileLines, label: 'Receipts' },
                              { href: 'Profile.aspx', icon: faUserPen, label: 'Profile Settings' },
                              { href: 'Changepassword.aspx', icon: faKey, label: 'Change Password' },
                            ].map((item) => (
                              <li key={item.label} className="mb-1">
                                <a
                                  href={item.href}
                                  className={`flex items-center p-2 rounded-lg transition ${
                                    item.active
                                      ? 'bg-blue-100 text-blue-600 font-semibold'
                                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                  }`}
                                >
                                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                                  <span>{item.label}</span>
                                </a>
                              </li>
                            ))}
                            <li>
                              <button
                                onClick={handleLogout}
                                className="w-full text-left flex items-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                              >
                                <FontAwesomeIcon icon={faCalendarCheck} className="w-4 h-4 mr-3" />
                                <span>Logout</span>
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                  {/* /Profile Sidebar */}

                  <div className="w-full lg:w-2/3 xl:w-3/4 px-4">
                    <div className="mb-6 border-b pb-4">
                      <h3 className="text-2xl font-bold">Records</h3>
                      {/* Nav tabs (Medical Records is the only one present in this code) */}
                      <div className="mt-2">
                        <ul className="flex">
                          <li>
                            <button
                              className="py-2 px-4 border-b-2 border-blue-600 text-blue-600 font-semibold"
                            >
                              Medical Records
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="tab-content pt-0">
                      {/* Medical Records Tab */}
                      <div className="tab-pane fade show active" id="medical">
                        {/* Search and Add Button */}
                        <div className="flex justify-between items-center mb-4 h-[52px]">
                          <div className="relative w-1/3 min-w-40">
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md pr-10"
                              placeholder="Search"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
                            </span>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                              onClick={() => setIsAddModalOpen(true)}
                            >
                              Add Medical Record
                            </button>
                          </div>
                        </div>

                        {/* Medical Records Table */}
                        <div className="custom-table bg-white shadow-lg rounded-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    MRecordId
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hospital Name
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Symptoms
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {filteredRecords.map((record) => (
                                  <tr key={record.RecordId} className="searchname">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 searchable">
                                      {record.MedRecordId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 searchable">
                                      {formatDate(record.StartDate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 searchable">
                                      {record.HospitalName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 searchable">
                                      {record.Symptoms}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                      <div className="flex space-x-2">
                                        <button
                                          type="button"
                                          onClick={() => openEditModal(record.RecordId)}
                                          className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                        >
                                          <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4" />
                                        </button>
                                        <a
                                          href={record.MedReportFile}
                                          download
                                          target="_blank"
                                          className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                        >
                                          <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() => openDeleteModal(record.RecordId)}
                                          className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-red-600 hover:bg-red-50 transition"
                                        >
                                          <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
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
                      {/* /Medical Records Tab */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Content */}
          </div>


          {/* Footer Section */}
          <footer className="bg-gray-800 text-white pt-8 pb-4">
            <div className="container mx-auto px-4">
              <div className="border-b border-gray-700 pb-6 mb-6 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <a href="../Default.aspx">
                    <img src="../assets/img/logo.png" alt="logo" className="h-8" />
                  </a>
                  <p className="mt-2 text-sm text-gray-400 max-w-sm">
                    Doccure is one of India’s most trusted pharmacies, dispensing quality medicines at reasonable prices to over 9 million happy customers
                  </p>
                </div>
              </div>

              <div className="border-b border-gray-700 pb-6 mb-6">
                <div className="flex flex-wrap -mx-4">
                  {/* Footer Links Column 1 */}
                  <div className="w-1/2 sm:w-1/4 lg:w-1/6 px-4 mb-6">
                    <div className="footer-links">
                      <h4 className="text-lg font-semibold mb-3">Company</h4>
                      <ul className="text-sm space-y-2 text-gray-400">
                        <li><a href="../Shared/About.aspx" className="hover:text-white transition">About Doccure</a></li>
                        <li><a href="#" className="hover:text-white transition">Customers Speak</a></li>
                        <li><a href="#" className="hover:text-white transition">In the News</a></li>
                        <li><a href="#" className="hover:text-white transition">Career</a></li>
                        <li><a href="../Shared/Contact.aspx" className="hover:text-white transition">Contact</a></li>
                      </ul>
                    </div>
                  </div>
                  {/* Footer Links Column 2 */}
                  <div className="w-1/2 sm:w-1/4 lg:w-1/6 px-4 mb-6">
                    <div className="footer-links">
                      <h4 className="text-lg font-semibold mb-3">Shopping</h4>
                      <ul className="text-sm space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Browse by A-Z</a></li>
                        <li><a href="#" className="hover:text-white transition">Browse by Manufacturers</a></li>
                        <li><a href="#" className="hover:text-white transition">Health Articles</a></li>
                        <li><a href="#" className="hover:text-white transition">Offers / Coupons</a></li>
                        <li><a href="faq.html" className="hover:text-white transition">FAQs</a></li>
                      </ul>
                    </div>
                  </div>
                  {/* Footer Links Column 3 */}
                  <div className="w-1/2 sm:w-1/4 lg:w-1/6 px-4 mb-6">
                    <div className="footer-links">
                      <h4 className="text-lg font-semibold mb-3">Our Policies</h4>
                      <ul className="text-sm space-y-2 text-gray-400">
                        <li><a href="terms-condition.html" className="hover:text-white transition">Terms and Conditions</a></li>
                        <li><a href="privacy-policy.html" className="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition">Fees and Payments</a></li>
                        <li><a href="#" className="hover:text-white transition">Shipping and Delivery</a></li>
                        <li><a href="#" className="hover:text-white transition">Return, Refund</a></li>
                      </ul>
                    </div>
                  </div>
                  {/* Footer Links Column 4 */}
                  <div className="w-1/2 sm:w-1/4 lg:w-1/6 px-4 mb-6">
                    <div className="footer-links">
                      <h4 className="text-lg font-semibold mb-3">Our Services</h4>
                      <ul className="text-sm space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Order Medicines</a></li>
                        <li><a href="#" className="hover:text-white transition">Book Lab Tests</a></li>
                        <li><a href="#" className="hover:text-white transition">Consult a Doctor</a></li>
                        <li><a href="#" className="hover:text-white transition">Ayurveda Articles</a></li>
                        <li><a href="#" className="hover:text-white transition">Careers</a></li>
                      </ul>
                    </div>
                  </div>
                  {/* Newsletter and App Links */}
                  <div className="w-full lg:w-1/3 px-4 mb-6">
                    <div className="footer-links">
                      <h4 className="text-lg font-semibold mb-3">Subscribe to Newsletter</h4>
                      <div className="flex mb-4">
                        <input
                          type="email"
                          className="form-control w-full p-2 rounded-l-md border-none text-gray-800"
                          placeholder="Enter Email Address"
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition">
                          Submit
                        </button>
                      </div>
                      <div className="flex space-x-3">
                        <a href="#">
                          <img src="../assets/img/icons/app-store.svg" alt="App Store" />
                        </a>
                        <a href="#">
                          <img src="../assets/img/icons/google-play.svg" alt="Google Play" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods and Social Icons */}
              <div className="flex flex-col md:flex-row justify-between items-center py-4 border-t border-gray-700">
                <div className="mb-4 md:mb-0">
                  <ul className="flex space-x-3">
                    <li><img src="../assets/img/icons/payment-icon-01.svg" alt="Payment 1" /></li>
                    <li><img src="../assets/img/icons/payment-icon-02.svg" alt="Payment 2" /></li>
                    <li><img src="../assets/img/icons/payment-icon-03.svg" alt="Payment 3" /></li>
                    <li><img src="../assets/img/icons/payment-icon-04.svg" alt="Payment 4" /></li>
                  </ul>
                </div>
                <div>
                  <ul className="flex space-x-4 text-xl">
                    <li><a href="#" className="hover:text-blue-500 transition"><i className="fa-brands fa-facebook-f"></i></a></li>
                    <li><a href="#" className="hover:text-blue-500 transition"><i className="fa-brands fa-twitter"></i></a></li>
                    <li><a href="#" className="hover:text-blue-500 transition"><i className="fa-brands fa-linkedin-in"></i></a></li>
                    <li><a href="#" className="hover:text-blue-500 transition"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="#" className="hover:text-blue-500 transition"><i className="fa-brands fa-dribbble"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-4 border-t border-gray-700 pt-4">
              <div className="text-center text-sm text-gray-400">
                <p>Copyright &copy; {new Date().getFullYear()} Doccure. All Rights Reserved</p>
              </div>
            </div>
          </footer>
          {/* /Footer Section */}
        </div>
        {/* /Main Wrapper */}
      </div>
    </>
  );
};

export default MedicalRecords;