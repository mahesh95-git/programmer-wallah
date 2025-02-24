import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"courses"
  },
});

const Review = mongoose.models.reivews || mongoose.model("reivews",reviewSchema,);
export default Review;
