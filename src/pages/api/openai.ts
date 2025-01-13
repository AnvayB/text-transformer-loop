import { OpenAI } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// The API route handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { text, transformCommand } = req.body; // Expecting text and transformCommand in the request body

    if (!text || !transformCommand) {
      return res.status(400).json({ error: "Text and transformation command are required" });
    }

    try {
      // Reverse the text as part of the transformation logic
      const reversedText = text.split("").reverse().join("");

      // Call OpenAI API with the provided transformation command
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an assistant that processes and transforms text based on user instructions.",
          },
          {
            role: "user",
            content: `Transform the following text based on the instruction:\n\nText: "${reversedText}"\nInstruction: "${transformCommand}"\n\nTransformed Text:`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      });

      // Send back the transformed text
      const transformedText = response.choices[0].message.content.trim();
      return res.status(200).json({ transformedText });
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
