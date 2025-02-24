import { NextResponse } from "next/server";
import User from "@/models/user.model";
import Course from "@/models/course.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { isInstructor } from "@/lib/checkInstructor";
import CouponCode from "@/models/couponCode.model";

// validate coupon
export async function PUT(req) {
    try {
      await dpConnect();
      const { couponCode,courseId } = await req.json();
      const { userId } = await getAuth(req);
      
      console.log(courseId)
      const coupon = await CouponCode.findOne({ code:couponCode,courseId:courseId });
  console.log(coupon)
      if (!coupon) {
        return NextResponse.json(
          { success: false, message: "Invalid coupon" },
          { status: 404 }
        );
      }
  
      if (new Date() > new Date(coupon.expiredAt)) {
        return NextResponse.json(
          { success: false, message: "Coupon expired" },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true, data:{
        discountedPrice:coupon.discountedPrice,
        discount:coupon.discount
      }}, { status: 200 });
    } catch (error) {
        console.log(error)
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }