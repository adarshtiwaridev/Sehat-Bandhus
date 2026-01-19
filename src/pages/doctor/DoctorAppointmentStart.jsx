import React, { useState, useEffect } from 'react';
import { X, Trash2, Eye, Calendar, Phone, Mail, IndianRupee, ArrowLeft, Plus, User, Home, CalendarCheck, CalendarDays, UserCircle, Star, Key, LogOut, Shapes } from 'lucide-react';

const DoctorAppointmentStart = () => {
  const [medications, setMedications] = useState([
    { id: 1, medicine: '', dosage: '', duration: '', instruction: '' }
  ]);
  const [showMedicalRecordsModal, setShowMedicalRecordsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  // Form state
  const [vitals, setVitals] = useState({
    temperature: '',
    pulse: '',
    respiratoryRate: '',
    bloodPressure: '',
    glucoseLevel: '',
    spo2: '',
    height: '',
    weight: '',
    waist: '',
    bsa: '',
    bmi: ''
  });

  const [formData, setFormData] = useState({
    diagnosis: '',
    laboratoryTests: '',
    doctorSuggestions: ''
  });

  // Mock data
  const doctorData = {
    name: 'Dr. John Smith',
    qualification: 'MBBS, MD',
    experience: '10',
    specialization: 'Cardiologist',
    image: 'https://via.placeholder.com/150'
  };

  const patientData = {
    appointmentId: '12345',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 234 567 8900',
    age: '35',
    gender: 'Female',
    address: '123 Main St, New York',
    visitCount: '5',
    image: 'https://via.placeholder.com/100'
  };

  const appointmentData = {
    date: '15 Jan 2024',
    time: '10:00 AM - Morning',
    consultationFee: '500',
    sessionEnd: '45:00'
  };

  const medicalRecords = [
    { id: 1, recordId: 'MR001', date: '01 12 2023', hospital: 'City Hospital', symptoms: 'Fever, Headache', file: '#' },
    { id: 2, recordId: 'MR002', date: '15 11 2023', hospital: 'General Hospital', symptoms: 'Cold, Cough', file: '#' }
  ];

  const medicineOptions = [
    { id: 1, name: 'Paracetamol 500mg', composition: '500mg' },
    { id: 2, name: 'Amoxicillin 250mg', composition: '250mg' },
    { id: 3, name: 'Ibuprofen 400mg', composition: '400mg' }
  ];

  // Calculate BMI and BSA
  useEffect(() => {
    if (vitals.height && vitals.weight) {
      const height = parseFloat(vitals.height);
      const weight = parseFloat(vitals.weight);
      
      const bsa = Math.sqrt((height * weight) / 3600);
      const bmi = weight / ((height / 100) ** 2);
      
      setVitals(prev => ({
        ...prev,
        bsa: bsa.toFixed(2),
        bmi: bmi.toFixed(2)
      }));
    }
  }, [vitals.height, vitals.weight]);

  const addMedication = () => {
    setMedications([...medications, { 
      id: medications.length + 1, 
      medicine: '', 
      dosage: '', 
      duration: '', 
      instruction: '' 
    }]);
  };

  const removeMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const updateMedication = (id, field, value) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const handleDeleteRecord = (recordId) => {
    setSelectedRecordId(recordId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting record:', selectedRecordId);
    setShowDeleteModal(false);
  };

  const handleSaveAndEnd = () => {
    console.log('Saving appointment data:', { vitals, formData, medications });
    setShowEndSessionModal(true);
  };

  const handleViewDetails = () => {
    setShowEndSessionModal(false);
    setShowViewDetailsModal(true);
  };

  const downloadReport = () => {
    console.log('Downloading report...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Request</h2>
            <nav className="flex justify-center items-center space-x-2 text-sm">
              <a href="#" className="hover:underline">Home</a>
              <span>/</span>
              <span>Request</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <img src={doctorData.image} alt="Doctor" className="w-24 h-24 rounded-full mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{doctorData.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {doctorData.qualification}, {doctorData.experience} Experience
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {doctorData.specialization}
                  </span>
                </div>

                <nav className="space-y-1">
                  {[
                    { icon: Shapes, label: 'Dashboard', href: '#' },
                    { icon: CalendarCheck, label: 'Requests', href: '#', active: true },
                    { icon: CalendarDays, label: 'Appointments', href: '#' },
                    { icon: Calendar, label: 'Available Timings', href: '#' },
                    { icon: User, label: 'My Patients', href: '#' },
                    { icon: Star, label: 'Reviews', href: '#' },
                    { icon: UserCircle, label: 'Profile Settings', href: '#' },
                    { icon: Key, label: 'Change Password', href: '#' },
                    { icon: LogOut, label: 'Logout', href: '#' }
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        item.active 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center">
                <a href="#" className="mr-4 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-6 h-6" />
                </a>
                <h3 className="text-2xl font-semibold">Appointment Details</h3>
              </div>
            </div>

            {/* Appointment Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-start mb-4 md:mb-0">
                  <img src={patientData.image} alt="Patient" className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">APT000{patientData.appointmentId}</p>
                    <h6 className="text-lg font-semibold mb-2">{patientData.name}</h6>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{patientData.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{patientData.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-2">
                    Upcoming
                  </span>
                  <h6 className="text-sm font-semibold flex items-center justify-end">
                    Consultation Fees: <IndianRupee className="w-4 h-4 ml-1" />
                    {appointmentData.consultationFee}
                  </h6>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t">
                <div>
                  <h6 className="text-sm font-semibold mb-1">Appointment Date</h6>
                  <span className="text-sm text-gray-600">{appointmentData.date}</span>
                </div>
                <div>
                  <h6 className="text-sm font-semibold mb-1">Appointment Time & Shift</h6>
                  <span className="text-sm text-gray-600">{appointmentData.time}</span>
                </div>
                <div>
                  <h6 className="text-sm font-semibold mb-1">Clinic Location</h6>
                  <span className="text-sm text-gray-600">Adrian's Dentistry</span>
                </div>
                <div>
                  <h6 className="text-sm font-semibold mb-1">Location</h6>
                  <span className="text-sm text-gray-600">Newyork, United States</span>
                </div>
                <div>
                  <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Inprogress
                  </button>
                </div>
              </div>
            </div>

            {/* Session Timer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h6 className="text-center text-red-700">
                <span className="font-semibold">Session Ends in:</span> {appointmentData.sessionEnd}
              </h6>
            </div>

            {/* Create Appointment Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h5 className="text-xl font-bold mb-6">Create Appointment Details</h5>

              {/* Patient Information */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-4">Patient Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Age / Gender</p>
                    <h6 className="font-semibold">{patientData.age} Years / {patientData.gender}</h6>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <h6 className="font-semibold">{patientData.address}</h6>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">No of Visit</p>
                    <h6 className="font-semibold">{patientData.visitCount}</h6>
                  </div>
                </div>
              </div>

              {/* Vitals */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-4 bg-gray-100 p-3 rounded-lg">Vitals</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Temperature</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="37.5"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vitals.temperature}
                        onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">°C</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Pulse</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="60-100"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vitals.pulse}
                        onChange={(e) => setVitals({...vitals, pulse: e.target.value})}
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">bpm</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Respiratory Rate</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="12-20"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vitals.respiratoryRate}
                        onChange={(e) => setVitals({...vitals, respiratoryRate: e.target.value})}
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">rpm</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Blood Pressure</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="120/80"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vitals.bloodPressure}
                        onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">mmHg</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Glucose Level</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="70-99"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vitals.glucoseLevel}
                        onChange={(e) => setVitals({...vitals, glucoseLevel: e.target.value})}
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">mg/dl</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">SPO2</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="95%-100%"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vitals.spo2}
                        onChange={(e) => setVitals({...vitals, spo2: e.target.value})}
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Height</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="97.8"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vitals.height}
                        onChange={(e) => setVitals({...vitals, height: e.target.value})}
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">cm</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Weight</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="97.8"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vitals.weight}
                        onChange={(e) => setVitals({...vitals, weight: e.target.value})}
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">Kg</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Waist</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="97.8"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vitals.waist}
                        onChange={(e) => setVitals({...vitals, waist: e.target.value})}
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">cm</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">BSA</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Eg: 54"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        value={vitals.bsa}
                        readOnly
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">m²</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">BMI</label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="18.5-24.9"
                        className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        value={vitals.bmi}
                        readOnly
                      />
                      <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-lg">kg/m²</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-semibold bg-gray-100 p-3 rounded-lg flex-1">Medical History</h5>
                  <button
                    onClick={() => setShowMedicalRecordsModal(true)}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    View Reports
                  </button>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-4 bg-gray-100 p-3 rounded-lg">Diagnosis</h5>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                />
              </div>

              {/* Laboratory Tests */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-4 bg-gray-100 p-3 rounded-lg">Laboratory Tests</h5>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.laboratoryTests}
                  onChange={(e) => setFormData({...formData, laboratoryTests: e.target.value})}
                />
              </div>

              {/* Prescription */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-4 bg-gray-100 p-3 rounded-lg">Prescription</h5>
                <div className="text-right mb-4">
                  <button
                    onClick={addMedication}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                  </button>
                </div>

                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg items-end">
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-semibold mb-2">Medicine Name</label>
                        <select
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={med.medicine}
                          onChange={(e) => updateMedication(med.id, 'medicine', e.target.value)}
                        >
                          <option value="">Select Medicine</option>
                          {medicineOptions.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-semibold mb-2">Dosage</label>
                        <select
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={med.dosage}
                          onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                        >
                          <option value="">Select Dosage</option>
                          {medicineOptions.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.composition}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1 min-w-[120px]">
                        <label className="block text-sm font-semibold mb-2">Duration</label>
                        <input
                          type="text"
                          placeholder="1-1-0"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={med.duration}
                          onChange={(e) => updateMedication(med.id, 'duration', e.target.value)}
                        />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-semibold mb-2">Instruction</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={med.instruction}
                          onChange={(e) => updateMedication(med.id, 'instruction', e.target.value)}
                        />
                      </div>
                      <button
                        onClick={() => removeMedication(med.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctor Suggestions */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold mb-4 bg-gray-100 p-3 rounded-lg">Doctor Suggestion</h5>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.doctorSuggestions}
                  onChange={(e) => setFormData({...formData, doctorSuggestions: e.target.value})}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSaveAndEnd}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save & End Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Records Modal */}
      {showMedicalRecordsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold">View Previous Medical Record</h3>
              <button
                onClick={() => setShowMedicalRecordsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Hospital Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Symptoms</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {medicalRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <a href="#" className="text-blue-600 hover:underline">{record.recordId}</a>
                        </td>
                        <td className="px-4 py-3 text-sm">{record.date}</td>
                        <td className="px-4 py-3 text-sm">{record.hospital}</td>
                        <td className="px-4 py-3 text-sm">{record.symptoms}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <a
                              href={record.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleDeleteRecord(record.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delete Record</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this record?</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  Yes Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Ended Modal */}
      {showEndSessionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Session Ended</h3>
              <p className="text-gray-600 mb-8">Your Appointment has been Ended</p>
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Go to Appointments
                </a>
                <button
                  onClick={handleViewDetails}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold">View Details</h3>
              <button
                onClick={() => setShowViewDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {/* Download Section */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h5 className="font-semibold">{appointmentData.date}</h5>
                <button
                  onClick={downloadReport}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Download
                </button>
              </div>

              {/* Report Content */}
              <div id="print-report" className="space-y-6">
                {/* Hospital Header */}
                <div className="text-center border-b pb-6">
                  <img src="https://via.placeholder.com/150x50" alt="Logo" className="h-12 mx-auto mb-4" />
                  <h5 className="font-semibold text-lg mb-2">16, Wardlow, Buxton, Derbyshire, SK17 8RW. Phone: 01298 872268</h5>
                  <p className="text-gray-600">Monday to Sunday - 09:30am to 12:00pm</p>
                </div>

                {/* Doctor & Patient Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h6 className="font-semibold text-lg mb-2">{doctorData.name}</h6>
                    <p className="text-gray-600">{doctorData.qualification}, {doctorData.experience} Year EXP.</p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1"><span className="font-semibold">Appointment Date:</span> {appointmentData.date}</p>
                    <p><span className="font-semibold">Appointment Time:</span> {appointmentData.time}</p>
                  </div>
                </div>

                {/* Patient Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="font-semibold mb-3">Patient Details</h6>
                  <div>
                    <h6 className="font-semibold mb-2">{patientData.name}</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>{patientData.age} Y / {patientData.gender}</li>
                      <li>Patient / Appointment ID: PT000{patientData.appointmentId} / AT000{patientData.appointmentId}</li>
                    </ul>
                  </div>
                </div>

                {/* Appointment Note */}
                <div>
                  <h3 className="text-xl font-bold mb-4 pb-2 border-b">Appointment Note</h3>
                </div>

                {/* Vitals */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3">Vitals</h5>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <li><span className="font-semibold">Pulse Rate:</span> {vitals.pulse} Bpm</li>
                    <li><span className="font-semibold">Temperature:</span> {vitals.temperature} °C</li>
                    <li><span className="font-semibold">GL:</span> {vitals.glucoseLevel} mg/dl</li>
                    <li><span className="font-semibold">BP:</span> {vitals.bloodPressure} mmHg</li>
                    <li><span className="font-semibold">SpO2:</span> {vitals.spo2} %</li>
                    <li><span className="font-semibold">BSA:</span> {vitals.bsa} m²</li>
                    <li><span className="font-semibold">Height:</span> {vitals.height} cm</li>
                    <li><span className="font-semibold">Weight:</span> {vitals.weight} Kg</li>
                    <li><span className="font-semibold">Body Mass Index:</span> {vitals.bmi} kg/m²</li>
                  </ul>
                </div>

                {/* Diagnosis */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3">Diagnosis</h5>
                  <p className="text-gray-700">{formData.diagnosis || 'No diagnosis recorded'}</p>
                </div>

                {/* Doctor Suggestions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3">Doctor Suggestions</h5>
                  <p className="text-gray-700">{formData.doctorSuggestions || 'No suggestions recorded'}</p>
                </div>

                {/* Lab Test */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-3">Lab Test</h5>
                  <p className="text-gray-700">{formData.laboratoryTests || 'No lab tests prescribed'}</p>
                </div>

                {/* Prescription Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-3 text-left text-sm font-semibold">SNO.</th>
                        <th className="border px-4 py-3 text-left text-sm font-semibold">Medicine Name</th>
                        <th className="border px-4 py-3 text-left text-sm font-semibold">Dosage</th>
                        <th className="border px-4 py-3 text-left text-sm font-semibold">Duration</th>
                        <th className="border px-4 py-3 text-left text-sm font-semibold">Instruction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medications.map((med, index) => (
                        <tr key={med.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-3 text-sm">{index + 1}</td>
                          <td className="border px-4 py-3 text-sm">
                            {medicineOptions.find(m => m.id === parseInt(med.medicine))?.name || '-'}
                          </td>
                          <td className="border px-4 py-3 text-sm">
                            {medicineOptions.find(m => m.id === parseInt(med.dosage))?.composition || '-'}
                          </td>
                          <td className="border px-4 py-3 text-sm">{med.duration || '-'}</td>
                          <td className="border px-4 py-3 text-sm">{med.instruction || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <div>
                    <h6 className="font-semibold mb-3">Scan to download report</h6>
                    <img src="https://via.placeholder.com/150" alt="QR Code" className="w-32 h-32" />
                  </div>
                  <div className="text-right">
                    <h6 className="font-semibold text-lg">{doctorData.name}</h6>
                    <p className="text-gray-600">{doctorData.specialization}</p>
                  </div>
                </div>

                {/* Pagination */}
                <div className="text-center pt-6 border-t">
                  <p className="text-sm text-gray-600">Page 01 of 02</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentStart;