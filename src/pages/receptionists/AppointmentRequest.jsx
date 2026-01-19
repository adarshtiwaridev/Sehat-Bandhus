import React, { useState } from 'react';
import Link from 'next/link';

export default function AppointmentRequest() {
	const [form, setForm] = useState({ patientName: '', doctorId: '', date: '', time: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Placeholder: replace with actual submit logic
		console.log('Appointment request submitted:', form);
		alert('Appointment request submitted (mock) for ' + form.patientName);
		setForm({ patientName: '', doctorId: '', date: '', time: '' });
	};

	return (
		<div className="min-h-screen bg-gray-50 py-10">
			<div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
				<h1 className="text-2xl font-semibold mb-4">Appointment Request</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Patient Name</label>
						<input name="patientName" value={form.patientName} onChange={handleChange} className="w-full border p-2 rounded" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Doctor ID</label>
						<input name="doctorId" value={form.doctorId} onChange={handleChange} className="w-full border p-2 rounded" />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Date</label>
							<input name="date" value={form.date} onChange={handleChange} type="date" className="w-full border p-2 rounded" />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Time</label>
							<input name="time" value={form.time} onChange={handleChange} type="time" className="w-full border p-2 rounded" />
						</div>
					</div>
					<div className="flex items-center gap-3">
						<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Request Appointment</button>
						<Link href="/receptionists" className="text-sm text-gray-600 hover:text-gray-900">Back to receptionists</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
 