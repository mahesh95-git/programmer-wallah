import { v2 as cloudinary } from "cloudinary";

export async function uploadFileToCloudinary(data) {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        if (!data || !Array.isArray(data) || data.length === 0) {
            throw new Error("No data provided or invalid input");
        }

        const uploadResults = await Promise.all(
            data.map(async ({file, subType }) => {
                if (!file || !file.type) {
                    throw new Error("Invalid file object");
                }
                const allowedImageTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp"
                ];

                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                if (allowedImageTypes.includes(file.type)) {
                    return new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                resource_type: "image",
                                folder: "pw/images",
                                quality: "auto",
                                fetch_format: "auto",
                            },
                            (error, result) => {
                                if (error) reject(error);
                                resolve({
                                    ...result,
                                    subType: subType,
                                });
                            }
                        );
                        uploadStream.end(buffer);
                    });
                }
                else if (file.type === "video/mp4") {
                    return new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                resource_type: "video",
                                folder: "pw/videos",
                                chunk_size: 6000000,  // 6MB chunks for large video uploads
                                eager: [
                                    { quality: "auto" },
                                ],
                            },
                            (error, result) => {
                                if (error) reject(error);
                                resolve({
                                    ...result,
                                    subType: subType,
                                });
                            }
                        );
                        uploadStream.end(buffer);
                    });
                } else {
                    throw new Error(`Unsupported file type: ${file.type}`);
                }
            })
        );
        return uploadResults;
    } catch (error) {
        console.error("Error uploading data to Cloudinary:", error);
        throw error;
    }
}