import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { question } = await req.json();

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
  console.log("Doc length:", parsed.text.length);

  if (!parsed.text || parsed.text.length === 0) {
    return NextResponse.json({
      answer: "Document is empty or not parsed correctly.",
    });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Answer ONLY using the provided document.",
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
}