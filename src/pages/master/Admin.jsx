// components/AdminLayout.js or components/AdminLayout.jsx

import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';

// Placeholder values for dynamic content
const adminName = "John Doe";
const adminImagePath = "/assets/img/doctors/doctor-thumb-01.jpg"; // Path to Admin Image
const defaultLogoPath = "/assets/img/logo.png";
const smallLogoPath = "/assets/img/logo-small.png";
const faviconPath = "/assets/img/favicon.png";

// Placeholder for the Logout Function
const handleLogout = () => {
    // Implement your logout logic here (e.g., API call, cookie removal, redirect)
    console.log("Logout button clicked");
};


const AdminLayout = ({ children, headContent }) => {
    // Data for notifications
    const notifications = [
        { id: 1, title: "Dr. Ruby Perrin", action: "Schedule her appointment", time: "4 mins ago", image: "/assets/img/doctors/doctor-thumb-01.jpg" },
        { id: 2, title: "Charlene Reed", action: "has booked her appointment to Dr. Ruby Perrin", time: "6 mins ago", image: "/assets/img/patients/patient1.jpg" },
        { id: 3, title: "Travis Trimble", action: "sent a amount of $210 for his appointment", time: "8 mins ago", image: "/assets/img/patients/patient2.jpg" },
        { id: 4, title: "Carl Kelly", action: "send a message to his doctor", time: "12 mins ago", image: "/assets/img/patients/patient3.jpg" },
    ];


    return (
        <div id="form1">
            <Head>
                <title>Doccure</title>

                {/* Placeholder for the ASP:ContentPlaceHolder ID="head" */}
                {headContent} 

                {/* Favicon */}
                <link rel="shortcut icon" type="image/x-icon" href={faviconPath} />
                <link href={faviconPath} rel="icon" />

                {/* SweetAlert2 CDN inclusion (as it was in the original code, but often better to install and import) */}
                <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" strategy="beforeInteractive" />
                
                {/* NOTE: The following CSS links are not directly included. 
                    Tailwind CSS replaces these. If you need Font Awesome, you'll need to link it here
                    or use a React-based FA library. For this example, I assume Font Awesome is included.
                */}
                {/* <link rel="stylesheet" href="../Admin/assets/css/bootstrap.min.css" />
                <link rel="stylesheet" href="../Admin/assets/plugins/fontawesome/css/fontawesome.min.css" />
                <link rel="stylesheet" href="../Admin/assets/plugins/fontawesome/css/all.min.css" />
                <link rel="stylesheet" href="../Admin/assets/css/feathericon.min.css" />
                <link rel="stylesheet" href="../assets/css/feather.css" />
                <link rel="stylesheet" href="../Admin/assets/plugins/morris/morris.css" />
                <link rel="stylesheet" href="../Admin/assets/css/custom.css" />
                */}

            </Head>
            <body>
                {/* Main Wrapper - Tailwind utility classes used to approximate original layout classes */}
                <div className="main-wrapper flex flex-col min-h-screen bg-gray-100"> 
                    
                    {/* Header */}
                    <header className="header bg-white shadow-md fixed w-full z-10 flex items-center h-16">
                        
                        {/* Logo */}
                        <div className="header-left flex-shrink-0 w-64 h-full flex items-center px-4 border-r border-gray-200">
                            <a href="../Default.aspx" className="logo">
                                <Image src={defaultLogoPath} alt="Logo" width={100} height={30} className="hidden lg:block" />
                            </a>
                            <a href="../Default.aspx" className="logo logo-small ml-auto lg:hidden">
                                <Image src={smallLogoPath} alt="Logo" width={30} height={30} className="rounded-full" />
                            </a>
                        </div>
                        {/* /Logo */}
                            
                        {/* Toggle Button */}
                        <a href="javascript:void(0);" id="toggle_btn" className="p-4 text-gray-500 hover:text-gray-700">
                            <i className="fe fe-text-align-left text-xl"></i>
                        </a>
                        
                        {/* Search Bar */}
                        <div className="top-nav-search hidden md:flex items-center ml-4 flex-grow max-w-sm">
                            <input type="text" className="form-control p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow" placeholder="Search here" />
                            <button className="btn bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md transition-colors" type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                            
                        {/* Mobile Menu Toggle */}
                        <a className="mobile_btn lg:hidden ml-auto p-4 text-gray-500 hover:text-gray-700" id="mobile_btn">
                            <i className="fa fa-bars text-xl"></i>
                        </a>
                        {/* /Mobile Menu Toggle */}
                            
                        {/* Header Right Menu */}
                        <ul className="nav user-menu flex items-center ml-auto">
                            
                            {/* Notification */}
                            <li className="nav-item dropdown noti-dropdown relative group">
                                <a href="#" className="dropdown-toggle nav-link p-4 block text-gray-500 hover:text-gray-700" data-bs-toggle="dropdown">
                                    <i className="fe fe-bell text-xl"></i> 
                                    <span className="badge rounded-full bg-red-500 text-white text-xs px-2 py-0.5 absolute top-1 right-1">
                                        {notifications.length}
                                    </span>
                                </a>
                                {/* Dropdown Menu - Hidden by default, shown on hover/click (React logic required for full functionality) */}
                                <div className="dropdown-menu notifications absolute hidden group-hover:block right-0 mt-2 w-80 bg-white shadow-lg rounded-md overflow-hidden z-20">
                                    <div className="topnav-dropdown-header p-3 border-b border-gray-200 flex justify-between items-center">
                                        <span className="notification-title font-semibold text-gray-700">Notifications</span>
                                        <a href="javascript:void(0)" className="clear-noti text-sm text-blue-500 hover:text-blue-700"> Clear All </a>
                                    </div>
                                    <div className="noti-content max-h-80 overflow-y-auto">
                                        <ul className="notification-list divide-y divide-gray-100">
                                            {notifications.map((noti) => (
                                                <li className="notification-message" key={noti.id}>
                                                    <a href="#" className="block hover:bg-gray-50 transition-colors p-3">
                                                        <div className="notify-block flex items-start">
                                                            <span className="avatar avatar-sm flex-shrink-0 mr-3">
                                                                <Image className="avatar-img rounded-full" alt="User Image" src={noti.image} width={32} height={32} />
                                                            </span>
                                                            <div className="media-body flex-grow-1 text-sm">
                                                                <p className="noti-details text-gray-700">
                                                                    <span className="noti-title font-semibold">{noti.title}</span> {noti.action}
                                                                </p>
                                                                <p className="noti-time">
                                                                    <span className="notification-time text-xs text-gray-500">{noti.time}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="topnav-dropdown-footer p-3 border-t border-gray-200 text-center">
                                        <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">View all Notifications</a>
                                    </div>
                                </div>
                            </li>
                            {/* /Notification */}
                            
                            {/* User Menu */}
                            <li className="nav-item dropdown has-arrow relative group">
                                <a href="#" className="dropdown-toggle nav-link p-4 block" data-bs-toggle="dropdown">
                                    <span className="user-img">
                                        {/* AdminImage1 (small image for header) */}
                                        <Image src={adminImagePath} alt="Admin" className="rounded-full" width={31} height={31} />
                                    </span>
                                </a>
                                <div className="dropdown-menu absolute hidden group-hover:block right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20">
                                    <div className="user-header p-3 border-b border-gray-200 flex items-center">
                                        <div className="avatar avatar-sm mr-3">
                                            {/* AdminImage (larger image for dropdown) */}
                                            <Image src={adminImagePath} alt="Admin Image" className="avatar-img rounded-full" width={40} height={40} />
                                        </div>
                                        <div className="user-text">
                                            <h6 className="font-semibold text-gray-800">{adminName}</h6>
                                            <p className="text-muted mb-0 text-sm">Admin</p>
                                        </div>
                                    </div>
                                    <a className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors" href="../Admin/Profile.aspx">My Profile</a>
                                    {/* LogoutBtn */}
                                    <button 
                                        type="button" 
                                        id="LogoutBtn" 
                                        className="dropdown-item w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors" 
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </li>
                            {/* /User Menu */}
                        </ul>
                        {/* /Header Right Menu */}
                    </header>
                    {/* /Header */}
                    
                    {/* Main Content (ASP:ContentPlaceHolder ID="ContentPlaceHolder1") */}
                    <div className="flex-grow pt-16"> {/* Add padding top for fixed header */}
                        {children}
                    </div>
                    {/* /Main Content */}
                </div>
                {/* /Main Wrapper */}
            </body>
            
            {/* NOTE: The original JS scripts are NOT directly included as React handles DOM manipulation.
                If you have custom JS logic (like `script.js`), it needs to be rewritten in React/Next.js.
                The basic layout functions (toggle, dropdowns) rely on React state and Tailwind.
            */}
        </div>
    );
};

export default AdminLayout;

// Example Usage in a Next.js Page:
/*
import AdminLayout from '../components/AdminLayout';

export default function Dashboard() {
    return (
        <AdminLayout 
            headContent={
                <>
                    <link rel="stylesheet" href="/my-dashboard-specific.css" />
                </>
            }
        >
            <main className="p-6">
                <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
                // This is where the page-specific content goes, replacing ContentPlaceHolder1
            </main>
        </AdminLayout>
    );
}
*/