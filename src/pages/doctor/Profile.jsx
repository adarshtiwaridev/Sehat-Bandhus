// File: pages/doctor/ProfilePage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';

// Assuming these custom components exist in your project structure
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';


// --- Mock Data Structures ---
const mockDoctorData = {
    name: "Dr. Darren Elder",
    email: "darren.elder@clinic.com",
    specialist: "Dental Specialist",
    experience: 10,
    age: 45,
    gender: 'Male',
    consultationFee: 250,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ipsum sed velit egestas scelerisque. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Fusce non nulla eget nisl tempus convallis quis ac lectus.",
    qualification: "M.D.S., D.D.S.",
    address: "123 Main St, Apt 4B",
    city: "Newyork",
    state: "NY",
    country: "USA",
    pincode: 10001,
    imageUrl: "/assets/doctors/doctor-profile.jpg",
    rating: 4,
    reviewCount: 35
};

const mockSchedule = [
    { ScheduleDay: 'Monday', FromTime: '09:00 AM', ToTime: '12:00 PM', FromTime1: '02:00 PM', ToTime1: '05:00 PM', FromTime2: '07:00 PM', ToTime2: '09:00 PM', SlotDuration: 15 },
    { ScheduleDay: 'Tuesday', FromTime: '09:00 AM', ToTime: '12:00 PM', FromTime1: '02:00 PM', ToTime1: '05:00 PM', FromTime2: '-', ToTime2: '-', SlotDuration: 15 },
    // Add more days as needed
];

