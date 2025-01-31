import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true,
        minlength: [2, "Category name must be at least 2 characters"],
        maxlength: [50, "Category name cannot exceed 50 characters"]
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    coursesCount: {
        type: Number,
        default: 0
    },
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;