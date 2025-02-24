import { NextResponse } from "next/server";
import Course from "@/models/course.model";
import Review from "@/models/review.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id");
    const { userId } = await getAuth(req);
    if (!userId) {
        return NextResponse.json(
          { message: "Unauthorized", success: false },
          { status: 401 }
        );
      }
  
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }
    await dpConnect();

    const course = await Course.findById({
      _id: courseId,
    });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const reviews = await Review.find({
      course: courseId,
    }).populate("user", "firstName lastName email profile");

    return NextResponse.json({ success: true, data: reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
