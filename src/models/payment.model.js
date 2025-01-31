import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        default: 'USD'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        unique: true
    },
    paymentGateway: {
        type: String,
        required: true
    },
    refund: {
        status: {
            type: String,
            enum: ['none', 'requested', 'processed', 'rejected']
        },
        reason: String,
        requestedAt: Date,
        processedAt: Date,
        amount: Number
    },
    billing: {
        name: String,
        email: String,
        address: String,
        city: String,
        country: String,
        postalCode: String
    }
}, {
    timestamps: true
});

paymentSchema.index({ student: 1, course: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ status: 1 });

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;