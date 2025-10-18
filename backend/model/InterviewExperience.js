import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Anonymous",
    },
    jobRole: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    applyMethod: {
      type: String, // e.g. "Referral", "Off-campus", "On-campus"
    },
    interviewMode: {
      type: String, // e.g. "Online", "Offline"
    },
    numberOfRounds: {
      type: Number,
      default: 1,
    },
    questionsAsked: [
      {
        question: { type: String },
        type: { type: String, enum: ["Technical", "HR", "Aptitude"], default: "Technical" },
      },
    ],
    advice: {
      type: String,
    },
    overallExperience: {
      type: String,
    },
  },
  { timestamps: true }
);

export const InterviewExperience = mongoose.model(
  "InterviewExperience",
  experienceSchema
);
