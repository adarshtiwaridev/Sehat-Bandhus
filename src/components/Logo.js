"use client";
import { Mail, MessageCircle } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center justify-between w-full max-w-lg px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        {/* Icon (can replace with your logo image) */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
          <span className="text-3xl">💚</span>
        </div>

        {/* Brand Text */}
        <div className="flex flex-col leading-tight">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Sehat<span className="text-green-600">Bandhu</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Your Health Companion
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex items-center gap-4">
        <a
          href="mailto:contact@sehatbandhu.in"
          className="text-gray-600 hover:text-blue-600 transition-colors"
          title="Email us"
        >
          <Mail size={22} />
        </a>

        <a
          href="https://wa.me/919999999999"
          target="_blank"
          className="text-gray-600 hover:text-green-600 transition-colors"
          title="Message on WhatsApp"
        >
          <MessageCircle size={22} />
        </a>
      </div>
    </div>
  );
}
