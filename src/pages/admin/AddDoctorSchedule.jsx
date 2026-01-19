// components/AdminAddDoctorSchedule.jsx
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
  faUserMd,
  faTrophy,
  faMoneyBill,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

// --- Mock Data ---

// Mock Doctor data for Dropdown
const mockDoctors = [
  { id: 0, name: 'Select Doctor' },
  { id: 1, name: 'Dr. Alice Johnson, Cardiologist' },
  { id: 2, name: 'Dr. Bob Williams, Neurologist' },
];

// Mock Doctor Profile Data (details of the selected doctor)
const mockDoctorProfile = {
  1: {
    Name: 'Dr. Alice Johnson',
    Email: 'alice.j@clinic.com',
    DoctorImage: '/path/to/doctor_alice.jpg',
    Specialization: 'Cardiologist',
    Experience: '10 Years',
    ConsultationFee: '₹ 800',
    Bio: 'A highly skilled cardiologist dedicated to patient heart health and preventative care.',
  },
  2: {
    Name: 'Dr. Bob Williams',
    Email: 'bob.w@clinic.com',
    DoctorImage: '/path/to/doctor_bob.jpg',
    Specialization: 'Neurologist',
    Experience: '15 Years',
    ConsultationFee: '₹ 1200',
    Bio: 'Specializing in complex neurological disorders and brain health research.',
  },
};

// Days of the week for the Schedule Repeater
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Initial state for one day's schedule data
const initialSchedule = {
  Txtfrom: '',
  Txtto: '',
  Txtfrom1: '',
  Txtto1: '',
  Txtfrom2: '',
  Txtto2: '',
  txtslotDuration: '',
  NoOfPatientPerSlot: '',
};

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
    active: true,
    sublinks: [
      { href: 'AddMedicine.aspx', label: 'Add Medicine' },
      { href: 'Medicines.aspx', label: 'Medicines' },
    ],
  },
  { href: 'AddDoctorSchedule.aspx', icon: faCalendarCheck, label: 'Add Schedule', active: true },
  { href: 'EditDoctorSchedule.aspx', icon: faPencil, label: 'Edit Schedule', active: false },
  { href: 'Profile.aspx', icon: faUserPlus, label: 'Profile', active: false },
];

