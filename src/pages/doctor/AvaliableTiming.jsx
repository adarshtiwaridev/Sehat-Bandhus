// File: pages/doctor/AvailableTiming.jsx (or similar path)

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Custom CSS module for the specific 'booked' and duration styles
// import styles from './AvailableTiming.module.css'; 

// --- Component Definitions ---

const DoctorProfile = ({ profile }) => (
    <div className="profile-sidebar doctor-sidebar profile-sidebar-new bg-white shadow-lg rounded-lg p-4 sticky top-6">
        <div className="widget-profile pro-widget-content">
            <div className="flex items-center space-x-4">
                <Link href={profile.profileUrl} className="w-16 h-16 rounded-full overflow-hidden block">
                    <Image src={profile.imageUrl} alt="Doctor Image" width={64} height={64} />
                </Link>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                        <Link href={profile.profileUrl} className="text-blue-600 hover:underline">{profile.name}</Link>
                    </h3>
                    <div className="text-sm text-gray-600">
                        <h5 className="mb-0">{profile.qualification}, {profile.experience} Experience</h5>
                    </div>
                    <span className="inline-flex items-center text-xs font-medium bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full mt-1">
                        <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                        {profile.specialty}
                    </span>
                </div>
            </div>
        </div>
        {/* Navigation Menu (Simplified for React) */}
        <div className="mt-6">
            <nav>
                <ul>
                    {/* Add your dashboard menu items here, styled with Tailwind */}
                    <li className="p-2 hover:bg-gray-100 rounded-md">
                        <Link href="/doctor/Dashboard" className="flex items-center space-x-3 text-gray-700">
                            <i className="fa-solid fa-shapes"></i><span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="p-2 bg-blue-50 text-blue-800 rounded-md font-medium"> {/* Active state */}
                        <i className="fa-solid fa-calendar-day"></i><span>Available Timings</span>
                    </li>
                    {/* ... other menu items ... */}
                </ul>
            </nav>
        </div>
    </div>
);

// --- Main Page Component ---
export default function AvailableTimingPage() {
    const [scheduleData, setScheduleData] = useState({});
    const [activeDay, setActiveDay] = useState('Monday');
    const [isLoading, setIsLoading] = useState(false);
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Dummy Doctor Data (Replace with actual data fetching logic)
    const doctorProfile = {
        name: "Dr. John Doe",
        imageUrl: "/assets/doctor-image.jpg",
        profileUrl: "/doctor/profile",
        qualification: "MBBS, MD",
        experience: "10 Years",
        specialty: "Cardiology",
        consultationFee: 500,
    };

    // Equivalent of the jQuery getDoctorSchedule function using React/Fetch
    const getDoctorSchedule = useCallback(async (day) => {
        setIsLoading(true);
        try {
            // CALLS THE NEXT.JS API ROUTE
            const response = await fetch(`/api/doctor/get-slots?day=${day}`);
            // if (!response.ok) throw new Error("Failed to fetch schedule");
            
            const data = await response.json();
            // Store the data keyed by the day
            setScheduleData(prev => ({ ...prev, [day]: data }));

        } catch (error) {
            console.error("Fetch Error:", error);
            setScheduleData(prev => ({ ...prev, [day]: [] }));
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load data for the active day on component mount and when activeDay changes
    useEffect(() => {
        if (!scheduleData[activeDay]) {
            getDoctorSchedule(activeDay);
        }
    }, [activeDay, scheduleData, getDoctorSchedule]);


    // Function to render the slots for the current day
    const renderSlots = (day) => {
        const slots = [scheduleData[day]];
        
        if (isLoading && activeDay === day) {
            return <p>Loading slots...</p>;
        }
        if (!slots || slots.length === 0) {
            return <p>No Slots Available</p>;
        }

        return (
            <ul className="flex flex-wrap gap-3">
                {slots.map((slot, index) => (
                    // Apply classes dynamically using backticks
                    <li key={index} data-shift={slot?.ShiftWise}
                        className={`px-3 py-2 border rounded-full text-sm cursor-pointer transition-colors duration-200 
                                    ${slot?.Flag ? styles.booked : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'}`}>
                        <i className="fa-regular fa-clock mr-1"></i> {slot?.Shifts}
                        {/* <span className={styles?.slotDuration}>({slot?.SlotDuration} min)</span> */}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <Head>
                <title>Available Timings - Clinic</title>
                {/* Include FontAwesome or other CSS libraries */}
            </Head>

            {/* Breadcrumb Section (simplified with Tailwind) */}
            <div className="bg-gray-100 py-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">Available Timings</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center text-sm space-x-2">
                            <li className="breadcrumb-item"><Link href="/Default" className="text-blue-600 hover:underline">Home</Link></li>
                            <li className="breadcrumb-item text-gray-500" aria-current="page">Available Timings</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        
                        {/* Profile Sidebar (Left Column) */}
                        <div className="w-full lg:w-1/3 xl:w-1/4 px-4">
                            <DoctorProfile profile={doctorProfile} />
                        </div>

                        {/* Main Content (Right Column) */}
                        <div className="w-full lg:w-2/3 xl:w-3/4 px-4 mt-6 lg:mt-0">
                            <div className="dashboard-header mb-6">
                                <h3 className="text-2xl font-semibold">Available Timings</h3>
                            </div>

                            {/* Main Tabs (General & Clinic) */}
                            <div className="border-b border-gray-200">
                                <ul className="flex space-x-6 text-sm font-medium" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="py-2 border-b-2 border-blue-600 text-blue-600 cursor-default" role="tab">General Availability</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="py-2 text-gray-500 hover:text-gray-700 cursor-pointer" role="tab">Clinic Availability</a>
                                    </li>
                                </ul>
                            </div>

                            {/* General Availability Tab Content */}
                            <div className="bg-white shadow-lg rounded-lg mt-4">
                                <div className="p-6">
                                    <div className="border-b pb-4 mb-4">
                                        <h3 className="text-xl font-semibold">Select Available Slots</h3>
                                    </div>

                                    {/* Select Day Tabs */}
                                    <label className="block text-sm font-medium mb-3">Select Available days</label>
                                    <ul className="flex flex-wrap gap-2 mb-6" role="tablist">
                                        {daysOfWeek.map(day => (
                                            <li key={day}>
                                                <a href="#" onClick={() => setActiveDay(day)}
                                                   className={`px-4 py-2 text-sm rounded-md transition-colors duration-150 ${activeDay === day ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                                    {day}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Slot Content Area */}
                                    <div className="border p-4 rounded-lg bg-gray-50">
                                        <div className="mb-4">
                                            <h5 className="text-lg font-semibold">{activeDay}</h5>
                                        </div>
                                        <div className="slot-body">
                                            {renderSlots(activeDay)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Consultation Fee Input */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium mb-1">Appointment Fees (₹)</label>
                                <input type="text" value={`₹ ${doctorProfile.consultationFee}`} readOnly
                                    className="form-input block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 text-gray-700" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// NOTE: For the Layout (Profile Sidebar) to be sticky, you may need a separate 
// solution like `react-theia-sticky-sidebar` or simply using Tailwind's `sticky top-X` 
// on the profile column, which is what is simulated here.