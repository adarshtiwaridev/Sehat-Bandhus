import React, { useState } from 'react';
import Head from 'next/head';

// --- Icon components (using placeholders for simplicity/standard) ---
// In a real project, you would import these from a library like 'react-icons' (e.g., react-icons/fa or react-icons/fe)
const FeHome = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>;
const FeUser = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
const FeUserPlus = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
const FeLayout = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>;
const FeDocument = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>;
const FePencil = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>;
const FaArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>;
const FaEnvelope = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>;
const FaPhone = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.5l1.5 4-4 2 4 2 4-2-4-2 1.5-4H19a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/></svg>;
const FaComments = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"/></svg>;
const FaHospital = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.836 0h.582M16 10l4 4m-4-4l-4 4m0 0l-4-4m4 4l4 4M4 10h16v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8z"/></svg>;
const FaXmark = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>;
const FaRupeeSign = () => <span className="text-xs">₹</span> // Simple span for the small rupee sign

// --- Component ---
const UpcomingAppointment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [reasonError, setReasonError] = useState(false);

  // Placeholder data - in a real app, this would come from an API call or props
  const appointment = {
    id: '12345',
    doctorName: 'Dr. Sarah Smith',
    doctorEmail: 'sarah.smith@clinic.com',
    doctorPhone: '+1 123 456 7890',
    consultationFee: '500',
    date: '24 Nov 2025',
    time: '10:00 AM - 10:30 AM',
    status: 'Upcoming',
    type: 'Direct Visit',
    clinic: "Adrian's Dentistry",
    location: "Newyork, United States",
    doctorImage: 'https://via.placeholder.com/60'
  };

  const handleCancelAppointmentClick = (event) => {
    // Prevent form submission if the button is used to open the modal
    if (event) {
        event.preventDefault();
    }
    // Logic to handle cancellation (e.g., validation)
    if (!isModalOpen) {
      setIsModalOpen(true);
      setReasonError(false); // Reset error when opening
      return;
    }
    
    // Logic when the 'Cancel Appointment' button is pressed inside the modal
    if (cancellationReason.trim() === '') {
      setReasonError(true);
    } else {
      setReasonError(false);
      // **In a real Next.js app, you would submit the data to an API here**
      console.log('Appointment Cancelled with reason:', cancellationReason);
      setIsModalOpen(false);
      setCancellationReason(''); // Clear the reason after submission
    }
  };

  return (
    <>
      <Head>
        <title>Upcoming Appointment | Clinic Admin</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="sidebar w-64 bg-white shadow-md overflow-y-auto">
          <div className="p-4">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="mb-1">
                  <a href="/admin/Dashboard.aspx" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <FeHome /> <span className="ml-3">Dashboard</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a href="/admin/PatientList.aspx" className="flex items-center p-2 bg-gray-100 text-gray-800 rounded-md font-medium">
                    <FeUser /> <span className="ml-3">Patient List</span>
                  </a>
                </li>
                <li className="mb-1 group">
                  <div className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                    <div className="flex items-center">
                      <FeUserPlus /> <span className="ml-3">Doctors</span>
                    </div>
                    <span className="menu-arrow"></span> {/* Placeholder for arrow icon */}
                  </div>
                  <ul className="pl-4 hidden group-hover:block">
                    <li><a href="/admin/DoctorList.aspx" className="block p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">Doctor List</a></li>
                    <li><a href="/admin/AddDoctors.aspx" className="block p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">Add Doctor</a></li>
                  </ul>
                </li>
                <li className="mb-1">
                  <a href="/admin/Appointments.aspx" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <FeLayout /> <span className="ml-3">Appointments</span>
                  </a>
                </li>
                <li className="mb-1 group">
                  <div className="flex items-center justify-between p-2 bg-gray-100 text-gray-800 rounded-md font-medium cursor-pointer">
                    <div className="flex items-center">
                      <FeDocument /> <span className="ml-3">Medicines</span>
                    </div>
                    <span className="menu-arrow"></span>
                  </div>
                  <ul className="pl-4 block"> {/* Note: 'display: block' converted to 'block' in Tailwind */}
                    <li><a href="/admin/AddMedicine.aspx" className="block p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">Add Medicine</a></li>
                    <li><a href="/admin/Medicines.aspx" className="block p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">Medicines</a></li>
                  </ul>
                </li>
                <li className="mb-1">
                  <a href="/admin/AddDoctorSchedule.aspx" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <FeLayout /> <span className="ml-3">Add Schedule</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a href="/admin/EditDoctorSchedule.aspx" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <FePencil /> <span className="ml-3">Edit Schedule</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a href="/admin/Profile.aspx" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <FeUserPlus /> <span className="ml-3">Profile</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Sidebar */}

        {/* Page Wrapper */}
        <div className="page-wrapper flex-grow ml-64 pt-16"> {/* Adjust ml-64 based on your master page layout */}
          <div className="content container-fluid p-6">

            {/* Page Header */}
            <div className="mb-6">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800">List of Patient</h3>
                <ul className="flex text-sm text-gray-500">
                  <li><a href="/admin/Dashboard.aspx" className="hover:text-blue-600">Dashboard /</a></li>
                  <li className="ml-1 text-gray-800 font-medium">Upcoming Appoinment</li>
                </ul>
              </div>
            </div>
            {/* /Page Header */}

            <div className="grid">
              <div className="col-span-12">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <div className="mb-6">
                    <div className="flex items-center">
                      <a href="#" className="text-gray-600 hover:text-gray-900 mr-3">
                        <FaArrowLeft />
                      </a>
                      <h4 className="text-lg font-semibold text-gray-800">Upcoming Appointment Details</h4>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Appointment Detail Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <ul className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4 space-y-4 md:space-y-0">
                        {/* Doctor Info */}
                        <li>
                          <div className="flex items-center">
                            <a href="#">
                              <img src={appointment.doctorImage} alt="Doctor Image" className="w-16 h-16 rounded-full object-cover mr-4" />
                            </a>
                            <div>
                              <p className="text-sm text-gray-500">APT000<span className="font-medium text-gray-700">{appointment.id}</span></p>
                              <h6 className="text-lg font-semibold"><a href="#" className="hover:text-blue-600">{appointment.doctorName}</a></h6>
                              <div className="text-sm text-gray-600 mt-1">
                                <ul className="list-none p-0 space-y-1">
                                  <li className="flex items-center"><FaEnvelope className="mr-2" /> <span>{appointment.doctorEmail}</span></li>
                                  <li className="flex items-center"><FaPhone className="mr-2" /> <span>{appointment.doctorPhone}</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                        {/* Appointment Type */}
                        <li className="md:ml-auto">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Type of Appointment</p>
                            <ul className="flex justify-end items-center mt-1">
                              <li className="flex items-center text-green-600 font-medium">
                                <FaHospital className="mr-1" />{appointment.type}
                              </li>
                            </ul>
                          </div>
                        </li>
                        {/* Actions/Fees */}
                        <li className="md:ml-6 flex flex-col items-end space-y-2">
                          <div className="detail-badge-info">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                              {appointment.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700">
                            <h6>Consultation Fees : {FaRupeeSign()} <span className="font-semibold">{appointment.consultationFee}</span></h6>
                          </div>
                          <ul className="flex space-x-2">
                            <li>
                              <button className="p-2 border border-gray-300 rounded-full text-gray-500 hover:bg-gray-100">
                                <FaComments />
                              </button>
                            </li>
                            <li>
                              <button
                                className="p-2 border border-red-500 rounded-full text-red-500 hover:bg-red-50"
                                onClick={handleCancelAppointmentClick}
                                aria-label="Cancel Appointment"
                              >
                                <FaXmark />
                              </button>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      
                      {/* Detail Card Bottom Info */}
                      <ul className="flex flex-wrap justify-between text-center mt-4">
                        <li className="w-1/4 min-w-[120px] p-2">
                          <h6 className="text-sm font-medium text-gray-600">Appointment Date</h6>
                          <span className="text-base font-semibold text-gray-800">{appointment.date}</span>
                        </li>
                        <li className="w-1/4 min-w-[120px] p-2">
                          <h6 className="text-sm font-medium text-gray-600">Time</h6>
                          <span className="text-base font-semibold text-gray-800">{appointment.time}</span>
                        </li>
                        <li className="w-1/4 min-w-[120px] p-2">
                          <h6 className="text-sm font-medium text-gray-600">Clinic Location</h6>
                          <span className="text-base font-semibold text-gray-800">{appointment.clinic}</span>
                        </li>
                        <li className="w-1/4 min-w-[120px] p-2">
                          <h6 className="text-sm font-medium text-gray-600">Location</h6>
                          <span className="text-base font-semibold text-gray-800">{appointment.location}</span>
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

        {/* Cancel Modal (Replaces ModalPopupExtender) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Modal Backdrop (modalBack) */}
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div 
                className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" 
                aria-hidden="true" 
                onClick={() => setIsModalOpen(false)}
              ></div>

              {/* Modal Content (modalPopup) */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-lg border-2 border-black">
                
                <div className="p-4">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <h5 className="text-lg font-semibold text-gray-900" id="modal-title">Cancel Appointment</h5>
                    <button 
                      type="button" 
                      className="text-gray-400 hover:text-gray-500" 
                      onClick={() => setIsModalOpen(false)}
                      aria-label="Close"
                    >
                      <FaXmark />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="py-4">
                    <div className="row">
                      <div className="col-12 mb-4">
                        <label htmlFor="txtCancelReason" className="block text-sm font-medium text-black mb-2">
                          Reason for Cancellation<span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="txtCancelReason"
                          className="w-full form-textarea border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 min-h-[100px] mb-4"
                          value={cancellationReason}
                          onChange={(e) => setCancellationReason(e.target.value)}
                        ></textarea>
                        {reasonError && (
                          <p className="text-red-500 text-sm mt-1">Cancellation reason is required</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end pt-3 border-t border-gray-200">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                      onClick={handleCancelAppointmentClick} // This now acts as the submit button
                    >
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpcomingAppointment;