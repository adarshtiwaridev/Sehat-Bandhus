// src/app/appointments/book/page.js or src/components/BookAppointments.jsx

"use client"; // This component uses client-side hooks and interactions

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock Data Structures
const mockDoctorData = {
    id: 'DOC-123',
    name: 'Dr. Emily Carter',
    specialization: 'General Practitioner',
    experience: 15,
    rating: 4.8,
    imageUrl: '/path/to/doctor-avatar.jpg', // Placeholder image path
    address: '101 Healing Street',
    city: 'Healthville',
    state: 'CA',
    country: 'USA',
    pincode: '90210',
};

const mockScheduleData = [
    { ScheduleDay: 'Monday', FromTime: '09:00 AM', ToTime: '12:00 PM', FromTime1: '02:00 PM', ToTime1: '05:00 PM', FromTime2: '', ToTime2: '' },
    { ScheduleDay: 'Tuesday', FromTime: '09:00 AM', ToTime: '01:00 PM', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '' },
    { ScheduleDay: 'Wednesday', FromTime: '09:00 AM', ToTime: '12:00 PM', FromTime1: '03:00 PM', ToTime1: '06:00 PM', FromTime2: '', ToTime2: '' },
    { ScheduleDay: 'Friday', FromTime: '10:00 AM', ToTime: '01:00 PM', FromTime1: '', ToTime1: '', FromTime2: '', ToTime2: '' },
];

const mockAppointmentSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM',
    '02:30 PM', '03:00 PM', // Assume some are booked for demonstration
];

// Mock Booked Slots (for demonstration of 'booked-slot' class)
const mockBookedSlots = ['11:00 AM', '02:00 PM'];
const consultationFee = 500.00;


// Utility component for doctor info card
const DoctorCard = ({ data }) => (
    <div className="card-body">
        <div className="flex items-center flex-wrap gap-4">
            <span className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img src={data.imageUrl} alt="Doctor Avatar" className="w-full h-full object-cover" />
            </span>
            <div>
                <h4 className="mb-1 text-lg font-semibold text-gray-800">
                    {data.name}
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                        <i className="fa-solid fa-star mr-1 text-[10px]"></i>{data.rating.toFixed(1)}
                    </span>
                </h4>
                <p className="text-indigo-600 mb-2 font-medium">
                    {data.specialization}, {data.experience} years Experience
                </p>
                <p className="mb-0 text-sm text-gray-600">
                    <i className="isax isax-location mr-2 text-blue-500"></i>
                    {data.address}, {data.city}, {data.state}, {data.country}, {data.pincode}
                </p>
            </div>
        </div>
    </div>
);



