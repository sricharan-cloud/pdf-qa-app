import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({
        answer: "Please provide a question.",
      });
    }

    const filePath =
      process.env.NODE_ENV === "production"
        ? "/tmp/data.json"
        : path.join(process.cwd(), "data.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({
        answer: "Please upload a document first.",
      });
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    console.log("Question:", question);
    console.log("Doc length:", parsed.text?.length);

    if (!parsed.text || parsed.text.length === 0) {
      return NextResponse.json({
        answer: "Document is empty or not parsed correctly.",
      });
    }

    // 🔥 IMPROVED PROMPT 
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0, // reduces randomness → more consistent answers
      messages: [
        {
          role: "system",
          content: `
You are a helpful assistant.

Answer ONLY using the provided document.
If the answer is not in the document, say "Not found in document".
Do NOT guess or make up information.
Keep the answer clear and concise.
`,
        },
        {
          role: "user",
          content: `Document:\n${parsed.text}\n\nQuestion:\n${question}`,
        },
      ],
    });

    return NextResponse.json({
      answer: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({
      answer: "Something went wrong. Please try again.",
    });
  }
}
