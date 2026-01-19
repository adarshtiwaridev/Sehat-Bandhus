// src/app/appointments/completed/[id]/page.js (Dynamic Route Component)

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- MOCK DATA ---

const mockPatient = {
    name: 'Jane Doe',
    id: 'PT-9876',
    gender: 'Female',
    age: 28,
    imageUrl: '/path/to/patient-avatar.jpg',
};

const mockReportData = {
    DoctorId: 5,
    AppointmentId: 301,
    DoctorName: 'Dr. Emily Rose',
    DoctorEmail: 'emily@clinic.com',
    DoctorPhone: '555-1234',
    DoctorImage: '/img/doctor-emily.jpg',
    ConsultationFee: 75.00,
    AppointmentDate: '10/08/2025',
    AppointmentTime: '09:00 AM - 10:00 AM',
    
    // Prescription/Report Details
    Qualification: 'MBBS, MD',
    Experience: 10,
    AppointmentTitle: 'General Checkup Report',
    Specialization: 'Cardiologist',
    
    Vitals: {
        PulseRate: 72, Temperature: 36.5, GL: 90, BP: '120/80', Spo2: 98,
        BSA: 1.8, Height: 175, Weight: 70, BMI: 22.86
    },
    Diagnosis: 'Viral Fever, minor dehydration.',
    DoctorSuggestions: 'Rest for 3 days, drink plenty of fluids.',
    LabTest: 'Full Blood Count (FBC) and Urine Analysis (UA).',
    Medicines: [
        { MedicineName: 'Paracetamol', Dosage: '500mg', Duration: '5 days', Instruction: 'After meal' },
        { MedicineName: 'Electrolytes', Dosage: '1 packet', Duration: '3 days', Instruction: 'Mix with 1L water' },
        { MedicineName: 'Vitamin C', Dosage: '1 tab', Duration: '7 days', Instruction: 'Morning' },
    ]
};

// FAKE API function to simulate fetching data
const fetchCompletedAppointmentDetails = (id) => new Promise(resolve => {
    setTimeout(() => {
        // In a real app, you'd fetch the specific detail by ID
        if (id && id.toString() === '301') {
            resolve(mockReportData);
        } else {
            resolve(null);
        }
    }, 500);
});

// --- MAIN COMPONENT ---

