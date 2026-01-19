// components/AdminEditDoctorSchedule.jsx
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
  faChevronDown,
  faUsers,
  faTrophy,
  faIndianRupeeSign,
} from '@fortawesome/free-solid-svg-icons';

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
  { href: 'EditDoctorSchedule.aspx', icon: faPencil, label: 'Edit Schedule', active: true },
  { href: 'Profile.aspx', icon: faUser, label: 'Profile', active: false },
];

// Mock Doctor data for Dropdown
const mockDoctors = [
  { id: 0, name: 'Select Doctor' },
  { id: 1, name: 'Dr. Alice Johnson, Cardiologist' },
  { id: 2, name: 'Dr. Bob Williams, Neurologist' },
];

// Mock Doctor Profile Data
const mockDoctorProfiles = {
  1: {
    Name: 'Dr. Alice Johnson',
    Email: 'alice.j@clinic.com',
    DoctorImage: '/path/to/doctor_alice.jpg',
    Specialization: 'Cardiologist',
    Experience: '10 Years',
    ConsultationFee: 800,
    Bio: 'A highly skilled cardiologist dedicated to heart health and preventative care.',
  },
  2: {
    Name: 'Dr. Bob Williams',
    Email: 'bob.w@clinic.com',
    DoctorImage: '/path/to/doctor_bob.jpg',
    Specialization: 'Neurologist',
    Experience: '15 Years',
    ConsultationFee: 1200,
    Bio: 'Specializing in complex neurological disorders and research.',
  },
};

