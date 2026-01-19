// src/app/doctors/[id]/page.js (Dynamic Route Component)

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// --- MOCK DATA ---
const mockDoctor = {
    DoctorId: 10,
    Name: 'Dr. John Smith',
    Email: 'john.smith@clinic.com',
    Specialization: 'Cardiologist',
    Experience: 10,
    Age: 45,
    Gender: 'Male',
    ConsultationFee: 75.00,
    ImageUrl: '/img/doctor-smith.jpg',
    Rating: 4, // Average rating
    
    // Overview
    Bio: "Dr. Smith is a leading cardiologist with over 10 years of experience in diagnosing and treating cardiovascular diseases. He specializes in interventional cardiology and cardiac rhythm management. He is committed to providing personalized and compassionate care to all his patients.",
    Qualification: 'MBBS, MD - Cardiology, FACC (Fellow of the American College of Cardiology)',
    Address: '123 Main Street, Suite 400, New Delhi, India, 110001',
    City: 'New Delhi',
    State: 'Delhi',
    Country: 'India',
    Pincode: '110001',

    // Schedule
    Schedule: [
        { ScheduleId: 1, ScheduleDay: 'Monday', FromTime: '09:00 AM', ToTime: '01:00 PM', FromTime1: '03:00 PM', ToTime1: '07:00 PM', FromTime2: 'N/A', ToTime2: 'N/A', SlotDuration: 30 },
        { ScheduleId: 2, ScheduleDay: 'Tuesday', FromTime: '09:00 AM', ToTime: '01:00 PM', FromTime1: '03:00 PM', ToTime1: '07:00 PM', FromTime2: 'N/A', ToTime2: 'N/A', SlotDuration: 30 },
        { ScheduleId: 3, ScheduleDay: 'Wednesday', FromTime: '09:00 AM', ToTime: '12:00 PM', FromTime1: '02:00 PM', ToTime1: '06:00 PM', FromTime2: '07:00 PM', ToTime2: '09:00 PM', SlotDuration: 20 },
        { ScheduleId: 4, ScheduleDay: 'Thursday', FromTime: '09:00 AM', ToTime: '01:00 PM', FromTime1: '03:00 PM', ToTime1: '07:00 PM', FromTime2: 'N/A', ToTime2: 'N/A', SlotDuration: 30 },
        { ScheduleId: 5, ScheduleDay: 'Friday', FromTime: '09:00 AM', ToTime: '12:00 PM', FromTime1: 'N/A', ToTime1: 'N/A', FromTime2: 'N/A', ToTime2: 'N/A', SlotDuration: 30 },
        { ScheduleId: 6, ScheduleDay: 'Saturday', FromTime: '10:00 AM', ToTime: '02:00 PM', FromTime1: 'N/A', ToTime1: 'N/A', FromTime2: 'N/A', ToTime2: 'N/A', SlotDuration: 15 },
        { ScheduleId: 7, ScheduleDay: 'Sunday', FromTime: 'N/A', ToTime: 'N/A', FromTime1: 'N/A', ToTime1: 'N/A', FromTime2: 'N/A', ToTime2: 'N/A', SlotDuration: 0 },
    ],

    // Reviews
    Reviews: [
        { Ptname: 'David Johnson', Rating: 5, Comment: 'Dr. Smith is excellent. Highly knowledgeable and caring. Highly recommend.', RatingCreatedDayago: 2 },
        { Ptname: 'Maria Garcia', Rating: 4, Comment: 'Good experience, thorough check-up, but the wait time was a bit long.', RatingCreatedDayago: 5 },
        { Ptname: 'James Wilson', Rating: 5, Comment: 'Fantastic doctor, explained everything clearly and put me at ease.', RatingCreatedDayago: 10 },
    ]
};

// --- COMPONENTS ---

