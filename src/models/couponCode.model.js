import mongoose from "mongoose";

const couponCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique:true
    },
    expiry: {
      type: Date,
      required: true,
    },
    title: String,
    discountedPrice:Number,
    discount:Number,
    courseId: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "courses", 
    },
    courseName:{
      type: String,
      required: true,
    },
    instructorId:{
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref:"users"
    }
  },
  {
    timestamps: true,
  }
);

const CouponCode = mongoose.models.CouponCode || mongoose.model("CouponCode", couponCodeSchema);
export default CouponCode;
