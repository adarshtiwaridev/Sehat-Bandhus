// File: pages/doctor/PatientProfile.jsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Assuming you have your shared sidebar and other components
import DoctorProfileSidebar from '../../components/DoctorProfileSidebar'; 

// --- MOCK DATA ---
const mockDoctorProfile = { name: "Dr. Jane Doe", imageUrl: "/assets/doctor-image.jpg", specialty: "Pediatrics" };
const mockPatientProfile = {
    id: 101, name: "Charlie Brown", imageUrl: "/assets/patient-profile.jpg",
    age: 50, gender: "Male", phone: "555-0101", email: "charlie@test.com",
    lastVisit: "2025-09-20", totalVisits: 8
};

// --- Main Page Component ---
export default function PatientProfilePage() {
    const router = useRouter();
    // In a real app, use router.query to get the patient ID from the URL:
    // const { patientId } = router.query; 

    const [patient, setPatient] = useState(mockPatientProfile);

    // useEffect(() => {
    //     // 1. Fetch patient data using the patientId from the URL
    //     // fetch(`/api/doctor/patient/${patientId}`).then(res => res.json()).then(setPatient);
    // }, [router.query]);

    // Handler for the doctor's sidebar logout button
    const handleLogout = () => {
        router.push('/authpage');
    };

    return (
        <>
            <Head>
                <title>{patient.name}'s Profile</title>
            </Head>

            {/* Breadcrumb Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">Patient Profile</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center text-sm space-x-2">
                            <li><Link href="/Default" className="text-blue-600 hover:underline">Home</Link></li>
                            <li className="text-gray-500" aria-current="page">Patient Profile</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        
                        {/* 1. Profile Sidebar (Left Column - Replaces theiaStickySidebar) */}
                        <div className="w-full lg:w-1/3 xl:w-1/4 px-4 sticky top-6">
                            {/* NOTE: You would reuse the DoctorProfileSidebar component here */}
                            <DoctorProfileSidebar profile={mockDoctorProfile} activeItem="My Patients" onLogout={handleLogout} />
                        </div>

                        {/* 2. Main Content Area (Right Column) */}
                        <div className="w-full lg:w-2/3 xl:w-3/4 px-4">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                
                                <h3 className="text-2xl font-semibold border-b pb-3 mb-4">
                                    {patient.name}'s Details
                                </h3>

                                {/* Patient Summary Widget */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="flex items-center space-x-4">
                                        <Image src={patient.imageUrl} alt="Patient Avatar" width={64} height={64} className="rounded-full" />
                                        <div>
                                            <p className="text-lg font-semibold">{patient.name}</p>
                                            <p className="text-sm text-gray-500">ID: PT000{patient.id}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-sm">
                                        <h6 className="font-medium text-gray-700">Age / Gender</h6>
                                        <p className="text-gray-600">{patient.age} / {patient.gender}</p>
                                    </div>
                                    
                                    <div className="text-sm">
                                        <h6 className="font-medium text-gray-700">Total Visits</h6>
                                        <p className="text-gray-600">{patient.totalVisits}</p>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <h4 className="text-xl font-semibold mb-3">Medical History & Records</h4>
                                    <p className="text-gray-600">
                                        {/* This is where the patient's detailed medical record table or history goes. */}
                                        Display links to view previous appointments, diagnoses, and lab results here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* /Page Content */} 
        </>
    );
}
