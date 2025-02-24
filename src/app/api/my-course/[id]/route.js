import { NextResponse } from "next/server";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/user.model";

export async function GET(req, { params }) {
  try {
    await dpConnect();
    const { userId } = await getAuth(req);
    const { id } = params;

    // Fetch the user and populate the enrolled courses
    const user = await User.findOne({ userId })
      .populate("enrolledCourses.courseId", "title thumbnail chapters _id")
      .select("enrolledCourses firstName lastName");

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Find the specific enrolled course
    const enrolledCourse = user.enrolledCourses.find(
      (item) => item.courseId._id.toString() === id
    );

    if (!enrolledCourse) {
      return NextResponse.json(
        { message: "Course not found", success: false },
        { status: 404 }
      );
    }

    // Construct the response data
    const courseData = {
      _id: id,
      title: enrolledCourse.courseId.title,
      chapters: enrolledCourse.courseId.chapters,
      progress: enrolledCourse.progress,
      studentName: `${user.firstName} ${user.lastName}`,
    };

    return NextResponse.json(
      {
        message: "Course fetched successfully",
        success: true,
        data: courseData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      {
        message: "Error fetching course",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
