"use client";

import React from 'react';
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
import { Trash2, Star } from "lucide-react";
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

// Sample data - replace with actual data fetching
const instructors = [
  {
    id: 1,
    name: "Dr. Robert Smith",
    email: "robert.smith@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    activeCourses: 5,
    rating: 4.8,
    students: 1250,
  },
  {
    id: 2,
    name: "Prof. Lisa Chen",
    email: "lisa.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    activeCourses: 3,
    rating: 4.9,
    students: 890,
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    email: "james.w@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    activeCourses: 4,
    rating: 4.7,
    students: 1520,
  },
];

function InstructorList() {
  const [instructorList, setInstructorList] = React.useState(instructors);

  const handleDelete = (instructorId) => {
    setInstructorList(instructorList.filter(instructor => instructor.id !== instructorId));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Instructor List</h1>
        <div className="flex gap-4">
          <Button variant="outline">Export</Button>
          <Button>Add Instructor</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Instructor</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Active Courses</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-center">Total Students</TableHead>
              <TableHead className="text-center">Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructorList.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={instructor.avatar} alt={instructor.name} />
                      <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{instructor.name}</span>
                  </div>
                </TableCell>
                <TableCell>{instructor.email}</TableCell>
                <TableCell className="text-center">{instructor.activeCourses}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{instructor.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{instructor.students.toLocaleString()}</TableCell>
                <TableCell className="text-center">{Date.now()}</TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Instructor</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this instructor? This action cannot be undone and will affect all associated courses and students.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDelete(instructor.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="space-x-4">
        <Button disabled={0 === 1}>
          Prev
        </Button>
        <span>
          Page {0} of {0}
        </span>
        <Button disabled={0 === 0}>
          Next
        </Button>
        </div>
      </div>
    </div>
  );
}

export default InstructorList;