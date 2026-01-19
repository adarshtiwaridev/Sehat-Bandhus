// components/PatientDashboard.jsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  faHeart,
  faTemperatureHigh,
  faNotesMedical,
  faHighlighter,
  faSyringe,
  faCirclePlus,
  faCalendarPlus,
  faHospital,
  faClock,
  faChevronRight,
  faCalendarDays,
  faEye,
  faPenToSquare,
  faDownload,
  faTrashCan,
  faLink,
  faXmark,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import * as html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Head from 'next/head';
import { useSelector } from 'react-redux';

// Mock Data for demonstration (replaces server-side data from C#)
const mockPatient = {
  name: 'John Doe',
  patientId: 'PID12345',
  gender: 'Male',
  age: '45 yrs',
  image: '/path/to/patient/img.jpg',
};

const mockVitals = {
  HeartRate: '85.00',
  Temp: '36.8',
  GL: '90', // Simplified for logic check
  Spo2: '98',
  BP: '120/80', // Simplified for logic check
  BMI: '22.5',
  ReportGeneratedDate: '15 Sep 2025',
};

const mockFavorites = [
  {
    DoctorId: 1,
    DoctorImage: '/path/to/doctor1.jpg',
    Name: 'Dr. Jane Smith',
    Specialization: 'Cardiologist',
  },
  {
    DoctorId: 2,
    DoctorImage: '/path/to/doctor2.jpg',
    Name: 'Dr. Robert Brown',
    Specialization: 'Neurologist',
  },
];

const mockAppointments = [
  {
    AppointmentId: 101,
    DoctorId: 1,
    DoctorImage: '/path/to/doctor1.jpg',
    Name: 'Dr. Jane Smith',
    Specialization: 'Cardiologist',
    AppointmentDate: new Date(2025, 10, 20),
    StartTime: '10:00 AM',
    Status: 'Upcoming',
    ConsultationFee: 500,
    ACreatedDate: new Date(2025, 9, 10),
  },
  {
    AppointmentId: 102,
    DoctorId: 3,
    DoctorImage: '/path/to/doctor3.jpg',
    Name: 'Dr. Alan White',
    Specialization: 'Dermatologist',
    AppointmentDate: new Date(2025, 9, 1),
    StartTime: '02:00 PM',
    Status: 'Completed',
    ConsultationFee: 750,
    ACreatedDate: new Date(2025, 8, 25),
  },
];

const mockMedicalRecords = [
  {
    RecordId: 1,
    MedRecordId: 'MR001',
    StartDate: new Date(2025, 8, 1),
    HospitalName: 'City General',
    Symptoms: 'Fever, cough',
    MedReportFile: '/path/to/report1.pdf',
  },
];

const mockReceipts = [
  {
    RID: 501,
    ReceiptId: 'R000501',
    DoctorId: 3,
    DoctorImage: '/path/to/doctor3.jpg',
    Name: 'Dr. Alan White',
    AppointmentDate: new Date(2025, 9, 1),
    AppointmentCreatedDate: new Date(2025, 8, 25),
    ConsulationFee: 750,
    AppointmentTime: '02:00 PM',
    Speciality: 'Dermatologist',
    PName: 'John Doe',
    PAge: '45',
    PEmail: 'john.doe@example.com',
    PMobile: 'XX-XX-XX-XX-XX',
    PAddress: '123 Main St, City',
    PGender: 'Male',
    Symptoms: 'Skin rash',
    PaymentMethod: 'Credit Card',
    TotalFees: 750,
  },
];

// Helper function for date formatting
const formatDate = (date, format) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

