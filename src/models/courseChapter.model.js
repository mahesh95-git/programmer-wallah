import mongoose from "mongoose";
export const courseChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  lessons: [
    {
      videoUrl: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
    },
  ],
});