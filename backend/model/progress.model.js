import mongoose from "mongoose";

const progressschema=new mongoose.Schema({
    userId: { type: String, required: true },
  sheetName: { type: String, required: true },
  questionId: { type: String, required: true },
  status: { type: String, enum: ['solved', 'unsolved'], required: true }
  
},{timestamps:true})

export const  Progress=mongoose.model('Progress',progressschema);