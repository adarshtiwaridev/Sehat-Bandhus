import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DoctorProfileSidebar({ profile = {}, activeItem = '', onLogout = () => {} }) {
  return (
    <div className="profile-sidebar bg-white shadow rounded p-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {profile.imageUrl ? <Image src={profile.imageUrl} alt="profile" width={48} height={48} /> : (profile.name ? profile.name.charAt(0) : 'D')}
        </div>
        <div>
          <div className="text-sm font-semibold">{profile.name || 'Doctor'}</div>
          <div className="text-xs text-gray-500">{profile.specialty || ''}</div>
        </div>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2 text-sm">
          <li className={activeItem === 'Dashboard' ? 'font-semibold' : ''}><Link href="/doctor/Dashboard">Dashboard</Link></li>
          <li className={activeItem === 'Appointments' ? 'font-semibold' : ''}><Link href="/doctor/ViewAppointment">Appointments</Link></li>
          <li className={activeItem === 'My Patients' ? 'font-semibold' : ''}><Link href="/doctor/MyPatients">My Patients</Link></li>
          <li><button onClick={onLogout} className="text-left">Logout</button></li>
        </ul>
      </nav>
    </div>
  );
}
