import { InterviewExperience } from "../model/InterviewExperience.js";

// 📍 Get all interview experiences
export const getAllExpereince = async (req, res) => {
  try {
    const data = await InterviewExperience.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching experiences",
      error: error.message,
    });
  }
};

// 📍 Post a new interview experience
export const postExpereince = async (req, res) => {
  try {
    const {
      name,
      jobRole,
      company,
      difficulty,
      applyMethod,
      interviewMode,
      numberOfRounds,
      questionsAsked,
      advice,
      overallExperience,
    } = req.body;

    const newExperience = new InterviewExperience({
      name,
      jobRole,
      company,
      difficulty,
      applyMethod,
      interviewMode,
      numberOfRounds,
      questionsAsked,
      advice,
      overallExperience,
    });

    const savedExperience = await newExperience.save();

    res.status(201).json({
      success: true,
      message: "Experience added successfully",
      data: savedExperience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding experience",
      error: error.message,
    });
  }
};
