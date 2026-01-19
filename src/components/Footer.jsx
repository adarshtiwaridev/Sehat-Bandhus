"use client";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
            Sehat<span className="text-green-600">Bandhu</span>
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Effortlessly connect with trusted healthcare professionals,
            schedule your appointments, and prioritize your well-being with
            SehatBandhu — your all-in-one health companion.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600">Home</a></li>
            <li><a href="#" className="hover:text-green-600">About Us</a></li>
            <li><a href="#" className="hover:text-green-600">Blog</a></li>
            <li><a href="#" className="hover:text-green-600">Contact</a></li>
          </ul>
        </div>

        {/* Specialties */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Specialties</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600">Cardiology</a></li>
            <li><a href="#" className="hover:text-green-600">Dentistry</a></li>
            <li><a href="#" className="hover:text-green-600">Neurology</a></li>
            <li><a href="#" className="hover:text-green-600">Eye Care</a></li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Contact Us</h3>
          <ul className="space-y-2 text-sm mb-4">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-green-600 mt-1" />
              <span>3556 Beech Street, India</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="text-green-600 mt-1" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="text-green-600 mt-1" />
              <span>support@sehatbandhu.in</span>
            </li>
          </ul>

          {/* Newsletter */}
          <h3 className="text-md font-semibold text-gray-900 mb-2">Join Our Newsletter</h3>
          <form className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="#" className="text-gray-600 hover:text-blue-600"><Facebook size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-pink-600"><Instagram size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-400"><Twitter size={20} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-700"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-10 pt-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SehatBandhu. All Rights Reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-green-600">Privacy Policy</a>
            <a href="#" className="hover:text-green-600">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
