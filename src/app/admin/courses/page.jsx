"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Star, Users, Download } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CoursePDF from "@/components/shared/coursePDF";

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    (async () => {
      try {
        await fetchData({
          url: "/api/admin/courses",
          method: "GET",
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (data?.courses) {
      setCourseList(data.courses);
      setFilteredCourses(data.courses);
    }
  }, [data]);

  useEffect(() => {
    const filtered = courseList.filter((course) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        course.title?.toLowerCase().includes(searchLower) ||
        course.instructor.name?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredCourses(filtered);
  }, [searchTerm, courseList]);

  const handleDelete = async (courseId) => {
    setCourseList(courseList.filter((course) => course._id !== courseId));
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course List</h1>
        <div className="flex gap-4">
          <PDFDownloadLink
            document={<CoursePDF courses={filteredCourses} />}
            fileName={`course-list-${
              new Date().toISOString().split("T")[0]
            }.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading}>
                <Download className="h-4 w-4 mr-2" />
                {loading ? "Preparing PDF..." : "Export PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by course title or instructor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full max-w-sm"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-center">Students</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-red-500"
                >
                  Error loading courses
                </TableCell>
              </TableRow>
            ) : filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  {searchTerm
                    ? "No matching courses found"
                    : "No courses found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-10 w-16 object-cover rounded"
                      />
                      <span className="font-medium">{course.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {course.instructor.name}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating.toFixed(1)}</span>
                      <span className="text-gray-400 text-sm">
                        ({course.totalReviews})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{course.enrolledStudents}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {course.isFree ? "Free" : formatPrice(course.price)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(course.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Course</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this course? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(course._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CourseList;
