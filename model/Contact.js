import mongoose from 'mongoose';

const { Schema } = mongoose;

const EnquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    projectType: {
      type: String,
      enum: ['Web', 'Mobile', 'UI/UX', 'Other'],
      default: 'Other',
    },
    budget: {
      type: Number,
      default: 0,
    },
    expectedTimeline: {
      type: String,
      default: '', 
    },

    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Rejected'],
      default: 'Pending',
    },
    isValid: {
      type: Boolean,
      default: true, 
    },

    remarks: [
      {
        remark: { type: String },
        repliedBy: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model('Enquiry', EnquirySchema);