const CompletedAppointmentDetails = () => {
    const router = useRouter();
    // router.query may be empty during the first render; guard access
    const appointmentId = router?.query?.id ?? router?.query?.appointmentId ?? null;
    
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    
    const printReportRef = useRef(null);
    

    // Data Fetching
    useEffect(() => {
        // 💡 FIX 2: Add a guard clause to ensure appointmentId is available before fetching.
        if (appointmentId) {
            setLoading(true);
            fetchCompletedAppointmentDetails(appointmentId).then(data => {
                setAppointment(data);
                setLoading(false);
            }).catch(e => {
                console.error("Error fetching detail:", e);
                setLoading(false);
            });
        }
    }, [appointmentId]);
    
    // PDF Download Logic (Replacement for ASP.NET code-behind + JavaScript)
    const downloadReport = async (e) => {
        e.preventDefault();
        
        if (!printReportRef.current) return;

        try {
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(printReportRef.current, {
                useCORS: true,
                willReadFrequently: true,
                scale: 1 
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.7);
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const pdf = new jsPDF({
                orientation: 'p', unit: 'mm', format: 'a4', compress: true
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            pdf.save(`MedicalReport-APT${appointment?.AppointmentId || '000'}.pdf`); // Use optional chaining here too
            
            // Navigate back after download (mimicking the original ASP.NET code)
            setTimeout(() => {
                 router.push('/appointments');
            }, 1000); // Shorter delay for better UX
            
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF report.");
        }
    };

    // 💡 FIX 3: Centralized loading/error check relying on the guards above
    if (loading || !appointmentId) {
        return <div className="text-center py-20 text-gray-500">Loading appointment details...</div>;
    }
    
    if (!appointment) {
        return <div className="text-center py-20 text-red-500">Appointment #{appointmentId} not found or is not completed.</div>;
    }
    
    const apt = appointment;
    const vitals = apt.Vitals;

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 mb-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
                        <nav aria-label="breadcrumb" className="mt-2">
                            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
                                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                                <li aria-current="page" className="text-gray-700">/ Appointments</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* /Breadcrumb */}

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* Profile Sidebar (Re-used) */}
                        <div className="lg:w-1/4">
                            <div className="bg-white shadow rounded-lg p-5 sticky top-20">
                                <div className="border-b pb-4 mb-4">
                                    <div className="flex items-center space-x-3">
                                        <Link href="/profile" className="w-16 h-16 rounded-full overflow-hidden">
                                            <img src={mockPatient.imageUrl} alt="Patient Avatar" className="w-full h-full object-cover" />
                                        </Link>
                                        <div>
                                            <Link href="/profile" className="text-lg font-semibold text-black hover:text-blue-600">{mockPatient.name}</Link>
                                            <p className="text-xs text-gray-600">ID: {mockPatient.id}</p>
                                            <p className="text-xs text-gray-600">{mockPatient.gender} - {mockPatient.age} yrs</p>
                                        </div>
                                    </div>
                                </div>
                                <nav className="space-y-1">
                                    {[
                                        { name: 'Dashboard', href: '/dashboard', icon: 'fa-solid fa-shapes', active: false },
                                        { name: 'My Appointment', href: '/appointments', icon: 'fa-solid fa-calendar-check', active: true },
                                        { name: 'Logout', onClick: () => router.push('/logout'), icon: 'fa-solid fa-sign-out', active: false },
                                    ].map(item => (
                                        <Link key={item.name} href={item.href || '#'} onClick={item.onClick} className={`flex items-center p-2 rounded-lg transition ${item.active ? 'bg-blue-500 text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                                            <i className={`${item.icon} w-5 mr-3`}></i>
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        {/* /Profile Sidebar */}
                        
                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            <div className="dashboard-header flex items-center mb-6">
                                <Link href="/appointments" className="text-gray-500 hover:text-blue-500 mr-4">
                                    <i className="fa-solid fa-arrow-left text-xl"></i>
                                </Link>
                                <h3 className="text-2xl font-semibold">Appointment Details</h3>
                            </div>

                            {/* Appointment Detail Card */}
                            <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-100">
                                {/* Doctor Info and Status */}
                                <div className="flex justify-between items-start flex-wrap gap-4 border-b pb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                            <img src={apt.DoctorImage} alt="Doctor" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">APT000{apt.AppointmentId}</p>
                                            <h4 className="text-lg font-semibold text-gray-800">{apt.DoctorName}</h4>
                                            <ul className="text-xs text-gray-600 space-y-1 mt-1">
                                                <li><i className="fa-solid fa-envelope mr-1 text-blue-500"></i>{apt.DoctorEmail}</li>
                                                <li><i className="fa-solid fa-phone mr-1 text-blue-500"></i>{apt.DoctorPhone}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right">
                                        <div className="mb-2">
                                            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Completed</span>
                                        </div>
                                        <h6 className="text-sm font-medium text-gray-700">
                                            Consultation Fees: <i className="fa-solid fa-indian-rupee-sign fa-xs"></i>{apt.ConsultationFee.toFixed(2)}
                                        </h6>
                                        <ul className="mt-1">
                                            <li><a href="#" className="text-gray-500 hover:text-blue-500"><i className="fa-solid fa-comments"></i></a></li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Appointment Schedule & Actions */}
                                <div className="flex justify-between items-center flex-wrap gap-4 pt-2">
                                    <div className="min-w-[150px]">
                                        <h6 className="text-sm font-semibold text-gray-700">Appointment Date &amp; Time</h6>
                                        <span className="text-base font-medium text-gray-800">{apt.AppointmentDate} - {apt.AppointmentTime}</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button onClick={() => setShowPrescriptionModal(true)} className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full text-sm font-medium transition" style={{marginBottom: 0}}>
                                            View Prescription
                                        </button>
                                        <Link href={`/appointments/book?doctorId=${apt.DoctorId}`} className="btn border border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 py-2 px-4 rounded-full text-sm font-medium transition">
                                            Reschedule Appointment
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* /Appointment Detail Card */}
                        </div>
                        {/* /Main Content */}
                    </div>
                </div>
            </div>      
            {/* /Page Content */}
            
            {/* Prescription/Report Modal (Replacement for ModalPopupExtender) */}
            {showPrescriptionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1040]">
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full m-4" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-800">View Details</h3>
                            <button onClick={() => setShowPrescriptionModal(false)} className="text-gray-500 hover:text-gray-800 transition">
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>
                        
                        <div className="modal-body p-6 max-h-[70vh] overflow-y-auto">
                            <div className="flex justify-between items-center pb-4 border-b">
                                <h5 className="text-lg font-bold">{apt.AppointmentTitle}</h5>
                                <button type="button" onClick={downloadReport} className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full text-sm font-medium transition">
                                    Download
                                </button>
                            </div>

                            {/* Printable Report Content */}
                            <div id="Print-Report" ref={printReportRef} className="p-4 space-y-4 text-sm">
                                {/* Hospital Address */}
                                <div className="text-center space-y-1 pb-3 border-b border-dashed">
                                    <div className="flex justify-center mb-2">
                                        <img src="/assets/img/logo.png" alt="logo" className="h-8"/>
                                    </div>
                                    <h5 className="font-semibold text-gray-800">16, Wardlow, Buxton, Derbyshire, SK17 8RW. Phone : 01298 872268 </h5>
                                    <p className="text-xs text-gray-500">Monday to Sunday - 09:30am to 12:00pm</p>
                                </div>
                                        
                                {/* Invoice Item - Header */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Doctor Info */}
                                    <div>
                                        <h6 className="font-bold text-gray-800">{apt.DoctorName}</h6>
                                        <p className="text-xs text-gray-600">{apt.Qualification}, {apt.Experience} Year EXP.</p>
                                    </div>
                                    {/* Appointment Info */}
                                    <div className="text-right space-y-1">
                                        <p className="text-xs"><span>Appointment Date : </span><span className="font-semibold">{apt.AppointmentDate}</span></p>
                                        <p className="text-xs"><span>Appointment Time: </span><span className="font-semibold">{apt.AppointmentTime}</span></p>
                                    </div>
                                    {/* Patient Details */}
                                    <div className="col-span-2 pt-2 border-t">
                                        <h6 className="font-bold text-gray-800 mb-1">Patient Details</h6>
                                        <div className="flex space-x-4 text-xs">
                                            <h6 className="font-semibold">{mockPatient.name}</h6>
                                            <ul className="flex space-x-3 text-gray-600">
                                                <li>{mockPatient.age} Y / {mockPatient.gender}</li>
                                                <li>Patient / Appointment ID : PT000{mockPatient.id} / AT000{apt.AppointmentId} </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-base font-bold text-gray-800 mt-4 mb-2">Appointment Note</h3>
                                
                                {/* Vitals */}
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <h5 className="font-bold mb-2">Vitals</h5>
                                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                        <li><span>Pulse Rate : </span><span className="font-semibold">{vitals.PulseRate} Bpm</span></li>
                                        <li><span>Temprature : </span><span className="font-semibold">{vitals.Temperature}°C</span></li>
                                        <li><span>GL: </span><span className="font-semibold">{vitals.GL} mg/dl</span></li>
                                        <li><span>BP : </span><span className="font-semibold">{vitals.BP} mmHg</span></li>
                                        <li><span>Spo2 : </span><span className="font-semibold">{vitals.Spo2}%</span></li>
                                        <li><span>BSA : </span><span className="font-semibold">{vitals.BSA} m²</span></li>
                                        <li><span>Height : </span><span className="font-semibold">{vitals.Height} cm</span></li>
                                        <li><span>Weight : </span><span className="font-semibold">{vitals.Weight} Kg</span></li>
                                        <li><span>Body Mass Index : </span><span className="font-semibold">{vitals.BMI} kg/m²</span></li>
                                    </ul>
                                </div>
                                
                                {/* Diagnosis & Suggestions */}
                                <div className="space-y-3">
                                    <div><h5 className="font-bold">Diagonsis</h5><p className="text-gray-600">{apt.Diagnosis}</p></div>
                                    <div><h5 className="font-bold">Doctor Suggestions</h5><p className="text-gray-600">{apt.DoctorSuggestions}</p></div>
                                    <div><h5 className="font-bold">Lab Test</h5><p className="text-gray-600">{apt.LabTest}</p></div>
                                </div>
                                        
                                {/* Medicine Table (Replacement for Repeater) */}
                                <div className="pt-4">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full table-auto border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="p-2 border border-gray-300 text-left">SNO.</th>
                                                    <th className="p-2 border border-gray-300 text-left">Medecine Name</th>
                                                    <th className="p-2 border border-gray-300 text-left">Dosage</th>
                                                    <th className="p-2 border border-gray-300 text-left">Duration</th>
                                                    <th className="p-2 border border-gray-300 text-left">Instruction</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {apt.Medicines.map((med, index) => (
                                                    <tr key={index}>
                                                        <td className="p-2 border border-gray-300">{index + 1}</td>
                                                        <td className="p-2 border border-gray-300 font-semibold">{med.MedicineName}</td>
                                                        <td className="p-2 border border-gray-300">{med.Dosage}</td>
                                                        <td className="p-2 border border-gray-300">{med.Duration}</td>
                                                        <td className="p-2 border border-gray-300">{med.Instruction}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="flex justify-between items-end pt-8">
                                    <div className="space-y-2">
                                        <h6 className="font-semibold">Scan to download report</h6>
                                        <img src="/assets/img/scan.png" alt="scan" className="w-20 h-20"/>
                                    </div>
                                    <div className="text-right">
                                        <h6 className="font-bold text-gray-800">{apt.DoctorName}</h6>
                                        <p className="text-gray-600">{apt.Specialization}</p>
                                    </div>
                                </div>
                                <ul className="text-center text-xs text-gray-500 pt-4 border-t border-dashed">
                                    <li>Page 01 of 02 (Simulated)</li>
                                </ul>
                            </div> {/* /Print-Report */}
                        </div>
                    </div>      
                </div>
            )}
            
            <style jsx global>{`
                /* Global Font-Awesome for icons */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
            `}</style>
        </>
    );
};

export default CompletedAppointmentDetails;