import Image from "next/image";
import React from "react";

function CourseCard({ course }) {
  return (
    <div className="flex mt-2 items-start border rounded-lg p-4 min-w-full max-w-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 justify-between">
      {/* Image Section */}
      <div className="w-1/2">
      <Image 
          src={course.thumbnail} 
          alt={course.title} 
          width={200} 
          height={1} 
          className="w-full h-50 rounded-md object-cover" 
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 ml-4">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{course.title}</h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{course.description}</p>
        <p className="text-sm text-gray-500 mt-2">Instructor: {course.instructor.name}</p>
        
        {/* Rating Section */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-sm font-bold">{course.rating.toFixed(1)}</span>
          <div className="ml-1 flex">
            {Array.from({ length: 5 }, (_, index) => (
              <svg 
                key={index} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className={`w-4 h-4 ${index < Math.round(course.rating) ? "text-yellow-500" : "text-gray-300"}`} 
                fill="currentColor"
              >
                <path d="M12 2l2.39 6.95h7.3l-5.93 4.35L17.7 20.3 12 16.55 6.3 20.3l1.93-6.95L2.3 8.95h7.3L12 2z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">({course.totalReviews} reviews)</span>
        </div>

        {/* Course Info */}
        <p className="text-sm text-gray-500 mt-2">
          {course.language} • {course.enrolledStudents} students
        </p>
       

        {/* Price */}
        <p className="text-lg font-bold text-gray-800 mt-2">
          {course.isFree ? "Free" : `₹${course.price}`}
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
