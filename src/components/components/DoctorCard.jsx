import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DoctorCard({ doctor, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-semibold">
          {doctor.name ? doctor.name.charAt(0).toUpperCase() : 'D'}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{doctor.name}</h4>
          <div className="text-xs text-gray-500">{doctor.specialization} • {doctor.experience} yrs</div>
          <div className="text-xs text-gray-400">{doctor.email} • {doctor.phone}</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={() => onEdit(doctor)} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded">Edit</button>
        <button onClick={() => onDelete(doctor._id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded">Delete</button>
      </div>
    </div>
  );
}
