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
    const { id } = await params;
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
    }).select("chapters enrolledStudents reviews");
    if (!course) {
      return NextResponse.json(
        { message: "Course not found", success: false },
        { status: 404 }
      );
    }

    const chapters = course.chapters.map((element) => {
        return {
          title: element.title,
          duration: element.lessons.reduce((prev, item) => prev + (item.duration || 0), 0), // Fix: Added default value (0)
          lessons: element.lessons.length,
        };
      });
      
    return NextResponse.json({
      message: "Course fetched successfully",
      data: chapters,
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
