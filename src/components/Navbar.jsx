import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Logo Component
const Logo = () => (
  <svg height="32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NavLink = ({ href, children }) => (
  <a href={href} className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
    {children}
  </a>
);

const MobileNavLink = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
    {children}
  </a>
);

const AuthButton = ({ href, children, primary = false }) => (
  <a href={href} className={`
    rounded-md px-4 py-2 text-sm font-medium transition-all duration-300
    ${primary
      ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      : 'bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
    }
  `}>
    {children}
  </a>
);

// Profile Dropdown Component
const ProfileDropdown = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!open);

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-semibold hover:ring-2 hover:ring-indigo-400 transition"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-fadeIn">
          <div className="px-4 py-2 border-b text-sm text-gray-700 font-medium">
            {user?.name || "User"}
          </div>
          <a href="/patient/Dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
            Dashboard
          </a>
          <a href="/patient/Dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
            Profile
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    dispatch(clearUser());
    toast.success("Logout successfully");
    router.push("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-26">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold text-xl text-gray-800">Sehathbandhu</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contactus">Contact Us</NavLink>
            <NavLink href="/patient/BookAppointments">Booking</NavLink>
            <NavLink href="/#find-doctor">Find Doctor</NavLink>
            <NavLink href="/PremiumPage">Premium</NavLink>
            <NavLink href="/BlogPage">Blogs</NavLink>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex cursor-pointer items-center space-x-3">
            <AuthButton href="/Bookingform">Booking</AuthButton>
            {user ? (
              <ProfileDropdown user={user} handleLogout={handleLogout} />
            ) : (
              <AuthButton href="/Authpage" primary>Register</AuthButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink href="/" onClick={closeMenu}>Home</MobileNavLink>
          <MobileNavLink href="/about" onClick={closeMenu}>About</MobileNavLink>
          <MobileNavLink href="/contactus" onClick={closeMenu}>Contact Us</MobileNavLink>
          <MobileNavLink href="/patient/BookAppointments" onClick={closeMenu}>Booking</MobileNavLink>
          <MobileNavLink href="/#find-doctor" onClick={closeMenu}>Find Doctor</MobileNavLink>
          <MobileNavLink href="/PremiumPage" onClick={closeMenu}>Premium</MobileNavLink>
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center space-x-3 px-2">
            <AuthButton href="/Bookingform">Booking</AuthButton>
            <AuthButton href="/Authpage" primary>Register</AuthButton>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
