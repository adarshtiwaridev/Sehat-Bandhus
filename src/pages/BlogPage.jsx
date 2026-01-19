// src/components/BlogPage.jsx

// Import necessary libraries and icons
import { User, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// --- DUMMY DATA ---
// This array simulates data you would fetch from a backend/CMS.
const articles = [
  {
    image: "https://cdn.pixabay.com/photo/2017/08/06/00/10/doctor-2587698_1280.jpg",
    title: "The Future of Telemedicine: Connecting Doctors and Patients Digitally",
    author: "Dr. Aisha Verma",
    date: "Oct 08, 2025",
    excerpt:
      "Explore how virtual consultations and AI-driven diagnostics are making quality healthcare accessible anytime, anywhere — bridging the gap between patients and doctors.",
  },
  {
    image: "https://cdn.pixabay.com/photo/2016/11/23/15/23/doctor-1850654_1280.jpg",
    title: "AI in Healthcare: How Smart Systems Are Saving Lives",
    author: "Dr. Arjun Mehta",
    date: "Oct 05, 2025",
    excerpt:
      "Artificial Intelligence is transforming healthcare — from predicting diseases to assisting in surgeries — enabling faster, more accurate, and personalized treatments.",
  },
  {
    image: "https://cdn.pixabay.com/photo/2018/03/31/21/16/stethoscope-3272377_1280.jpg",
    title: "Preventive Healthcare: The Key to a Longer, Healthier Life",
    author: "Dr. Priya Nair",
    date: "Sep 28, 2025",
    excerpt:
      "Prevention is better than cure — discover the importance of regular checkups, healthy habits, and early detection in maintaining lifelong wellness.",
  },
  {
    image: "https://cdn.pixabay.com/photo/2020/03/17/14/17/coronavirus-4947617_1280.jpg",
    title: "Mental Health Awareness: Breaking the Stigma in 2025",
    author: "Dr. Sameer Kapoor",
    date: "Sep 21, 2025",
    excerpt:
      "Mental wellness matters as much as physical health. Learn how open conversations, therapy, and digital support are reshaping mental health awareness in India.",
  },
];



// --- MAIN BLOG PAGE COMPONENT ---
const BlogPage = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our Insights & Articles
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Stay updated with the latest trends, tips, and stories from our team of experts.
          </p>
        </motion.div>

        {/* --- Articles Grid --- */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-md overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2"
            >
              <div className="md:flex">
                {/* --- Image Section --- */}
                <div className="md:w-5/12">
                  <a href="#" className="block overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 md:h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </a>
                </div>

                {/* --- Content Section --- */}
                <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between">
                  <div>
                    {/* --- Meta Info (Author & Date) --- */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{article.date}</span>
                      </div>
                    </div>

                    {/* --- Title --- */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-blue-600">
                      <a href="#">{article.title}</a>
                    </h3>

                    {/* --- Excerpt --- */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  
                  {/* --- Read More Link --- */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 group"
                  >
                    Read More
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default BlogPage;