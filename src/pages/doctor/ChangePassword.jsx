// File: pages/doctor/ChangePassword.jsx

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Assuming your sidebar and layout are separate reusable components
import DoctorProfileSidebar from '../../components/DoctorProfileSidebar';
import Layout from '../../components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

// Dummy doctor data
const doctorProfile = {
  name: 'Dr. John Doe',
  imageUrl: '/assets/doctor-image.jpg',
  profileUrl: '/doctor/profile',
  qualification: 'MBBS, MD',
  experience: '10 Years',
  specialty: 'Cardiology',
};

// --- Custom Component for password input ---
const PasswordInputGroup = ({ id, label, value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(prev => !prev);
  const iconClass = isVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          name={id}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="form-input block w-full rounded-md border-gray-300 shadow-sm pr-10 focus:ring-blue-500 focus:border-blue-500"
        />
        <span
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={toggleVisibility}
        >
          <i className={iconClass}></i>
        </span>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function ChangePasswordPage() {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = e => {
    e.preventDefault();
    console.log('Saving changes:', passwords);
  };

  const handleCancel = () => {
    router.push('/doctor/Dashboard');
  };

  return (
    <>
      <Head>
        <title>Change Password - Clinic</title>
      </Head>

      {/* Breadcrumb Section */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Change Password</h2>
          <nav aria-label="breadcrumb">
            <ol className="flex justify-center text-sm space-x-2">
              <li>
                <Link href="/Default" className="text-blue-600 hover:underline">
                  Home
                </Link>
              </li>
              <li className="text-gray-500" aria-current="page">
                Change Password
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 xl:w-1/4 px-4">
              <DoctorProfileSidebar
                profile={doctorProfile}
                activeItem="Change Password"
              />
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-2/3 xl:w-3/4 px-4">
              <h3 className="text-2xl font-semibold mb-6">Change Password</h3>

              <Card className="p-6 glass-card">
                <form onSubmit={handleSave}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1">
                      <PasswordInputGroup
                        id="oldPassword"
                        label="Old Password"
                        value={passwords.oldPassword}
                        onChange={handleChange}
                      />
                      <PasswordInputGroup
                        id="newPassword"
                        label="New Password"
                        value={passwords.newPassword}
                        onChange={handleChange}
                      />
                      <PasswordInputGroup
                        id="confirmPassword"
                        label="Confirm Password"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-3 pt-6 border-t mt-4">
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="outline"
                      className="px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
