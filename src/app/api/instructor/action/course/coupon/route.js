import { NextResponse } from "next/server";
import User from "@/models/user.model";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { isInstructor } from "@/lib/checkInstructor";
import CouponCode from "@/models/couponCode.model";

// Fetch all coupons
export async function GET(req) {
  try {
    const { userId } = await getAuth(req);
    await dpConnect();

    let user = await User.findOne({ userId }).select(
      "_id role isApprovedInstructor"
    );

    // check user is instructor
    isInstructor(user);
    const coupons = await CouponCode.find({
      instructorId:user.id
    });
    console.log(coupons)
    return NextResponse.json({ success: true, data:coupons,message:"coupons featch successfully" });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create a new coupon
export async function POST(req) {
  try {
    await dpConnect();
    const { userId } = await getAuth(req);

    let user = await User.findOne({ userId }).select(
      "_id role isApprovedInstructor"
    );

    // check user is instructor
    isInstructor(user);
    const { code, expiry, course: courseId, discount } = await req.json();

    if (!code || !expiry || !courseId || !discount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const course = await Course.findOne({
      _id: new mongoose.Types.ObjectId(courseId),
    });
    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "course not found",
        },
        {
          status: 401,
        }
      );
    }
    const dis = course.price * (Number.parseInt(discount) / 100);
  
    const discountedPrice = course.price - dis;

    const newCoupon = await CouponCode.create({
      code,
      expiry,
      courseName: course.title,
      courseId,
      discount,
      discountedPrice,
      instructorId:user._id
    });

    return NextResponse.json(
      { success: true, data: newCoupon },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}




// delete coupon
export async function DELETE(req){
  try {
    await dpConnect();
    const { searchParams } = new URL(req.url);
    console.log(searchParams)
    const coupon=searchParams.get("id")
    const { userId } = await getAuth(req);

    let user = await User.findOne({ userId }).select(
      "_id role isApprovedInstructor"
    );


    if (!coupon) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    const isCoupon = await CouponCode.deleteOne({
      _id:new mongoose.Types.ObjectId(coupon),
      instructorId:user.id
    });
    if(!isCoupon){
      return NextResponse.json(
        { success: false, message: "coupon not found" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: true, message:"coupon successfully deleted",data:coupon },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
