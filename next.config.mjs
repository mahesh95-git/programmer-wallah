/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com',"res.cloudinary.com"],
    },
    experimental:{
        serverActions:{
            bodySizeLimit:"5mb"
        }
    }
};

export default nextConfig;
