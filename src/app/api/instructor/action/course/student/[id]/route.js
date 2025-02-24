import { NextResponse } from "next/server";
import User from "@/models/user.model";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { isInstructor } from "@/lib/checkInstructor";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid course ID", success: false },
        { status: 400 }
      );
    }

    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    // Connect to database
    await dpConnect();

    const user = await User.findOne({ userId }).select(
      "_id role isApprovedInstructor"
    );
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    try {
      isInstructor(user);
    } catch (error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 403 }
      );
    }

    const course = await Course.findOne({
      instructor: user._id,
      _id: id,
    }).populate("enrolledStudents.student");

    if (!course) {
      return NextResponse.json(
        { message: "Course not found", success: false },
        { status: 404 }
      );
    }
    const reviews = course.enrolledStudents.map((item) => {
      return {
        enrolledAt: item.enrolledAt,
        progress: item.progress,
        user: {
          id: item.student._id,
          fullName: item.student.firstName + " " + item.student.lastName,
          profile: item.student.profile,
          email:item.student.email
        },
      };
    });

    // Return success response
    return NextResponse.json({
      message: "Course fetched successfully",
      data: reviews,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
