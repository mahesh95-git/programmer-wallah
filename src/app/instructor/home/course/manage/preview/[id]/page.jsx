"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BookOpen, Clock, Star, Trash2, User, UserX } from "lucide-react";

// Mock data - replace with actual data from your API
const courseData = {
  id: 1,
  title: "Complete JavaScript Course 2024",
  description: "Master modern JavaScript from the basics to advanced topics with practical projects and real-world applications.",
  thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&auto=format&fit=crop&q=60",
  level: "intermediate",
  enrolledCount: 234,
  totalDuration: 1200,
  price: 49.99,
  isFree: false,
  chapters: [
    {
      id: 1,
      title: "Introduction to JavaScript",
      description: "Learn the basics of JavaScript programming",
      duration: 45,
      videoUrl: "https://example.com/video1",
    },
    {
      id: 2,
      title: "Variables and Data Types",
      description: "Understanding JavaScript variables and data types",
      duration: 60,
      videoUrl: "https://example.com/video2",
    },
    {
        id: 1,
        title: "condition statement",
        description: "Learn the basics of condition statement",
        duration: 45,
        videoUrl: "https://example.com/video1",
      },
      {
        id: 2,
        title: "loops",
        description: "Understanding JavaScript loops",
        duration: 60,
        videoUrl: "https://example.com/video2",
      },
  ],
  enrolledStudents: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinedDate: "2024-01-15",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=60",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinedDate: "2024-02-01",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&q=60",
    },
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        joinedDate: "2024-01-15",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=60",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        joinedDate: "2024-02-01",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&q=60",
      },
  ],
  reviews: [
    {
      id: 1,
      studentId: 1,
      studentName: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=60",
      rating: 5,
      comment: "Excellent course! Very well explained and practical.",
      date: "2024-02-10",
    },
    {
      id: 2,
      studentId: 2,
      studentName: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&q=60",
      rating: 4,
      comment: "Great content but could use more exercises.",
      date: "2024-02-15",
    },
    {
        id: 1,
        studentId: 1,
        studentName: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=60",
        rating: 5,
        comment: "Excellent course! Very well explained and practical.",
        date: "2024-02-10",
      },
      {
        id: 2,
        studentId: 2,
        studentName: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&q=60",
        rating: 4,
        comment: "Great content but could use more exercises.",
        date: "2024-02-15",
      },
  ],
};

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export default function PreviewPage() {
  const [reviews, setReviews] = useState(courseData.reviews);
  const [enrolledStudents, setEnrolledStudents] = useState(courseData.enrolledStudents);

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  const handleBanStudent = (studentId) => {
    setEnrolledStudents(enrolledStudents.filter(student => student.id !== studentId));
    setReviews(reviews.filter(review => review.studentId !== studentId));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Course Header */}
      <div className="mb-8">
        <div className="relative h-[22rem] rounded-xl overflow-hidden mb-6">
          <img
            src={courseData.thumbnail}
            alt={courseData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center">{courseData.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <Badge variant="secondary" className="text-base">
            {courseData.level}
          </Badge>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(courseData.totalDuration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{courseData.chapters.length} chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{courseData.chapters.length} students</span>
          </div>
          <Badge variant={courseData.isFree ? "secondary" : "default"}>
            {courseData.isFree ? "Free" : `$${courseData.price}`}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="chapters" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="students">Enrolled Students</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Chapters Tab */}
        <TabsContent value="chapters">
          <div className="space-y-4">
            {courseData.chapters.map((chapter, index) => (
              <Card key={chapter.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                      Chapter {index + 1}: {chapter.title}
                    </span>
                    <Badge variant="outline">{chapter.duration}min</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{chapter.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students">
          <div className="space-y-4">
            {enrolledStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <p className="text-sm text-gray-500">Joined: {student.joinedDate}</p>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <UserX className="w-4 h-4 mr-2" />
                        Ban Student
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ban Student</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to ban this student? They will lose access to the course
                          and their reviews will be removed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleBanStudent(student.id)}>
                          Ban Student
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{review.studentName}</h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Review</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this review? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteReview(review.id)}>
                            Delete Review
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}