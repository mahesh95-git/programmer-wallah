import { SignUp } from "@clerk/nextjs";
export default function page() {
    return (
    <div className="flex-1 flex justify-center items-center  w-screen h-screen">
        <SignUp  />
    </div>
    )
}