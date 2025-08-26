import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, 
});

export const generateAIResponse = async (messages) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // or gpt-4o
      messages: messages,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Failed to fetch AI response");
  }
};
