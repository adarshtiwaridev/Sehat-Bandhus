// components/DoctorsLayout.jsx or components/DoctorsLayout.tsx

import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link'; // Use Next.js Link for client-side navigation

// --- Placeholder Data/Functions ---
const DOCTOR_NAME = "Dr. Jane Smith";
const DOCTOR_IMAGE_PATH = "/assets/img/doctors/doctor-thumb.jpg"; // Use a placeholder path
const LOGO_PATH = "/assets/img/logo-01.svg";
const FOOTER_LOGO_PATH = "../assets/img/logo.png";
const FAVICON_PATH = "../assets/img/favicon.png";

// Placeholder for the Logout Function
const handleLogout = () => {
    // Implement your logout logic here (e.g., API call, cookie removal, redirect)
    console.log("Doctor Logout button clicked");
};

// State to manage whether the user is logged in (to control Login/Register vs Logout/User Menu visibility)
// In a real app, this would come from global state/context.
const isLoggedIn = true; 


const DoctorsLayout = ({ children, headContent }) => {
    return (
        <div id="doctors-master-page">
            <Head>
                <title>Doccure</title>
                
                {/* ASP:ContentPlaceHolder ID="head" */}
                {headContent} 

                {/* Favicons */}
                <link href={FAVICON_PATH} rel="icon"/>
                
                {/* SweetAlert2 CDN inclusion */}
                <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" strategy="beforeInteractive" />

                {/* NOTE: CSS Links are omitted as Tailwind replaces them. 
                    You must ensure Font Awesome, Select2, and custom styles 
                    are correctly imported/configured in your Next.js project. 
                */}

            </Head>
            <div className="main-wrapper flex flex-col min-h-screen">
                
                {/* Header */}
                <header className="header header-custom header-fixed header-one home-head-one bg-white shadow-md z-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="navbar navbar-expand-lg header-nav flex justify-between items-center py-3">
                            <div className="navbar-header flex items-center">
                                {/* Mobile Menu Toggle (Functionality needs React State) */}
                                <a id="mobile_btn" href="javascript:void(0);" className="lg:hidden p-2">
                                    <span className="bar-icon space-y-1">
                                        <span className="block w-6 h-0.5 bg-gray-600"></span>
                                        <span className="block w-6 h-0.5 bg-gray-600"></span>
                                        <span className="block w-6 h-0.5 bg-gray-600"></span>
                                    </span>
                                </a>
                                {/* Logo */}
                                <Link href="../Default.aspx" className="navbar-brand logo ml-4">
                                    <Image src={LOGO_PATH} className="img-fluid" alt="Logo" width={100} height={30} />
                                </Link>
                            </div>
                            
                            {/* Main Menu Wrapper (Assuming it's hidden on mobile and toggled) */}
                            <div className="main-menu-wrapper hidden lg:block">
                                {/* Menu Header (Mobile only) */}
                                <div className="menu-header hidden">
                                    <Link href="../Default.aspx" className="menu-logo">
                                        <Image src={LOGO_PATH} className="img-fluid" alt="Logo" width={100} height={30} />
                                    </Link>
                                    <a id="menu_close" className="menu-close" href="javascript:void(0);">
                                        <i className="fas fa-times"></i>
                                    </a>
                                </div>
                                {/* Main Nav */}
                                <ul className="main-nav flex space-x-6 text-gray-700 font-medium">
                                    <li className="has-submenu megamenu active">
                                        <Link href="../Default.aspx" className="hover:text-blue-600 transition-colors">Home</Link>
                                    </li>
                                    <li className="has-submenu">
                                        <Link href="../Contact.aspx" className="hover:text-blue-600 transition-colors">Contact Us</Link>
                                    </li>
                                    <li className="has-submenu">
                                        <Link href="../About.aspx" className="hover:text-blue-600 transition-colors">About Us</Link>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Header Right Menu (Login/Register/Logout/User Menu) */}
                            <ul className="nav header-navbar-rht flex items-center space-x-3">
                                
                                {/* Login/Register Links (Visible when NOT logged in) */}
                                {!isLoggedIn && (
                                    <>
                                        <li className="register-btn">
                                            {/* HypSignup */}
                                            <Link 
                                                href="~/Signup.aspx" 
                                                className="btn reg-btn bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-full flex items-center transition-colors"
                                            >
                                                <i className="feather-user mr-2"></i>Register
                                            </Link>
                                        </li>
                                        <li className="register-btn">
                                            {/* HyperLogIn */}
                                            <Link 
                                                href="~/Login.aspx" 
                                                className="btn btn-primary log-btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full flex items-center transition-colors"
                                            >
                                                <i className="feather-lock mr-2"></i>Login
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {/* Log Out Button (Visible when logged in - LinkButtonlogout) */}
                                {isLoggedIn && (
                                    <li>
                                        <button 
                                            onClick={handleLogout}
                                            className="btn btn-primary log-btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full flex items-center transition-colors"
                                        >
                                            <i className="fa-solid fa-lock-open mr-2"></i>Log Out
                                        </button>
                                    </li>
                                )}
                                
                                {/* User Menu (Visible when logged in) */}
                                {isLoggedIn && (
                                    <li className="nav-item dropdown has-arrow logged-item relative group ml-3">
                                        <a href="#" className="dropdown-toggle nav-link p-0 block" data-bs-toggle="dropdown">
                                            <span className="user-img">
                                                {/* DoctorImage0 */}
                                                <Image src={DOCTOR_IMAGE_PATH} alt="Doctor" className="rounded-full object-cover" width={31} height={31}/>
                                            </span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-md overflow-hidden hidden group-hover:block z-10">
                                            <div className="user-header p-4 border-b border-gray-100 flex items-center">
                                                <div className="avatar avatar-sm mr-3">
                                                    {/* DoctorImage1 */}
                                                    <Image src={DOCTOR_IMAGE_PATH} alt="User Image" className="avatar-img rounded-full object-cover" width={40} height={40}/>
                                                </div>
                                                <div className="user-text">
                                                    <h6 className="font-semibold text-gray-800">{DOCTOR_NAME}</h6>
                                                </div>
                                            </div>
                                            <Link href="../Doctor/Dashboard.aspx" className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                                                Dashboard
                                            </Link>
                                            {/* profileNaviagte */}
                                            <Link href="../Doctor/Profile.aspx" className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                                                Profile
                                            </Link>
                                            {/* LogOut Button */}
                                            <button 
                                                onClick={handleLogout}
                                                className="dropdown-item w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors" 
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </li>
                                )}
                                {/* /User Menu */}	
                            </ul>
                        </nav>
                    </div>
                </header>
                {/* /Header */}
                
                {/* ContentPlaceHolder1 */}
                <main className="flex-grow pt-20"> 
                    {children}
                </main>
                
                {/* Footer Section */}
                <footer className="footer pharmacy-footer bg-gray-50 border-t border-gray-200 mt-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="top-footer flex flex-col md:flex-row justify-between items-center pb-6 border-b border-gray-200 mb-6">
                            <div className="footer-logo mb-4 md:mb-0">
                                <Link href="index.html">
                                    <Image src={FOOTER_LOGO_PATH} alt="logo" width={100} height={30}/>
                                </Link>
                            </div>
                            <div className="doccure-info max-w-lg text-center md:text-left">
                                <p className="text-gray-600">
                                    Doccure is one of India’s most trusted pharmacies, dispensing quality medicines
                                    at reasonable prices to over 9 million happy customers.
                                </p>
                            </div>
                        </div>

                        <div className="mid-footer border-b border-gray-200 pb-8 mb-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {/* Company Links */}
                                <div className="col-span-1">
                                    <div className="footer-links">
                                        <h4 className="font-bold text-lg mb-3 text-gray-800">Company</h4>
                                        <ul className="pages-links space-y-2 text-sm">
                                            <li><Link href="about-us.html" className="text-gray-600 hover:text-blue-500 transition-colors">About Doccure</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Customers Speak</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">In the News</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Career</Link></li>
                                            <li><Link href="contact-us.html" className="text-gray-600 hover:text-blue-500 transition-colors">Contact</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Shopping Links */}
                                <div className="col-span-1">
                                    <div className="footer-links">
                                        <h4 className="font-bold text-lg mb-3 text-gray-800">Shopping</h4>
                                        <ul className="pages-links space-y-2 text-sm">
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Browse by A-Z</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Browse by Manufacturers</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Health Articles</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Offers / Coupons</Link></li>
                                            <li><Link href="faq.html" className="text-gray-600 hover:text-blue-500 transition-colors">FAQs</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Policies Links */}
                                <div className="col-span-1">
                                    <div className="footer-links">
                                        <h4 className="font-bold text-lg mb-3 text-gray-800">Our Policies</h4>
                                        <ul className="pages-links space-y-2 text-sm">
                                            <li><Link href="terms-condition.html" className="text-gray-600 hover:text-blue-500 transition-colors">Terms and Conditions</Link></li>
                                            <li><Link href="privacy-policy.html" className="text-gray-600 hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Fees and Payments</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Shipping and Delivery</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Return, Refund</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Services Links */}
                                <div className="col-span-1">
                                    <div className="footer-links">
                                        <h4 className="font-bold text-lg mb-3 text-gray-800">Our Services</h4>
                                        <ul className="pages-links space-y-2 text-sm">
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Order Medicines</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Book Lab Tests</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Consult a Doctor</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Ayurveda Articles</Link></li>
                                            <li><Link href="javascript:void(0);" className="text-gray-600 hover:text-blue-500 transition-colors">Careers</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Newsletter and App Links (Spans 2 columns on larger screens) */}
                                <div className="col-span-2 lg:col-span-2">
                                    <div className="footer-links">
                                        <h4 className="font-bold text-lg mb-3 text-gray-800">Subscribe to Newsletter</h4>
                                        <form className="mb-4">
                                            <div className="input-block flex">
                                                <input type="email" className="form-control flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Email Address"/>
                                                <button type="submit" className="submit-btn bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors">Submit</button>
                                            </div>
                                        </form>
                                        <div className="app-store-links flex space-x-3">
                                            <a href="javascript:void(0);">
                                                <Image src="../assets/img/icons/app-store.svg" alt="App Store" width={120} height={40}/>
                                            </a>
                                            <a href="javascript:void(0);">
                                                <Image src="../assets/img/icons/google-play.svg" alt="Google Play" width={120} height={40}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mid-foot-two pb-6 border-b border-gray-200 mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                {/* Payment Methods */}
                                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                    <ul className="payment-methods flex items-center space-x-3 justify-center md:justify-start">
                                        <li><a href="javascript:void(0);"><Image src="../assets/img/icons/payment-icon-01.svg" alt="Visa" width={40} height={30}/></a></li>
                                        <li><a href="javascript:void(0);"><Image src="../assets/img/icons/payment-icon-02.svg" alt="MasterCard" width={40} height={30}/></a></li>
                                        <li><a href="javascript:void(0);"><Image src="../assets/img/icons/payment-icon-03.svg" alt="American Express" width={40} height={30}/></a></li>
                                        <li><a href="javascript:void(0);"><Image src="../assets/img/icons/payment-icon-04.svg" alt="Discover" width={40} height={30}/></a></li>
                                    </ul>
                                </div>
                                {/* Social Icons */}
                                <div className="w-full md:w-1/2">
                                    <ul className="social-icons flex items-center space-x-4 justify-center md:justify-end">
                                        <li><a href="#" className="text-gray-600 hover:text-blue-500"><i className="fa-brands fa-facebook-f text-lg"></i></a></li>
                                        <li><a href="#" className="text-gray-600 hover:text-blue-500"><i className="fa-brands fa-twitter text-lg"></i></a></li>
                                        <li><a href="#" className="text-gray-600 hover:text-blue-500"><i className="fa-brands fa-linkedin-in text-lg"></i></a></li>
                                        <li><a href="#" className="text-gray-600 hover:text-blue-500"><i className="fa-brands fa-instagram text-lg"></i></a></li>
                                        <li><a href="#" className="text-gray-600 hover:text-blue-500"><i className="fa-brands fa-dribbble text-lg"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer Bottom */}
                    <div className="footer-bottom bg-gray-100 py-4">
                        <div className="copy-right text-center">
                            <p className="text-gray-600 text-sm">Copyright © 2024 Doccure. All Rights Reserved</p>
                        </div>
                    </div>
                </footer>
                {/* /Footer Section */}
                
                {/* NOTE: Scripts must be handled by Next.js components or imported modules. 
                    The included scripts below are for external libraries, placed outside the main component's body. 
                    Custom logic from 'script.js' must be converted to React hooks/logic.
                */}
                <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" strategy="lazyOnload" />
                <Script src="../assets/js/jquery-3.7.1.min.js" strategy="lazyOnload" />
                <Script src="../assets/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
                <Script src="../assets/plugins/theia-sticky-sidebar/ResizeSensor.js" strategy="lazyOnload" />
                <Script src="../assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js" strategy="lazyOnload" />
                <Script src="../assets/plugins/select2/js/select2.min.js" strategy="lazyOnload" />
                <Script src="../assets/plugins/apex/apexcharts.min.js" strategy="lazyOnload" />
                <Script src="../assets/plugins/apex/chart-data.js" strategy="lazyOnload" />
                <Script src="../assets/js/circle-progress.min.js" strategy="lazyOnload" />
                {/* Custom JS - Needs to be rewritten in React/Next.js for production */}
                <Script src="../assets/js/script.js" strategy="lazyOnload" />
                
            </div>
        </div>
    );
};

export default DoctorsLayout;