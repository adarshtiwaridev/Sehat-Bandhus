import React, { useState } from 'react';
import Link from 'next/link';

export default function AddNewPatient() {
	const [form, setForm] = useState({ name: '', email: '', mobile: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Placeholder: replace with actual submit logic
		console.log('Submitting new patient:', form);
		alert('Patient added (mock): ' + form.name);
		setForm({ name: '', email: '', mobile: '' });
	};

	return (
		<div className="min-h-screen bg-gray-50 py-10">
			<div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
				<h1 className="text-2xl font-semibold mb-4">Add New Patient</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Full Name</label>
						<input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Email</label>
						<input name="email" value={form.email} onChange={handleChange} type="email" className="w-full border p-2 rounded" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Mobile</label>
						<input name="mobile" value={form.mobile} onChange={handleChange} className="w-full border p-2 rounded" />
					</div>
					<div className="flex items-center gap-3">
						<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Patient</button>
						<Link href="/receptionists" className="text-sm text-gray-600 hover:text-gray-900">Back to list</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
 
