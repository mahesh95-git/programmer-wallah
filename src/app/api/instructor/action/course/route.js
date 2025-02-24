import { NextResponse } from "next/server";
import User from "@/models/user.model";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import mongoose from "mongoose";

// create new course
export async function POST(req) {
  try {
    await dpConnect();
    const { userId } = await getAuth(req);

    let user = await User.findOne({ userId }).select(
      "_id role isApprovedInstructor"
    );
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    if (user.role !== "instructor") {
      return NextResponse.json(
        {
          message: "User is not an instructor",
          success: false,
        },
        { status: 403 }
      );
    }

    if (user.isApprovedInstructor !== "approved") {
      return NextResponse.json(
        {
          message: "Instructor approval is pending",
          success: false,
        },
        { status: 403 }
      );
    }

    const formData = await req.formData();

    const courseData = JSON.parse(formData.get("courseData"));
    const thumbnail = formData.get("thumbnail");

    if (
      !courseData.title ||
      !courseData.description ||
      !courseData.category ||
      !courseData.level ||
      (!thumbnail && !courseData.thumbnail) ||
      !courseData.whatYouLearn ||
      !Array.isArray(courseData.whatYouLearn) ||
      courseData.whatYouLearn.length === 0
    ) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          success: false,
        },
        { status: 400 }
      );
    }

    const cleanedWhatYouLearn = courseData.whatYouLearn.filter(
      (item) => typeof item === "string" && item.trim() !== ""
    );

    if (cleanedWhatYouLearn.length === 0) {
      return NextResponse.json(
        {
          message: "At least two learning objective is required",
          success: false,
        },
        { status: 400 }
      );
    }
    let thumbnailUrl = courseData.thumbnail;
    if (thumbnail) {
      try {
        const uploadResult = await uploadFileToCloudinary([
          {
            file: thumbnail,
            subType: "thumbnail",
          },
        ]);
        thumbnailUrl = uploadResult[0].secure_url;
      } catch (error) {
        return NextResponse.json(
          {
            message: "Error uploading thumbnail",
            success: false,
            error: error.message,
          },
          { status: 500 }
        );
      }
    }

    const chaptersLessons = courseData.chapters.map(
      ({ lessons }, chapterIdx) => {
        return lessons.map((_, lessonIdx) => {
          const file = formData.get(`video_${chapterIdx}-${lessonIdx}`);
          return {
            subType: `${chapterIdx}-${lessonIdx}`,
            file,
          };
        });
      }
    );

    console.log(chaptersLessons);

    const uploadPromises = chaptersLessons.map(async (lessonFiles) => {
      return await uploadFileToCloudinary(lessonFiles);
    });

    const uploadedChapters = await Promise.all(uploadPromises);

    const chapters = courseData.chapters.map((chapter, idx) => {
      return {
        title: chapter.title,
        order: chapter.order + 1,
        lessons: uploadedChapters[idx].map((item, idx) => {
          return {
            videoUrl: item.secure_url,
            order: Number(item.subType.split("-")[1]) + 1,
            duration: item.duration,
          };
        }),
      };
    });

    const duration = chapters.reduce((prev = 0, element) => {
      return (
        prev + element.lessons.reduce((total, item) => total + item.duration, 0)
      );
    }, 0);

    await Course.create({
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      level: courseData.level,
      price: courseData.price || 0,
      discountPrice: courseData.discountPrice,
      isFree: courseData.isFree,
      thumbnail: thumbnailUrl,
      whatYouLearn: cleanedWhatYouLearn,
      chapters: chapters,
      instructor: user._id,
      status: courseData.status || "draft",
      language: courseData.language || "english",
      totalDuration: duration,
    });
    return NextResponse.json(
      {
        message: "Course created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      {
        message: "Error creating course",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// get instructor courses
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseName = searchParams.get("search");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    console.log("Page:", page, "Limit:", limit); // Debugging log
    const { userId } = await getAuth(req);
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
        { status: 404 }
      );
    }

    if (user.role !== "instructor") {
      return NextResponse.json(
        {
          message: "User is not an instructor",
          success: false,
        },
        { status: 403 }
      );
    }

    if (user.isApprovedInstructor !== "approved") {
      return NextResponse.json(
        {
          message: "Instructor approval is pending",
          success: false,
        },
        { status: 403 }
      );
    }

    const skip = (page - 1) * limit;
    let instructorCourses = await Course.find({
      instructor: new mongoose.Types.ObjectId(user._id),
    })
      .select(
        "_id title description thumbnail level status chapters enrolledStudents totalDuration enrollmentCount price isFree chapterCount"
      )
      .populate();

    if (courseName) {
      instructorCourses = instructorCourses.filter((item, idx) =>
        new RegExp(courseName, "i").test(item.title)
      );
    }
    const total = instructorCourses.length;
    const paginatioCourses = instructorCourses.slice(skip, skip + limit);
    return NextResponse.json({
      message: "courses featch successfully",
      data: { courses: paginatioCourses, total, limit, skip } || [],
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
