import { Progress } from "../model/progress.model.js";

export const createProgressBySheet = async (req, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized. User not logged in." });
  }

  const { questionId, sheetName, status } = req.body;

  if (!questionId || !sheetName || !status) {
    return res.status(400).json({ message: "Missing field value" });
  }

  try {
    const existing = await Progress.findOne({ userId, questionId, sheetName });

    if (existing) {
      existing.status = status;
      existing.updatedAt = Date.now();
      await existing.save();
      return res.status(200).json({ message: "Progress updated", progress: existing });
    }

    const newProgress = await Progress.create({ userId, questionId, sheetName, status });
    await newProgress.save();

    res.status(201).json({ message: "Progress saved", progress: newProgress });
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getProgressBySheet = async (req, res) => {
    const userId=req.auth.userId;
    const {sheetName}=req.query;
    if (!sheetName) {
        return res.status(400).json({ message: "Missing sheet name in query" });
    }
    
  try {
    const progress = await Progress.find({ userId, sheetName });
    res.json({ progress });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching progress' });
  }
}