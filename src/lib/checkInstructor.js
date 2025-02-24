import { NextResponse } from "next/server";

export const isInstructor=(user)=>{
    if (!user) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }
  
      if (user.role !== "instructor") {
        return NextResponse.json(
          { message: "User is not an instructor", success: false },
          { status: 403 }
        );
      }
  
      if (user.isApprovedInstructor !== "approved") {
        return NextResponse.json(
          { message: "Instructor approval is pending", success: false },
          { status: 403 }
        );
      }
}