const mockReviews = [
    { author: "Richard Wilson", date: "2 Days ago", rating: 4, recommended: true, content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus." },
    { author: "Charlene Reed", date: "3 Days ago", rating: 4, recommended: false, content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Curabitur non nulla sit amet nisl tempus." },
];

// --- Sub-Components ---

// Component for rendering star rating
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <i key={i} className={`fas fa-star ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
        );
    }
    return <div className="rating flex space-x-0.5">{stars}</div>;
};

// Component for a single review item
const ReviewItem = ({ review }) => (
    <li className="mb-6 border-b pb-4 last:border-b-0">
        <div className="flex space-x-3">
            <Image 
                className="w-10 h-10 rounded-full" 
                alt="User Image" 
                src="/assets/img/patients/patient.jpg" // Placeholder image
                width={40} height={40}
            />
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <div className="flex flex-col">
                        <span className="font-semibold">{review.author}</span>
                        <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-gray-500">({review.rating}.0)</span>
                    </div>
                </div>
                {review.recommended && (
                    <p className="text-sm text-green-600 mb-1"><i className="far fa-thumbs-up mr-1"></i> I recommend the doctor</p>
                )}
                <p className="comment-content text-sm text-gray-700 mb-3">{review.content}</p>
                <div className="comment-reply flex justify-between items-center text-sm">
                    <a className="text-blue-600 hover:text-blue-800" href="#">
                        <i className="fas fa-reply mr-1"></i> Reply
                    </a>
                    <div className="recommend-btn flex items-center space-x-2 text-gray-500">
                        <span>Recommend?</span>
                        <a href="#" className="flex items-center text-green-600 hover:text-green-800">
                            <i className="far fa-thumbs-up mr-1"></i> Yes
                        </a>
                        <a href="#" className="flex items-center text-red-600 hover:text-red-800">
                            <i className="far fa-thumbs-down mr-1"></i> No
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </li>
);

// --- Main Page Component ---
export default function DoctorProfilePage() {
    const [doctor, setDoctor] = useState(mockDoctorData);
    const [schedule, setSchedule] = useState(mockSchedule);
    const [reviews, setReviews] = useState(mockReviews);
    const [reviewInput, setReviewInput] = useState({ title: '', review: '', rating: 0 });
    const maxChars = 100;

    // useEffect(() => {
    //     // In a real app, fetch doctor profile and related data here:
    //     // fetch('/api/doctor/profile').then(res => res.json()).then(data => setDoctor(data));
    // }, []);
    
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // Logic to submit the review data (reviewInput) to a Next.js API Route
        console.log("Submitting Review:", reviewInput);
        Swal.fire('Review Submitted!', 'Thank you for your feedback.', 'success');
        setReviewInput({ title: '', review: '', rating: 0 });
    };

    const handleRatingChange = (newRating) => {
        setReviewInput(prev => ({ ...prev, rating: newRating }));
    };

    return (
        <>
            <Head>
                <title>Doctor Profile - {doctor.name}</title>
            </Head>

            {/* Breadcrumb Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">Doctor Profile</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center text-sm space-x-2">
                            <li><Link href="/Default" className="text-blue-600 hover:underline">Home</Link></li>
                            <li className="text-gray-500" aria-current="page">Doctor Profile</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">

                    {/* Doctor Widget */}
                    <Card className="p-6 mb-8 glass-card">
                        <div className="flex flex-col md:flex-row justify-between items-start">
                            
                            {/* Left Info */}
                            <div className="flex items-start space-x-4 mb-4 md:mb-0">
                                <div className="w-24 h-24 rounded-full overflow-hidden block shrink-0">
                                    <Image id="Image1" src={doctor.imageUrl} alt="User Image" width={96} height={96} className="img-fluid" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-2xl font-bold text-gray-900">{doctor.name}</h4>
                                    <p className="text-sm text-gray-600 mb-1">{doctor.email}</p>
                                    <p className="doc-speciality text-md font-medium text-blue-600">
                                        {doctor.specialist} | {doctor.experience} year Experience
                                    </p>
                                    <div className="flex items-center space-x-1 mb-1">
                                        <StarRating rating={doctor.rating} />
                                        <span className="text-sm text-gray-500">({doctor.reviewCount})</span>
                                    </div>
                                    <p className="doc-location text-sm text-gray-600">
                                        Age: {doctor.age} | Gender: {doctor.gender}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Right Actions */}
                            <div className="flex flex-col items-end space-y-4">
                                <div className="clini-infos">
                                    <ul>
                                        <li className="text-lg font-bold text-green-600">
                                            <i className="far fa-money-bill-alt mr-2"></i>
                                            Fee: ₹{doctor.consultationFee}
                                        </li>
                                    </ul>
                                </div>
                                <div className="doctor-action flex space-x-2">
                                    <button title="Favorite" className="btn bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-red-100 hover:text-red-600">
                                        <i className="far fa-bookmark"></i>
                                    </button>
                                    <Link href="/chat" className="btn bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-blue-100 hover:text-blue-600">
                                        <i className="far fa-comment-alt"></i>
                                    </Link>
                                    <Link href="/voice-call" className="btn bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-green-100 hover:text-green-600">
                                        <i className="fas fa-phone"></i>
                                    </Link>
                                    <Link href="/video-call" className="btn bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-purple-100 hover:text-purple-600">
                                        <i className="fas fa-video"></i>
                                    </Link>
                                </div>
                                <div className="clinic-booking mt-2">
                                    <Link href="/Patients/Appointments" className="btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                        Book Appointment
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                    {/* /Doctor Widget */}
                    
                    {/* Doctor Details Tab */}
                    {/* NOTE: This tabbing logic currently relies on CSS classes and anchor tags. 
                        For a true single-page app feel, you would manage the active tab with React state. */}
                    <Card className="p-6 pt-0 glass-card">
                        <div className="card-body pt-0">
                        
                            {/* Tab Menu */}
                            <nav className="user-tabs mb-4 border-b border-gray-200">
                                <ul className="nav nav-tabs nav-tabs-bottom nav-justified flex space-x-6 text-center -mb-px">
                                    <li><a className="nav-link active inline-block py-3 px-4 border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-600" href="#doc_overview" data-bs-toggle="tab">Overview</a></li>
                                    <li><a className="nav-link inline-block py-3 px-4 border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-600" href="#doc_business_hours" data-bs-toggle="tab">Doctor Schedule</a></li>
                                    <li><a className="nav-link inline-block py-3 px-4 border-b-2 border-transparent hover:border-blue-500 text-gray-600 hover:text-blue-600" href="#doc_reviews" data-bs-toggle="tab">Reviews</a></li>
                                </ul>
                            </nav>
                            {/* /Tab Menu */}
                            
                            {/* Tab Content */}
                            <div className="tab-content pt-0">
                            
                                {/* 1. Overview Content */}
                                <div role="tabpanel" id="doc_overview" className="tab-pane fade show active">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                        <div className="col-span-1 lg:col-span-9">
                                        
                                            {/* About Details */}
                                            <div className="widget about-widget mb-6">
                                                <h4 className="widget-title text-xl font-semibold mb-3">About Me</h4>
                                                <p className="text-gray-700">{doctor.bio}</p>
                                            </div>
                                            {/* /About Details */}
                                            
                                            {/* Education Details */}
                                            <div className="widget education-widget mb-6">
                                                <h4 className="widget-title text-xl font-semibold mb-3">Education</h4>
                                                <div className="experience-box">
                                                    <ul className="space-y-4">
                                                        <li className="flex items-start">
                                                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 shrink-0"></div>
                                                            <div>
                                                                <p className="text-gray-700 font-medium">{doctor.qualification}</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* /Education Details */}
                                            
                                            {/* Address Details */}
                                            <div className="widget education-widget mb-6">
                                                <h4 className="widget-title text-xl font-semibold mb-3">Address</h4>
                                                <div className="experience-box">
                                                    <ul className="space-y-4">
                                                        <li className="flex items-start">
                                                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 shrink-0"></div>
                                                            <div>
                                                                <p className="text-gray-700 font-medium">
                                                                    {doctor.address}, {doctor.city}, {doctor.state}, {doctor.country} - {doctor.pincode}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* /Address Details */}
                                        </div>
                                    </div>
                                </div>
                                {/* /Overview Content */}
                                
                                {/* 2. Business Hours Content */}
                                <div role="tabpanel" id="doc_business_hours" className="tab-pane fade">
                                    <div className="row">
                                        <div className="col-md-6 offset-md-3 mx-auto w-full max-w-lg">
                                            <table className="table-auto w-full border border-gray-300 text-center text-sm">
                                                <thead>
                                                    <tr className="bg-gray-100 text-gray-700">
                                                        <th className="p-2 border">Day</th>
                                                        <th className="p-2 border">Shift 1</th>
                                                        <th className="p-2 border">Shift 2</th>
                                                        <th className="p-2 border">Shift 3</th>
                                                        <th className="p-2 border">Slot Duration</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {schedule.map((slot, index) => (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="p-2 border">{slot.ScheduleDay}</td>
                                                            <td className="p-2 border">{slot.FromTime} - {slot.ToTime}</td>
                                                            <td className="p-2 border">{slot.FromTime1} - {slot.ToTime1}</td>
                                                            <td className="p-2 border">{slot.FromTime2} - {slot.ToTime2}</td>
                                                            <td className="p-2 border">{slot.SlotDuration} min</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* /Business Hours Content */}
                                
                                {/* 3. Reviews Content */}
                                <div role="tabpanel" id="doc_reviews" className="tab-pane fade">
                                    
                                    {/* Review Listing */}
                                    <div className="widget review-listing mb-8">
                                        <ul className="comments-list space-y-6">
                                            {reviews.map((review, index) => (
                                                <ReviewItem key={index} review={review} />
                                            ))}
                                        </ul>
                                        
                                        {/* Show All */}
                                        <div className="text-center mt-6">
                                            <Button variant="default" size="sm" className="px-4 py-2 rounded-lg">
                                                Show all feedback <strong>({doctor.reviewCount})</strong>
                                            </Button>
                                        </div>
                                        {/* /Show All */}
                                    </div>
                                    {/* /Review Listing */}
                                    
                                    {/* Write Review */}
                                    <div className="write-review border-t pt-8">
                                        <h4 className="text-xl font-semibold mb-4">Write a review for <strong>{doctor.name}</strong></h4>
                                        
                                        {/* Write Review Form */}
                                        <form onSubmit={handleReviewSubmit} className="max-w-lg">
                                            <div className="mb-3">
                                                <label className="block mb-2 text-gray-700">Review Rating</label>
                                                <div className="flex items-center space-x-1">
                                                    {[5, 4, 3, 2, 1].map((n) => (
                                                        <label key={n} className="cursor-pointer text-2xl" onClick={() => handleRatingChange(n)}>
                                                            <i className={`fa-star ${n <= reviewInput.rating ? 'fas text-yellow-400' : 'far text-gray-300'} hover:text-yellow-500`}></i>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="block mb-2 text-gray-700">Title of your review</label>
                                                <input 
                                                    className="form-input w-full border-gray-300 rounded-md shadow-sm" 
                                                    type="text" 
                                                    placeholder="If you could say it in one sentence, what would you say?"
                                                    value={reviewInput.title}
                                                    onChange={(e) => setReviewInput(prev => ({ ...prev, title: e.target.value }))}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="block mb-2 text-gray-700">Your review</label>
                                                <textarea 
                                                    id="review_desc" 
                                                    maxLength={maxChars} 
                                                    className="form-textarea w-full border-gray-300 rounded-md shadow-sm"
                                                    value={reviewInput.review}
                                                    onChange={(e) => setReviewInput(prev => ({ ...prev, review: e.target.value }))}
                                                ></textarea>
                                                <div className="flex justify-end mt-1"><small className="text-gray-500">{maxChars - reviewInput.review.length} characters remaining</small></div>
                                            </div>
                                            <hr className="my-4"/>
                                            <div className="mb-3">
                                                <div className="terms-accept flex items-center">
                                                    <input type="checkbox" id="terms_accept" className="form-checkbox text-blue-600 rounded mr-2" />
                                                    <label htmlFor="terms_accept" className="text-sm text-gray-700">I have read and accept <a href="#" className="text-blue-600 hover:underline">Terms &amp; Conditions</a></label>
                                                </div>
                                            </div>
                                            <div className="submit-section mt-4">
                                                <Button type="submit" variant="default" size="sm" className="px-4 py-2 rounded-lg submit-btn">
                                                    Add Review
                                                </Button>
                                            </div>
                                        </form>
                                        {/* /Write Review Form */}
                                    </div>
                                    {/* /Write Review */}
                                    
                                </div>
                                {/* /Reviews Content */}
                                
                            </div>
                            {/* /Tab Content */}
                            
                        </div>
                    </Card>
                    {/* /Doctor Details Tab */}

                </div>
            </div> 
            {/* /Page Content */} 
        </>
    );
}