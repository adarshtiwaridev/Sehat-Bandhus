import React, { useState } from 'react';
import Link from 'next/link';

export default function ChangePassword() {
	const [form, setForm] = useState({ current: '', password: '', confirm: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (form.password !== form.confirm) return alert('Passwords do not match');
		// Replace with real change-password logic
		console.log('Change password request', form);
		alert('Password changed (mock)');
		setForm({ current: '', password: '', confirm: '' });
	};

	return (
		<div className="min-h-screen bg-gray-50 py-10">
			<div className="max-w-md mx-auto bg-white shadow rounded p-6">
				<h1 className="text-2xl font-semibold mb-4">Change Password</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Current Password</label>
						<input name="current" value={form.current} onChange={handleChange} type="password" className="w-full border p-2 rounded" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">New Password</label>
						<input name="password" value={form.password} onChange={handleChange} type="password" className="w-full border p-2 rounded" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Confirm Password</label>
						<input name="confirm" value={form.confirm} onChange={handleChange} type="password" className="w-full border p-2 rounded" required />
					</div>
					<div className="flex items-center gap-3">
						<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Change Password</button>
						<Link href="/receptionists" className="text-sm text-gray-600 hover:text-gray-900">Back</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
