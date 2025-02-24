import { NextResponse } from "next/server";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/user.model";
export async function GET(req) {
  try {
    await dpConnect();
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const mycourses = await User.findOne({ userId: userId })
      .populate("enrolledCourses.courseId", "title thumbnail enrolledStudents")
      .select("enrolledCourses");

    const formattedCourses = mycourses?.enrolledCourses.map((course) => ({
      _id: course.courseId._id,
      title: course.courseId.title,
      thumbnail: course.courseId.thumbnail,
      enrolledStudentsCount: course.courseId.enrolledStudents.length, 
    })) || [];

    return NextResponse.json(
      {
        message: "Courses fetched successfully",
        success: true,
        courses: formattedCourses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
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
