'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Star, User, Circle, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import PremiumPage from './PremiumPage';
import BlogPage from './BlogPage';

export default function  Default() {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);
  const [currentSpecialtySlide, setCurrentSpecialtySlide] = useState(0);

  const specialties = [
    { name: 'Cardiology', icon: '/assets/img/specialities/specialities-01.svg' },
    { name: 'Neurology', icon: '/assets/img/specialities/specialities-02.svg' },
    { name: 'Urology', icon: '/assets/img/specialities/specialities-03.svg' },
    { name: 'Orthopedic', icon: '/assets/img/specialities/specialities-04.svg' },
    { name: 'Dentist', icon: '/assets/img/specialities/specialities-05.svg' },
    { name: 'Ophthalmology', icon: '/assets/img/specialities/specialities-06.svg' },
    { name: 'Neurology', icon: '/assets/img/specialities/specialities-02.svg' },
  ];

  const services = [
    { name: 'Book Appointment', icon: '/assets/img/icons/service-01.svg', bgColor: 'from-blue-400 to-blue-600' },
    { name: 'Lab Testing Services', icon: '/assets/img/icons/service-02.svg', bgColor: 'from-green-400 to-green-600' },
    { name: 'Medicines & Supplies', icon: '/assets/img/icons/service-03.svg', bgColor: 'from-cyan-400 to-cyan-600' },
    { name: 'Hospitals / Clinics', icon: '/assets/img/icons/service-04.svg', bgColor: 'from-red-400 to-red-600' },
    { name: 'Health Care Services', icon: '/assets/img/icons/service-05.svg', bgColor: 'from-emerald-400 to-emerald-600' },
    { name: 'Talk to Doctor\'s', icon: '/assets/img/icons/service-06.svg', bgColor: 'from-pink-400 to-pink-600' },
    { name: 'Home Care Services', icon: '/assets/img/icons/service-07.svg', bgColor: 'from-orange-400 to-orange-600' },
  ];

  const doctors = [
    { 
      name: 'Dr. Downer', 
      specialty: 'Orthopedic', 
      price: 200, 
      rating: 4.5, 
      reviews: 35, 
      location: 'Newyork, USA', 
      available: true,
      image: '/assets/img/doctors/doctor-03.jpg'
    },
    { 
      name: 'Dr. John Doe', 
      specialty: 'Dentist', 
      price: 300, 
      rating: 4.3, 
      reviews: 45, 
      location: 'Austin, TX', 
      available: true,
      image: '/assets/img/doctors/doctor-02.jpg'
    },
    { 
      name: 'Dr. Aviles', 
      specialty: 'Neurology', 
      price: 100, 
      rating: 4.0, 
      reviews: 20, 
      location: 'Newyork, USA', 
      available: false,
      image: '/assets/img/doctors/doctor-04.jpg'
    },
    { 
      name: 'Dr. Palmore', 
      specialty: 'Immunologist', 
      price: 250, 
      rating: 4.5, 
      reviews: 35, 
      location: 'Waipahu, HI', 
      available: true,
      image: '/assets/img/doctors/doctor-05.jpg'
    },
    { 
      name: 'Dr. Paul Richard', 
      specialty: 'Dentist', 
      price: 880, 
      rating: 4.4, 
      reviews: 50, 
      location: 'California, USA', 
      available: true,
      image: '/assets/img/doctors/doctor-01.jpg'
    },
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: 99,
      icon: '/assets/img/icons/price-icon1.svg',
      features: ['Profile Creation', 'Appointment Booking', 'Notification Alerts', 'Limited Telemedicine Access'],
      color: 'blue'
    },
    {
      name: 'Pro',
      price: 199,
      icon: '/assets/img/icons/price-icon2.svg',
      features: ['Profile Creation', 'Appointment Booking', 'Notification Alerts', 'Extended Telemedicine Access', 'Exclusive Discounts', 'Appointment History', 'Priority Customer Support'],
      popular: true,
      color: 'purple'
    },
    {
      name: 'Enterprise',
      price: 399,
      icon: '/assets/img/icons/price-icon3.svg',
      features: ['All Basic Plan Features', 'All Premium Plan Features', 'Personalized Health Insights', 'Family Account Management'],
      color: 'green'
    }
  ];

  const workSteps = [
    {
      icon: '/assets/img/icons/work-01.svg',
      title: 'Search Doctor',
      description: 'Search for a doctor based on specialization, location, or availability.'
    },
    {
      icon: '/assets/img/icons/work-02.svg',
      title: 'Check Doctor Profile',
      description: 'Explore detailed doctor profiles on our platform to make informed healthcare decisions.'
    },
    {
      icon: '/assets/img/icons/work-03.svg',
      title: 'Schedule Appointment',
      description: 'After choose your preferred doctor, select a convenient time slot, & confirm your appointment.'
    },
    {
      icon: '/assets/img/icons/work-04.svg',
      title: 'Get Your Solution',
      description: 'Discuss your health concerns with the doctor and receive personalized advice & solution.'
    }
  ];

  const articles = [
    {
      image: '/assets/img/blog/blog-11.jpg',
      author: 'John Doe',
      date: '13 Aug, 2023',
      title: 'Navigating Telehealth: A Guide to Virtual Healthcare Visits',
      excerpt: 'Explore the benefits & challenges of virtual healthcare appointments, along with tips for making good health.'
    },
    {
      image: '/assets/img/blog/blog-24.jpg',
      author: 'Darren Elder',
      date: '10 Sep, 2023',
      title: 'Work-Life Harmony: Balancing Career and Personal Wellness',
      excerpt: 'Uncover strategies to achieve a harmonious balance between professional commitments and personal well-being.'
    },
    {
      image: '/assets/img/blog/blog-25.jpg',
      author: 'Ruby Perrin',
      date: '30 Oct, 2023',
      title: 'Sleep Solutions: Unveiling the Secrets to a Restful Night',
      excerpt: 'Explore importance of quality sleep & learn tips to improve your sleep, ensuring you wake up refreshed & ready to face the day.'
    },
    {
      image: '/assets/img/blog/blog-12.jpg',
      author: 'Sofia Brient',
      date: '08 Nov, 2023',
      title: 'Mental Wellness in a Digital Age: Strategies for a Healthy Mind Online',
      excerpt: 'Delve into the impact of digital life on mental health & discover practical strategies to maintain mental well-being.'
    }
  ];

  const faqs = [
    { 
      question: 'How do I book an appointment with a doctor?', 
      answer: 'Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.' 
    },
    { 
      question: 'Can I request a specific doctor when booking my appointment?', 
      answer: 'Yes, you can usually request a specific doctor when booking your appointment, though availability may vary based on their schedule.' 
    },
    { 
      question: 'What should I do if I need to cancel or reschedule my appointment?', 
      answer: 'If you need to cancel or reschedule your appointment, contact the doctor as soon as possible to inform them and to reschedule for another available time slot.' 
    },
    { 
      question: 'What if I\'m running late for my appointment?', 
      answer: 'If you know you will be late, it\'s courteous to call the doctor\'s office and inform them. Depending on their policy and schedule, they may be able to accommodate you or reschedule your appointment.' 
    },
    { 
      question: 'Can I book appointments for family members or dependents?', 
      answer: 'Yes, in many cases, you can book appointments for family members or dependents. However, you may need to provide their personal information and consent to do so.' 
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      location: 'New York',
      image: '/assets/img/clients/client-01.jpg',
      text: 'Doccure exceeded my expectations in healthcare. The seamless booking process, coupled with the expertise of the doctors, made my experience exceptional. Their commitment to quality care and convenience truly sets them apart. I highly recommend Doccure for anyone seeking reliable and accessible healthcare services.'
    },
    {
      name: 'Andrew Denner',
      location: 'Nevada',
      image: '/assets/img/clients/client-03.jpg',
      text: 'As a busy professional, I don\'t have time to wait on hold or play phone tag to schedule doctor appointments. Thanks to Doccure, booking appointments has never been easier! The user-friendly interface allows me to quickly find available appointment slots that fit my schedule and book them with just a few clicks. It\'s a game-changer for anyone looking to streamline their healthcare management.'
    },
    {
      name: 'Niya Patel',
      location: 'New York',
      image: '/assets/img/clients/client-11.jpg',
      text: 'As a parent, coordinating doctor appointments for my family can be overwhelming. Doccure has simplified the process and made scheduling appointments a breeze! I love being able to see all available appointment times in one place and book appointments for multiple family members with ease. Plus, the automatic reminders ensure we never miss an appointment. I highly recommend Doccure to other busy parents!'
    }
  ];

  const partners = [
    '/assets/img/partners/partners-1.svg',
    '/assets/img/partners/partners-2.svg',
    '/assets/img/partners/partners-3.svg',
    '/assets/img/partners/partners-4.svg',
    '/assets/img/partners/partners-5.svg',
    '/assets/img/partners/partners-6.svg',
  ];

  const nextDoctor = () => {
    setCurrentDoctorSlide((prev) => (prev + 1) % Math.ceil(doctors.length / 4));
  };

  const prevDoctor = () => {
    setCurrentDoctorSlide((prev) => (prev - 1 + Math.ceil(doctors.length / 4)) % Math.ceil(doctors.length / 4));
  };

  const nextSpecialty = () => {
    setCurrentSpecialtySlide((prev) => (prev + 1) % Math.ceil(specialties.length / 6));
  };

  const prevSpecialty = () => {
    setCurrentSpecialtySlide((prev) => (prev - 1 + Math.ceil(specialties.length / 6)) % Math.ceil(specialties.length / 6));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Consult <span className="text-blue-600">Best Doctors</span> Your Nearby Location.
                </h1>
                <div className="flex items-center gap-2">
                  <img src="/assets/img/icons/header-icon.svg" className="w-8 h-8" alt="header-icon" />
                </div>
                <p className="text-lg lg:text-xl text-gray-600">
                  Embark on your healing journey with Doccure
                </p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Start a Consult
                </button>
                <div className="pt-4">
                  <img src="/assets/img/down-arrow-img.png" className="w-12 animate-bounce" alt="down-arrow" />
                </div>
              </div>

              {/* Search Box */}
              <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 md:border-r border-gray-200 md:pr-4">
                    <Search className="text-gray-400 flex-shrink-0" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search doctors, clinics, hospitals, etc" 
                      className="outline-none w-full text-sm md:text-base"
                    />
                  </div>
                  <div className="flex items-center gap-3 md:border-r border-gray-200 md:pr-4 relative">
                    <MapPin className="text-gray-400 flex-shrink-0" size={20} />
                    <input 
                      type="text" 
                      placeholder="Location" 
                      className="outline-none w-full text-sm md:text-base"
                    />
                    <button className="text-blue-600 hover:text-blue-700">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-3 md:border-r border-gray-200 md:pr-4">
                    <Calendar className="text-gray-400 flex-shrink-0" size={20} />
                    <input 
                      type="text" 
                      placeholder="Date" 
                      className="outline-none w-full text-sm md:text-base"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/assets/img/banner-img.png" 
                  alt="patient" 
                  className="w-full rounded-2xl"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute top-10 -left-4 animate-float">
                <img src="/assets/img/banner/banner-img1.svg" className="w-24 md:w-32" alt="checkup" />
              </div>
              <div className="absolute top-1/2 -right-4 animate-float-delayed">
                <img src="/assets/img/banner/banner-img2.svg" className="w-24 md:w-32" alt="doctor-slide" />
              </div>
              <div className="absolute bottom-10 left-10 animate-float">
                <img src="/assets/img/banner/banner-img3.svg" className="w-24 md:w-32" alt="doctors-list" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
            {services.map((service, idx) => (
              <a 
                key={idx} 
                href="javascript:void(0);" 
                className={`bg-gradient-to-br ${service.bgColor} text-white p-6 rounded-xl text-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group`}
              >
                <div className="mb-3 flex justify-center">
                  <img src={service.icon} alt={service.name} className="w-12 h-12 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-sm font-semibold leading-tight">{service.name}</h4>
              </a>
            ))}
          </div>

          {/* Specialties Section */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Specialities</h2>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={prevSpecialty}
                  className="p-2 border-2 border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-600 transition-all"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button 
                  onClick={nextSpecialty}
                  className="p-2 border-2 border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-600 transition-all"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {specialties.map((specialty, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group"
                >
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={specialty.icon} 
                      alt={specialty.name} 
                      className="w-16 h-16 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <p className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    {specialty.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <a 
                href="search" 
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                See All Specialities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Best Doctors Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Best Doctors</h2>
          </div>
          
          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {doctors.map((doctor, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <a href="doctor-profile.html">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </a>
                    <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full font-bold text-blue-600 shadow-lg">
                      ${doctor.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <a href="doctor-profile.html" className="hover:text-blue-600 transition-colors">
                          <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                        </a>
                        <p className="text-gray-600 text-sm mt-1">{doctor.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="fill-yellow-400 text-yellow-400" size={14} />
                        <span className="font-semibold text-gray-900">{doctor.rating}</span>
                        <span className="text-gray-500">({doctor.reviews})</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" /> 
                        {doctor.location}
                      </p>
                      <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium ${doctor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        <Circle className="fill-current" size={6} />
                        {doctor.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}

      {/* How it Works Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative">
              <img 
                src="/assets/img/work-img.png" 
                alt="doctor" 
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <div>
                <h5 className="text-blue-600 font-semibold text-lg mb-2">How it Works</h5>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  4 easy steps to get your solution
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {workSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <img src={step.icon} alt={step.title} className="w-8 h-8" />
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2 text-lg">{step.title}</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 lg:py-20 bg-white">
        {/* <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Latest Articles</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row gap-6 p-6">
                  <div className="sm:w-1/3 flex-shrink-0">
                    <a href="blog-details.html">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </a>
                  </div>
                  <div className="sm:w-2/3">
                    <ul className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <li className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        {article.author}
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        {article.date}
                      </li>
                    </ul>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      <a href="blog-details.html">{article.title}</a>
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <a 
                      href="blog-details.html" 
                      className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <BlogPage />
      </section>

      {/* App Download Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              {/* Left Content */}
              <div className="p-8 lg:p-12 text-white space-y-6">
                <div>
                  <h5 className="text-xl font-semibold mb-2 opacity-90">
                    Working for Your Better Health.
                  </h5>
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    Download the Doccure App today!
                  </h2>
                </div>

                <div className="space-y-4">
                  <p className="text-lg opacity-90">Scan the QR code to get the app now</p>
                  <div className="bg-white p-4 rounded-2xl w-fit">
                    <img src="/assets/img/scan-img.png" alt="QR Code" className="w-32 h-32" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="javascript:void(0);" className="hover:scale-105 transition-transform">
                    <img 
                      src="/assets/img/icons/google-play-icon.svg" 
                      alt="Google Play" 
                      className="h-12"
                    />
                  </a>
                  <a href="javascript:void(0);" className="hover:scale-105 transition-transform">
                    <img 
                      src="/assets/img/icons/app-store-icon.svg" 
                      alt="App Store" 
                      className="h-12"
                    />
                  </a>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex justify-center lg:justify-end">
                <img 
                  src="/assets/img/mobile-img.png" 
                  alt="Mobile App" 
                  className="w-64 lg:w-80 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-4 mb-12">
            <h5 className="text-blue-600 font-semibold text-lg text-center">Get Your Answer</h5>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Image */}
            <div className="relative">
              <img 
                src="/assets/img/faq-img.png" 
                alt="FAQ" 
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4 animate-float">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <img src="/assets/img/icons/smiling-icon.svg" alt="Happy" className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-gray-900">
                    <span className="count-digit">95</span>k+
                  </h4>
                  <p className="text-gray-600">Happy Patients</p>
                </div>
              </div>
            </div>

            {/* Right FAQ List */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === idx ? -1 : idx)}
                    className="w-full text-left p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex justify-between items-center gap-4"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className={`transform transition-transform flex-shrink-0 text-blue-600 ${activeAccordion === idx ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${activeAccordion === idx ? 'max-h-96' : 'max-h-0'}`}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Image */}
                <div className="relative h-64 md:h-auto">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                </div>

                {/* Right Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-blue-600 font-semibold mb-2">Testimonials</h5>
                      <h2 className="text-3xl font-bold text-gray-900">What Our Client Says</h2>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-600 leading-relaxed italic">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      <div>
                        <h6 className="font-bold text-gray-900 text-lg">
                          {testimonials[currentTestimonial].name}
                        </h6>
                        <p className="text-gray-500">{testimonials[currentTestimonial].location}</p>
                      </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex gap-2 pt-4">
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentTestimonial(idx)}
                          className={`h-2 rounded-full transition-all ${
                            currentTestimonial === idx ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Partners</h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-12 items-center">
              {[...partners, ...partners].map((partner, idx) => (
                <a 
                  key={idx} 
                  href="javascript:void(0);"
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img 
                    src={partner} 
                    alt="Partner" 
                    className="h-12 w-auto object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}