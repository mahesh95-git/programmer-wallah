"use client";
import React, { useEffect, useState } from "react";
import {
  PlayCircle,
  CheckCircle2,
  Calendar,
  Search,
  Clock,
} from "lucide-react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { Progress } from "@/components/ui/progress";
function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, fetchData, error } = useFetch();

  useEffect(() => {
    (async () => {
      try {
        await fetchData({
          url: "/api/my-course",
          method: "get",
        });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    })();
  }, []);

  const courses = data?.courses || [];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 mt-16">
      <div className="bg-gradient-to-r from-[#04121d] to-[#547e93] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
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

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your courses...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-600">
            <p>Failed to load courses. Please try again later.</p>
          </div>
        )}

        {!loading && !error && filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No courses found.</p>
          </div>
        )}

        <div className="grid gap-6">
          {filteredCourses.map((course) => (
            <Link key={course._id} href={`/my-courses/${course._id}`}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                        <h3 className="text-xl font-bold mb-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600">
                          Enrollment Count: {course.enrolledStudentsCount}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Enrolled: {formatDate(course.enrolledAt)}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>
                          {localStorage.getItem(`${course._id}-progress`)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <Progress
                          value={localStorage.getItem(`${course._id}-progress`)}
                          className="h-2"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          <span>
                            {localStorage.getItem(`${course._id}-progress`)}%
                            Complete
                          </span>
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
