// components/AdminMedicines.jsx
'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faCalendarCheck,
  faBookMedical,
  faPencil,
  faChevronDown,
  faXmark,
  faTrashAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

// --- Mock Data ---

// Sidebar Navigation
const adminSidebarLinks = [
  { href: 'Dashboard.aspx', icon: faHome, label: 'Dashboard', active: false },
  { href: 'PatientList.aspx', icon: faUser, label: 'Patient List', active: false },
  {
    label: 'Doctors',
    icon: faUserPlus,
    isSubmenu: true,
    sublinks: [
      { href: 'DoctorList.aspx', label: 'Doctor List' },
      { href: 'AddDoctors.aspx', label: 'Add Doctor' },
    ],
  },
  { href: 'Appointments.aspx', icon: faCalendarCheck, label: 'Appointments', active: false },
  {
    label: 'Medicines',
    icon: faBookMedical,
    isSubmenu: true,
    active: true,
    sublinks: [
      { href: 'AddMedicine.aspx', label: 'Add Medicine' },
      { href: 'Medicines.aspx', label: 'Medicines', active: true },
    ],
  },
  { href: 'AddDoctorSchedule.aspx', icon: faCalendarCheck, label: 'Add Schedule', active: false },
  { href: 'EditDoctorSchedule.aspx', icon: faPencil, label: 'Edit Schedule', active: false },
  { href: 'Profile.aspx', icon: faUser, label: 'Profile', active: false },
];

// Mock Medicine List Data
const mockMedicines = [
  { MId: 1, MedicineCode: 'MED001', MedicineName: 'Paracetamol 500mg', Composition: 'Acetaminophen' },
  { MId: 2, MedicineCode: 'MED002', MedicineName: 'Amoxicillin 250mg', Composition: 'Amoxicillin' },
  { MId: 3, MedicineCode: 'MED003', MedicineName: 'Omeprazole 20mg', Composition: 'Omeprazole' },
];

// --- Main Component ---

