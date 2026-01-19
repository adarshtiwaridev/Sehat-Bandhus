import { useState } from 'react';
import { CheckCircle, Zap, BarChart3, Clock, BriefcaseMedical, ShieldCheck, MessageSquareQuote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Reusable Animation Variants ---
const sectionFadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const cardStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- Data for Features (Makes code cleaner and easier to update) ---
const professionalFeatures = [
  {
    icon: <BriefcaseMedical />,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba9996a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Enhanced Professional Profile",
    description: "Create a standout profile with videos, photo galleries, and detailed service listings. Attract high-quality clients by showcasing your expertise and building trust instantly."
  },
  {
    icon: <Clock />,
    image: "https://images.unsplash.com/photo-1551189023-e4a73752d432?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Automated 24/7 Booking System",
    description: "Free up your schedule. Our smart system handles appointments, sends automated reminders to reduce no-shows, and syncs with your personal calendar effortlessly."
  },
  {
    icon: <BarChart3 />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Practice Growth Insights",
    description: "Make data-driven decisions. Access a powerful dashboard with analytics on profile views, client demographics, and booking trends to optimize your practice's growth."
  }
];

const patientFeatures = [
  {
    icon: <Zap />,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Priority Search & Booking",
    description: "Find the right professional, faster. Get priority placement in search results and instantly book appointments with top-rated specialists in your area without the wait."
  },
  {
    icon: <ShieldCheck />,
    image: "https://images.unsplash.com/photo-1584820221323-1c39c885cd27?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Verified Profiles & Reviews",
    description: "Make confident choices. Access exclusive, detailed profiles with verified credentials and read genuine, in-depth reviews from other premium members."
  },
  {
    icon: <MessageSquareQuote />,
    image: "https://images.unsplash.com/photo-1589909244249-8a2b5a5c5314?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Secure Messaging & Consults",
    description: "Communicate with peace of mind. Use our secure, private messaging platform for follow-ups and access integrated video consultations for convenient remote care."
  }
];

const pricingPlans = [
    {
      name: "Basic",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Get started with the essentials.",
      features: [
        "Basic Profile Listing",
        "Standard Search Visibility",
        "5 Client Messages / Month",
      ],
      isPopular: false,
    },
    {
      name: "Professional",
      monthlyPrice: 49,
      yearlyPrice: 39,
      description: "For professionals ready to grow.",
      features: [
        "Enhanced Profile & Photos",
        "Top Search Placement",
        "24/7 Appointment Booker",
        "Client Analytics Dashboard",
        "Email & Chat Support",
      ],
      isPopular: true,
    },
    {
      name: "Elite",
      monthlyPrice: 99,
      yearlyPrice: 79,
      description: "The ultimate suite for established practices.",
      features: [
        "Everything in Professional",
        "Video Consultation Integration",
        "Featured on Homepage",
        "Dedicated Account Manager",
        "Priority 24/7 Support",
      ],
      isPopular: false,
    },
  ];

// --- The Main Premium Page Component ---
const PremiumPage = () => {
  const [userType, setUserType] = useState('professional'); // 'professional' or 'patient'
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  const currentFeatures = userType === 'professional' ? professionalFeatures : patientFeatures;
  const heroContent = {
    professional: {
      title: "Unlock Your Practice's Full Potential",
      subtitle: "Attract more clients, streamline your workflow, and grow your reputation with our exclusive Premium Suite for Professionals."
    },
    patient: {
      title: "Experience Healthcare On Your Terms",
      subtitle: "Get priority access to top professionals, book appointments instantly, and manage your health journey with confidence and ease."
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative text-white py-28 sm:py-36 lg:py-48 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[.8] blur-sm z-10"
        >
          <source src="/assets/otthers/premium.mp4" type="video/ogg" />
          <source src="/assets/others/premium.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.h1
            key={userType}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {heroContent[userType].title}
          </motion.h1>

          <motion.p
            key={userType + 'sub'}
            className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {heroContent[userType].subtitle}
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a
              href="#pricing"
              className="mt-12 inline-block bg-white text-indigo-600 font-bold text-lg px-10 py-4 rounded-lg shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Explore Plans
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. User Type Toggle & Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          
          {/* Toggle Switch */}
          <motion.div 
            className="flex justify-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionFadeIn}
          >
            <div className="bg-gray-200 rounded-full p-1.5 flex items-center space-x-2">
              <button 
                onClick={() => setUserType('professional')}
                className={`px-6 py-2.5 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 ${userType === 'professional' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-300'}`}
              >
                For Professionals
              </button>
              <button 
                onClick={() => setUserType('patient')}
                className={`px-6 py-2.5 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 ${userType === 'patient' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-300'}`}
              >
                For Patients
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center mb-16"
            key={userType + 'header'}
            initial="hidden"
            animate="visible"
            variants={sectionFadeIn}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {userType === 'professional' ? 'Features That Generate Growth' : 'Benefits That Bring Peace of Mind'}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              {userType === 'professional' ? 'Our premium tools are designed not just to manage, but to actively grow your practice.' : 'Unlock a suite of tools designed to make your healthcare journey seamless and stress-free.'}
            </p>
          </motion.div>
          
          {/* Features Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={userType} // This is crucial for AnimatePresence to detect changes
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
              variants={cardStaggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {currentFeatures.map((feature, index) => (
                <motion.div key={index} className="text-center" variants={cardVariants}>
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover rounded-full shadow-lg"/>
                    <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center border-4 border-gray-50">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

     {/* 3. Pricing Section */}
<section id="pricing" className="relative py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605902711622-cfb43c4437c1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm"></div>

  <div className="container mx-auto px-4 relative z-10">
    
    {/* Heading */}
    <motion.div
      className="text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionFadeIn}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
        Choose the Plan That’s Right for You
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
        Simple, transparent pricing — designed for professionals and patients alike.
      </p>
    </motion.div>

    {/* Billing Toggle */}
    <motion.div
      className="flex justify-center items-center space-x-4 mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={sectionFadeIn}
    >
      <span className={`font-medium ${billingCycle === "monthly" ? "text-indigo-600" : "text-gray-500"}`}>
        Monthly
      </span>

      <button
        onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
        className="relative w-14 h-8 bg-gray-300 rounded-full transition-all duration-300 focus:outline-none"
      >
        <motion.div
          className="absolute top-[4px] w-6 h-6 bg-white rounded-full shadow-md"
          layout
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
          style={{
            left: billingCycle === "monthly" ? "4px" : "30px",
          }}
        />
      </button>

      <span className={`font-medium ${billingCycle === "yearly" ? "text-indigo-600" : "text-gray-500"}`}>
        Yearly
      </span>
      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
        SAVE 20%
      </span>
    </motion.div>

    {/* Pricing Cards */}
    <motion.div
      className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
      variants={cardStaggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {pricingPlans.map((plan, index) => (
        <motion.div
          key={plan.name}
          className={`relative backdrop-blur-xl bg-white/60 border rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] ${
            plan.isPopular ? "border-indigo-500" : "border-gray-200"
          }`}
          variants={cardVariants}
        >
          {/* Popular Tag */}
          {plan.isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <span className="bg-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                MOST POPULAR
              </span>
            </div>
          )}

          {/* Plan Title */}
          <h3 className="text-2xl font-bold text-center text-gray-900">
            {plan.name}
          </h3>
          <p className="text-center text-gray-500 mt-2">
            {plan.description}
          </p>

          {/* Price */}
          <div className="text-center my-8">
            <motion.span
              key={billingCycle}
              className="text-5xl font-extrabold text-indigo-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
            </motion.span>
            <span className="text-gray-500">/month</span>
          </div>

          {/* Features List */}
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 group"
                whileHover={{ scale: 1.02, x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1 group-hover:rotate-6 transition-transform" size={20} />
                <span className="text-gray-800 font-medium leading-relaxed group-hover:text-gray-900">
                  <span className="font-semibold text-gray-900">{feature.split(' ')[0]}</span>{" "}
                  {feature.split(' ').slice(1).join(' ')}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className={`w-full font-bold py-3 rounded-lg transition-all duration-300 ${
              plan.isPopular
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-100 text-indigo-600 hover:bg-gray-200"
            }`}
          >
            Choose Plan
          </button>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


    </div>
  );
};

export default PremiumPage;