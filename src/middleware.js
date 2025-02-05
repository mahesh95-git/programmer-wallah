import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const instructorRoutes = createRouteMatcher([
  "/instructor/home(.*)",
  "/api/instructor/action(.*)",
]);

const adminRoutes = createRouteMatcher([
  "/admin(.*)"
]);

const studentRoutes = createRouteMatcher([
  
  "/profile(.*)",
  "/my-courses(.*)",
  "/api/instructor/new"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const client = await clerkClient();
  if (!userId) {
    if (studentRoutes(req) || instructorRoutes(req) || adminRoutes(req)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
  const user = await client.users.getUser(userId);
  const role = user.privateMetadata.role || "student";
const isApprovedInstructor=user.privateMetadata.isApprovedInstructor||"pending"

  if (instructorRoutes(req)) {
    if (role !== "instructor" && role !== "admin"&&isApprovedInstructor!="approved") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (adminRoutes(req)) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
const pathname=req.nextUrl.pathname;
if(pathname==="/instructor"){
  if(role==='instructor'){
    return NextResponse.redirect(new URL("/instructor/home",req.url));
  }
}
  if (studentRoutes(req)) {
    if (!role) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();



});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};