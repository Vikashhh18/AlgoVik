import { Mock } from "../model/Mock.model.js";

export const storedResult = async (req, res) => {
  try {
    const { userId, mockId, correct, total } = req.body;

    const existing = await Mock.findOne({ userId, mockId });

    if (existing) {
      await Mock.updateOne(
        { userId, mockId },
        { $set: { correct, total, timestamp: new Date() } }
      );
      res.status(200).json({ message: "Result updated" });
    } else {
      const newMock = await Mock.create({
        userId,
        mockId,
        correct,
        total,
        timestamp: new Date()
      });
      res.status(200).json({ message: "Result submitted", result: newMock });
    }
  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllMock = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Mock.find({ userId });
    res.status(200).json(result);
  } catch (err) {
    console.error("Progress Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getDataOfMock = async (req, res) => {
  const { userId } = req.params;
  //  const userId = req.auth?.userId;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const mocks = await Mock.find({ userId });

    const codingAttempted = mocks.filter(m => m.mockId.startsWith('mock')).length;
   const aptitudeCategories = [
  'data_interpretation',
  'verbal_ability',
  'logical_reasoning',
  'quantitative_aptitude',
];

const aptitudeAttempted = mocks.filter(m => aptitudeCategories.includes(m.mockId)).length;
 return res.json({ coding: codingAttempted, aptitude: aptitudeAttempted });
  } catch (err) {
    console.error('Error fetching mock stats', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

