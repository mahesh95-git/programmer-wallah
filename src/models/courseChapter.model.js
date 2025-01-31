import mongoose from "mongoose";
const courseChapterSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    title: String,
    description: String,
    videoUrl: String,
    duration: Number,
    order: Number,

})

const CourseChapterModel = mongoose.models.courseChapter || mongoose.model('courseChapter', courseChapterSchema)
export default CourseChapterModel;