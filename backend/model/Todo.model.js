import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    userId: { type: String, required: true }, 
  title: { type: String, required: true },
  topic: { type: String },
  date: { type: String },
  complete: { type: Boolean, default: false },
})

export const Todo=mongoose.model("Todo",todoSchema);