const BookAppointments = () => {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const today = new Date().toISOString().split('T')[0];

    // Form State (Step 2)
    const [formData, setFormData] = useState({
        patientName: '',
        patientAge: '',
        patientGender: '',
        appointmentDay: '',
        appointmentDate: '',
        appointmentTime: '',
        comment: '',
        symptoms: '',
    });

    // Validation State
    const [validationErrors, setValidationErrors] = useState({});

    // Handler for form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // Handler for navigation
    const nextStep = (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            if (validateStep2()) {
                setStep(3);
            }
        }
    };

    const prevStep = (e) => {
        e.preventDefault();
        setStep(step - 1);
    };

    // Step 2 Validation Logic (Mimics original client-side validation)
    const validateStep2 = () => {
        const errors = {};
        const isNameValid = formData.patientName.trim() !== '';
        const isAgeValid = formData.patientAge.trim() !== '';
        const isGenderValid = formData.patientGender !== '' && formData.patientGender !== '0';
        const isDayValid = formData.appointmentDay !== '' && formData.appointmentDay !== '0';
        const isDateValid = formData.appointmentDate !== '' && formData.appointmentDate >= today;
        const isTimeValid = formData.appointmentTime !== '' && formData.appointmentTime !== '0';
        const isCommentValid = formData.comment.trim() !== '';
        const isSymptomsValid = formData.symptoms.trim() !== '';

        if (!isNameValid) errors.patientName = true;
        if (!isAgeValid) errors.patientAge = true;
        if (!isGenderValid) errors.patientGender = true;
        if (!isDayValid) errors.appointmentDay = true;
        if (!isDateValid) errors.appointmentDate = true;
        if (!isTimeValid) errors.appointmentTime = true;
        if (!isCommentValid) errors.comment = true;
        if (!isSymptomsValid) errors.symptoms = true;

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

 

    // Effect to update payment summary on data change
    useEffect(() => {
        // This effect can be used to dynamically load slots based on day/date if needed
        // For now, it just ensures the display logic is triggered when form data changes.
    }, [formData.appointmentDate, formData.appointmentTime]);

    // Render helper for form fields to apply Tailwind validation classes
    const getFieldClassName = (id) => {
        const isError = validationErrors[id];
        return `form-control w-full p-3 border rounded-lg transition duration-150 ${
            isError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        }`;
    };


    // Helper to extract available times for the selected day
    const getAvailableTimeSlots = useCallback(() => {
        // In a real application, you'd filter/fetch based on formData.appointmentDay and Date
        // Here, we return a mock list.
        return mockAppointmentSlots;
    }, [formData.appointmentDay, formData.appointmentDate]);

const handleConfirmPay = async (paymentMethod) => {
    if (paymentMethod === 'rdoRazorpay') {
        // 1️⃣ Create Appointment in DB first
        // Convert yyyy-mm-dd to dd/mm/yyyy (guard if appointmentDate is empty)
        let formattedDate = '';
        if (formData.appointmentDate) {
            const parts = formData.appointmentDate.split("-");
            if (parts.length === 3) {
                const [year, month, day] = parts;
                formattedDate = `${day}/${month}/${year}`;
            }
        }

        // Helper: map a selected time like '10:30 AM' to its parent slot '10:00-11:00'
        const mapTimeToSlot = (timeStr) => {
            if (!timeStr) return '';
            // normalize to 24-hour minute format for comparison
            const parse = (t) => {
                // t expected like '10:30 AM' or '2:00 PM'
                const [time, meridiem] = t.split(' ');
                let [h, m] = time.split(':').map(Number);
                if (meridiem === 'PM' && h !== 12) h += 12;
                if (meridiem === 'AM' && h === 12) h = 0;
                return { h, m };
            };

            const toMinutes = ({ h, m }) => h * 60 + m;

            const tMin = toMinutes(parse(timeStr));

            // Define slot ranges in minutes and return the matching slot string
            const slots = [
                { slot: '08:00-09:00', start: 8 * 60, end: 9 * 60 },
                { slot: '09:00-10:00', start: 9 * 60, end: 10 * 60 },
                { slot: '10:00-11:00', start: 10 * 60, end: 11 * 60 },
                { slot: '11:00-12:00', start: 11 * 60, end: 12 * 60 },
                { slot: '13:00-14:00', start: 13 * 60, end: 14 * 60 },
                { slot: '14:00-15:00', start: 14 * 60, end: 15 * 60 },
                { slot: '15:00-16:00', start: 15 * 60, end: 16 * 60 },
                { slot: '16:00-17:00', start: 16 * 60, end: 17 * 60 },
            ];

            const found = slots.find(s => tMin >= s.start && tMin < s.end);
            return found ? found.slot : '';
        };

        // Prepare payload matching your schema
        const payload = {
            patientName: formData.patientName,
            patientAge: Number(formData.patientAge),
            patientGender: formData.patientGender,
            appointmentDay: formData.appointmentDay,
            appointmentDate: formattedDate || formData.appointmentDate,
            appointmentTimeSlot: mapTimeToSlot(formData.appointmentTime), // map display time to schema slot
            comment: formData.comment,
            symptoms: formData.symptoms
        };

        // Send the normalized payload to the server
        const appointmentRes = await fetch('/api/appointments/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const appointmentData = await appointmentRes.json();
        console.log("appointmentdata",appointmentData);
        if (!appointmentData.success) return alert('Failed to create appointment');

        // 2️⃣ Create Razorpay Order
        const orderRes = await fetch('/api/appointments/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: consultationFee })
        });
        const orderData = await orderRes.json();
        if (!orderData.success) return alert('Failed to create order');

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: orderData.order.amount,
            currency: orderData.order.currency,
            name: "SehatBandhu Clinic",
            description: "Consultation Fee",
            order_id: orderData.order.id,
            handler: function (response) {
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                router.push('/receipt/appointment-booked');
            },
            prefill: {
                name: formData.patientName,
            },
            theme: { color: "#2563EB" }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    } else {
        alert('Appointment confirmed! Pay at clinic.');
        router.push('/receipt/appointment-booked');
    }
};
    return (
        <div className="bg-gray-50 py-10">
            {/* Breadcrumb/Header is typically handled by a Layout component in Next.js */}
            
            <div className="container mx-auto px-4">
                <div className="lg:max-w-4xl mx-auto">
                    {/* Booking Wizard Steps */}
                    <div className="mb-8 p-4 bg-white shadow rounded-lg">
                        <ul className="flex justify-center" id="progressbar2">
                            <li className={`flex-1 text-center ${step === 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                                <div className="p-2">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm ${step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-400 text-gray-500'}`}>1</span>
                                    <h6 className="mt-1 text-xs sm:text-sm">Doctor Specialty</h6>
                                </div>
                            </li>
                            <li className={`flex-1 text-center ${step === 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                                <div className="p-2">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm ${step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-400 text-gray-500'}`}>2</span>
                                    <h6 className="mt-1 text-xs sm:text-sm">Booking Information</h6>
                                </div>
                            </li>
                            <li className={`flex-1 text-center ${step === 3 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                                <div className="p-2">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm ${step >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-400 text-gray-500'}`}>3</span>
                                    <h6 className="mt-1 text-xs sm:text-sm">Payment</h6>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* End Booking Wizard Steps */}

                    <div className="booking-widget mb-5">
                        {/* Step 1: Doctor Specialty/Schedule */}
                        <div className={`transition-opacity duration-300 ${step === 1 ? 'block' : 'hidden'}`}>
                            <div className="card bg-white shadow rounded-lg mb-0">
                                <div className="card-header p-4 border-b border-gray-200">
                                    <DoctorCard data={mockDoctorData} />
                                </div>
                                <div className="card-body p-4 sm:p-6">
                                    <h3 className="text-xl font-semibold mb-4 border-b pb-3">Doctor Schedule</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {mockScheduleData.map((schedule, index) => (
                                            <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                                <div className="text-base font-semibold mb-2 text-gray-800">
                                                    {schedule.ScheduleDay}
                                                </div>
                                                {/* Shift 1 */}
                                                {(schedule.FromTime || schedule.ToTime) && (
                                                    <div className="text-sm text-gray-600 mb-1">
                                                        Shift 1: <span className="font-medium text-green-600">{schedule.FromTime} - {schedule.ToTime}</span>
                                                    </div>
                                                )}
                                                {/* Shift 2 */}
                                                {(schedule.FromTime1 || schedule.ToTime1) && (
                                                    <div className="text-sm text-gray-600 mb-1">
                                                        Shift 2: <span className="font-medium text-green-600">{schedule.FromTime1} - {schedule.ToTime1}</span>
                                                    </div>
                                                )}
                                                {/* Shift 3 */}
                                                {(schedule.FromTime2 || schedule.ToTime2) && (
                                                    <div className="text-sm text-gray-600">
                                                        Shift 3: <span className="font-medium text-green-600">{schedule.FromTime2} - {schedule.ToTime2}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-footer p-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <Link href="/doctors" className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
                                            <i className="isax isax-arrow-left-2 mr-1"></i>
                                            Back
                                        </Link>
                                        <button onClick={nextStep} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                                            Booking Information
                                            <i className="isax isax-arrow-right-3 ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Booking Information */}
                        <div className={`transition-opacity duration-300 ${step === 2 ? 'block' : 'hidden'}`}>
                            <div className="card bg-white shadow rounded-lg mb-0">
                                <div className="card-header p-4 border-b border-gray-200">
                                    <DoctorCard data={mockDoctorData} />
                                </div>
                                <div className="card-body p-4 sm:p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        
                                        {/* Patient Name */}
                                        <div className="mb-4">
                                            <label htmlFor="patientName" className="block text-sm font-semibold text-gray-700 mb-1">Patient Name</label>
                                            <input type="text" id="patientName" value={formData.patientName} onChange={handleInputChange} className={getFieldClassName('patientName')} required />
                                            {validationErrors.patientName && <p className="text-red-500 text-xs mt-1">Patient Name is required.</p>}
                                        </div>

                                        {/* Patient Age */}
                                        <div className="mb-4">
                                            <label htmlFor="patientAge" className="block text-sm font-semibold text-gray-700 mb-1">Patient Age</label>
                                            <input type="number" id="patientAge" value={formData.patientAge} onChange={handleInputChange} className={getFieldClassName('patientAge')} required />
                                            {validationErrors.patientAge && <p className="text-red-500 text-xs mt-1">Patient Age is required.</p>}
                                        </div>

                                        {/* Patient Gender */}
                                        <div className="mb-4">
                                            <label htmlFor="patientGender" className="block text-sm font-semibold text-gray-700 mb-1">Patient Gender</label>
                                            <select id="patientGender" value={formData.patientGender} onChange={handleInputChange} className={getFieldClassName('patientGender')} required>
                                                <option value="0">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            {validationErrors.patientGender && <p className="text-red-500 text-xs mt-1">Patient Gender is required.</p>}
                                        </div>

                                        {/* Appointment Day (Dropdownlist1) */}
                                        <div className="mb-4">
                                            <label htmlFor="appointmentDay" className="block text-sm font-semibold text-gray-700 mb-1">Select Appointment Day</label>
                                            <select id="appointmentDay" value={formData.appointmentDay} onChange={handleInputChange} className={getFieldClassName('appointmentDay')} required>
                                                <option value="0">Select Day</option>
                                                {mockScheduleData.map((s, i) => (
                                                    <option key={i} value={s.ScheduleDay}>{s.ScheduleDay}</option>
                                                ))}
                                            </select>
                                            {validationErrors.appointmentDay && <p className="text-red-500 text-xs mt-1">Appointment Day is required.</p>}
                                        </div>

                                        {/* Appointment Date */}
                                        <div className="mb-4">
                                            <label htmlFor="appointmentDate" className="block text-sm font-semibold text-gray-700 mb-1">Appointment Date</label>
                                            <input type="date" id="appointmentDate" value={formData.appointmentDate} onChange={handleInputChange} min={today} className={getFieldClassName('appointmentDate')} required />
                                            {validationErrors.appointmentDate && <p className="text-red-500 text-xs mt-1">Valid future Date is required.</p>}
                                        </div>

                                        {/* Appointment Time (DropdownlistShift1) */}
                                        <div className="mb-4">
                                            <label htmlFor="appointmentTime" className="block text-sm font-semibold text-gray-700 mb-1">Appointment Time</label>
                                            <select id="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} className={getFieldClassName('appointmentTime')} required>
                                                <option value="0">Select Time Slot</option>
                                                {getAvailableTimeSlots().map((time, i) => (
                                                    <option
                                                        key={i}
                                                        value={time}
                                                        disabled={mockBookedSlots.includes(time)}
                                                        className={mockBookedSlots.includes(time) ? 'bg-red-50 text-red-500 font-bold' : ''}
                                                    >
                                                        {time} {mockBookedSlots.includes(time) ? '(Booked)' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                            {validationErrors.appointmentTime && <p className="text-red-500 text-xs mt-1">Appointment Time is required.</p>}
                                        </div>

                                        {/* Comment */}
                                        <div className="lg:col-span-full mb-4">
                                            <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-1">Comment</label>
                                            <input type="text" id="comment" value={formData.comment} onChange={handleInputChange} className={getFieldClassName('comment')} required />
                                            {validationErrors.comment && <p className="text-red-500 text-xs mt-1">Comment is required.</p>}
                                        </div>

                                        {/* Symptoms */}
                                        <div className="lg:col-span-full mb-4">
                                            <label htmlFor="symptoms" className="block text-sm font-semibold text-gray-700 mb-1">Symptoms</label>
                                            <textarea id="symptoms" rows="4" value={formData.symptoms} onChange={handleInputChange} className={getFieldClassName('symptoms')} required></textarea>
                                            {validationErrors.symptoms && <p className="text-red-500 text-xs mt-1">Symptoms are required.</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer p-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <button onClick={prevStep} className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
                                            <i className="isax isax-arrow-left-2 mr-1"></i>
                                            Back
                                        </button>
                                        <button onClick={nextStep} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                                            Select Payment
                                            <i className="isax isax-arrow-right-3 ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Payment */}
                        <div className={`transition-opacity duration-300 ${step === 3 ? 'block' : 'hidden'}`}>
                            <div className="card bg-white shadow rounded-lg mb-0">
                                <div className="card-header p-4 border-b border-gray-200">
                                    <DoctorCard data={mockDoctorData} />
                                </div>
                                <div className="card-body p-4 sm:p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        
                                        {/* Payment Gateway */}
                                        <div className="flex">
                                            <div className="card flex-grow p-4 border border-gray-200 rounded-lg">
                                                <h6 className="mb-3 text-lg font-semibold text-gray-800">Payment Gateway</h6>
                                                
                                                {/* Razorpay Payment */}
                                                <div className="flex items-center mb-3">
                                                    <input type="radio" id="rdoRazorpay" name="PaymentMethod" value="rdoRazorpay" defaultChecked className="form-radio text-blue-600 h-4 w-4" />
                                                    <label htmlFor="rdoRazorpay" className="ml-2 text-gray-700">Razorpay (Online)</label>
                                                </div>

                                                {/* Cash Payment */}
                                                <div className="flex items-center">
                                                    <input type="radio" id="rdoCash" name="PaymentMethod" value="rdoCash" className="form-radio text-blue-600 h-4 w-4" />
                                                    <label htmlFor="rdoCash" className="ml-2 text-gray-700">Cash (Pay at Clinic)</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Booking Info & Payment Summary */}
                                        <div className="flex">
                                            <div className="card flex-grow p-4 border border-gray-200 rounded-lg">
                                                <h6 className="mb-3 text-lg font-semibold text-gray-800">Booking Info</h6>
                                                
                                                <div className="mb-4 pb-3 border-b border-gray-100">
                                                    <label className="block text-sm font-medium text-gray-500">Date &amp; Time</label>
                                                    <div className="text-base font-medium text-gray-800">
                                                        {formData.appointmentDate ? new Date(formData.appointmentDate).toLocaleDateString("en-GB") : 'N/A'},
                                                        <span className="ml-1">{formData.appointmentTime || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                
                                                <h6 className="mb-3 text-lg font-semibold text-gray-800">Payment Info</h6>
                                                <div className="flex justify-between items-center mb-3">
                                                    <p className="mb-0 text-gray-600">Total Fees</p>
                                                    <span className="font-medium text-gray-800">
                                                        <i className="fa-solid fa-indian-rupee-sign fa-xs mr-1"></i>
                                                        {consultationFee.toFixed(2)}
                                                    </span>
                                                </div>
                                                
                                                <div className="bg-blue-600 flex justify-between items-center p-3 rounded-lg mt-4">
                                                    <h6 className="text-white font-semibold">Total</h6>
                                                    <h6 className="text-white font-semibold">
                                                        <i className="fa-solid fa-indian-rupee-sign fa-xs mr-1"></i>
                                                        {consultationFee.toFixed(2)}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer p-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <button onClick={prevStep} className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
                                            <i className="isax isax-arrow-left-2 mr-1"></i>
                                            Back
                                        </button>
                                        <button 
                                            onClick={() => handleConfirmPay(document.querySelector('input[name="PaymentMethod"]:checked').value)}
                                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                                        >
                                            Confirm &amp; Pay
                                            <i className="isax isax-arrow-right-3 ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Include Font Awesome and other necessary styles */}
            <style jsx global>{`
                /* Global styles to ensure icons and fonts are available */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
                /* Assuming 'isax' and 'feather' icons are custom/local or another CSS import */
                /* For this example, we assume font-awesome covers the basic icons */
                .form-control, .dropdown {
                    margin-bottom: 0 !important; /* Adjusted for Tailwind/React component spacing */
                }
                /* Custom styles from original code */
                .booked-slot {
                    background-color: rgba(15, 183, 107, 0.12) !important;
                    color: rgb(38, 175, 72) !important;
                    font-weight: bold;
                    font-size: small;
                }
            `}</style>
        </div>
    );
};

export default BookAppointments;