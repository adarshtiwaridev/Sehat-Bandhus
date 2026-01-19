import React, { useState } from 'react';
import OtpModal from '../components/OtpModal';
import {  toast } from 'sonner';
import { useRouter } from 'next/navigation';
// --- Helper Components --- //

// Icon for input fields
const FormIcon = ({ children }) => (
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    {children}
  </div>
);

// Success message component to replace alerts
const SuccessMessage = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg my-4 relative" role="alert">
      <p className="font-bold">Success!</p>
      <p>{message}</p>
      <button onClick={onClose} className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </button>
    </div>
  );
};

// Icon for password visibility toggle
const PasswordToggleIcon = ({ visible }) => (
    <>
        {visible ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A10.025 10.025 0 01.458 10c1.274 4.057 5.022 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
        )}
    </>
);


// --- Main Form Components --- //

 
const PatientRegisterForm = ({ setView }) => {
  const [formData, setFormData] = useState({ name: "", mobile: "", dob: "", email: "", address: "", gender: "Male", password: "" });
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState('details'); // details -> otp
   
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const routerPatient = useRouter();
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
 


  //  const handleRegister = (e) => {
  //   e.preventDefault();
  //   if (!formData.mobile) return toast.error("Enter mobile number");
  //   setOtpModalOpen(true);
  // };
const handleRegister = async (e) => {
  e.preventDefault();

  // 🧠 Basic validation
  if (!formData.email || !formData.mobile) {
    return toast.error("Please enter both email and mobile number");
  }

  setLoading(true);
  try {
    // 🔥 1️⃣ Send OTP request to backend
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        mobile: formData.mobile,
      }),
    });

    const data = await res.json();

    // 🧱 Error handling
    if (!res.ok) throw new Error(data.message || "Failed to send OTP");

    // ✅ 2️⃣ Save registration data temporarily
    localStorage.setItem("pendingRegistration", JSON.stringify(formData));

    // ✅ 3️⃣ Show OTP modal for verification
    setOtpModalOpen(true);

    toast.success("OTP sent successfully to your email");
  } catch (err) {
    console.error("OTP Error:", err);
    toast.error(err.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
    <form onSubmit={handleRegister} className="space-y-4">
      {/* <SuccessMessage message={success} onClose={() => setSuccess('')} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {/* Name */}
<div className="relative ">
  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
    Full Name
  </label>
  <div className="relative">
    <FormIcon>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    </FormIcon>
    <input
      id="name"
      type="text"
      name="name"
      placeholder="Enter your full name"
      required
      className="pl-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      onChange={handleChange}
    />
  </div>
</div>

{/* Mobile */}
<div className="relative ">
  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
    Mobile Number
  </label>
  <div className="relative">
    <FormIcon>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.254 6.254l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    </FormIcon>
    <input
      id="mobile"
      type="tel"
      name="mobile"
      placeholder="Enter mobile number"
      required
      className="pl-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      onChange={handleChange}
    />
  </div>
</div>

{/* DOB */}
<div className="relative  ">
  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
    Date of Birth
  </label>
  <div className="relative">
    <FormIcon>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    </FormIcon>
    <input
      id="dob"
      type="date"
      name="dob"
      required
      className="pl-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-500"
      onChange={handleChange}
    />
  </div>
</div>

{/* Email */}
<div className="relative ">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
    Email Address
  </label>
  <div className="relative">
    <FormIcon>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    </FormIcon>
    <input
      id="email"
      type="email"
      name="email"
      placeholder="Enter email address"
      required
      className="pl-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      onChange={handleChange}
    />
  </div>
</div>

{/* Address */}
<div className="relative ">
  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
    Full Address
  </label>
  <textarea
    id="address"
    name="address"
    placeholder="Enter your full address"
    rows="2"
    required
    className="w-[210%] p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
    onChange={handleChange}
  ></textarea>
</div>
</div>
      {/* Gender */}
      <div className="flex items-center gap-4">
        <label className="text-gray-600 font-medium">Gender:</label>
        {["Male", "Female", "Other"].map(g => (
          <label key={g} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
            <span className="text-gray-700">{g}</span>
          </label>
        ))}
      </div>
       {/* Password */}
      <div className="relative">
        <FormIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L4.257 19.743A1 1 0 112.84 18.33l10.022-6.19a6 6 0 015.139-4.14zM12 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" /></svg></FormIcon>
        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required className="pl-10 pr-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" onChange={handleChange} />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <PasswordToggleIcon visible={showPassword} />
        </button>
      </div>

      

      <button type="submit"   className={`w-full py-3  bg-gradient-to-r from-blue-600 to-teal-500 text-white  cursor-pointer font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}>
        {loading? "loading...":"Register"}
        </button>
      <p className="text-center text-gray-600 mt-2">
        Already have an account?{' '}
        <button type="button" onClick={() => setView('login')} className="text-blue-600 hover:underline font-medium">Login</button>
      </p>
    </form>
    <OtpModal
      mobile={formData.mobile}
      formData={formData}
      role="patient"
      open={otpModalOpen}
      onClose={() => setOtpModalOpen(false)}
      onVerified={() => setOtpVerified(true)}
 
      onRegistered={(regData) => {
        setOtpVerified(true);
        setSuccess(regData?.message || 'Registered successfully');
        if (regData?.token) localStorage.setItem('token', regData.token);
        try { routerPatient.push('/'); } catch (e) { /* ignore */ }
      }}
    />
    </>
  );
};


const DoctorRegisterForm = ({ setView, openOtp }) => {
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "", specialization: "", license: "", experience: "", password: "" });
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const routerDoctor = useRouter();
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // If user returns from /otp with verified=true, prefill mobile and mark verified
  React.useEffect(() => {
    const q = routerDoctor && routerDoctor.query;
    if (q && (q.verified === '1' || q.verified === 'true')) {
      if (q.mobile) setFormData(prev => ({ ...prev, mobile: q.mobile }));
      setOtpVerified(true);
      setSuccess('Mobile verified');
    }
  }, [routerDoctor.query]);

//  const sendOtp = async (e) => {
//     e && e.preventDefault();
//     if (!formData.mobile) return alert('Please enter mobile number first');
//     setOtpSent(true);
//     setSuccess('OTP modal opened');
//     toast.success('OTP modal opened');
//     openOtp && openOtp({ role: 'doctor', mobile: String(formData.mobile).trim().replace(/\D/g, ''), formData, onVerified: () => setOtpVerified(true) });
//  };

  const sendOtp = async (e) => {
  e.preventDefault();
  if (!formData.email) return toast.error("Please enter your email");

  setLoading(true);
  try {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email ,mobile:formData.mobile}),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to send OTP");

    toast.success("OTP sent to your email");
    setOtpModalOpen(true);
  } catch (err) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
}; 

 

  return (
    <>
    <form onSubmit={sendOtp} className="space-y-4">
      <SuccessMessage message={success} onClose={() => setSuccess('')} />
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Name */}
  <div className="relative  ">
    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
      Full Name
    </label>
    <div className="relative">
      <FormIcon>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </FormIcon>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Enter your full name"
        required
        className="pl-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        onChange={handleChange}
      />
    </div>
  </div>

  {/* Mobile */}
  <div className="relative ">
    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
      Mobile Number
    </label>
    <div className="relative">
      <FormIcon>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.254 6.254l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </FormIcon>
      <input
        id="mobile"
        type="tel"
        name="mobile"
        placeholder="Enter mobile number"
        required
        className="pl-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        onChange={handleChange}
      />
    </div>
  </div>
</div>

{/* Email */}
<div className="relative ">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
    Email Address
  </label>
  <div className="relative">
    <FormIcon>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    </FormIcon>
    <input
      id="email"
      type="email"
      name="email"
      placeholder="Enter email address"
      required
      className="pl-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      onChange={handleChange}
    />
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Specialization */}
  <div className="relative ">
    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
      Specialization
    </label>
    <input
      id="specialization"
      type="text"
      name="specialization"
      placeholder="e.g., Cardiologist"
      required
      className="w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      onChange={handleChange}
    />
  </div>

  {/* License */}
  <div className="relative ">
    <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-1">
      Medical License Number
    </label>
    <input
      id="license"
      type="text"
      name="license"
      placeholder="Enter license number"
      required
      className="w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      onChange={handleChange}
    />
  </div>
</div>

{/* Experience */}
<div className="relative ">
  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
    Years of Experience
  </label>
  <input
    id="experience"
    type="number"
    name="experience"
    placeholder="Enter years of experience"
    required
    className="w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
    onChange={handleChange}
  />
</div>

      {/* Password */}
      <div className="relative">
        <FormIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L4.257 19.743A1 1 0 112.84 18.33l10.022-6.19a6 6 0 015.139-4.14zM12 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" /></svg></FormIcon>
        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required className="pl-10 pr-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" onChange={handleChange} />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <PasswordToggleIcon visible={showPassword} />
        </button>
      </div>

  

      <button type="submit"   className={`w-full py-3  bg-gradient-to-r from-blue-600 to-teal-500 text-white  font-semibold rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg`}>   {loading? "loading...":"Register as Doctor"}</button>
       <p className="text-center text-gray-600 mt-2">
        Already have an account?{' '}
        <button type="button" onClick={() => setView('login')} className="text-blue-600 hover:underline font-medium">Login</button>
      </p>
    </form>
    <OtpModal
      mobile={formData.mobile}
      formData={formData}
      role="doctor"
      open={otpModalOpen}
      onClose={() => setOtpModalOpen(false)}
      onVerified={() => setOtpVerified(true)}
     
      onRegistered={(regData) => {
        setOtpVerified(true);
        setSuccess(regData?.message || 'Registered successfully');
        if (regData?.token) localStorage.setItem('token', regData.token);
        try { routerDoctor.push('/'); } catch (e) { /* ignore */ }
      }}
    />
    </>
  );
};

const RegisterPage = ({ setView }) => {
    const [formType, setFormType] = useState('patient'); // 'patient' or 'doctor'
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [otpModalRole, setOtpModalRole] = useState('patient');
    const [otpModalMobile, setOtpModalMobile] = useState('');
    const [otpModalFormData, setOtpModalFormData] = useState(null);
    const [otpModalOnVerified, setOtpModalOnVerified] = useState(null);

    const openOtp = ({ role, mobile, formData, onVerified }) => {
      setOtpModalRole(role || 'patient');
      setOtpModalMobile(mobile || '');
      setOtpModalFormData(formData || null);
      setOtpModalOnVerified(() => onVerified || null);
      setOtpModalOpen(true);
    };

    return (
        <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl flex flex-col lg:flex-row overflow-hidden my-10 border border-gray-200/50">
            {/* Left Image Section */}
            <div className="lg:w-1/2 hidden lg:block relative">
                 <img
                    src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Team of doctors collaborating"
                    className="w-full h-full object-cover"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                 <div className="absolute bottom-10 left-10 text-white">
                    <h1 className="text-4xl font-bold">Join Our Community</h1>
                    <p className="text-lg mt-2">For a Healthier Tomorrow.</p>
                 </div>
            </div>

            {/* Right Form Section */}
            <div className="lg:w-1/2 w-full p-8 sm:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
                    Create Your Account
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Get started with our healthcare platform today.
                </p>

                {/* Toggle Buttons */}
                <div className="flex bg-blue-50 p-1 rounded-lg mb-8">
                    <button
                        onClick={() => setFormType('patient')}
                        className={`w-1/2 p-2 rounded-md font-semibold transition-all duration-300 ${formType === 'patient' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-blue-100'}`}
                    >
                        I'm a Patient
                    </button>
                    <button
                        onClick={() => setFormType('doctor')}
                        className={`w-1/2 p-2 rounded-md font-semibold transition-all duration-300 ${formType === 'doctor' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-blue-100'}`}
                    >
                        I'm a Doctor
                    </button>
                </div>
                
        {formType === 'patient' ? <PatientRegisterForm setView={setView} openOtp={openOtp} /> : <DoctorRegisterForm setView={setView} openOtp={openOtp} />}
                <OtpModal
                  mobile={otpModalMobile}
                  formData={otpModalFormData}
                  role={otpModalRole}
                  open={otpModalOpen}
                  onClose={() => setOtpModalOpen(false)}
                  onVerified={() => { otpModalOnVerified && otpModalOnVerified(); }}
                />
            </div>
        </div>
    );
};

const LoginPage = ({ setView }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
 const router = useRouter();
    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    // login route 
const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password } = formData; // ✅ Fix: destructure from formData

  if (!email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Store token safely in localStorage (client-side)
      localStorage.setItem("token", data.token);

      toast.success("Login successful!");
      router.push("/Dashboard");
    } else {
      toast.error(data.message || "Invalid credentials");
    }
  } catch (err) {
    toast.error("Something went wrong. Try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};



    return (
         <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl flex flex-col lg:flex-row overflow-hidden my-10 border border-gray-200/50">
            {/* Left Image Section */}
            <div className="lg:w-1/2 hidden lg:block relative">
                 <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Doctor with a clipboard"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                 <div className="absolute bottom-10 left-10 text-white">
                    <h1 className="text-4xl font-bold">Welcome Back!</h1>
                    <p className="text-lg mt-2">Your health journey continues here.</p>
                 </div>
            </div>
            {/* Right Form Section */}
            <div className="lg:w-1/2 w-full p-8 sm:p-12 flex flex-col justify-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
                    Login
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Access your account.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <SuccessMessage message={success} onClose={() => setSuccess('')} />
                     {/* mobile */}
                    <div className="relative">
                        <FormIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg></FormIcon>
                        <input type="email" name="email" placeholder="Enter Email" required className="pl-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" onChange={handleChange} />
                    </div>
                     {/* Password */}
                    <div className="relative">
                        <FormIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L4.257 19.743A1 1 0 112.84 18.33l10.022-6.19a6 6 0 015.139-4.14zM12 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" /></svg></FormIcon>
                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required className="pl-10 pr-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" onChange={handleChange} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <PasswordToggleIcon visible={showPassword} />
                        </button>
                    </div>
                    <div className="text-right">
                        <a onClick={()=>setView('ForgotPasswordPage')} className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {
                       loading?"please wait ...":"Login"

                      }  
                    </button>
                    <p className="text-center text-gray-600 mt-2">
                        Don't have an account?{' '}
                        <button type="button" onClick={() => setView('register')} className="text-blue-600 hover:underline font-medium">
                            Sign Up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};
const ForgotPasswordPage = ({ setView }) => {
    const [step, setStep] = useState('enter-email'); // 'enter-email', 'verify-otp', 'reset-password'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState('');

    const handleSendOtp = (e) => {
        e.preventDefault();
        console.log(`Sending OTP to ${email}`);
        setSuccess(`An OTP has been sent to ${email}.`);
        setStep('verify-otp');
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        console.log(`Verifying OTP ${otp}`);
        // Add OTP verification logic here
        setSuccess('OTP verified successfully.');
        setStep('reset-password');
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log(`Password reset for ${email}`);
        setSuccess('Your password has been reset successfully! Please log in.');
        setTimeout(() => {
            setView('login');
        }, 2000);
    };

    return (
        <div className="w-full max-w-6xl h-[600px] bg-white shadow-xl rounded-2xl flex flex-col lg:flex-row overflow-hidden my-10 border border-gray-200/50">
            {/* Left Image Section */}
            <div className="lg:w-1/2 hidden lg:block relative">
           <img
                    src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Team of doctors collaborating"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white">
                    <h1 className="text-4xl font-bold">Account Recovery</h1>
                    <p className="text-lg mt-2">Follow the steps to regain access.</p>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="lg:w-1/2 w-full p-8 sm:p-12 flex flex-col justify-center">
                <SuccessMessage message={success} onClose={() => setSuccess('')} />
                
                {step === 'enter-email' && (
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Forgot Password?</h2>
                        <p className="text-center text-gray-500 mb-8">Enter your email to receive a verification code.</p>
                        <form onSubmit={handleSendOtp} className="space-y-5">
                            <div className="relative">
                                <FormIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg></FormIcon>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required className="pl-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg">Send OTP</button>
                        </form>
                    </div>
                )}

                {step === 'verify-otp' && (
                     <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Verify Code</h2>
                        <p className="text-center text-gray-500 mb-8">Enter the OTP sent to your email.</p>
                        <form onSubmit={handleVerifyOtp} className="space-y-5">
                            <div className="relative">
                                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" required className="w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-center tracking-[0.5em]" maxLength="6" />
                            </div>
                            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg">Verify</button>
                        </form>
                    </div>
                )}

                {step === 'reset-password' && (
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Reset Password</h2>
                        <p className="text-center text-gray-500 mb-8">Create a new, strong password.</p>
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" required className="pr-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center"><PasswordToggleIcon visible={showPassword} /></button>
                            </div>
                            <div className="relative">
                                <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required className="pr-10 w-full p-3 border rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                                 <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center"><PasswordToggleIcon visible={showConfirmPassword} /></button>
                            </div>
                            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg">Reset Password</button>
                        </form>
                    </div>
                )}
                
                <p className="text-center text-gray-600 mt-4">
                    <button type="button" onClick={() => setView('login')} className="text-blue-600 hover:underline font-medium">Back to Login</button>
                </p>
            </div>
        </div>
    );
};


// --- App Component (Main Entry) --- //

const App = () => {
  const [view, setView] = useState('register'); // Can be 'login', 'register', or 'forgotPassword'
 
 

  const renderContent = () => {
    switch (view) {
      case 'login':
        return <LoginPage setView={setView}   />;
      case 'ForgotPasswordPage':
        return <ForgotPasswordPage setView={setView} />;
      case 'register':
      default:
        return <RegisterPage setView={setView}  />;
    }
  };

  return (
    <>
    <style>{`
      @keyframes gradient-animation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animated-gradient {
        background: linear-gradient(135deg, #f0f9ff, #e0f2fe, #f0f9ff);
        background-size: 200% 200%;
        animation: gradient-animation 15s ease infinite;
      }
    `}</style>
   <div className="min-h-screen font-sans animated-gradient flex items-center justify-center p-4">
     {renderContent()}
   </div>
  
 
    </>
  );
};
export default App;