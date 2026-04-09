import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // ✅ Just read as text (no pdf parsing)
  const text = buffer.toString("utf-8");

  console.log("Extracted text:", text.slice(0, 200));

  const filePath =
  process.env.NODE_ENV === "production"
    ? "/tmp/data.json"
    : path.join(process.cwd(), "data.json");

  fs.writeFileSync(
    filePath,
    JSON.stringify({ text }, null, 2)
  );

  return NextResponse.json({ message: "File processed successfully" });
}