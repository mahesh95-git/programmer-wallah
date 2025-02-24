"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { BookOpen, Radio, Users } from "lucide-react";
import useFetch from '@/hooks/useFetch';

// Mock data - replace with actual data from your API
const courses = [
  {
    id: 1,
    title: "Complete JavaScript Course 2024",
    description: "Master modern JavaScript from the basics to advanced topics",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&auto=format&fit=crop&q=60",
    enrolledCount: 234,
    chaptersCount: 12,
  },
  {
    id: 2,
    title: "React.js for Beginners",
    description: "Learn React.js from scratch and build modern web applications",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    enrolledCount: 456,
    chaptersCount: 10,
  },
];

export default function LiveSessionsPage() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isLive, setIsLive] = useState(false);
const {data:courseData,loading:courseLoading,error:courseError,fetchData:fetchCourse}=useFetch()
useEffect(()=>{
  (async()=>{
   try {
    fetchCourse({
      url: `/api/instructor/action/course`,
      method: "GET",
    })
    
   } catch (error) {
    console.log(error.message)
   }
  })();
},[])


console.log()

  const handleGoLive = () => {
    setIsLive(true);
    // Implement your live streaming logic here
  };

  const handleEndStream = () => {
    setIsLive(false);
    // Implement your end stream logic here
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Live Sessions</h1>
          <p className="text-gray-600 mt-2">Start a live session for your course</p>
        </div>

        {!isLive ? (
          <Card>
            <CardHeader>
              <CardTitle>Start New Live Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Course</label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCourse && (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border">
                    {courses.map((course) => course.id.toString() === selectedCourse && (
                      <div key={course.id}>
                        <div className="relative h-48">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <h2 className="text-2xl font-bold text-white text-center">{course.title}</h2>
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <p className="text-gray-600 mb-4">{course.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{course.enrolledCount} enrolled</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.chaptersCount} chapters</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full h-12" disabled={!selectedCourse}>
                        <Radio className="w-4 h-4 mr-2 animate-pulse" />
                        Go Live
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Start Live Session</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you ready to start a live session for this course? Students will be notified
                          that you're going live.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleGoLive}>
                          Start Live Session
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live Session in Progress</span>
                <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {courses.map((course) => course.id.toString() === selectedCourse && (
                <div key={course.id} className="space-y-4">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <Radio className="w-12 h-12 animate-pulse mb-4" />
                      <p className="text-lg">Live Stream Preview</p>
                      <p className="text-sm text-gray-400">Your camera feed will appear here</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-600">
                        {course.enrolledCount} students enrolled
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleEndStream}>
                      End Stream
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}