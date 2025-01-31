import mongoose from "mongoose";
import validator from "validator"
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: [2, "First name must be at least 2 characters"],
    maxLength: [50, "First name cannot exceed 50 characters"]
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: [50, "Last name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  isApprovedInstructor: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
  },
  profile: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  qualifications: {
    type: String,
    minLength: [3, "Qualifications must be specified."],
    maxLength: [100, "Qualifications cannot exceed 50 characters"]
  },
  qualificationsCertificate: {
    type: String,
  },
  expertise: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true
  },
  enrolledCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  }],
  contactNumber:{
type: String,
    trim: true,
    minLength: [10, "Contact number must be at least 10 characters"],
    maxLength: [15, "Contact number cannot exceed 15 characters"],
    validate:[validator.isMobilePhone,"please provide valid phone number"]
  },
  createdCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  courseCompletionCertificate: [
    {
      type: String,
    }
  ]
});

userSchema.pre('save', async function (next) {
  if (this.isModified('role') && this.role === 'student') {
    this.isApprovedInstructor = false;
  }
  next();
});
userSchema.methods.isInstructor = function () {
  return this.role === 'instructor' && this.isApprovedInstructor;
};
// Static method to find active instructors
userSchema.statics.findActiveInstructors = function () {
  return this.find({
    role: 'instructor',
    isApprovedInstructor: true,
    isActive: true
  });
};

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User