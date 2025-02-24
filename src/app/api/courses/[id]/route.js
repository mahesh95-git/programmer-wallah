import { NextResponse } from "next/server";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";

export async function GET(req, { params }) {
  try {
    const { id } = await params; 
    await dpConnect();
    
    const course = await Course.findOne({ _id: id })
      .select(
        "title instructor price ratings enrolledStudents createdAt thumbnail isFree language category description level whatYouLearn totalDuration chapters "
      )
      .populate("instructor", "firstName lastName _id profile")
      .lean();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found", success: false },
        { status: 404 }
      );
    }

    const formattedCourse = {
      _id: course._id,
      title: course.title,
      instructor: {
        _id: course.instructor?._id || null,
        name: `${course.instructor?.firstName || ""} ${course.instructor?.lastName || ""}`.trim(),
        profile: course.instructor?.profile || null,
      },
      isFree: course.isFree,
      price: course.price,
      level: course.level,
      chapters: course.chapters?.map((item) => ({
        title: item.title,
        totallessons: item.lessons?.length || 0,
        duration: item.lessons?.reduce((pre, cur) => pre + (cur.duration || 0), 0) || 0,
      })) || [],
      totalDuration: course.totalDuration || 0,
      description: course.description || "",
      thumbnail: course.thumbnail || "",
      rating: course.ratings?.average || 0,
      totalReviews: course.ratings?.count || 0,
      enrolledStudents: course.enrolledStudents?.length || 0,
      createdAt: course.createdAt,
      language: course.language || "Unknown",
      whatYouLearn: course.whatYouLearn || [],
      category: course.category || "Uncategorized",
    };

    return NextResponse.json(
      {
        message: "Course fetched successfully",
        success: true,
        course: formattedCourse,
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