const AdminMedicines = () => {
  const [showSubmenu, setShowSubmenu] = useState({ Doctors: false, Medicines: true });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [editFormData, setEditFormData] = useState({ MedicineName: '', Composition: '' });
  const [editErrors, setEditErrors] = useState({});

  // Handler for opening Edit modal
  const openEditModal = (id) => {
    const medicine = mockMedicines.find(m => m.MId === id);
    if (medicine) {
      setSelectedMedicineId(id);
      setEditFormData({ MedicineName: medicine.MedicineName, Composition: medicine.Composition });
      setEditErrors({});
      setIsEditModalOpen(true);
    }
  };

  // Handler for opening Delete modal
  const openDeleteModal = (id) => {
    setSelectedMedicineId(id);
    setIsDeleteModalOpen(true);
  };
  
  const handleToggleSubmenu = (label) => {
    setShowSubmenu(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // --- Modal Logic ---

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEditForm = () => {
    const errors = {};
    if (!editFormData.MedicineName.trim()) errors.MedicineName = 'Medicine name is required';
    if (!editFormData.Composition.trim()) errors.Composition = 'Composition is required';
    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Replace OnClick="Button1_Click"
  const handleUpdateMedicine = (e) => {
    e.preventDefault();
    if (validateEditForm()) {
      console.log(`Updating medicine ID ${selectedMedicineId} with:`, editFormData);
      alert(`Medicine ID ${selectedMedicineId} Updated (Mock action)`);
      setIsEditModalOpen(false);
    }
  };

  // Replace OnClick="BtnDelete_Click"
  const handleDeleteMedicine = () => {
    console.log(`Deleting medicine ID: ${selectedMedicineId}`);
    alert(`Medicine ID ${selectedMedicineId} Deleted (Mock action)`);
    setIsDeleteModalOpen(false);
  };

  // --- Tailwind CSS Class Mapping & Custom Styles ---

  const sidebarActiveClass = 'bg-blue-100 text-blue-600 font-semibold';
  const tableHeaderClass = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
  const tableDataClass = 'px-6 py-4 whitespace-nowrap text-sm text-gray-700';

  // Modal styling approximations:
  const modalBackdropClass = 'fixed inset-0 bg-black bg-opacity-80 z-[1040]';
  const modalPopupClass = 'bg-white border-3 border-solid border-black pt-0 px-2 rounded-xl shadow-2xl';
  const modalHeaderClass = 'flex justify-between items-center pb-4 pt-6 border-b border-gray-400';
  const modalCloseBtnClass = 'w-6 h-6 rounded-full bg-[#465D7C] text-white flex items-center justify-center text-sm p-0 shadow-none';
  const modalFooterClass = 'flex justify-between items-center py-5 border-t border-gray-400 h-14';
  const delIconClass = 'w-11 h-11 flex items-center justify-center rounded-full bg-[#FFE8E8] text-red-600 text-2xl';
  const btnSuccessLight = 'bg-green-100 text-green-600 hover:bg-green-200 transition';
  const btnDangerLight = 'bg-red-100 text-red-600 hover:bg-red-200 transition';
  const btnPrimary = 'bg-blue-600 text-white hover:bg-blue-700 rounded-full';
  const btnDark = 'bg-gray-700 text-white hover:bg-gray-800 rounded-full';
  const btnInfoRounded = 'bg-blue-500 text-white hover:bg-blue-600 rounded-full';

  // --- Modal Components ---

  const EditMedicineModal = () => {
    if (!isEditModalOpen) return null;

    return (
      <>
        <div className={modalBackdropClass} />
        <div className="fixed inset-0 flex items-center justify-center z-[1050]">
          <div className="modal-dialog modal-dialog-centered max-w-lg w-full">
            <div className={`${modalPopupClass} p-6`}>
              <div className={modalHeaderClass}>
                <h3 className="text-xl font-semibold">Edit Medical Record</h3>
                <button type="button" className={modalCloseBtnClass} onClick={() => setIsEditModalOpen(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              
              <form onSubmit={handleUpdateMedicine}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12 mb-4 mt-3 w-full">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1">
                          Medicine Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="txtMName"
                          name="MedicineName"
                          value={editFormData.MedicineName}
                          onChange={handleEditChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {editErrors.MedicineName && <p className="text-red-500 text-xs mt-1">{editErrors.MedicineName}</p>}
                      </div>
                    </div>
                    <div className="col-12 mb-2 w-full">
                      <div className="form-wrap">
                        <label className="block text-sm font-medium mb-1">
                          Composition <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="txtMComp"
                          name="Composition"
                          value={editFormData.Composition}
                          onChange={handleEditChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {editErrors.Composition && <p className="text-red-500 text-xs mt-1">{editErrors.Composition}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={modalFooterClass}>
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className={`${btnDark} py-2 px-4 text-sm`}>
                    Cancel
                  </button>
                  <button type="submit" className={`${btnInfoRounded} py-2 px-4 text-sm`}>
                    Edit Medical Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  const DeleteMedicineModal = () => {
    if (!isDeleteModalOpen) return null;

    return (
      <>
        <div className={modalBackdropClass} />
        <div className="fixed inset-0 flex items-center justify-center z-[1050]">
          <div className="modal-dialog modal-dialog-centered max-w-sm">
            <div className={`${modalPopupClass}`}>
              <div className="modal-body p-6 text-center">
                <span className={`mx-auto mb-4 ${delIconClass}`}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
                <h3 className="text-xl font-bold mb-2">Delete Record</h3>
                <p className="text-gray-600 mb-4">Are you sure you want to delete this record?</p>
                <div className="flex justify-center flex-wrap space-x-3">
                  <button type="button" onClick={() => setIsDeleteModalOpen(false)} className={`${btnDark} py-2 px-4 text-sm`}>
                    Cancel
                  </button>
                  <button type="button" onClick={handleDeleteMedicine} className={`${btnInfoRounded} py-2 px-4 text-sm`}>
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Medicines - Admin</title>
      </Head>

      <EditMedicineModal />
      <DeleteMedicineModal />

      <div className="flex min-h-screen bg-gray-50 pt-16">
        {/* Sidebar */}
        <div className="sidebar fixed w-64 bg-white shadow-lg h-full overflow-y-auto z-10 hidden md:block">
          <div className="sidebar-inner h-full">
            <div className="p-4" id="sidebar-menu">
              <ul className="space-y-1">
                {adminSidebarLinks.map((item) => (
                  <li key={item.label}>
                    {item.isSubmenu ? (
                      <div>
                        <button
                          onClick={() => handleToggleSubmenu(item.label)}
                          className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition ${
                            item.active || showSubmenu[item.label] ? sidebarActiveClass : 'text-gray-600'
                          }`}
                        >
                          <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                          <span>{item.label}</span>
                          <FontAwesomeIcon icon={faChevronDown} className={`ml-auto w-3 h-3 transition-transform ${showSubmenu[item.label] ? 'rotate-180' : ''}`} />
                        </button>
                        <ul className={`ml-4 mt-1 space-y-1 ${showSubmenu[item.label] ? 'block' : 'hidden'}`}>
                          {item.sublinks.map((sublink) => (
                            <li key={sublink.label}>
                              <a
                                href={sublink.href}
                                className={`block p-2 rounded-lg hover:bg-blue-50 transition ${
                                  sublink.active ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-600'
                                }`}
                              >
                                {sublink.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className={`flex items-center p-3 rounded-lg hover:bg-gray-100 transition ${
                          item.active ? sidebarActiveClass : 'text-gray-600'
                        }`}
                      >
                        <FontAwesomeIcon icon={item.icon} className="w-4 h-4 mr-3" />
                        <span>{item.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* /Sidebar */}

        {/* Page Wrapper */}
        <div className="page-wrapper flex-1 md:ml-64 p-4">
          <div className="content container-fluid">
            
            {/* Page Header */}
            <div className="page-header mb-6">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full sm:w-7/12">
                  <h3 className="text-2xl font-bold mb-1">Products</h3>
                  <ul className="flex text-sm space-x-1 text-gray-500">
                    <li><a href="index.html" className="hover:text-blue-600">Dashboard</a></li>
                    <li className="text-gray-800 font-semibold">Products</li>
                  </ul>
                </div>
                <div className="w-full sm:w-5/12 text-right mt-4 sm:mt-0">
                  <a href="AddMedicine.aspx" className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                    Add New
                  </a>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-md-12 w-full"> 
                {/* Recent Orders */}
                <div className="card bg-white shadow-lg rounded-lg">
                  <div className="card-body p-6">
                    <div className="table-responsive">
                      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                        <div className="row">
                          <div className="col-sm-12 w-full">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className={tableHeaderClass}>Id</th>
                                  <th className={tableHeaderClass}>Medicine Name</th>
                                  <th className={tableHeaderClass}>Composition</th>
                                  <th className={tableHeaderClass}>Action</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {/* Repeater Mapped to JSX */}
                                {mockMedicines.map((medicine) => (
                                  <tr key={medicine.MId}>
                                    <td className={tableDataClass}>{medicine.MedicineCode}</td>
                                    <td className={tableDataClass}>{medicine.MedicineName}</td>
                                    <td className={tableDataClass}>{medicine.Composition}</td>
                                    <td className={tableDataClass}>
                                      <div className="flex space-x-2">
                                        <button
                                          type="button"
                                          onClick={() => openEditModal(medicine.MId)}
                                          className={`btn btn-sm p-2 rounded-md ${btnSuccessLight} text-sm`}
                                        >
                                          <FontAwesomeIcon icon={faPencil} className="w-4 h-4 mr-1" /> Edit
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => openDeleteModal(medicine.MId)}
                                          className={`btn btn-sm p-2 rounded-md ${btnDangerLight} text-sm`}
                                        >
                                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4 mr-1" /> Delete
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
                  </div>
                </div>
                {/* /Recent Orders */}     
              </div>
            </div>
          </div> 
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default AdminMedicines;