import { NextResponse } from "next/server";
import Course from "@/models/course.model";
import Review from "@/models/review.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/user.model";

export async function POST(req) {
  try {
    await dpConnect();
    const { userId } = await getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const user = await User.findOne({ userId: userId });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id");
    const body = await req.json();
    const { review, rating } = body;

    if (!courseId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Invalid input data", success: false },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: "Course not found", success: false },
        { status: 404 }
      );
    }

    let existingReview = await Review.findOne({
      user: user._id,
      course: courseId,
    });

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.review = review;
      await existingReview.save();
    } else {
      await Review.create({
        user: user._id,
        rating: rating,
        review: review,
        course: courseId,
      });
    }

    const allReviews = await Review.find({ course: courseId });
    const totalRating = allReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    console.log(course);
    const averageRating = totalRating / allReviews.length;

    course.ratings = {
      average: averageRating,
      count: allReviews.length,
    };
    await course.save();

    return NextResponse.json(
      {
        message: existingReview
          ? "Review updated successfully"
          : "Review added successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding/updating review:", error);
    return NextResponse.json(
      {
        message: "Error adding/updating review",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
