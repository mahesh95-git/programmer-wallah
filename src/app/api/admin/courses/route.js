import { NextResponse } from "next/server";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/user.model";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    await dpConnect();

    let user = await User.findOne({ userId }).select("_id role");

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Unauthorized request",
          success: false,
        },
        { status: 403 }
      );
    }

    const courses = await Course.find()
      .select("title instructor price ratings enrolledStudents createdAt thumbnail isFree")
      .populate("instructor", "firstName lastName _id ")
      .lean();

    const formattedCourses = courses.map(course => ({
      _id: course._id,
      title: course.title,
      instructor: {
        _id: course.instructor._id,
        name: `${course.instructor.firstName} ${course.instructor.lastName}`.trim()
      },
      isFree:course.isFree,
      price: course.price,
      thumbnail: course.thumbnail,
      rating: course.ratings.average,
      totalReviews: course.ratings.count,
      enrolledStudents: course.enrolledStudents?.length || 0,
      createdAt: course.createdAt
    }));

    return NextResponse.json(
      {
        message: "Courses fetched successfully",
        success: true,
        totalCourses: courses.length,
        courses: formattedCourses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      {
        message: "Error fetching courses",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}