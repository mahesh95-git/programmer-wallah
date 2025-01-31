"use client";
import React, { useState } from 'react';
import { PlayCircle, CheckCircle2, Calendar, Search, Clock } from 'lucide-react';
import Link from 'next/link';

function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced Web Development Masterclass",
      instructor: "John Anderson",
      progress: 65,
      lastAccessed: "2024-03-10",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      totalHours: 40,
      completedHours: 26,
    },
    {
      id: 2,
      title: "React Native Mobile Development",
      instructor: "Sarah Wilson",
      progress: 30,
      lastAccessed: "2024-03-12",
      thumbnail: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      totalHours: 35,
      completedHours: 10.5,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Michael Lee",
      progress: 90,
      lastAccessed: "2024-03-15",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      totalHours: 28,
      completedHours: 25.2,
    }
  ];

  const filteredCourses = enrolledCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 mt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#04121d] to-[#547e93] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            />
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="grid gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/my-courses/${course.id}`}>
              <div  className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
                    <PlayCircle className="w-6 h-6 text-blue-600" />
                  </button>
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-600">Instructor: {course.instructor}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#547e93] rounded-full h-2"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{course.completedHours}/{course.totalHours} hours</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        <span>{Math.round((course.completedHours / course.totalHours) * 100)}% Complete</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;