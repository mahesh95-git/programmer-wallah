import { z } from "zod";
const chapterSchema = z.object({
    title: z.string().min(1, "Chapter title is required"),
    description: z.string().optional(),
    videoUrl: z.string().min(1, "Video URL is required"),
    duration: z.number().min(0, "Duration must be 0 or greater"),
    order: z.number().min(1, "Order must be 1 or greater"),
  });
  
  export default chapterSchema;