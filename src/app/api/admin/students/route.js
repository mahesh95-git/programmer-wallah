import { NextResponse } from "next/server";
import User from "@/models/user.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
// get all student
export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    await dpConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const courseCategory = searchParams.get("category");

    const user = await User.findOne({ userId }).select(
      "_id role isApprovedInstructor"
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized request", success: false },
        { status: 403 }
      );
    }

    let filter = { role: "student" };
    if (query) {
      filter._id = query;
    }

    let studentsQuery = User.find(filter)
      .select(
        "_id name email firstName lastName profile userId contactNumber enrolledCourses createdAt"
      )


    let students = await studentsQuery.exec();

    if (courseCategory) {
      students = students.filter((student) =>
        student.enrolledCourses.some(
          (course) => course.courseId?.category.trim() === courseCategory
        )
      );
    }

    return NextResponse.json(
      {
        message: "Students fetched successfully",
        success: true,
        totalStudents: students.length,
        students,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      {
        message: "Error fetching students",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
// remove student
export async function DELETE(req, { params }) {
  const { userId } = getAuth(req);
  const studentId = await params;
  await dpConnect();
  let user = await User.findOne({ userId }).select(
    "_id role isApprovedInstructor"
  );

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
}
