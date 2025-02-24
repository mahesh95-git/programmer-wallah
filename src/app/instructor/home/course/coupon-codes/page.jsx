"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, Edit, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useFetch from "@/hooks/useFetch";

function CouponManagement() {
  const { toast } = useToast();
  const [courses, setCourses] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);

  const {
    fetchData: fetchCourses,
    data: coursesData,
    loading: coursesLoading,
    error: courseError,
  } = useFetch();

  const {
    fetchData: fetchCoupons,
    data: couponsData,
    loading: couponsLoading,
    error: couponsError,
  } = useFetch();

  const {
    fetchData: createCoupon,
    loading: createCouponLoading,
    error: createCouponError,
    data: newCouponData,
  } = useFetch();

  const {
    fetchData: deleteCoupon,
    loading: deleteCouponLoading,
    error: deleteCouponError,
    data: deleteCouponData,
  } = useFetch();

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    expiry: "",
    course: "",
  });

  // Fetch courses and coupons on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchCourses({
          url: `/api/instructor/action/course`,
          method: "GET",
        });

        await fetchCoupons({
          url: `/api/instructor/action/course/coupon`,
          method: "GET",
        });
      } catch (error) {
        toast({
          title: "Failed to fetch initial data",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (coursesData?.data?.courses) {
      setCourses(coursesData.data.courses);
    }
  }, [coursesData]);

  useEffect(() => {
    if (deleteCouponData) {
      toast({
        title: "Coupon is successfully deleted",
      });
      
      const updateCoupons=coupons.filter((prev)=>prev._id != deleteCouponData.data);
      setCoupons(updateCoupons)
    }
  }, [deleteCouponData]);
  useEffect(() => {
    if (couponsData?.data) {
      setCoupons(couponsData.data);
    }
  }, [couponsData]);

  useEffect(() => {
    if (newCouponData) {
      
      setCoupons([...coupons, newCouponData.data]);
    }
  }, [newCouponData]);
  const handleAddCoupon = async () => {
    if (
      !newCoupon.code ||
      !newCoupon.discount ||
      !newCoupon.expiry ||
      !newCoupon.course
    ) {
      toast({
        title: "Missing required fields",
        description: "Please fill out all fields before creating a coupon",
        variant: "destructive",
      });
      return;
    }

    try {
      await createCoupon({
        url: `/api/instructor/action/course/coupon`,
        method: "POST",
        body: JSON.stringify(newCoupon),
      });

      toast({
        title: "Coupon created successfully",
      });

      // Reset form
      setNewCoupon({ code: "", discount: "", expiry: "", course: "" });
      setDiscountedPrice(0);
      setCourseId("");
    } catch (error) {
      toast({
        title: "Failed to create coupon",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCourseSelect = (courseId) => {
    setCourseId(courseId);
    const selectedCourse = courses.find((course) => course.id === courseId);

    if (selectedCourse) {
      const discount = parseFloat(newCoupon.discount) || 0;
      const dis = selectedCourse.price * (discount / 100);
      setDiscountedPrice(selectedCourse.price - Math.floor(dis));
      setNewCoupon({ ...newCoupon, course: courseId });
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await deleteCoupon({
        url: `/api/instructor/action/course/coupon?id=${id}`,
        method: "DELETE",
      });
    } catch (error) {
      toast({
        title: "Failed to delete coupon",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      {courseError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Failed to load courses: {courseError}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
        <div className="grid grid-cols-5 gap-4 mb-4">
          <Input
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, code: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Discount %"
            value={newCoupon.discount}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (parseFloat(value) >= 0 && parseFloat(value) <= 100)
              ) {
                setNewCoupon({ ...newCoupon, discount: value });
              }
            }}
          />
          <Input
            type="date"
            placeholder="Expiry Date"
            value={newCoupon.expiry}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, expiry: e.target.value })
            }
          />
          <Select value={courseId} onValueChange={handleCourseSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(
                (course) =>
                  !course.isFree && (
                    <SelectItem key={course.id} value={course.id}>
                      <div className="flex gap-2 items-center">
                        {course.title}
                        <span className="flex items-center">
                          <IndianRupee width={18} />
                          {course.price}
                        </span>
                      </div>
                    </SelectItem>
                  )
              )}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Discounted Price"
            value={discountedPrice}
            disabled
          />
        </div>
        <Button
          onClick={handleAddCoupon}
          disabled={
            createCouponLoading ||
            !newCoupon.code ||
            !newCoupon.discount ||
            !newCoupon.expiry ||
            !newCoupon.course
          }
        >
          {createCouponLoading ? "Creating..." : "Add Coupon"}
        </Button>
      </div>

      <div className="p-2">
        <h2 className="text-xl font-semibold mb-4">Existing Coupons</h2>
        {couponsError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Failed to load coupons: {couponsError}
          </div>
        )}

        {couponsLoading ? (
          <div className="text-center py-4">Loading coupons...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Discounted Price</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons&&coupons.map((coupon) => (
                <TableRow key={coupon._id}>
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>{coupon.courseName}</TableCell>
                  <TableCell>{coupon.discount}%</TableCell>
                  <TableCell>₹{coupon.discountedPrice}</TableCell>
                  <TableCell>
                    {new Date(coupon.expiry).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCoupon(coupon._id)}
                        disabled={deleteCouponLoading}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default CouponManagement;
