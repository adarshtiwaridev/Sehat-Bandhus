import { useState } from 'react';
import { MapPin, Star, Phone } from 'lucide-react';

export default function About() {
  const [activeAccordion, setActiveAccordion] = useState('collapseOne');

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  const doctors = [
    { name: 'Dr. Ruby Perrin', specialty: 'Cardiology', rating: 4.5, reviews: 35, location: 'Newyork, USA', price: 200, image: 'doctor-03.jpg' },
    { name: 'Dr. Darren Elder', specialty: 'Neurology', rating: 4.0, reviews: 20, location: 'Florida, USA', price: 360, image: 'doctor-04.jpg' },
    { name: 'Dr. Sofia Brient', specialty: 'Urology', rating: 4.5, reviews: 30, location: 'Georgia, USA', price: 450, image: 'doctor-05.jpg' },
    { name: 'Dr. Paul Richard', specialty: 'Orthopedic', rating: 4.3, reviews: 45, location: 'Michigan, USA', price: 570, image: 'doctor-02.jpg' }
  ];

  const testimonials = [
    { name: 'John Doe', location: 'New York', image: 'client-01.jpg' },
    { name: 'Amanda Warren', location: 'Florida', image: 'client-02.jpg' },
    { name: 'Betty Carlson', location: 'Georgia', image: 'client-03.jpg' },
    { name: 'Veronica', location: 'California', image: 'client-04.jpg' },
    { name: 'Richard', location: 'Michigan', image: 'client-05.jpg' }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <nav className="flex justify-center items-center space-x-2 text-sm">
              <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">About Us</span>
            </nav>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden">
                    <img src="/assets/img/about-img1.jpg" className="w-full h-48 object-cover" alt="about" />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img src="/assets/img/about-img2.jpg" className="w-full h-48 object-cover" alt="about" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-blue-600 text-white p-6 rounded-lg">
                    <h4 className="text-xl font-semibold">Over 25+ Years Experience</h4>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img src="/assets/img/about-img3.jpg" className="w-full h-64 object-cover" alt="about" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h6 className="text-blue-600 font-semibold mb-2">About Our Company</h6>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">We Are Always Ensure Best Medical Treatment For Your Health</h2>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-gray-600 mb-6">
                Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque eaque ipsa quae architecto beatae vitae dicta sunt explicabo.
              </p>
              <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-lg">
                <div className="bg-blue-600 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Need Emergency?</p>
                  <h4 className="text-xl font-bold text-gray-800">+1 315 369 5943</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                <div className="mb-4">
                  <img src={`/assets/img/icons/choose-0${item}.svg`} alt="icon" className="w-16 h-16" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Qualified Staff of Doctors</h4>
                <p className="text-gray-600">Lorem ipsum sit amet consectetur incididunt ut labore et exercitation ullamco laboris nisi dolore magna enim veniam aliqua.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-end relative z-10">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">Be on Your Way to Feeling Better with the Doccure</h2>
                <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <a href="/contact" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Contact With Us
                </a>
              </div>
              <div className="flex justify-end">
                <img src="/assets/img/way-img.png" className="max-w-sm" alt="doctor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Doctors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Best Doctors</h2>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {doctors.map((doctor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="relative">
                  <img src={`/assets/img/doctors/${doctor.image}`} className="w-full h-64 object-cover" alt={doctor.name} />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    $ {doctor.price}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">{doctor.name}</h4>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-gray-500 ml-1">({doctor.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{doctor.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <img src={`/assets/img/clients/${testimonials[currentTestimonial].image}`} className="w-48 h-48 rounded-full object-cover mx-auto shadow-2xl" alt="client" />
              </div>
              <div className="md:w-2/3">
                <h6 className="text-blue-300 font-semibold mb-2">Testimonials</h6>
                <h2 className="text-3xl font-bold mb-6">What Our Client Says</h2>
                <p className="text-blue-100 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h6 className="text-xl">
                  <span className="font-bold">{testimonials[currentTestimonial].name}</span> {testimonials[currentTestimonial].location}
                </h6>
                <div className="flex gap-2 mt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition ${currentTestimonial === index ? 'bg-white' : 'bg-blue-600'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-blue-600 font-semibold mb-2">Get Your Answer</h6>
            <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img src="/assets/img/faq-img.png" className="w-full" alt="faq" />
              <div className="absolute bottom-8 left-8 bg-white rounded-lg shadow-xl p-4 flex items-center gap-4">
                <div className="bg-yellow-400 p-3 rounded-full">
                  <span className="text-2xl">😊</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">95k+</h4>
                  <p className="text-gray-600">Happy Patients</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {['One', 'Two', 'Three', 'Four', 'Five'].map((num, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(`collapse${num}`)}
                    className="w-full text-left px-6 py-4 font-semibold text-gray-800 hover:bg-gray-50 flex justify-between items-center"
                  >
                    <span>Can i make an Appointment Online with White Plains Hospital Kendi?</span>
                    <span className="text-2xl">{activeAccordion === `collapse${num}` ? '−' : '+'}</span>
                  </button>
                  {activeAccordion === `collapse${num}` && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}