const AdminAddDoctorSchedule = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(0);
  const [scheduleData, setScheduleData] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: { ...initialSchedule } }), {})
  );
  const [message, setMessage] = useState('');
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: true });

  const doctorProfile = mockDoctorProfile[selectedDoctorId] || null;

  // --- Handlers ---

  const handleDoctorChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setSelectedDoctorId(id);
    setMessage('');
    // In a real app, if the doctor has an existing schedule, you'd fetch it here.
    // For now, we reset the schedule to initial.
    setScheduleData(
        daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: { ...initialSchedule } }), {})
    );
  };

  const handleScheduleChange = (day, field, value) => {
    setScheduleData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSubmitSchedule = (e) => {
    e.preventDefault();

    if (selectedDoctorId === 0) {
      setMessage('Please select a doctor first.');
      return;
    }

    // Basic validation check (e.g., check if at least one shift is entered for one day)
    const hasValidSchedule = Object.values(scheduleData).some(
      (daySchedule) => daySchedule.Txtfrom && daySchedule.Txtto
    );

    if (!hasValidSchedule) {
        setMessage('Please fill in at least one shift time for a day.');
        return;
    }

    // In a real app, this data would be sent to the backend
    console.log(`Submitting schedule for Doctor ID: ${selectedDoctorId}`, scheduleData);
    setMessage('Schedule successfully created! (Mock submission)');
    // Optionally clear form or redirect
    // setScheduleData(daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: { ...initialSchedule } }), {}));
  };

  // Tailwind CSS Class Mapping
  const inputClass = 'form-control w-full p-1.5 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500';
  const buttonPrimaryClass = 'bg-[#0d6efd] text-white hover:bg-blue-700 transition duration-150 py-2 px-4 rounded';
  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const sectionHeaderClass = 'border-b pb-2 mb-4';

  return (
    <>
      <Head>
        <title>Add Doctor Schedule - Admin</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50 pt-16">
        {/* Sidebar (Fixed width for Admin dashboard layout) */}
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
                  <h3 className="text-2xl font-bold mb-1">List of Doctors</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="Dashboard.aspx" className="hover:text-blue-600">Dashboard /</a></li>
                    <li className="text-gray-800 font-semibold">&nbsp; Add Doctor Schedule</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            
            {/* Server Message */}
            {message && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded font-bold">
                    {message}
                </div>
            )}
            
            <form onSubmit={handleSubmitSchedule}>
                {/* Select Doctors */}
                <section className="mb-8">
                <div className={sectionHeaderClass}>
                    <h3 className="text-xl font-semibold">Select Doctor for Schedule</h3>
                    <div className="h-0.5 bg-gray-200 mt-2"></div>
                </div>
                <div className="card bg-white shadow-lg rounded-lg p-6">
                    <div className="w-full">
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
                </div>
                </section>
                {/* /Select Doctors */}

                {/* Doctor Profile (Conditional Display) */}
                {doctorProfile && (
                <section className="mb-8">
                    <div className={sectionHeaderClass}>
                    <h3 className="text-xl font-semibold">Doctor Details</h3>
                    <div className="h-0.5 bg-gray-200 mt-2"></div>
                    </div>
                    <div className="progress-example card bg-white shadow-lg rounded-lg">
                    <div className="p-6">
                        <div className="flex flex-wrap -mx-4">
                        {/* Doctor Image */}
                        <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                            <div className="card flex-fill">
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
                            <div className="text-sm text-gray-700 mb-3">
                                <FontAwesomeIcon icon={faUserMd} className="text-lg text-blue-600 mr-2" />
                                <span className="mx-1">{doctorProfile.Specialization}</span>
                                <FontAwesomeIcon icon={faTrophy} className="text-lg text-blue-600 mx-2" />
                                <span className="mx-1">{doctorProfile.Experience}</span>
                                <FontAwesomeIcon icon={faMoneyBill} className="text-lg text-blue-600 mx-2" />
                                <span className="mx-1">{doctorProfile.ConsultationFee}</span>
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

                {/* Schedule Table */}
                {selectedDoctorId !== 0 && (
                <section className="mb-8">
                    <div className={sectionHeaderClass}>
                    <h3 className="text-xl font-semibold">Add Doctor Schedule</h3>
                    <div className="h-0.5 bg-gray-200 mt-2"></div>
                    </div>
                    <div className="card bg-white shadow-lg rounded-lg p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 text-center text-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-2 border font-medium">Day</th>
                                <th colSpan="2" className="p-2 border font-medium">Shift 1</th>
                                <th colSpan="2" className="p-2 border font-medium">Shift 2</th>
                                <th colSpan="2" className="p-2 border font-medium">Shift 3</th>
                                <th className="p-2 border font-medium">Slot Duration (Mins)</th>
                                <th className="p-2 border font-medium">No. of Patients/Slot</th>
                            </tr>
                            <tr className="bg-gray-50">
                                <th className="p-2 border"></th>
                                <th className="p-2 border text-xs font-normal">From</th>
                                <th className="p-2 border text-xs font-normal">To</th>
                                <th className="p-2 border text-xs font-normal">From</th>
                                <th className="p-2 border text-xs font-normal">To</th>
                                <th className="p-2 border text-xs font-normal">From</th>
                                <th className="p-2 border text-xs font-normal">To</th>
                                <th className="p-2 border"></th>
                                <th className="p-2 border"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {daysOfWeek.map((day) => (
                            <tr key={day}>
                                <td className="p-2 border font-medium text-gray-700">{day}</td>
                                <td className="p-1 border">
                                    <input
                                        type="time"
                                        value={scheduleData[day].Txtfrom}
                                        onChange={(e) => handleScheduleChange(day, 'Txtfrom', e.target.value)}
                                        className={inputClass}
                                    />
                                </td>
                                <td className="p-1 border">
                                    <input
                                        type="time"
                                        value={scheduleData[day].Txtto}
                                        onChange={(e) => handleScheduleChange(day, 'Txtto', e.target.value)}
                                        className={inputClass}
                                    />
                                </td>
                                <td className="p-1 border">
                                    <input
                                        type="time"
                                        value={scheduleData[day].Txtfrom1}
                                        onChange={(e) => handleScheduleChange(day, 'Txtfrom1', e.target.value)}
                                        className={inputClass}
                                    />
                                </td>
                                <td className="p-1 border">
                                    <input
                                        type="time"
                                        value={scheduleData[day].Txtto1}
                                        onChange={(e) => handleScheduleChange(day, 'Txtto1', e.target.value)}
                                        className={inputClass}
                                    />
                                </td>
                                <td className="p-1 border">
                                    <input
                                        type="time"
                                        value={scheduleData[day].Txtfrom2}
                                        onChange={(e) => handleScheduleChange(day, 'Txtfrom2', e.target.value)}
                                        className={inputClass}
                                    />
                                </td>
                                <td className="p-1 border">
                                    <input
                                        type="time"
                                        value={scheduleData[day].Txtto2}
                                        onChange={(e) => handleScheduleChange(day, 'Txtto2', e.target.value)}
                                        className={inputClass}
                                    />
                                </td>
                                <td className="p-1 border w-24">
                                    <input
                                        type="number"
                                        min="1"
                                        value={scheduleData[day].txtslotDuration}
                                        onChange={(e) => handleScheduleChange(day, 'txtslotDuration', e.target.value)}
                                        className={inputClass}
                                    />
                                </td>
                                <td className="p-1 border w-24">
                                    <input
                                        type="number"
                                        min="1"
                                        value={scheduleData[day].NoOfPatientPerSlot}
                                        onChange={(e) => handleScheduleChange(day, 'NoOfPatientPerSlot', e.target.value)}
                                        className={inputClass}
                                    />
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
                            Create Doctor Schedule
                        </button>
                    </div>
                    </div>
                </section>
                )}
            </form>

            <br /><br /><br />
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default AdminAddDoctorSchedule;