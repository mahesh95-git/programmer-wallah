import Image from "next/image";
import React from "react";

function CourseCard() {
  return (
    <div className="flex items-start border-b-2 rounded-lg p-4  min-w-full  max-w-xl bg-white mb-2">
      {/* Image Section */}
      <div className="w-1/3">
        <Image src={"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"} alt="Course Image" width={100} height={150} className="w-full h-52 rounded-sm object-cover" />
      </div>

      {/* Details Section */}
      <div className="flex-1 ml-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Building a Complete Udemy Clone - Unofficial
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          This course will teach you how to build a Udemy Clone (learning
          management system - Unofficial) step by step.
        </p>
        <p className="text-sm text-gray-500 mt-2">Larry Beltran</p>

        {/* Rating and Info */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-lg font-bold">5.0</span>
          <div className="ml-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-500"
            >
              <path d="M12 2l2.39 6.95h7.3l-5.93 4.35L17.7 20.3 12 16.55 6.3 20.3l1.93-6.95L2.3 8.95h7.3L12 2z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-500"
            >
              <path d="M12 2l2.39 6.95h7.3l-5.93 4.35L17.7 20.3 12 16.55 6.3 20.3l1.93-6.95L2.3 8.95h7.3L12 2z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-500"
            >
              <path d="M12 2l2.39 6.95h7.3l-5.93 4.35L17.7 20.3 12 16.55 6.3 20.3l1.93-6.95L2.3 8.95h7.3L12 2z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-500"
            >
              <path d="M12 2l2.39 6.95h7.3l-5.93 4.35L17.7 20.3 12 16.55 6.3 20.3l1.93-6.95L2.3 8.95h7.3L12 2z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-500"
            >
              <path d="M12 2l2.39 6.95h7.3l-5.93 4.35L17.7 20.3 12 16.55 6.3 20.3l1.93-6.95L2.3 8.95h7.3L12 2z" />
            </svg>
          </div>
          <span className="ml-2 text-sm text-gray-500">(8)</span>
        </div>

        {/* Course Info */}
        <p className="text-sm text-gray-500 mt-2">
          37 total mins • 14 lectures • All Levels
        </p>

        {/* Price */}
        <p className="text-xl font-bold text-gray-800 mt-2">₹2,499</p>
      </div>
    </div>
  );
}

export default CourseCard;
