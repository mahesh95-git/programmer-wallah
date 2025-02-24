import { NextResponse } from "next/server";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/user.model";

export async function GET(req) {
  try {
    // Get search parameters
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 30;
    const category = searchParams.get("category");
    const level=searchParams.get("level")
    const price = searchParams.get("price"); 
    const rating = searchParams.get("rating"); 
    const language = searchParams.get("language");
    const query = searchParams.get("query");

    await dpConnect();
    const skip = (page - 1) * limit;
    let filter = {};

    if (category) {
      filter.category = category;
    }
    if(level){
        filter.level=level;
    }

    if (price) {
      if (price === "free") {
        filter.isFree = true;
      } else if (price === "paid") {
        filter.isFree = false;
      }
    }

    if (rating) {
      filter["ratings.average"] = { $gte: parseInt(rating) };
    }

    // Language filter
    if (language) {
      filter.language = language;
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ];
    }

    // Fetch filtered courses
    const courses = await Course.find(filter)
      .select("title instructor price ratings enrolledStudents createdAt thumbnail isFree language category description level")
      .populate("instructor", "firstName lastName _id")
      .lean()

    // Format the response
    const formattedCourses = courses.map(course => ({
      _id: course._id,
      title: course.title,
      instructor: {
        _id: course.instructor._id,
        name: `${course.instructor.firstName} ${course.instructor.lastName}`.trim()
      },
      isFree: course.isFree,
      price: course.price,
      level:course.level,
      description:course.description,
      thumbnail: course.thumbnail,
      rating: course.ratings.average,
      totalReviews: course.ratings.count,
      enrolledStudents: course.enrolledStudents.length || 0,
      createdAt: course.createdAt,
      language: course.language,
      category: course.category
    }));

    
  const paginatioCourses = formattedCourses.slice(skip, skip + limit);



    return NextResponse.json(
      {
        message: "Courses fetched successfully",
        success: true,
        totalCourses: courses.length,
        courses: paginatioCourses,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching filtered courses:", error);
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

