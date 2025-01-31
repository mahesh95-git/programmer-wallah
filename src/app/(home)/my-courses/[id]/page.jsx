"use client"
import React,{useState} from 'react'
import { PlayCircle, CheckCircle2, Calendar, Search, Clock, ChevronLeft, BookOpen, Lock } from 'lucide-react';
function page() {
    const [selectedCourse, setSelectedCourse] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState(0);
   
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
        lessons: [
          {
            id: 1,
            title: "Introduction to Web Development",
            duration: "15:30",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: 2,
            title: "HTML Fundamentals",
            duration: "25:45",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: 3,
            title: "CSS Basics",
            duration: "30:20",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: 4,
            title: "JavaScript Essentials",
            duration: "45:15",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ]
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
        lessons: []
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
        lessons: []
      }
    ];
    const course = enrolledCourses.find(c => c.id === selectedCourse)||enrolledCourses[0];
  return  (
    <div className="min-h-screen w-full mt-16 bg-gray-50">
      <div className="bg-gradient-to-r from-[#04121d] to-[#547e93] text-white">
        <div className="max-w-6xl mx-auto px-2 py-8">
        
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-2">Instructor: {course.instructor}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={course.lessons[selectedLesson - 1].videoUrl}
                    className="w-full h-[400px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {course.lessons[selectedLesson - 1].title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.lessons[selectedLesson - 1].duration}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600">
                  Select a lesson to start learning
                </h2>
              </div>
            )}
          </div>

          {/* Lesson List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Course Content</h3>
            <div className="space-y-4">
              {course.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson.id)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedLesson === lesson.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{lesson.title}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                    {lesson.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 ml-4" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400 ml-4" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Course Progress</span>
                <span>{course.progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-[#547e93] rounded-full h-2"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page