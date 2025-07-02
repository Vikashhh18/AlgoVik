import mongoose from "mongoose";

const mockResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mockId: { type: String, required: true },
  correct: { type: Number, required: true },
  total: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Mock=mongoose.model('Mock',mockResultSchema);
