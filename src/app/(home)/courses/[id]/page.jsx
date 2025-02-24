"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Clock,
  Globe,
  Star,
  Award,
  PlayCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";

function Page({ params }) {
  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  }
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [coupon, setCoupon] = useState("");
  const { data, loading, fetchData } = useFetch();
  const {
    data: reviews,
    loading: reviewLoading,
    fetchData: fetchReview,
  } = useFetch();

  const {
    data: couponData,
    loading: couponLoading,
    fetchData: validateCouponCode,
  } = useFetch();

  useEffect(() => {
    if (data) {
      setPrice(formatPrice(data?.course.price));
    }
    if (couponData) {
      setPrice(formatPrice(couponData.data?.discountedPrice));
      setDiscount(couponData.data?.discount);
    }
  }, [data, couponData]);

  const { id } = React.use(params);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        await fetchData({
          url: `/api/courses/${id}`,
          method: "GET",
        });
        await fetchReview({
          url: `/api/courses/review?id=${id}`,
          method: "GET",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };


  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const handleCoupon = async () => {
    try {
      await validateCouponCode({
        url: "/api/courses/coupon",
        method: "put",
        body: JSON.stringify({
          couponCode: coupon,
          courseId: id,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(reviews)

  return (
    <div className="min-h-screen w-full bg-gray-50 mt-[4.5rem] ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1b1b1c] to-[#1f5570] text-white py-20 rounded-lg ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{data?.course.title}</h1>
              <p className="text-lg mb-6 line-clamp-5">
                {data?.course.description}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1">
                    {data?.course.ratings} ({data?.course.totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5" />
                  <span className="ml-1">{data?.course.language}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5" />
                  <span className="ml-1">
                    {formatDuration(data?.course.totalDuration)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src={data?.course.instructor.profile}
                    alt={data?.course.instructor.name}
                  />
                  <AvatarFallback className="bg-black">
                    {getInitials(data?.course.instructor.name || " ")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {data?.course.instructor.name || " "}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full">
              {data?.course.thumbnail && (
                <Image
                  src={data?.course.thumbnail}
                  alt="Course Preview"
                  className="rounded-lg shadow-xl w-full h-[90%]"
                  width={500}
                  height={300}
                />
              )}
              <div className="absolute -inset-4 flex items-center justify-center">
                <button className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
                  <PlayCircle className="w-8 h-8 text-[#2b313f]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="md:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-4 justify-center">
                {data?.course.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
              <div className="space-y-4">
                {data?.course.chapters.map((section, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{section.title}</h3>
                        <p className="text-sm text-gray-600">
                          {section.totallessons} lessons •{" "}
                          {formatDuration(section.duration)}
                        </p>
                      </div>
                      <BookOpen className="w-5 h-5 text-[#2b313f]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Student Reviews</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          data?.course.rating >= star ? "text-yellow-400" : ""
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <span className="font-medium">
                    {data?.course.rating} out of 5
                  </span>
                </div>
              </div>

              {reviewLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                </div>
              ) : (
                <div className="grid gap-8">
                  {reviews?.data &&
                    reviews?.data.map((review, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-6 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={review.user.profile} alt={"profile"} />
                              <AvatarFallback>
                            {review.user.firstName[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{review.user.firstName+" "+review.user.lastName}</h3>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-4 h-4 ${
                                        star <= review.rating
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                      fill="currentColor"
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  • {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{review.review}</p>
                      </div>
                    ))}
                </div>
              )}
            </section>
          </div>

          {/* Pricing Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold">{price}</span>
                  {discount > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(data?.course.price)}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <p className="text-sm text-green-600 mb-4">
                    {discount}% discount
                  </p>
                )}
                <Link
                  href={`/payment?id=${id}&amount=${data?.course.price}${
                    coupon && "&couponCode=" + coupon
                  }`}
                >
                  <button className="w-full bg-[#2b313f] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#242935] transition-colors">
                    Enroll Now
                  </button>
                </Link>
                <div className="space-y-2 mt-2">
                  <p>Coupon Code</p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Enter coupon code"
                      className="h-12"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button
                      disabled={couponLoading}
                      className="bg-[#2b313f] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2b313f] transition-colors"
                      onClick={handleCoupon}
                    >
                      {couponLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-[#2b313f] mr-3" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-[#2b313f] mr-3" />
                  <span>Lifetime access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;