// File: pages/doctor/Reviews.jsx

import React, { useState, useEffect, useMemo } from 'react';

// --- SELF-CONTAINED MOCK COMPONENTS (to replace imports) ---

// Card Component
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow ${className}`}>
        {children}
    </div>
);

// Doctor Profile Sidebar Component
const DoctorProfileSidebar = ({ profile, activeItem, onLogout }) => (
    <Card className="profile-sidebar p-4">
        <div className="widget-profile pro-widget-content">
            <div className="flex items-center space-x-4">
                <a href={profile.profileUrl} className="block w-16 h-16 rounded-full overflow-hidden mr-3">
                    <img src={profile.imageUrl} alt="User" width={64} height={64} />
                </a>
                <div className="profile-det-info">
                    <h3 className="text-lg font-semibold text-gray-900">
                        <a href={profile.profileUrl} className="hover:text-blue-600">{profile.name}</a>
                    </h3>
                    <p className="text-sm text-gray-600">{profile.specialty}</p>
                </div>
            </div>
        </div>
        <nav className="dashboard-menu mt-6">
            <ul className="space-y-2">
                {['Appointments', 'My Patients', 'Reviews', 'Dashboard'].map(item => (
                    <li key={item}>
                        <a href="#" className={`flex items-center p-2 rounded-md text-gray-700 ${activeItem === item ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
                           {item}
                        </a>
                    </li>
                ))}
                <li>
                    <button onClick={onLogout} className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    </Card>
);


// --- MOCK DATA ---
const doctorProfile = { name: "Dr. Jane Doe", imageUrl: "/assets/doctor-image.jpg", profileUrl: "/doctor/profile", qualification: "MBBS, MD", experience: "12 Years", specialty: "Pediatrics" };
const mockReviews = [
    { id: 1, imgUrl: "https://placehold.co/48x48/E2E8F0/4A5568?text=AB", Ptname: "Alice B.", RatingCreatedDate: "2025-09-01", Rating: 5, Comment: "The doctor was extremely attentive and provided excellent diagnosis. Highly recommend!", CommentId: 101 },
    { id: 2, imgUrl: "https://placehold.co/48x48/E2E8F0/4A5568?text=BC", Ptname: "Bob C.", RatingCreatedDate: "2025-08-25", Rating: 4, Comment: "Good experience overall. Wait time was a bit long.", CommentId: 102 },
    { id: 3, imgUrl: "https://placehold.co/48x48/E2E8F0/4A5568?text=CD", Ptname: "Charlie D.", RatingCreatedDate: "2025-08-10", Rating: 5, Comment: "Perfect service. Quick and professional.", CommentId: 103 },
    { id: 4, imgUrl: "https://placehold.co/48x48/E2E8F0/4A5568?text=DE", Ptname: "Daisy E.", RatingCreatedDate: "2025-07-20", Rating: 3, Comment: "Diagnosis was fine, but staff seemed rushed.", CommentId: 104 },
];

// --- Reusable Components ---

