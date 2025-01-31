import { NextResponse } from "next/server";
import User from "@/models/user.model";
import dpConnect from "@/services/dpconnection";
import { getAuth } from '@clerk/nextjs/server'
import { uploadFileToCloudinary } from "@/lib/cloudinary";

// get instructor profile
export async function GET(req) {
    try {
        await dpConnect()
        const { userId } = await getAuth(req);
        console.log(userId)
        const user = await User.findOne({
            userId: userId
        }).select("firstName lastName email expertise bio contactNumber profile qualifications role isApprovedInstructor");

        console.log(user)
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 })
        }
        if (user.role !== "instructor") {
            return NextResponse.json({ message: "User is not an instructor", success: false }, { status: 400 })
        }
        if (user.isApprovedInstructor !== "approved") {
            return NextResponse.json({ message: "User is still pending for approval", success: false }, { status: 400 })
        }

        return NextResponse.json({
            message: "User profile fetched successfully",
            success: true,
            user: user
        }, {
            status: 200
        })


    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: "Failed to fetch user profile", success: false }, { status: 500 })

    }
}

// update instructor profile
export async function PUT(req) {
    try {
        await dpConnect();
        const { userId } = await getAuth(req);

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }

        const formData = await req.formData();
        const profile = formData.get('profilePicture');
        const qualificationcCertificate = formData.get('qualificationcCertificate');
        const updateData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            qualifications: formData.get('qualifications'),
            bio: formData.get('bio'),
            contactNumber: formData.get('contactNumber'),
            email: formData.get('email'),
            expertise: formData.get('expertise')
        };

        // Find and validate user
        let user = await User.findOne({ userId })
            .select("firstName lastName email expertise bio contactNumber profile qualifications role isApprovedInstructor");

        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        if (user.role !== "instructor") {
            return NextResponse.json({ message: "User is not an instructor", success: false }, { status: 403 });
        }

        if (user.isApprovedInstructor !== "approved") {
            return NextResponse.json({ message: "Instructor approval is pending", success: false }, { status: 403 });
        }

        const fileUpload = [];
        if (profile&&profile != "null") {
            fileUpload.push({ file: profile, subType: "profile" });
        }
        if (qualificationcCertificate&&qualificationcCertificate != 'null') {
            fileUpload.push({ file: qualificationcCertificate, subType: "qualificationcCertificate" })
        }
        
        let upload = [];
        if (fileUpload.length > 0) {
            upload = await uploadFileToCloudinary(fileUpload);
        }
        upload.forEach((value) => {
            if (value.subType == "profile") {
                user.profile = value.secure_url;
            }
            if (value.subType == "qualificationcCertificate") {
                user.qualificationcCertificate = value.secure_url;
            }
        });
        Object.assign(user, updateData);
        await user.save();

        return NextResponse.json({
            message: "Profile updated successfully",
            success: true,
            user: user
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({
            message: "Failed to update profile",
            success: false
        }, { status: 500 });
    }
}