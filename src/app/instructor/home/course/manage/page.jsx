"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users } from "lucide-react";
import Link from 'next/link';

// Mock data - replace with actual data from your API
const courses = [
  {
    id: 1,
    title: "Complete JavaScript Course 2024",
    description: "Master modern JavaScript from the basics to advanced topics",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&auto=format&fit=crop&q=60",
    level: "intermediate",
    enrolledCount: 234,
    totalDuration: 1200, // in minutes
    chaptersCount: 12,
    price: 49.99,
    isFree: false,
  },
  {
    id: 2,
    title: "React.js for Beginners",
    description: "Learn React.js from scratch and build modern web applications",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    level: "beginner",
    enrolledCount: 456,
    totalDuration: 960,
    chaptersCount: 10,
    price: 0,
    isFree: true,
  },
  {
    id: 2,
    title: "React.js for Beginners",
    description: "Learn React.js from scratch and build modern web applications",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    level: "beginner",
    enrolledCount: 456,
    totalDuration: 960,
    chaptersCount: 10,
    price: 0,
    isFree: true,
  },
  {
    id: 2,
    title: "React.js for Beginners",
    description: "Learn React.js from scratch and build modern web applications",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    level: "beginner",
    enrolledCount: 456,
    totalDuration: 960,
    chaptersCount: 10,
    price: 0,
    isFree: true,
  },

  {
    id: 2,
    title: "React.js for Beginners",
    description: "Learn React.js from scratch and build modern web applications",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    level: "beginner",
    enrolledCount: 456,
    totalDuration: 960,
    chaptersCount: 10,
    price: 0,
    isFree: true,
  },
  {
    id: 2,
    title: "React.js for Beginners",
    description: "Learn React.js from scratch and build modern web applications",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    level: "beginner",
    enrolledCount: 456,
    totalDuration: 960,
    chaptersCount: 10,
    price: 0,
    isFree: true,
  },
  {
    id: 2,
    title: "React.js for Beginners",
    description: "Learn React.js from scratch and build modern web applications",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    level: "beginner",
    enrolledCount: 456,
    totalDuration: 960,
    chaptersCount: 10,
    price: 0,
    isFree: true,
  },

  {
    id: 2,
    title: "React.js for Beginners",
    description: "Learn React.js from scratch and build modern web applications",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    level: "beginner",
    enrolledCount: 456,
    totalDuration: 960,
    chaptersCount: 10,
    price: 0,
    isFree: true,
  },
];

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export default function ManageCoursesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">Manage and track your created courses</p>
        </div>
        <Link href="/instructor/home/course/new">
          <Button size="lg">
            Create New Course
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <div className="relative h-48 w-full">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              />
              <Badge
                className="absolute top-4 right-4 capitalize"
                variant={course.level === 'beginner' ? 'secondary' :
                  course.level === 'intermediate' ? 'default' :
                    'destructive'}
              >
                {course.level}
              </Badge>
            </div>

            <CardHeader>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(course.totalDuration)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.chaptersCount} chapters</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolledCount} enrolled</span>
                </div>
              </div>
              <div className="mt-4">
                <Badge variant={course.isFree ? "secondary" : "default"}>
                  {course.isFree ? "Free" : `$${course.price}`}
                </Badge>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Link href={`/instructor/home/course/manage/${course.id}`}>
                <Button variant="outline" className="flex bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white">
                  Edit
                </Button></Link>
              <Button variant="outline" className="flex">
                <Link href={`/instructor/home/course/manage/preview/${course.id}`}>preview</Link>
              </Button>
              
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className='mt-8 flex justify-center items-center'><button className='bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white flex justify-center items-center px-4 py-2 rounded-lg'>Prev</button><input type="text" className='text-center w-20 p-2 border-2' value={'01'}/><button className='bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white flex justify-center items-center px-4 py-2 rounded-lg'>Next</button></div>
    </div>
  );
}