// Component for rendering star rating
const StarRatingDisplay = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        const isFilled = i <= rating;
        stars.push(
            <i key={i} className={`fas fa-star text-sm ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}></i>
        );
    }
    return <div className="flex space-x-0.5">{stars}</div>;
};

// Component for a single review item
const ReviewItem = ({ review }) => {
    return (
        <li className="searchname border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <div className="comments">
                <div className="flex justify-between items-start">
                    
                    {/* Patient Info */}
                    <div className="flex items-center space-x-3">
                        <a href="#" className="block w-12 h-12 rounded-full overflow-hidden shrink-0">
                            <img src={review.imgUrl} alt="User" width={48} height={48} />
                        </a>
                        <div className="patient-info">
                            <h6 className="text-lg font-semibold searchable hover:text-blue-600">
                                <a href="#">{review.Ptname}</a>
                            </h6>
                            <span className="text-sm text-gray-500 searchable">
                                {new Date(review.RatingCreatedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' })}
                            </span>
                        </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center">
                        <StarRatingDisplay rating={review.Rating} />
                    </div>
                </div>
                
                {/* Comment Content */}
                <div className="review-info mt-3 pl-14">
                    <p className="text-gray-700 searchable">
                        {review.Comment}
                    </p>
                </div>
            </div>
        </li>
    );
};

// --- Main Page Component ---
export default function ReviewsPage() {
    const [allReviews, setAllReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Data Fetching
    useEffect(() => {
        setAllReviews(mockReviews);
    }, []);

    // Client-Side Search
    const filteredReviews = useMemo(() => {
        if (!searchTerm) return allReviews;
        const lowerCaseSearch = searchTerm.toLowerCase();

        return allReviews.filter(review => 
            review.Ptname.toLowerCase().includes(lowerCaseSearch) ||
            review.Comment.toLowerCase().includes(lowerCaseSearch) ||
            review.RatingCreatedDate.includes(lowerCaseSearch)
        );
    }, [allReviews, searchTerm]);

    const handleLogout = () => {
        window.location.href = '/authpage';
    };
    
    // Overall Rating Calculation
    const overallRating = allReviews.length > 0 
        ? (allReviews.reduce((sum, r) => sum + r.Rating, 0) / allReviews.length).toFixed(1)
        : '0.0';


    return (
        <>
            {/* Breadcrumb Section */}
            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">Reviews</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="flex justify-center text-sm space-x-2">
                            <li><a href="/Default" className="text-blue-600 hover:underline">Home</a></li>
                            <li className="text-gray-500" aria-current="page">Reviews</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <div className="content py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        
                        {/* Profile Sidebar (Left Column) */}
                        <div className="w-full lg:w-1/3 xl:w-1/4 px-4 mb-6 lg:mb-0">
                            <DoctorProfileSidebar profile={doctorProfile} activeItem="Reviews" onLogout={handleLogout} />
                        </div>

                        {/* Main Content (Right Column) */}
                        <div className="w-full lg:w-2/3 xl:w-3/4 px-4">
                            
                            <Card className="doc-review glass-card p-6">

                                <div className="dashboard-header mb-6">
                                    <div className="flex items-center space-x-4">
                                        <h3 className="text-2xl font-semibold">Reviews</h3>
                                    </div>
                                </div>
                                    
                                {/* Review Listing */}
                                <ul className="comments-list space-y-6">
                                    
                                    {/* Overall Review/Search Bar */}
                                    <li className="over-all-review border-b pb-4 mb-4">
                                        <div className="flex justify-between items-center flex-wrap gap-4">
                                            
                                            {/* Overall Rating Block */}
                                            <div className="review-rate flex items-center space-x-4">
                                                <h5 className="text-lg font-medium text-gray-700">Overall Rating:</h5>
                                                <div className="star-rated flex items-center">
                                                    <span className="mr-1 text-xl font-bold text-gray-900">{overallRating}</span>
                                                    <StarRatingDisplay rating={Math.round(parseFloat(overallRating))} />
                                                </div>
                                            </div>
                                            
                                            {/* Search Bar */}
                                            <div className="relative w-full md:w-64">
                                                <input 
                                                    type="text" 
                                                    className="form-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                                    placeholder="Search reviews..." 
                                                    id="searchInput"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    {/* Review Repeater Content */}
                                    {filteredReviews.length > 0 ? (
                                        filteredReviews.map(review => (
                                            <ReviewItem key={review.id} review={review} />
                                        ))
                                    ) : (
                                        <li className="text-center py-10 text-gray-500">
                                            No reviews match your search criteria.
                                        </li>
                                    )}

                                </ul>
                                
                                {/* Pagination (Simulated) */}
                                <div className="flex justify-center mt-8">
                                    <ul className="flex space-x-1 pagination dashboard-pagination">
                                        <li><a href="#" className="page-link text-gray-500 hover:text-blue-600 p-2 rounded-md"><i className="fa-solid fa-chevron-left"></i></a></li>
                                        <li><a href="#" className="page-link text-blue-600 bg-blue-50 p-2 rounded-md font-medium">1</a></li>
                                        <li><a href="#" className="page-link text-gray-700 hover:bg-gray-100 p-2 rounded-md">2</a></li>
                                        <li><a href="#" className="page-link text-gray-700 hover:bg-gray-100 p-2 rounded-md">3</a></li>
                                        <li><a href="#" className="page-link text-gray-700 hover:bg-gray-100 p-2 rounded-md">...</a></li>
                                        <li><a href="#" className="page-link text-gray-500 hover:text-blue-600 p-2 rounded-md"><i className="fa-solid fa-chevron-right"></i></a></li>
                                    </ul>
                                </div>
                                {/* /Pagination */}
                                
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
        </>
    );
}
