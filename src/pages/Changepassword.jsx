import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import Cookies from "js-cookie";
const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New and confirm passwords do not match");
      return;
    }

    try {
       const token =localStorage.getItem("token");
       console.log(token || "No token found");
      if (!token) {
        toast.error("Please log in again.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/user/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Password updated successfully!");
        reset();
      } else {
        toast.error(result.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 items-center justify-center relative overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Floating background icons */}
      <motion.div
        className="absolute -top-10 -right-10 opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <FaLock size={120} className="text-blue-300" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl backdrop-blur-lg border border-blue-100"
      >
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-200 to-blue-100 items-center justify-center">
          <motion.img
            src="/images/change-password-hospital.png"
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/3004/3004458.png";
            }}
            alt="Change Password Illustration"
            className="w-3/4 h-auto drop-shadow-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative z-10">
          <div className="flex items-center mb-6">
            <FaLock className="text-blue-600 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
              Change Password
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Old Password */}
            <div className="relative">
              <label className="block text-gray-600 font-medium mb-1">
                Old Password
              </label>
              <input
                type={showOld ? "text" : "password"}
                {...register("oldPassword", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all pr-10"
                placeholder="Enter old password"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-9 text-gray-500 hover:text-blue-500"
              >
                {showOld ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.oldPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Old password is required
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-gray-600 font-medium mb-1">
                New Password
              </label>
              <input
                type={showNew ? "text" : "password"}
                {...register("newPassword", {
                  required: true,
                  minLength: 6,
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-9 text-gray-500 hover:text-blue-500"
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-gray-600 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all pr-10"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-9 text-gray-500 hover:text-blue-500"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Please confirm your password
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px #3b82f6" }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg transition-all"
            >
              Update Password
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
