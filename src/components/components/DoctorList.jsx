import React from 'react';
import DoctorCard from './DoctorCard';

export default function DoctorList({ doctors, onEdit, onDelete }) {
  if (!doctors || doctors.length === 0) {
    return <div className="text-sm text-gray-500">No doctors found.</div>;
  }

  return (
    <div className="space-y-3">
      {doctors.map(d => (
        <DoctorCard key={d._id} doctor={d} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
