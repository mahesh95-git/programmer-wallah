import { z } from "zod";
const lessonsSchema = z.object({
  videoUrl: z.string().min(1, "Video URL is required"),
  duration: z.number().min(0, "Duration must be 0 or greater"),
  order: z.number().min(1, "Order must be 1 or greater"),
});
const chapterSchema = z.object({
  title: z.string().min(1, "Chapter title is required"),
  lessons: z.array(lessonsSchema).min(1, "At least one lession is required"),
  order: z.number().min(1, "Order must be 1 or greater"),
});


export default chapterSchema;
