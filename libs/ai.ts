import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function detectProblem(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
You are a world-class startup analyst.

Your job is to analyze founder discussions and detect meaningful startup signals.

Focus on identifying:

- Pain points
- Failed attempts
- Unmet needs
- Founder frustration

Classify the discussion into ONE category:

Problem signal
Success signal
Discussion

Rules:
Problem signal = frustration, failure, or unmet need
Success signal = positive achievement
Discussion = neutral conversation

Return ONLY the category.
        `,
      },
      {
        role: "user",
        content: `Founder discussion:\n"${text}"`,
      },
    ],
  });

  return completion.choices[0].message.content?.trim();
}