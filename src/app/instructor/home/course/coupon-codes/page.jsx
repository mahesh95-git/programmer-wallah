"use client"
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash, Edit } from "lucide-react";

function CouponManagement() {
  const [coupons, setCoupons] = useState([
    { id: 1, code: "SAVE20", discount: "20%", expiry: "2025-12-31" },
    { id: 2, code: "WELCOME10", discount: "10%", expiry: "2025-11-30" },
  ]);

  const [newCoupon, setNewCoupon] = useState({ code: "", discount: "", expiry: "", course: "" });
  const [courses] = useState([
    { id: 1, name: "React Basics", price: 100 },
    { id: 2, name: "Advanced Node.js", price: 150 },
    { id: 3, name: "Fullstack Development", price: 200 },
  ]);

  const handleAddCoupon = () => {
    if (newCoupon.code && newCoupon.discount && newCoupon.expiry && newCoupon.course) {
      setCoupons((prev) => [
        ...prev,
        { id: prev.length + 1, ...newCoupon },
      ]);
      setNewCoupon({ code: "", discount: "", expiry: "", course: "" });
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleCourseSelect = (courseId) => {
    const selectedCourse = courses.find((course) => course.id === parseInt(courseId));
    if (selectedCourse) {
      setNewCoupon({
        ...newCoupon,
        course: selectedCourse.name,
        discount: `${(selectedCourse.price * 0.2).toFixed(2)} (${selectedCourse.price - selectedCourse.price * 0.2} after discount)`
      });
    }
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Coupon Code Management</h1>
      <div className="mb-6">
       
          <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
          <div className="grid grid-cols-5 gap-4 mb-4">
            <Input
              placeholder="Coupon Code"
              value={newCoupon.code}
              onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
            />
            

            <Input
              placeholder="Discount"
              value={newCoupon.discount}
            />
            <Input
              type="date"
              placeholder="Expiry Date"
              value={newCoupon.expiry}
              onChange={(e) => setNewCoupon({ ...newCoupon, expiry: e.target.value })}
            />
            <Select onValueChange={(courseId) => handleCourseSelect(courseId)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id} onClick={() => handleCourseSelect(course.id)}>
                    {course.name}
                  </SelectItem>

                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="price"
              value={newCoupon.expiry}
        disabled
            />
          </div>
          <Button onClick={handleAddCoupon}>Add Coupon</Button>
      </div>

      <div className="p-2">
          <h2 className="text-xl font-semibold mb-4 ">Existing Coupons</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>{coupon.id}</TableCell>
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>{coupon.course}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>{coupon.expiry}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCoupon(coupon.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
    </div>
  );
}

export default CouponManagement; 