// Mock Existing Schedule Data (Example for Doctor 1)
const mockSchedules = {
  1: [
    { ScheduleId: 1, ScheduleDay: 'Monday', FromTime: '09:00', ToTime: '12:00', FromTime1: '14:00', ToTime1: '17:00', FromTime2: '', ToTime2: '', SlotDuration: 15, NumberOfPaitentPerSlot: 5 },
    { ScheduleId: 2, ScheduleDay: 'Tuesday', FromTime: '09:00', ToTime: '13:00', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 15, NumberOfPaitentPerSlot: 6 },
    { ScheduleId: 3, ScheduleDay: 'Wednesday', FromTime: '09:00', ToTime: '12:00', FromTime1: '14:00', ToTime1: '17:00', FromTime2: '18:00', ToTime2: '20:00', SlotDuration: 20, NumberOfPaitentPerSlot: 4 },
    { ScheduleId: 4, ScheduleDay: 'Thursday', FromTime: '09:00', ToTime: '13:00', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 15, NumberOfPaitentPerSlot: 5 },
    { ScheduleId: 5, ScheduleDay: 'Friday', FromTime: '09:00', ToTime: '12:00', FromTime1: '14:00', ToTime1: '17:00', FromTime2: '', ToTime2: '', SlotDuration: 15, NumberOfPaitentPerSlot: 5 },
    { ScheduleId: 6, ScheduleDay: 'Saturday', FromTime: '', ToTime: '', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 15, NumberOfPaitentPerSlot: 5 },
    { ScheduleId: 7, ScheduleDay: 'Sunday', FromTime: '', ToTime: '', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 15, NumberOfPaitentPerSlot: 5 },
  ],
  // Doctor 2 will have a different mock schedule or initial (empty) schedule
  2: [
    { ScheduleId: 8, ScheduleDay: 'Monday', FromTime: '10:00', ToTime: '14:00', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 20, NumberOfPaitentPerSlot: 4 },
    { ScheduleId: 9, ScheduleDay: 'Tuesday', FromTime: '10:00', ToTime: '14:00', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 20, NumberOfPaitentPerSlot: 4 },
    { ScheduleId: 10, ScheduleDay: 'Wednesday', FromTime: '10:00', ToTime: '14:00', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 20, NumberOfPaitentPerSlot: 4 },
    { ScheduleId: 11, ScheduleDay: 'Thursday', FromTime: '10:00', ToTime: '14:00', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 20, NumberOfPaitentPerSlot: 4 },
    { ScheduleId: 12, ScheduleDay: 'Friday', FromTime: '10:00', ToTime: '14:00', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 20, NumberOfPaitentPerSlot: 4 },
    { ScheduleId: 13, ScheduleDay: 'Saturday', FromTime: '', ToTime: '', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 20, NumberOfPaitentPerSlot: 4 },
    { ScheduleId: 14, ScheduleDay: 'Sunday', FromTime: '', ToTime: '', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '', SlotDuration: 20, NumberOfPaitentPerSlot: 4 },
  ]
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const initialEmptySchedule = daysOfWeek.map(day => ({
    ScheduleId: 0,
    ScheduleDay: day,
    FromTime: '', ToTime: '',
    FromTime1: '', ToTime1: '',
    FromTime2: '', ToTime2: '',
    SlotDuration: 15,
    NumberOfPaitentPerSlot: 5,
}));


// --- Main Component ---

const AdminEditDoctorSchedule = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(0);
  const [scheduleData, setScheduleData] = useState(initialEmptySchedule);
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: true });
  
  const doctorProfile = mockDoctorProfiles[selectedDoctorId] || null;

  // Fetch / Load schedule data when doctor changes
  useEffect(() => {
    if (selectedDoctorId > 0) {
      // Simulate fetching schedule from backend
      const loadedSchedule = mockSchedules[selectedDoctorId] || initialEmptySchedule;
      setScheduleData(loadedSchedule);
    } else {
      setScheduleData(initialEmptySchedule);
    }
  }, [selectedDoctorId]);

  // Handler for doctor dropdown change (replaces AutoPostBack)
  const handleDoctorChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setSelectedDoctorId(id);
  };

  // Handler for schedule input changes
  const handleScheduleChange = (index, field, value) => {
    setScheduleData(prev => 
        prev.map((daySchedule, i) => 
            i === index ? { ...daySchedule, [field]: value } : daySchedule
        )
    );
  };

  // Submission Handler (Replaces OnClick="updateSchedule")
  const handleUpdateSchedule = (e) => {
    e.preventDefault();
    if (selectedDoctorId === 0) {
      alert('Please select a doctor to update the schedule.');
      return;
    }
    
    console.log(`Updating schedule for Doctor ID: ${selectedDoctorId}`, scheduleData);
    // In a real application, send scheduleData to the backend API here.
    alert('Schedule successfully updated! (Mock submission)');
  };
  
  const handleToggleSubmenu = (label) => {
    setShowSubmenu(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // Tailwind CSS Class Mapping
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const sectionHeaderClass = 'border-b pb-2 mb-4';
  const inputClass = 'form-control w-full p-1.5 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500';
  const tableHeaderClass = 'p-2 border font-medium';
  const tableDataClass = 'p-1 border';
  const buttonPrimaryClass = 'bg-blue-600 text-white hover:bg-blue-700 transition duration-150 py-2 px-4 rounded';
  
  const formatCurrency = (amount) => {
      return `₹${amount}`;
  };

  return (
    <>
      <Head>
        <title>Edit Doctor Schedule - Admin</title>
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
                            item.active || item.sublinks.some(sub => sub.active) ? 'bg-gray-100 text-gray-800' : 'text-gray-600'
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
                  <h3 className="text-2xl font-bold mb-1">Edit Doctor Schedule</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="Dashboard.aspx" className="hover:text-blue-600">Dashboard /</a></li>
                    <li className="text-gray-800 font-semibold">&nbsp; Edit Doctor Schedule</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            
            {/* Select Doctors */}
            <section className="mb-8">
              <div className={sectionHeaderClass}>
                <h3 className="text-xl font-semibold">Select Doctor for Editing Schedule</h3>
                <div className="h-0.5 bg-gray-200 mt-2"></div>
              </div>
              <div className="card bg-white shadow-lg rounded-lg p-6">
                <div className="w-full">
                  <select
                    value={selectedDoctorId}
                    onChange={handleDoctorChange}
                    className="w-full border border-gray-300 rounded p-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {mockDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
            {/* /Select Doctors */}

            <form onSubmit={handleUpdateSchedule}>
                {/* Doctor Profile (Conditional Display) */}
                {doctorProfile && (
                <section className="mb-8">
                    <div className={sectionHeaderClass}>
                    <h3 className="text-xl font-semibold">Doctor Details</h3>
                    <div className="h-0.5 bg-gray-200 mt-2"></div>
                    </div>
                    <div className="progress-example card bg-white shadow-lg rounded-lg">
                    <div className="card-body pb-0 p-6">
                        <div className="flex flex-wrap -mx-4">
                        {/* Doctor Image */}
                        <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0 flex">
                            <div className="w-full">
                            <img
                                src={doctorProfile.DoctorImage}
                                alt={doctorProfile.Name}
                                className="border border-gray-300 rounded object-cover w-full h-64"
                            />
                            </div>
                        </div>
                        {/* Doctor Info */}
                        <div className="w-full md:w-2/3 px-4">
                            <div className="profile-user-info">
                            <h4 className="text-2xl font-bold mb-1">{doctorProfile.Name}</h4>
                            <h6 className="text-gray-500 mb-3">{doctorProfile.Email}</h6>
                            <div className="text-sm text-gray-700 mb-3 space-x-4">
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={faUsers} className="text-lg text-blue-600 mr-2" />
                                    <span>{doctorProfile.Specialization}</span>
                                </span>
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={faTrophy} className="text-lg text-blue-600 mx-2" />
                                    <span>{doctorProfile.Experience}</span>
                                </span>
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={faIndianRupeeSign} className="text-lg text-blue-600 mx-2" />
                                    <span>{formatCurrency(doctorProfile.ConsultationFee)}</span>
                                </span>
                            </div>
                            <div className="about-text text-gray-600">
                                <p className="italic">{doctorProfile.Bio}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                )}
                {/* /Doctor Profile */}

                {/* Edit Schedule Table (Conditional Display) */}
                {selectedDoctorId !== 0 && (
                <section className="mb-8">
                    <div className={sectionHeaderClass}>
                    <h3 className="text-xl font-semibold">Edit Doctor Schedule</h3>
                    <div className="h-0.5 bg-gray-200 mt-2"></div>
                    </div>
                    <div className="card bg-white shadow-lg rounded-lg p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 text-center text-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className={tableHeaderClass}>Day</th>
                                <th colSpan="2" className={tableHeaderClass}>Shift 1</th>
                                <th colSpan="2" className={tableHeaderClass}>Shift 2</th>
                                <th colSpan="2" className={tableHeaderClass}>Shift 3</th>
                                <th className={tableHeaderClass}>Slot Duration (Mins)</th>
                                <th className={tableHeaderClass}>No. of Patients/Slot</th>
                            </tr>
                            <tr className="bg-gray-50">
                                <th className={tableHeaderClass}></th>
                                <th className={tableHeaderClass}>From</th>
                                <th className={tableHeaderClass}>To</th>
                                <th className={tableHeaderClass}>From</th>
                                <th className={tableHeaderClass}>To</th>
                                <th className={tableHeaderClass}>From</th>
                                <th className={tableHeaderClass}>To</th>
                                <th className={tableHeaderClass}></th>
                                <th className={tableHeaderClass}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Repeater Mapped to JSX */}
                            {scheduleData.map((dayData, index) => (
                                <tr key={dayData.ScheduleDay}>
                                    {/* HiddenField is replaced by knowing the index/day */}
                                    <td className={tableDataClass}>
                                        <input type="text" value={dayData.ScheduleDay} readOnly className={`${inputClass} !w-24 text-center bg-gray-100`} />
                                    </td>
                                    <td className={tableDataClass}>
                                        <input type="time" value={dayData.FromTime} onChange={(e) => handleScheduleChange(index, 'FromTime', e.target.value)} className={inputClass} />
                                    </td>
                                    <td className={tableDataClass}>
                                        <input type="time" value={dayData.ToTime} onChange={(e) => handleScheduleChange(index, 'ToTime', e.target.value)} className={inputClass} />
                                    </td>
                                    <td className={tableDataClass}>
                                        <input type="time" value={dayData.FromTime1} onChange={(e) => handleScheduleChange(index, 'FromTime1', e.target.value)} className={inputClass} />
                                    </td>
                                    <td className={tableDataClass}>
                                        <input type="time" value={dayData.ToTime1} onChange={(e) => handleScheduleChange(index, 'ToTime1', e.target.value)} className={inputClass} />
                                    </td>
                                    <td className={tableDataClass}>
                                        <input type="time" value={dayData.FromTime2} onChange={(e) => handleScheduleChange(index, 'FromTime2', e.target.value)} className={inputClass} />
                                    </td>
                                    <td className={tableDataClass}>
                                        <input type="time" value={dayData.ToTime2} onChange={(e) => handleScheduleChange(index, 'ToTime2', e.target.value)} className={inputClass} />
                                    </td>
                                    <td className={`${tableDataClass} w-24`}>
                                        <input type="number" min="1" value={dayData.SlotDuration} onChange={(e) => handleScheduleChange(index, 'SlotDuration', e.target.value)} className={inputClass} />
                                    </td>
                                    <td className={`${tableDataClass} w-24`}>
                                        <input type="number" min="1" value={dayData.NumberOfPaitentPerSlot} onChange={(e) => handleScheduleChange(index, 'NumberOfPaitentPerSlot', e.target.value)} className={inputClass} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className={buttonPrimaryClass}
                        >
                            Update Doctor Schedule
                        </button>
                    </div>
                    </div>
                </section>
                )}
            </form>
          </div> 
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default AdminEditDoctorSchedule;