import {z} from "zod";
import chapterSchema from "./courseChapter";
const courseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price must be 0 or greater"),
    isFree: z.boolean().default(false),
    thumbnail: z.string().min(1, "Thumbnail is required"),
    category: z.string().min(1, "Category is required"),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    chapters: z.array(chapterSchema).min(1, "At least one chapter is required"),
    status:z.enum(["draft","published"]),
    language:z.string().min(1,"langauge in required"),
    whatYouLearn: z.array(z.string().min(20,"object must be at least 10 character").max(30,"object must be at most 30")).min(2, "Add at least one learning objective"),
  });
export default courseSchema;