// Reusable Star Rating Component
const StarRating = ({ rating, readOnly = true }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <i
                key={i}
                className={`fa-solid fa-star text-sm mr-0.5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                style={{ cursor: readOnly ? 'default' : 'pointer' }}
            ></i>
        );
    }
    return <div className="flex">{stars}</div>;
};

// --- MAIN COMPONENT ---

const DoctorProfile = () => {
    // For pages/ routes use the pages-router's useRouter to read query params
    const router = useRouter();
    // router.query may be empty during initial render; read safely
    const doctorId = router?.query?.id ?? router?.query?.doctorId ?? null;
    const [doctor, setDoctor] = useState(mockDoctor); // In a real app, fetch data by doctorId
    const [activeTab, setActiveTab] = useState('overview');

    // Calculate total review count and average rating
    const totalReviews = doctor.Reviews.length;
    const averageRating = totalReviews > 0 
        ? (doctor.Reviews.reduce((sum, review) => sum + review.Rating, 0) / totalReviews) 
        : 0;

    // Handle data loading state if necessary
    if (!doctor) {
        return <div className="text-center py-20 text-red-500">Doctor not found.</div>;
    }

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Doctor Profile</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                                <li aria-current="page" className="text-gray-700">/ Doctor Profile</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* /Breadcrumb */}

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">

                    {/* Doctor Widget */}
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start">
                            <div className="flex items-start space-x-4">
                                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                                    <img src={doctor.ImageUrl} alt="Doctor" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-xl font-bold text-gray-800">{doctor.Name}</h4>
                                    <p className="text-sm text-gray-500 mb-1">{doctor.Email}</p>
                                    <p className="text-base text-gray-700 mt-0.5">
                                        {doctor.Specialization} | {doctor.Experience} year Experience
                                    </p>
                                    <p className="text-sm text-gray-600 mt-0.5">
                                        Age: <span className="font-medium">{doctor.Age}</span>
                                        <span className="mx-2">|</span>
                                        Gender: <span className="font-medium">{doctor.Gender}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 md:text-right">
                                <div className="mb-3">
                                    <span className="text-sm text-gray-600 block">Consultation Fee</span>
                                    <span className="text-lg font-bold text-green-600">
                                        <i className="fa-solid fa-indian-rupee-sign fa-xs mr-1"></i>
                                        {doctor.ConsultationFee.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex md:justify-end items-center mb-4">
                                    <StarRating rating={Math.round(averageRating)} />
                                </div>
                                <Link href={`/appointments/book?doctorId=${doctor.DoctorId}`} className="btn bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-full text-sm font-medium transition">
                                    Book Appointment
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* /Doctor Widget */}
                            
                    {/* Doctor Details Tab */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="p-4 border-b">
                            {/* Tab Menu */}
                            <nav className="border-b border-gray-200">
                                <ul className="flex flex-wrap -mb-px text-base font-medium text-center" role="tablist">
                                    {['overview', 'schedule', 'reviews'].map(tab => (
                                        <li key={tab} className="mr-2" role="presentation">
                                            <button
                                                className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors duration-200 ${
                                                    activeTab === tab 
                                                        ? 'border-blue-600 text-blue-600 font-bold' 
                                                        : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300'
                                                }`}
                                                onClick={() => setActiveTab(tab)}
                                                role="tab"
                                                aria-selected={activeTab === tab}
                                            >
                                                {tab === 'schedule' ? 'Doctor Schedule' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            {/* /Tab Menu */}
                        </div>
                                
                        {/* Tab Content */}
                        <div className="p-6">
                            
                            {/* Overview Content */}
                            <div role="tabpanel" id="doc_overview" className={`tab-pane ${activeTab === 'overview' ? 'block' : 'hidden'}`}>
                                <div className="space-y-6">
                                    
                                    {/* About Details */}
                                    <div className="widget pb-4 border-b">
                                        <h4 className="text-xl font-semibold mb-3">About Me</h4>
                                        <p className="text-gray-700 whitespace-pre-wrap">{doctor.Bio}</p>
                                    </div>
                                    
                                    {/* Education Details */}
                                    <div className="widget pb-4 border-b">
                                        <h4 className="text-xl font-semibold mb-3">Education</h4>
                                        <ul className="space-y-3">
                                            {doctor.Qualification.split(',').map((edu, index) => (
                                                <li key={index} className="flex items-start text-gray-700">
                                                    <i className="fa-solid fa-circle-dot text-blue-500 text-sm mt-1 mr-3"></i>
                                                    <div>{edu.trim()}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Address Details */}
                                    <div className="widget">
                                        <h4 className="text-xl font-semibold mb-3">Address</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-start text-gray-700">
                                                <i className="fa-solid fa-location-dot text-blue-500 text-sm mt-1 mr-3"></i>
                                                <div>
                                                    {doctor.Address}, {doctor.City}, {doctor.State}, {doctor.Country}, Pincode: {doctor.Pincode}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* /Overview Content */}
                                    
                            {/* Doctor Schedule Content */}
                            <div role="tabpanel" id="doc_business_hours" className={`tab-pane ${activeTab === 'schedule' ? 'block' : 'hidden'}`}>
                                <div className="max-w-3xl mx-auto">
                                    <div className="overflow-x-auto border rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead>
                                                <tr className="bg-gray-50 text-gray-600 font-semibold uppercase tracking-wider">
                                                    <th className="px-6 py-3 border">Day</th>
                                                    <th className="px-6 py-3 border">Shift 1</th>
                                                    <th className="px-6 py-3 border">Shift 2</th>
                                                    <th className="px-6 py-3 border">Shift 3</th>
                                                    <th className="px-6 py-3 border">Slot Duration</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 text-center">
                                                {doctor.Schedule.map((day) => (
                                                    <tr key={day.ScheduleId}>
                                                        <td className="px-6 py-4 border font-medium text-gray-800">{day.ScheduleDay}</td>
                                                        <td className="px-6 py-4 border text-gray-700">{day.FromTime === 'N/A' ? 'Closed' : `${day.FromTime} - ${day.ToTime}`}</td>
                                                        <td className="px-6 py-4 border text-gray-700">{day.FromTime1 === 'N/A' ? 'Closed' : `${day.FromTime1} - ${day.ToTime1}`}</td>
                                                        <td className="px-6 py-4 border text-gray-700">{day.FromTime2 === 'N/A' ? 'Closed' : `${day.FromTime2} - ${day.ToTime2}`}</td>
                                                        <td className="px-6 py-4 border text-gray-700">{day.SlotDuration > 0 ? `${day.SlotDuration} min` : 'N/A'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* /Business Hours Content */}
                                    
                            {/* Reviews Content */}
                            <div role="tabpanel" id="doc_reviews" className={`tab-pane ${activeTab === 'reviews' ? 'block' : 'hidden'}`}>
                                <h4 className="text-xl font-semibold mb-4">{totalReviews} Reviews</h4>
                                
                                <div className="space-y-6">
                                    {doctor.Reviews.map((review, index) => (
                                        <div key={index} className="pb-6 border-b last:border-b-0">
                                            <div className="flex items-start">
                                                <img src="/img/patient-avatar.jpg" alt="Patient Avatar" className="w-10 h-10 rounded-full border flex-shrink-0" />
                                                <div className="ms-3 w-full">
                                                    <div className="flex justify-between items-start flex-wrap">
                                                        <span className="font-bold text-gray-800">{review.Ptname}</span>
                                                        <span className="text-sm text-gray-500">Reviewed {review.RatingCreatedDayago} days ago</span>
                                                    </div>
                                                    <div className="mt-1">
                                                        <StarRating rating={review.Rating} />
                                                    </div>
                                                    <p className="comment-content mt-2 text-gray-700 whitespace-pre-wrap">{review.Comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* /Reviews Content */}
                        </div>
                    </div>
                    {/* /Doctor Details Tab */}
                </div>
            </div>
            {/* /Page Content */}
            
            <style jsx global>{`
                /* Global Font-Awesome for icons */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
            `}</style>
        </>
    );
};

export default DoctorProfile;