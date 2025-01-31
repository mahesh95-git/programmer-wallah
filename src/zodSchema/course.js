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
  });
export default courseSchema;