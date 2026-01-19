import React, { useState, useEffect } from 'react';

export default function DoctorForm({ initial = {}, onCancel, onSave }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', specialization: '', experience: 0 });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial && initial._id) setForm({
      name: initial.name || '',
      email: initial.email || '',
      phone: initial.phone || '',
      specialization: initial.specialization || '',
      experience: initial.experience || 0,
    });
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.length < 2) e.name = 'Name is required (min 2 chars)';
    if (!form.email || !form.email.includes('@')) e.email = 'A valid email is required';
    if (!form.phone) e.phone = 'Phone is required';
    if (!form.specialization) e.specialization = 'Specialization is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm">Name</label>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2" />
        {errors.name && <div className="text-xs text-red-600">{errors.name}</div>}
      </div>

      <div>
        <label className="text-sm">Email</label>
        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border rounded px-3 py-2" />
        {errors.email && <div className="text-xs text-red-600">{errors.email}</div>}
      </div>

      <div>
        <label className="text-sm">Phone</label>
        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border rounded px-3 py-2" />
        {errors.phone && <div className="text-xs text-red-600">{errors.phone}</div>}
      </div>

      <div>
        <label className="text-sm">Specialization</label>
        <input value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} className="w-full border rounded px-3 py-2" />
        {errors.specialization && <div className="text-xs text-red-600">{errors.specialization}</div>}
      </div>

      <div>
        <label className="text-sm">Experience (years)</label>
        <input type="number" value={form.experience} onChange={e => setForm({ ...form, experience: Number(e.target.value) })} className="w-full border rounded px-3 py-2" />
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </form>
  );
}
