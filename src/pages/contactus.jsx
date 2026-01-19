 import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Users, Award, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [focusedInput, setFocusedInput] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      detail: '8432 Mante Highway, Aminaport, USA',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      detail: '+1 315 369 5943',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Mail,
      title: 'Email Address',
      detail: 'contact@clinic.com',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { icon: Users, value: '25K+', label: 'Happy Patients' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Clock, value: '24/7', label: 'Support Available' },
    { icon: MessageCircle, value: '99%', label: 'Response Rate' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Breadcrumb */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h2>
            <nav className="flex justify-center items-center space-x-2 text-sm">
              <a href="/" className="text-blue-100 hover:text-white transition">Home</a>
              <span className="text-blue-200">/</span>
              <span className="text-white font-semibold">Contact Us</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-8 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl mb-3">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h6 className="text-blue-600 font-semibold mb-2 text-sm uppercase tracking-wide">Get in Touch</h6>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Have Any Question?</h2>
                <p className="text-gray-600 mb-8">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
              </div>

              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${info.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative flex items-start space-x-4">
                    <div className={`bg-gradient-to-br ${info.gradient} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h4>
                      <p className="text-gray-600 break-words text-sm md:text-base">{info.detail}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Proof */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm">+500 more</span>
                </div>
                <p className="text-sm opacity-90">Join thousands of satisfied patients who trust our healthcare services.</p>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 opacity-5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Send Us a Message</h3>
                    <p className="text-gray-600 text-sm md:text-base">Fill out the form below and we'll get back to you as soon as possible.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedInput('name')}
                          onBlur={() => setFocusedInput('')}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                            focusedInput === 'name' ? 'border-blue-500 bg-white shadow-lg' : 'border-transparent'
                          }`}
                          placeholder="Enter Your Name"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedInput('email')}
                          onBlur={() => setFocusedInput('')}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                            focusedInput === 'email' ? 'border-blue-500 bg-white shadow-lg' : 'border-transparent'
                          }`}
                          placeholder="Enter Email Address"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedInput('phone')}
                          onBlur={() => setFocusedInput('')}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                            focusedInput === 'phone' ? 'border-blue-500 bg-white shadow-lg' : 'border-transparent'
                          }`}
                          placeholder="Enter Phone Number"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Services</label>
                        <input
                          type="text"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          onFocus={() => setFocusedInput('service')}
                          onBlur={() => setFocusedInput('')}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                            focusedInput === 'service' ? 'border-blue-500 bg-white shadow-lg' : 'border-transparent'
                          }`}
                          placeholder="Select or Enter Service"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedInput('message')}
                        onBlur={() => setFocusedInput('')}
                        rows="5"
                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-none ${
                          focusedInput === 'message' ? 'border-blue-500 bg-white shadow-lg' : 'border-transparent'
                        }`}
                        placeholder="Enter your message here..."
                      ></textarea>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative flex items-center justify-center space-x-2">
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-[400px] md:h-[500px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.7301009561315!2d-76.13077892422932!3d36.82498697224007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89bae976cfe9f8af%3A0xa61eac05156fbdb9!2sBeachStreet%20USA!5e0!3m2!1sen!2sin!4v1669777904208!5m2!1sen!2sin"
                className="w-full h-full"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-6 left-6 bg-white px-4 md:px-6 py-3 rounded-full shadow-lg">
                <p className="text-xs md:text-sm font-semibold text-gray-800">📍 Find Us Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}