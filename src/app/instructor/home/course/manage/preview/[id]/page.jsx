"use client";

import React, { use, useEffect, useState } from "react";
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
import {
  BookOpen,
  BookOpenText,
  Clock,
  Star,
  Trash2,
  User,
  UserX,
} from "lucide-react";
import useFetch from "@/hooks/useFetch";

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  return `${hours}h ${remainingMinutes}m`;
}

export default function PreviewPage({ params }) {
  const [courseData, setCourseData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [students, setStudents] = useState([]);

  const { fetchData: fetchCourse, data: courseResponseData } = useFetch();
  const { fetchData: fetchReviews, data: reviewsData } = useFetch();
  const { fetchData: fetchChapters, data: chaptersData } = useFetch();
  const { fetchData: fetchStudents, data: studentsData } = useFetch();

  useEffect(() => {
    const fetchAllData = async () => {
      const id = (await params).id;

      fetchCourse({
        url: `/api/instructor/action/course/${id}`,
        method: "GET",
      });

      fetchReviews({
        url: `/api/instructor/action/course/review/${id}`,
        method: "GET",
      });

      fetchChapters({
        url: `/api/instructor/action/course/chapter/${id}`,
        method: "GET",
      });

      fetchStudents({
        url: `/api/instructor/action/course/student/${id}`,
        method: "GET",
      });
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (courseResponseData) setCourseData(courseResponseData.data);
    if (reviewsData) setReviews(reviewsData.data);
    if (chaptersData) setChapters(chaptersData.data);
    if (studentsData) setStudents(studentsData.data);
  }, [courseResponseData, reviewsData, chaptersData, studentsData]);

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const handleBanStudent = (studentId) => {
    setStudents(students.filter((student) => student.id !== studentId));
    setReviews(reviews.filter((review) => review.studentId !== studentId));
  };
  console.log(reviews);
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
            <h1 className="text-4xl font-bold text-white text-center">
              {courseData.title}
            </h1>
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
            <span>{courseData.chapterCount} chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{courseData.enrollmentCount} students</span>
          </div>
          <Badge variant={courseData.isFree ? "secondary" : "default"}>
            {courseData.isFree ? "Free" : `$${courseData.price}`}
          </Badge>
          <Badge variant="secondary">{courseData.status}</Badge>
        </div>
        <div className="w-1/3 mt-3 text-gray-600 text-sm">
          {courseData.description}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="chapters" className="space-y-4 -mt-5">
        <TabsList>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="students">Enrolled Students</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Chapters Tab */}
        <TabsContent value="chapters">
          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <Card key={chapter.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-1">
                    <span className="text-lg font-semibold">
                      Chapter {index + 1}: {chapter.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="text-gray-600 mr-2">
                    <Clock className="mr-2" />
                    {Math.floor(chapter.duration / 60)}h{" "}
                    {Math.floor(chapter.duration % 60)}min
                  </Badge>
                  <Badge variant="outline" className="text-gray-600  mr-2">
                    <BookOpenText className="mr-2" />
                    {chapter.lessons < 10
                      ? "0" + chapter.lessons
                      : chapter.lessons}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students">
          <div className="space-y-4">
            {students.map((student) => (
              <Card key={student.enrolledAt}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={student.user.profile} />
                      <AvatarFallback>
                        {student.user.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{student.user.fullName}</h3>
                      <p className="text-sm text-gray-600">
                        {student.user.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        Joined: {student.enrolledAt}
                      </p>
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
                          Are you sure you want to ban this student? They will
                          lose access to the course and their reviews will be
                          removed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleBanStudent(student.id)}
                        >
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
              <Card key={review?.id}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.user.profile} />
                        <AvatarFallback>
                          {review.user.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {review.user.fullName}
                          </h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                        <p className="mt-2">{review.review}</p>
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
                            Are you sure you want to delete this review? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteReview(review.id)}
                          >
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
