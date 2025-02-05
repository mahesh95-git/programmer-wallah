import { NextResponse } from "next/server";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { getAuth } from '@clerk/nextjs/server'
import User from "@/models/user.model";
import dpConnect from "@/services/dpconnection";
export async function POST(req) {
    try {
        await dpConnect()
        const { userId } = await getAuth(req);

        const user = await User.findOne({
            userId: userId
        }) 
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 })
        }
        if (user.isApprovedInstructor === "pending") {
            return NextResponse.json({ message: "User is still pending for approval", success: false }, { status: 400 })
        }
        if (user.isApprovedInstructor === "approved") {
            return NextResponse.json({ message: "User is already approved", success: false }, { status: 400 })
        }
        const formData = await req.formData();
        const profile = formData.get('profilePicture');
        const qualification = formData.get('qualification');
        const bio = formData.get('bio');
        const contactNumber = formData.get('contactNumber');
        const expertise = formData.get('expertise');
        const qualificationcCertificate = formData.get('qualificationcCertificate');
        if (!qualification || !bio || !contactNumber || !expertise || qualificationcCertificate == 'null') {
            return NextResponse.json({ message: "Please fill all the fields",success:false }, { status: 400 })
        }
        const fileUpload = [];
        if (profile&&profile != "null") {
            fileUpload.push({ file: profile, subType: "profilePicture" });
        }
        fileUpload.push({ file: qualificationcCertificate, subType: "qualificationcCertificate" })
        const upload = await uploadFileToCloudinary(fileUpload);

        if (!user) {
            return NextResponse.json({ message: "User not found",success:false }, { status: 404 })
        }
        let profileImage;
        let qualificationcCertificateImage;
        upload.forEach((value) => {
            if (value.subType == "profilePicture") {
                profileImage = value.secure_url;
            }
            if (value.subType == "qualificationcCertificate") {
                qualificationcCertificateImage = value.secure_url;
            }
        })
        user.bio = bio;
        user.expertise = expertise;
        user.contactNumber = contactNumber;
        user.qualification = qualification;
        user.qualificationsCertificate = qualificationcCertificateImage;
        user.profile = profileImage;
        user.isApprovedInstructor = "pending";
        user.role="instructor";
         const updatedUser= await user.save();
        return NextResponse.json({ message: "Your application has been successfully submitted. We will reply to you within 24 hours.", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to submit data", success: false }, { status: 500 })

    }
}

