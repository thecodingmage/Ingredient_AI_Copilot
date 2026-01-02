const { z } = require("zod");

const AnalysisSchema = z.object({
  verdict: z
    .string()
    .describe("Brief overall health rating, e.g., 'Highly Processed'"),
  reasoning: z.string().describe("The logic behind the verdict"),
  tradeoffs: z
    .array(
      z.object({
        benefit: z.string().describe("A positive aspect found"),
        concern: z.string().describe("The nutritional cost or drawback"),
      })
    )
    .describe("Nutritional pros and cons"),
  sugar_info: z.object({
    level: z.string().describe("High, Medium, or Low"),
    explanation: z
      .string()
      .describe("Reasoning based on specific ingredients found"),
  }),
  suitability: z.object({
    best_for: z.array(z.string()),
    caution_for: z.array(z.string()),
  }),
  uncertainty: z
    .string()
    .describe("Any missing data or blurred OCR text notes"),
});

module.exports = { AnalysisSchema };
