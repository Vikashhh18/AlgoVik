import mongoose from "mongoose";

export const dbConnection = async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log(" MongoDB connected successfully");
    })
    .catch((err) => {
      console.log(" MongoDB connection error:", err);
    });
};
