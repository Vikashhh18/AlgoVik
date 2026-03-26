// src/lib/openAi.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export default client;

// For Ask AI Page (non-streaming)
export const generateAIResponse = async (messages) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Groq AI Error:", error);
    if (error.status === 429) {
      throw new Error("Rate limit reached. Please wait a moment.");
    }
    throw new Error("Failed to fetch AI response");
  }
};