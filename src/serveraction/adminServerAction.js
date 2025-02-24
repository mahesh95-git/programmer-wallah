"use server";
import Course from "@/models/course.model";
import User from "@/models/user.model";
import dpConnect from "@/services/dpconnection";
export const getStudentCount=async()=>{
try {
    await dpConnect();

    const students=await User.find({
        role:"student"
    }).countDocuments();
    return students||0
    
} catch (error) {
    console.log(error.message);
    return 0;
}

}

export const getInstructorCount=async()=>{
    try {
        await dpConnect();
    
        const instructor=await User.find({
            role:"instructor"
        }).countDocuments();
        return instructor||0
        
    } catch (error) {
        console.log(error.message);
        return 0;
    }
    
    }
    
    
    export const getCourseCount=async()=>{
        try {
            await dpConnect();
        
            const courses=await Course.find().countDocuments();
            console.log(courses);
            return courses||0
            
        } catch (error) {
            console.log(error.message);
            return 0;
        }
        
        }
        
        
        


