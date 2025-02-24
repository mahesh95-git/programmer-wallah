import { NextResponse } from "next/server";
import User from "@/models/user.model";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { isInstructor } from "@/lib/checkInstructor";

// get course detail
export async function GET(req, { params }) {
  try {
    const { id } =await params;
    const { userId } = await getAuth(req);
    await dpConnect();

    let user = await User.findOne({ userId }).select(
      "_id role isApprovedInstructor"
    );

    // check user is instructor
    isInstructor(user);

    let course = await Course.findOne({
      instructor: new mongoose.Types.ObjectId(user._id),
      _id: new mongoose.Types.ObjectId(id),
    }).select(
      "_id title description thumbnail level status chapters enrolledStudents totalDuration enrollmentCount price isFree chapterCount"
    );
    if (!course) {
      return NextResponse.json(
        { message: "Course not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Course fetched successfully",
      data: course,
      success: true,
    });
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

// published course
export async function PUT(req, { params }) {
  try {
    const { id } =await params;
    const { userId } = await getAuth(req);
    await dpConnect();

    let user = await User.findOne({ userId }).select(
      "_id role isApprovedInstructor"
    );

    // check user is instructor
    isInstructor(user);

    let course = await Course.findOne({
      instructor: new mongoose.Types.ObjectId(user._id),
      _id: new mongoose.Types.ObjectId(id),
    }).select("status");

    course.status = "published";
    await course.save();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "course is successfully published",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "internal server error",
      success: false,
    });
  }
}
