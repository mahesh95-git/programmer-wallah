import { NextResponse } from "next/server";
import Course from "@/models/course.model";
import Payment from "@/models/payment.model";
import dpConnect from "@/services/dpconnection";
import CouponCode from "@/models/couponCode.model";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import User from "@/models/user.model";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id");
    const { userId } = await getAuth(req);
    const body = await req.json();
    const { couponCode, paymentInfo } = body;
    const client = await clerkClient();
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await dpConnect();

    const course = await Course.findById(courseId);
    const user = await User.findOne({ userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    let finalAmountINR = course.price;
    let appliedCoupon = null;

    if (couponCode) {
      const coupon = await CouponCode.findOne({
        code: couponCode,
        courseId: courseId,
        expiry: { $gt: new Date() },
      });

      if (!coupon) {
        return NextResponse.json(
          { error: "Invalid or expired coupon code" },
          { status: 400 }
        );
      }

      if (coupon.discountedPrice) {
        finalAmountINR = coupon.discountedPrice;
      } else if (coupon.discount) {
        finalAmountINR = course.price * (1 - coupon.discount / 100);
      }

      appliedCoupon = coupon._id;
    }

    await Payment.create({
      student: user._id,
      course: courseId,
      amount: finalAmountINR,
      currency: "INR",
      status: "completed",
      paymentMethod: "card",
      transactionId: "sample",
      paymentGateway: "card",
      paymentInfo,
      refund: {
        status: "none",
      },
      ...(appliedCoupon && {
        couponCode: appliedCoupon,
        discountedPrice: finalAmountINR,
      }),
    });

    user.enrolledCourses.push({
      courseId: courseId,
    });
    course.enrolledStudents.push({
      student: user._id,
    });

    const clerkUser = await client.users.getUser(userId);
    const currentMetadata = clerkUser.privateMetadata || {};

    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        ...currentMetadata,
        enrolledCourses: [...(currentMetadata.enrolledCourses || []), courseId],
      },
    });

    await course.save();
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Payment successful",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
