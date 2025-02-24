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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Download, Search, Trash2 } from "lucide-react";
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
import StudentPDF from "@/components/shared/studentPDF";

function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);
  const { fetchData, data, loading, error } = useFetch();
  const courseCategories = [
    { value: "webdevelopment", label: "Web Development" },
    { value: "backenddevelopment", label: "Backend Development" },
    { value: "databasemanagement", label: "Database Management" },
    { value: "programminglanguages", label: "Programming Languages" },
    { value: "computerarchitecture", label: "Computer Architecture" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "artificialintelligence", label: "Artificial Intelligence" },
    { value: "devops", label: "DevOps" },
    { value: "mobiledevelopment", label: "Mobile Development" },
    { value: "computernetworks", label: "Computer Networks" },
    { value: "cloudcomputing", label: "Cloud Computing" },
  ];
  useEffect(() => {
    (async () => {
      try {
        let url = "/api/admin/students";

        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append("query", searchTerm);
        if (selectedCategory) queryParams.append("category", selectedCategory);

        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }

        await fetchData({
          url,
          method: "GET",
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    if (data?.students) {
      setStudentList(data.students || []);
    }
  }, [data]);

  const handleDelete = async (studentId) => {
    setStudentList(studentList.filter((student) => student._id !== studentId));
  };
  const getFullName = (student) => {
    return `${student.firstName} ${student.lastName}`.trim();
  };
  const getInitials = (student) => {
    return `${student.firstName?.[0] || ""}${
      student.lastName?.[0] || ""
    }`.toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
    setOpen(false);
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student List</h1>
        <div className="flex gap-4">
          {studentList.length > 0 && (
            <PDFDownloadLink
              document={<StudentPDF students={studentList} />}
              fileName={`student-list-${
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
          )}
        </div>
      </div>

      <div className="relative mb-6 flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by User ID "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="relative w-64">
          <button
            onClick={() => setOpen(!open)}
            className="w-full px-4 py-2 text-left bg-white border rounded-md flex items-center justify-between hover:bg-gray-50"
          >
            <span>
              {selectedCategory
                ? courseCategories?.find((c) => c.value === selectedCategory)
                    ?.label
                : "Filter by Category"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCategorySelect("")}
              >
                All Categorys
              </div>
              {courseCategories?.map((category) => (
                <div
                  key={category.value}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategorySelect(category.value)}
                >
                  {category.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead className="text-center">Enrolled Courses</TableHead>
              <TableHead className="text-center">Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-red-500"
                >
                  Error loading students
                </TableCell>
              </TableRow>
            ) : studentList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  {searchTerm || selectedCategory
                    ? "No matching students found"
                    : "No students found"}
                </TableCell>
              </TableRow>
            ) : (
              studentList.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {student.profile ? (
                          <AvatarImage
                            src={student.profile}
                            alt={getFullName(student)}
                          />
                        ) : null}
                        <AvatarFallback>{getInitials(student)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {getFullName(student)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {student._id}
                  </TableCell>
                  <TableCell className="text-center">
                    {student.enrolledCourses?.length || 0}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(
                      student._id
                        ? new Date(
                            parseInt(student._id.substring(0, 8), 16) * 1000
                          )
                        : null
                    )}
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
                          <AlertDialogTitle>Delete Student</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this student? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(student._id)}
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

export default StudentList;
