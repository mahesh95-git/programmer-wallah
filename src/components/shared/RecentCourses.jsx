import Link from 'next/link'
import React from 'react'

const courses = [
  {
    name: "JavaScript for Beginners",
    image: "/noise.webp",
    price: "$29.99",
    date: "January 15, 2025",
    strength: 150,
  },
  {
    name: "Advanced React",
    image: "/noise.webp",
    price: "$49.99",
    date: "December 25, 2024",
    strength: 200,
  },
  {
    name: "Python for Data Science",
    image: "/noise.webp",
    price: "$39.99",
    date: "November 10, 2024",
    strength: 180,
  },
  {
    name: "Python for Data Science",
    image: "/noise.webp",
    price: "$39.99",
    date: "November 10, 2024",
    strength: 180,
  },
  {
    name: "Python for Data Science",
    image: "/noise.webp",
    price: "$39.99",
    date: "November 10, 2024",
    strength: 180,
  },
  {
    name: "Python for Data Science",
    image: "/noise.webp",
    price: "$39.99",
    date: "November 10, 2024",
    strength: 180,
  }
]

function RecentCourses() {
  return (
    <div className="w-full ">
     
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-1"
          >
            <div className="flex items-center space-x-4">
              <img
                src={course.image}
                alt={course.name}
                className="w-16 h-16 object-cover rounded-full "
              />
              <div className="flex-1 flex justify-between items-center">
                <div>
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <p className="text-gray-500 text-sm">{course.date}</p>
                </div>
               
                <p className="mt-2 text-md font-semibold">{course.price}</p>
              </div>
            </div>

            {/* Course Strength (number of students) */}
            <div className="mt-2 flex items-center">
              <span className="text-gray-700 text-sm">Enrolled:</span>
              <span className="ml-2 font-semibold">{course.strength}</span>
            </div>

            {/* Strength Line */}
            <div className="mt-2 w-full bg-gray-200 h-1 rounded-full">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${(course.strength / 500) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}

        {/* <p  className='text-center mt-2'>
        <Link href={"/instructor/home/course/manage"} className='underline underline-offset-1'>More courses </Link>
          </p> */}
    </div>
  )
}

export default RecentCourses
