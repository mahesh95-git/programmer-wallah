import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, "Course description is required"],
        minlength: [20, "Description must be at least 20 characters"],
        maxlength: [2000, "Description cannot exceed 2000 characters"]
    },
    shortDescription: {
        type: String,
        maxlength: [200, "Short description cannot exceed 200 characters"]
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"],
        validate: {
            validator: Number.isFinite,
            message: "Price must be a valid number"
        }
    },
    discountPrice: {
        type: Number,
        min: [0, "Discount price cannot be negative"],
        validate: {
            validator: function(value) {
                return !value || value <= this.price;
            },
            message: "Discount price cannot be greater than regular price"
        }
    },
    isFree: {
        type: Boolean,
        default: false
    },
    thumbnail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: [true, "Course category is required"],
        index: true
    },
    level: {
        type: String,
        enum: {
            values: ['beginner', 'intermediate', 'advanced'],
            message: "{VALUE} is not a valid course level"
        },
        required: true
    },
    learningOutcomes: [{
        type: String,
        trim: true
    }],
    chapters: [
        {
            types: mongoose.Schema.Types.ObjectId,
            ref: 'CourseChapter',
            required: true
        }
    ],

    enrolledStudents: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
        completedChapters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseChapter'
        }],
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        lastAccessed: {
            type: Date,
            default: Date.now
        }
    }],
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        review: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],

    status: {
        type: String,
        enum: {
            values: ['draft', 'published', 'archived'],
            message: "{VALUE} is not a valid status"
        },
        default: 'draft'
    },

    totalDuration: {
        type: Number,
        default: 0
    },
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        },
    },
    language: {
        type: String,
        default: 'English'
    },
    enrolledCount: {
        type: Number,
        default: 0
    }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for enrollment count
courseSchema.virtual('enrollmentCount').get(function() {
    return this.enrolledStudents.length;
});

// Methods
courseSchema.methods.addStudent = async function(studentId) {
    if (!this.enrolledStudents.find(e => e.student.toString() === studentId.toString())) {
        this.enrolledStudents.push({ student: studentId });
        await this.save();
    }
};

courseSchema.methods.updateRating = async function(rating) {
    const oldAvg = this.ratings.average;
    const oldCount = this.ratings.count;
    
    this.ratings.count += 1;
    this.ratings.distribution[rating] += 1;
    this.ratings.average = ((oldAvg * oldCount) + rating) / this.ratings.count;
    
    await this.save();
};

// Static methods
courseSchema.statics.findPopularCourses = function() {
    return this.find({ status: 'published', isApproved: true })
        .sort({ 'ratings.average': -1, enrollmentCount: -1 })
        .limit(10);
};

const Course = mongoose.models.course || mongoose.model("course", courseSchema);
export default Course;
