import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
     
    },
    paymentInfo:{
      cardNumber:String,
      cardHolder:String,
      expiryMonth:String,
      expiryDate:String,
      expiryYear:String,
      cvv:String
    },
    paymentGateway: {
      type: String,
      required: true,
    },
    discountedPrice:{
      type:Number,
      default:0
    },
    refund: {
      status: {
        type: String,
        enum: ["none", "requested", "processed", "rejected"],
      },
      reason: String,
      requestedAt: Date,
      processedAt: Date,
      amount: Number,
    },
    couponCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CouponCodes",
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ student: 1, course: 1 });
paymentSchema.index({ status: 1 });

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
