"use client";
import React, { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@/lib/firebase.config";

export default function OtpModal({
  mobile,
  formData,
  role,
  open,
  onClose,
  onVerified,
  onRegistered,
}) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const email = formData?.email || "";

  // Reset OTP when modal opens
  useEffect(() => {
    if (!open) return;
    setOtp(Array(6).fill(""));
    setTimer(60);
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, [open]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  // Setup invisible Recaptcha (optional for future SMS)
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      if (process.env.NODE_ENV === "development") {
        window.recaptchaVerifier = {
          verify: async () => "dummy-recaptcha-token",
          render: async () => {},
        };
      } else {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" },
          auth
        );
        window.recaptchaVerifier.render().catch(() => {});
      }
    }
  };

  // 🔹 Send OTP to Email
  const sendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      toast.success("OTP sent successfully to your email");
      setTimer(60); // restart timer
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Verify OTP & Register User
  const verifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) return toast.error("Enter 6-digit OTP");

    setLoading(true);
    try {
      // Step 1: Verify OTP
      const verifyRes = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": " application/json" },
        body: JSON.stringify({ email: formData.email, otp: otpString }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok)
        throw new Error(verifyData.message || "Invalid OTP");

      toast.success("Email verified successfully ✅");

      // Step 2: Register user
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok)
        throw new Error(registerData.message || "Registration failed");

      // Step 3: Store token and user details
      if (registerData.token) localStorage.setItem("token", registerData.token);
      if (registerData.user)
        localStorage.setItem("user", JSON.stringify(registerData.user));

      toast.success("Registration successful 🎉");

      // Step 4: Close modal & redirect
      onVerified?.();
      onRegistered?.(registerData);
      onClose?.();

      if (role === "patient") router.push("/patient/Dashboard");
      else router.push("/doctor/Dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // OTP input logic
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < otp.length - 1)
      inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-3">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Verify OTP</h3>
            <p className="text-sm text-gray-600">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium">{email}</span>
            </p>
          </div>
        </div>

        {/* OTP Inputs */}
        <div className="mt-6 flex justify-center gap-3">
          {otp.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              maxLength={1}
              className="w-12 h-12 text-center border-2 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg bg-white text-lg font-semibold transition-all"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={verifyOtp}
            disabled={loading}
            className="py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 transition-all"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={sendOtp}
            disabled={timer > 0 || loading}
            className="py-2 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-all disabled:opacity-60"
          >
            {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Cancel
          </button>
        </div>

        {/* Recaptcha */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
