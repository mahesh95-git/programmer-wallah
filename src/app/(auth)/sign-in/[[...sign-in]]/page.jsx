import { SignIn } from "@clerk/nextjs";
export default function page() {
    return (
    <div className="flex-1  flex justify-center items-center  w-full min-h-screen">
        <SignIn  />
    </div>
    )
}