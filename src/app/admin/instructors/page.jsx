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
import { Download, Search, Trash2 } from "lucide-react";
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
import InstructorPDF from "@/components/shared/instructorPDF";

function InstructorList() {
  const [instructorList, setInstructorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const { fetchData, data, loading, error } = useFetch();

  useEffect(() => {
    (async () => {
      try {
        await fetchData({
          url: "/api/admin/instructors",
          method: "GET",
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (data?.instructors) {
      setInstructorList(data.instructors);
      setFilteredInstructors(data.instructors);
    }
  }, [data]);

  useEffect(() => {
    const filtered = instructorList.filter((instructor) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        instructor.userId?.toLowerCase().includes(searchLower) ||
        instructor.email?.toLowerCase().includes(searchLower) ||
        instructor.contactNumber?.includes(searchTerm)
      );
    });
    setFilteredInstructors(filtered);
  }, [searchTerm, instructorList]);

  const handleDelete = async (instructorId) => {
    setInstructorList(instructorList.filter((instructor) => instructor._id !== instructorId));
  };

  const getFullName = (instructor) => {
    return `${instructor.firstName} ${instructor.lastName}`.trim();
  };

  const getInitials = (instructor) => {
    return `${instructor.firstName?.[0] || ''}${instructor.lastName?.[0] || ''}`.toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Instructor List</h1>
        <div className="flex gap-4">
          <PDFDownloadLink
            document={<InstructorPDF instructors={filteredInstructors} />}
            fileName={`instructor-list-${new Date().toISOString().split('T')[0]}.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading}>
                <Download className="h-4 w-4 mr-2" />
                {loading ? 'Preparing PDF...' : 'Export PDF'}
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
            placeholder="Search by User ID, Email or Contact Number..."
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
              <TableHead>Instructor</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead className="text-center">Created Courses</TableHead>
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
                <TableCell colSpan={6} className="text-center py-10 text-red-500">
                  Error loading instructors
                </TableCell>
              </TableRow>
            ) : filteredInstructors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  {searchTerm ? 'No matching instructors found' : 'No instructors found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredInstructors.map((instructor) => (
                <TableRow key={instructor._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {instructor.profile ? (
                          <AvatarImage src={instructor.profile} alt={getFullName(instructor)} />
                        ) : null}
                        <AvatarFallback>{getInitials(instructor)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{getFullName(instructor)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{instructor.email}</span>
                      <span className="text-sm text-gray-500">
                        {instructor.contactNumber || 'No contact number'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{instructor._id}</TableCell>
                  <TableCell className="text-center">
                    {instructor.totalCreatedCourses}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(instructor.createdAt)}
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
                          <AlertDialogTitle>Delete Instructor</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this instructor? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(instructor._id)}
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

export default InstructorList;