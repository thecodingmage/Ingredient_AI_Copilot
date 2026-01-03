require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const { AnalysisSchema } = require("./schema");
const { extractIngredients } = require("./utils/signal_extractor");

const app = express();
app.use(cors());
app.use(express.json());

// 1. Initialize Groq correctly
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // Points to Groq
});

app.post("/analyze", async (req, res) => {
  const { rawText } = req.body;
  const ingredients = extractIngredients(rawText);

  if (!ingredients) {
    return res.status(400).json({ error: "No ingredients detected." });
  }

  try {
    // 2. We use a "Strict Instruction" prompt to prevent Zod errors
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a professional Food Scientist. Analyze the ingredients. And return the response such that old age people can also easily understand it and gym people also can also easily understand it along with common people. Give the response suitable for all people and easily understandable" +
            "You MUST return the response as a JSON object with these EXACT keys: " +
            "verdict, reasoning, tradeoffs (an array of objects with 'benefit' and 'concern' keys), " +
            "sugar_info (level and explanation), suitability (best_for and caution_for arrays), and uncertainty. " +
            "Do not omit 'benefit' or 'concern' from any tradeoff entry.",
        },
        {
          role: "user",
          content: `Analyze this ingredient list: ${ingredients}`,
        },
      ],
      // Tells Groq to output valid JSON
      response_format: { type: "json_object" },
    });

    // 3. Parse and then Validate with Zod
    const rawContent = completion.choices[0].message.content;
    const jsonResponse = JSON.parse(rawContent);

    // This line ensures the AI followed your rules
    const validatedData = AnalysisSchema.parse(jsonResponse);

    res.json(validatedData);
  } catch (err) {
    console.error("Groq Reasoning Error:", err.message);
    res.status(422).json({
      error: "AI Reasoning Failure",
      message: "The AI failed to generate a valid analysis.",
      detail: err.message, // This shows the Zod error in Postman
    });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("🚀 Groq Backend live on http://0.0.0.0:3000");
});