const PatientDashboard = () => {
  // State for Modals
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [healthData, setHealthData] = useState({
    percent: 0,
    status: 'No Data',
  });
  const { user } = useSelector((state) => state.auth);

  // Replaces the `OverallHealth()` JQuery function
  const calculateOverallHealth = useCallback(() => {
    let point = 0;
    const totalpoints = 6;
    const { HeartRate, Temp, GL, Spo2, BP, BMI } = mockVitals;

    if (parseFloat(HeartRate) >= 60.0 && parseFloat(HeartRate) <= 100.0) {
      point++;
    }
    if (parseFloat(Temp) >= 36.1 && parseFloat(Temp) <= 37.2) {
      point++;
    }
    // Simplistic string matching for glucose and BP as in the original code
    if (GL === '70-99') {
      point++;
    }
    if (parseFloat(Spo2) >= 95 && parseFloat(Spo2) <= 100) {
      point++;
    }
    if (BP === '120/80') {
      point++;
    }
    if (parseFloat(BMI) >= 18.4 && parseFloat(BMI) <= 24.9) {
      point++;
    }

    const totalHealthPer = Math.round((point / totalpoints) * 100);
    const healthStatus = totalHealthPer === 100 ? 'Normal' : 'Abnormal';

    setHealthData({
      percent: totalHealthPer,
      status: healthStatus,
    });
  }, []);

  useEffect(() => {
    calculateOverallHealth();
  }, [calculateOverallHealth]);

  // Replaces the `downloadReceipt()` JavaScript function
  const downloadReceipt = async (event) => {
    event.preventDefault();
    if (!selectedReceipt) return;

    // Use a delay to ensure modal is fully rendered if it were real
    await new Promise((resolve) => setTimeout(resolve, 50));

    const receipt = document.getElementById('Print-Receipt');
    if (receipt) {
      try {
        const canvas = await html2canvas.default(receipt, {
          scale: 1,
          useCORS: true,
          willReadFrequently: true,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.7);
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4',
          compress: true,
        });
        pdf.addImage(imgData, 'jpeg', 0, 0, imgWidth, imgHeight);
        pdf.save(`receipt_${selectedReceipt.ReceiptId}.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }

    // This part of the original logic navigates away after download, which is unusual
    // In React, we'll just close the modal for a better UX.
    setTimeout(() => {
      setIsReceiptModalOpen(false);
      setSelectedReceipt(null);
      // window.location.href = "/Patients/Dashboard.aspx"; // Original redirect
    }, 1000);
  };

  // Handlers for modal opening
  const handleViewReceipt = (receipt) => {
    setSelectedReceipt(receipt);
    setIsReceiptModalOpen(true);
  };

  const handleEditMedicalRecord = (recordId) => {
    setSelectedRecordId(recordId);
    // In a real app, you'd fetch the record data here to pre-fill the form
    setIsEditModalOpen(true);
  };

  const handleDeleteMedicalRecord = (recordId) => {
    setSelectedRecordId(recordId);
    setIsDeleteModalOpen(true);
  };

  // Handlers for mock server actions (replaces C# events)
  const handleLogout = () => {
    console.log('Logging out...');
    // Replace with actual logout logic (e.g., clearing auth token, redirect)
  };

  const handleUpdateRecord = (e) => {
    e.preventDefault();
    console.log('Updating medical record:', selectedRecordId);
    // Replace with actual form submission/update logic
    setIsEditModalOpen(false);
  };

  const handleDeleteRecord = () => {
    console.log('Deleting medical record:', selectedRecordId);
    // Replace with actual delete logic
    setIsDeleteModalOpen(false);
  };

  const EditMedicalRecordModal = () => {
    // Mock record retrieval based on selectedRecordId
    const record = mockMedicalRecords.find(r => r.RecordId === selectedRecordId) || {};
    const [startDate, setStartDate] = useState(record.StartDate ? record.StartDate.toISOString().split('T')[0] : '');
    const [hospitalName, setHospitalName] = useState(record.HospitalName || '');
    const [symptoms, setSymptoms] = useState(record.Symptoms || '');
    const [file, setFile] = useState(null);

    // Tailwind classes matching .modalBack
    const modalBackdropClass = isEditModalOpen
      ? 'fixed inset-0 bg-black bg-opacity-80 z-[1040]'
      : 'hidden';
    
    // Tailwind classes matching .modalPopup
    const modalContainerClass = isEditModalOpen
      ? 'fixed inset-0 flex items-center justify-center z-[1050]'
      : 'hidden';
    
    const modalContentClass = 'bg-white border-3 border-solid border-black p-4 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto';

    return (
      <>
        <div className={modalBackdropClass} />
        <div className={modalContainerClass}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">Edit Medical Record</h3>
                {/* HiddenField is not needed in React */}
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-900"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xl" />
                </button>
              </div>
              <form onSubmit={handleUpdateRecord}>
                <div className="modal-body p-4">
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-2">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="txtEStartDate">
                          Start Date<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="txtEStartDate"
                          type="date"
                          className="form-control w-full p-2 border border-gray-300 rounded-md mb-4"
                          required
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-1">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="txtEHospital">
                          Hospital Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="txtEHospital"
                          type="text"
                          className="form-control w-full p-2 border border-gray-300 rounded-md mb-4"
                          required
                          value={hospitalName}
                          onChange={(e) => setHospitalName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full px-2 mb-1">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="txtESymptoms">
                          Symptoms <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="txtESymptoms"
                          type="text"
                          className="form-control w-full p-2 border border-gray-300 rounded-md mb-4"
                          required
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full px-2 mb-1">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1" htmlFor="FileUpload2">
                          Upload File <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="FileUpload2"
                          type="file"
                          className="form-control w-full p-2 border border-gray-300 rounded-md mb-4"
                          required
                          onChange={(e) => setFile(e.target.files[0])}
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
    // Tailwind classes matching .modalBack
    const modalBackdropClass = isDeleteModalOpen
      ? 'fixed inset-0 bg-black bg-opacity-80 z-[1040]'
      : 'hidden';
    
    // Tailwind classes matching .modalPopup
    const modalContainerClass = isDeleteModalOpen
      ? 'fixed inset-0 flex items-center justify-center z-[1050]'
      : 'hidden';

    return (
      <>
        <div className={modalBackdropClass} />
        <div className={modalContainerClass}>
          <div className="modal-dialog modal-dialog-centered max-w-sm">
            <div className="bg-white rounded-lg shadow-xl p-4 text-center">
              <div className="flex justify-center items-center w-11 h-11 mx-auto rounded-full bg-[#FFE8E8] text-red-600 text-2xl mb-2">
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
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
      </>
    );
  };

  const ViewReceiptModal = () => {
    if (!selectedReceipt) return null;

    // Destructure receipt data for easy access
    const {
      ReceiptId,
      Name,
      AppointmentDate,
      AppointmentTime,
      Speciality,
      PName,
      PAge,
      PEmail,
      PMobile,
      PAddress,
      PGender,
      Symptoms,
      PaymentMethod,
      TotalFees,
    } = selectedReceipt;

    // Tailwind classes matching .modalBack
    const modalBackdropClass = isReceiptModalOpen
      ? 'fixed inset-0 bg-black bg-opacity-80 z-[1040]'
      : 'hidden';
    
    // Tailwind classes matching .modalPopup
    const modalContainerClass = isReceiptModalOpen
      ? 'fixed inset-0 flex items-center justify-center z-[1050]'
      : 'hidden';

    // The inner table has custom styles for the 'receipt' look
    const tableStyle = "w-full border-collapse font-sans text-sm";
    const tdStyle = "p-3 border border-gray-300";
    const headerStyle = "text-right text-lg font-bold p-3";

    return (
      <>
        <div className={modalBackdropClass} />
        <div className={modalContainerClass}>
          <div className="modal-dialog modal-dialog-centered max-w-4xl w-full">
            <div className="bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">View Receipt</h3>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-900"
                  onClick={() => setIsReceiptModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xl" />
                </button>
              </div>
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-medium">
                    {formatDate(AppointmentDate, 'dd MMM yyyy')}
                  </h5>
                  <button
                    onClick={downloadReceipt}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    Download
                  </button>
                </div>
                <div className="p-4 border border-gray-300">
                  <div id="Print-Receipt">
                    <table className={tableStyle}>
                      <thead>
                        <tr>
                          <td colSpan="2" className={tdStyle + " align-top"}>
                            {/* Replaced with a placeholder for the logo */}
                            <div className="font-bold text-xl">CLINIC LOGO</div> 
                          </td>
                          <td colSpan="2" className={headerStyle + " text-blue-600"}>
                            Appointment Receipt
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="2" className={tdStyle}>
                            <strong>Clinic Name:</strong> XYZ <br />
                            <strong>Clinic Address:</strong> XYZ, A, B, C <br />
                            <strong>Email:</strong> xyz@gmail.com <br />
                            <strong>Mobile:</strong> XX-XX-XX-XX-XX
                          </td>
                          <td colSpan="2" className={tdStyle + " text-right"}>
                            <strong>Receipt Id:</strong> {ReceiptId} <br />
                            <strong>Receipt Date:</strong> {formatDate(new Date(), 'dd MMM yyyy')}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={tdStyle}>
                            <strong>Doctor Name:</strong> {Name}
                          </td>
                          <td colSpan="2" className={tdStyle}>
                            <strong>Speciality:</strong> {Speciality}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={tdStyle}>
                            <strong>Appointment Date:</strong> {formatDate(AppointmentDate, 'dd MMM yyyy')}
                          </td>
                          <td colSpan="2" className={tdStyle}>
                            <strong>Appointment Time:</strong> {AppointmentTime}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={tdStyle}>
                            <strong>Patient Name:</strong> {PName}
                          </td>
                          <td colSpan="2" className={tdStyle}>
                            <strong>Age:</strong> {PAge}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={tdStyle}>
                            <strong>Email:</strong> {PEmail}
                          </td>
                          <td colSpan="2" className={tdStyle}>
                            <strong>Mobile No:</strong> {PMobile}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="3" className={tdStyle}>
                            <strong>Address:</strong> {PAddress}
                          </td>
                          <td colSpan="1" className={tdStyle}>
                            <strong>Gender:</strong> {PGender}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className={tdStyle}>
                            <strong>Symptoms:</strong> {Symptoms}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className={tdStyle + " text-right"}>
                            <strong>Payment Method:</strong> {PaymentMethod}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className={tdStyle + " text-right text-lg font-bold text-green-600"}>
                            <strong>Total Amount:</strong> ₹{TotalFees}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
        <title>Patient Dashboard</title>
        {/* External CSS/JS links are typically managed in _app.js or a Layout component in a real Next.js app */}
      </Head>

      <EditMedicalRecordModal />
      <DeleteMedicalRecordModal />
      <ViewReceiptModal />

      {/* Breadcrumb - Using Tailwind classes for styling */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center inner-banner">
            <h2 className="text-2xl font-bold mb-2">Patient Dashboard</h2>
            <nav aria-label="breadcrumb">
              <ol className="flex space-x-2 text-sm text-gray-500">
                <li className="breadcrumb-item">
                  <a href="../Default.aspx" className="hover:text-blue-600">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item text-blue-600" aria-current="page">
                  Patient Dashboard
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
              <div className="bg-white shadow-lg rounded-lg profile-sidebar patient-sidebar">
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <a href="Profile.aspx" className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      {/* Image tag replaces asp:Image - src needs to be a real path or variable */}
                      <img src={user?.image} alt="Patient Profile" className="w-full h-full object-cover" />
                    </a>
                    <div>
                      <a href="Profile.aspx" className="text-lg font-semibold text-black hover:text-blue-600">
                        {user?.name}
                      </a>
                      <p className="text-sm text-gray-600">{user?.patientId}</p>
                      <span className="text-sm text-gray-600 mr-2">{user?.gender}</span>
                      <span className="text-sm text-gray-600">{user?.age}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <nav className="dashboard-menu">
                    <ul>
                      {/* Dashboard Link - Active */}
                      <li className="mb-1">
                        <a
                          href="Dashboard.aspx"
                          className="flex items-center p-2 rounded-lg bg-blue-100 text-blue-600 font-semibold"
                        >
                          <FontAwesomeIcon icon={faShapes} className="w-4 h-4 mr-3" />
                          <span>Dashboard</span>
                        </a>
                      </li>
                      {/* Other Links */}
                      {[
                        { href: 'Doctors.aspx', icon: faUserDoctor, label: 'Doctors' },
                        {
                          href: 'BookedAppointment.aspx',
                          icon: faCalendarCheck,
                          label: 'My Appointment',
                        },
                        {
                          href: 'DoctorsSuggestion.aspx',
                          icon: faShieldHalved,
                          label: 'Doctor Suggestions',
                        },
                        {
                          href: 'MedicalRecords.aspx',
                          icon: faMoneyBill1,
                          label: 'Add Medical Records',
                        },
                        { href: 'Vital.aspx', icon: faShieldHalved, label: 'Vitals' },
                        { href: 'Receipt.aspx', icon: faFileLines, label: 'Receipts' },
                        { href: 'Update-Profile', icon: faUserPen, label: 'Profile Update' },
                        { href: 'Change-password', icon: faKey, label: 'Change Password' },
                        ,
                      ].map((item) => (
                        <li key={item.label} className="mb-1">
                          <a
                            href={item.href}
                            className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
                          >
                            <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                            <span>{item.label}</span>
                          </a>
                        </li>
                      ))}
                      {/* Logout LinkButton converted to regular button/link with handler */}
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
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Dashboard</h3>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                {/* Health Records and Overall Report */}
                <div className="w-full xl:w-2/3 px-3 flex">
                  <div className="dashboard-card w-full bg-white shadow-lg rounded-lg p-6">
                    <div className="dashboard-card-head mb-4 border-b pb-4">
                      <h5 className="text-xl font-semibold">Health Records</h5>
                    </div>
                    <div className="dashboard-card-body">
                      <div className="flex flex-wrap -mx-2">
                        <div className="w-full sm:w-7/12 px-2">
                          <div className="flex flex-wrap -mx-2">
                            {/* Health Vitals Repeater/Static Content */}
                            {[
                              {
                                icon: faHeart,
                                label: 'Heart Rate',
                                value: mockVitals.HeartRate,
                                unit: 'Bpm',
                                color: 'bg-orange-100 text-orange-600',
                              },
                              {
                                icon: faTemperatureHigh,
                                label: 'Body Temprature',
                                value: mockVitals.Temp,
                                unit: '°C',
                                color: 'bg-amber-100 text-amber-600',
                              },
                              {
                                icon: faNotesMedical,
                                label: 'Glucose Level',
                                value: mockVitals.GL,
                                unit: 'mg/dl',
                                color: 'bg-blue-900 text-white bg-opacity-70',
                              },
                              {
                                icon: faHighlighter,
                                label: 'SPo2',
                                value: mockVitals.Spo2,
                                unit: '%',
                                color: 'bg-blue-100 text-blue-600',
                              },
                              {
                                icon: faSyringe,
                                label: 'Blood Pressure',
                                value: mockVitals.BP,
                                unit: 'mmHg',
                                color: 'bg-red-100 text-red-600',
                              },
                              {
                                icon: faUserPen,
                                label: 'BMI',
                                value: mockVitals.BMI,
                                unit: 'kg/m2',
                                color: 'bg-purple-100 text-purple-600',
                              },
                            ].map((vital) => (
                              <div key={vital.label} className="w-1/2 lg:w-1/2 px-2 mb-4">
                                <div className={`p-4 rounded-lg ${vital.color}`}>
                                  <span className="text-sm font-medium flex items-center mb-1">
                                    <FontAwesomeIcon icon={vital.icon} className="w-4 h-4 mr-2" />
                                    {vital.label}
                                  </span>
                                  <h3 className="text-2xl font-bold">
                                    {vital.value}
                                    <span className="text-xl font-medium ml-1">{vital.unit}</span>
                                  </h3>
                                </div>
                              </div>
                            ))}

                            <div className="w-full px-2 mt-2">
                              <p className="text-sm text-gray-500">
                                Report generated on last visit:
                                <span className="font-medium ml-1 whitespace-nowrap">
                                  {mockVitals.ReportGeneratedDate}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Overall Report Chart */}
                        <div className="w-full sm:w-5/12 px-2 flex flex-col items-center justify-center">
                          <div className="text-center p-4 rounded-lg border border-gray-200">
                            <h5 className="text-lg font-semibold mb-4">Overall Report</h5>
                            <div
                              className="w-36 h-36 mx-auto relative flex items-center justify-center mb-4"
                            >
                              {/* Replaced circleProgress with a simple visualization/placeholder */}
                              <div
                                className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center font-bold text-xl text-blue-600"
                                style={{
                                  background: `conic-gradient(#65A30D ${healthData.percent}%, #f3f4f6 ${healthData.percent}%)`,
                                }}
                              >
                                <div className="absolute w-[85%] h-[85%] bg-white rounded-full flex flex-col items-center justify-center">
                                  <p className="text-xs font-normal text-gray-500">Last visit</p>
                                  <span className="text-2xl font-bold text-gray-800">
                                    {healthData.percent}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className="text-sm block mb-4">
                              Your health is <span className="font-bold">{healthData.percent}</span>%{' '}
                              <span className="font-bold">{healthData.status}</span>
                            </span>
                            <a
                              href="Vital.aspx"
                              className="btn bg-gray-800 text-white w-full py-2 rounded-md flex items-center justify-center hover:bg-gray-700 transition"
                            >
                              View Details
                              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 ml-2" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Favourites and Book Appointment */}
                <div className="w-full xl:w-1/3 px-3 flex">
                  <div className="favourites-dashboard w-full">
                    <div className="mb-4 p-4 rounded-lg bg-blue-600 text-white flex justify-between items-center shadow-lg">
                      <h3 className="text-xl font-bold">
                        <span>Book a new</span> <span className="block">Appointment</span>
                      </h3>
                      <span className="text-3xl">
                        <a href="Doctors.aspx" className="text-white hover:text-blue-200 transition">
                          <FontAwesomeIcon icon={faCirclePlus} />
                        </a>
                      </span>
                    </div>

                    <div className="dashboard-card w-full bg-white shadow-lg rounded-lg p-6">
                      <div className="dashboard-card-head mb-4 border-b pb-4 flex justify-between items-center">
                        <h5 className="text-xl font-semibold">Favourites</h5>
                        <a href="Doctors.aspx" className="text-blue-600 hover:underline text-sm">
                          View All
                        </a>
                      </div>
                      <div className="dashboard-card-body space-y-4">
                        {/* Repeater for Favourites */}
                        {mockFavorites.map((fav) => (
                          <div key={fav.DoctorId} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                            <div className="flex items-center">
                              <a
                                href={`DoctorProfile.aspx?DoctorId=${fav.DoctorId}`}
                                className="w-12 h-12 rounded-full overflow-hidden mr-3"
                              >
                                <img src={fav.DoctorImage} alt="Doctor" className="w-full h-full object-cover" />
                              </a>
                              <div>
                                <h5 className="font-medium text-base">
                                  <a href={`DoctorProfile.aspx?DoctorId=${fav.DoctorId}`} className="hover:text-blue-600">
                                    {fav.Name}
                                  </a>
                                </h5>
                                <span className="text-sm text-gray-500">{fav.Specialization}</span>
                              </div>
                            </div>
                            <a
                              href={`BookAppointments.aspx?DoctorId=${fav.DoctorId}`}
                              className="text-blue-600 text-xl hover:text-blue-800 transition"
                            >
                              <FontAwesomeIcon icon={faCalendarPlus} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointments and Reports Section */}
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3 flex">
                  <div className="dashboard-main-col w-full bg-white shadow-lg rounded-lg p-6">
                    <div className="dashboard-card-head mb-4 border-b pb-4 flex justify-between items-center">
                      <h5 className="text-xl font-semibold flex items-center">
                        <span className="mr-2 text-blue-600">
                          <FontAwesomeIcon icon={faCalendarDays} />
                        </span>
                        Appointment
                      </h5>
                      <a href="BookedAppointment.aspx" className="text-blue-600 hover:underline text-sm">
                        View All
                      </a>
                    </div>

                    <div className="dashboard-card-body">
                      {/* Appointment List (Top Row) */}
                      <div className="flex flex-wrap -mx-2 mb-6">
                        {mockAppointments.slice(0, 3).map((appt) => (
                          <div key={appt.AppointmentId} className="w-full md:w-1/3 px-2 mb-4">
                            <div className="border border-gray-200 rounded-lg p-4 h-full flex flex-col justify-between">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <a
                                    href={`DoctorProfile.aspx?DoctorId=${appt.DoctorId}`}
                                    className="w-12 h-12 rounded-full overflow-hidden mr-3"
                                  >
                                    <img src={appt.DoctorImage} alt="Doctor" className="w-full h-full object-cover" />
                                  </a>
                                  <div>
                                    <h5 className="font-medium text-base">
                                      <a
                                        href={`DoctorProfile.aspx?DoctorId=${appt.DoctorId}`}
                                        className="hover:text-blue-600"
                                      >
                                        {appt.Name}
                                      </a>
                                    </h5>
                                    <span className="text-sm text-gray-500">{appt.Specialization}</span>
                                  </div>
                                </div>
                                <span className="text-blue-600 text-xl">
                                  <FontAwesomeIcon icon={faHospital} />
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-3">
                                <p className="flex items-center">
                                  <FontAwesomeIcon icon={faClock} className="w-3 h-3 mr-2" />
                                  {formatDate(appt.AppointmentDate, 'dd MMM yyyy')} - {appt.StartTime}
                                </p>
                              </div>
                              <div>
                                <span
                                  className={`inline-block py-1 px-3 text-xs font-semibold rounded ${
                                    appt.Status === 'Upcoming'
                                      ? 'bg-green-100 text-green-600'
                                      : appt.Status === 'Cancelled'
                                      ? 'bg-red-100 text-red-600'
                                      : 'bg-green-600 text-white'
                                  }`}
                                >
                                  {appt.Status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Reports Tabs Section */}
                      <h5 className="text-xl font-semibold mb-3">Reports</h5>
                      <div className="account-detail-table">
                        {/* Tab Menu */}
                        <div className="border-b mb-4">
                          <nav className="flex space-x-4">
                            <button
                              data-tab="appoint-tab"
                              className="py-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600 transition active:border-blue-600 active:text-blue-600"
                              aria-current="page"
                            >
                              Appointments
                            </button>
                            <button
                              data-tab="medical-tab"
                              className="py-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600 transition"
                            >
                              Medical Records
                            </button>
                            <button
                              data-tab="invoice-tab"
                              className="py-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600 transition"
                            >
                              Receipt
                            </button>
                          </nav>
                        </div>
                        {/* /Tab Menu */}

                        {/* Tab Content (Simplified: showing all content, would use state in a real app) */}
                        <div className="tab-content pt-0">
                          {/* Appointments Tab (Table - all mockAppointments) */}
                          <div id="appoint-tab" className="block">
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Doctor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Appointment Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Created Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th className="px-6 py-3"></th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {mockAppointments.map((appt) => (
                                    <tr key={appt.AppointmentId}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                        <a href="#">APT000{appt.AppointmentId}</a>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {appt.Name}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(appt.AppointmentDate, 'dd MMM yyyy')}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(appt.ACreatedDate, 'dd MMM yyyy')}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ₹ {appt.ConsultationFee}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                          className={`inline-block py-1 px-3 text-xs font-semibold rounded ${
                                            appt.Status === 'Upcoming'
                                              ? 'bg-green-100 text-green-600'
                                              : appt.Status === 'Cancelled'
                                              ? 'bg-red-600 text-white'
                                              : 'bg-green-600 text-white'
                                          }`}
                                        >
                                          {appt.Status}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {appt.Status === 'Completed' && (
                                          <a
                                            href={`CompletedAppointmentDetails.aspx?AppointmentId=${appt.AppointmentId}`}
                                            className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md"
                                          >
                                            <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                                          </a>
                                        )}
                                        {appt.Status === 'Cancelled' && (
                                          <a
                                            href={`CancelledAppointmentDetail.aspx?AppointmentId=${appt.AppointmentId}`}
                                            className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md"
                                          >
                                            <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                                          </a>
                                        )}
                                        {appt.Status === 'Upcoming' && (
                                          <a
                                            href={`UpcomingAppointmentDetails.aspx?AppointmentId=${appt.AppointmentId}`}
                                            className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md"
                                          >
                                            <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                                          </a>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* /Appointments Tab */}

                          {/* Medical Records Tab (Table) - Initially hidden, toggle with state in real app */}
                          <div id="medical-tab" className="hidden">
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      ID
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
                                  {mockMedicalRecords.map((record) => (
                                    <tr key={record.RecordId}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                        <a href="#">{record.MedRecordId}</a>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(record.StartDate, 'dd MMM yyyy')}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.HospitalName}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.Symptoms}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                                        <button
                                          onClick={() => handleEditMedicalRecord(record.RecordId)}
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
                                          onClick={() => handleDeleteMedicalRecord(record.RecordId)}
                                          className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-red-600 hover:bg-red-50 transition"
                                        >
                                          <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* /Medical Records Tab */}

                          {/* Receipts Tab (Table) - Initially hidden, toggle with state in real app */}
                          <div id="invoice-tab" className="hidden">
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Doctor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Appointment Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Booked on
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {mockReceipts.map((receipt) => (
                                    <tr key={receipt.RID}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                        <button onClick={() => handleViewReceipt(receipt)} className="hover:underline">
                                          {receipt.ReceiptId}
                                        </button>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex items-center">
                                          <a
                                            href={`DoctorProfile.aspx?DoctorId=${receipt.DoctorId}`}
                                            className="w-8 h-8 rounded-full overflow-hidden mr-3"
                                          >
                                            <img
                                              className="w-full h-full object-cover"
                                              src={receipt.DoctorImage}
                                              alt="User Image"
                                            />
                                          </a>
                                          <a
                                            href={`DoctorProfile.aspx?DoctorId=${receipt.DoctorId}`}
                                            className="hover:text-blue-600"
                                          >
                                            {receipt.Name}
                                          </a>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(receipt.AppointmentDate, 'dd MMM yyyy')}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(receipt.AppointmentCreatedDate, 'dd MMM yyyy')}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ₹ {receipt.ConsulationFee}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleViewReceipt(receipt)} className="text-blue-600 hover:text-blue-800">
                                          <FontAwesomeIcon icon={faLink} className="w-4 h-4" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* /Invoices Tab */}
                        </div>
                        {/* /Tab Content */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default PatientDashboard;