import { NextResponse } from "next/server";
import User from "@/models/user.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    await dpConnect();

    let user = await User.findOne({ userId }).select("_id role isApprovedInstructor");
console.log(user)
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

    const instructors = await User.find({ 
      role: "instructor",
    }).select("_id firstName lastName email profile userId contactNumber createdCourses createdAt");

    const formattedInstructors = instructors.map(instructor => ({
      _id: instructor._id,
      firstName: instructor.firstName,
      lastName: instructor.lastName,
      email: instructor.email,
      profile: instructor.profile,
      userId: instructor.userId,
      contactNumber: instructor.contactNumber,
      totalCreatedCourses: instructor.createdCourses?.length || 0,
      createdAt: instructor.createdAt
    }));

    return NextResponse.json(
      {
        message: "Instructors fetched successfully",
        success: true,
        totalInstructors: instructors.length,
        instructors: formattedInstructors,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return NextResponse.json(
      {
        message: "Error fetching instructors",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}