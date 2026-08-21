import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ign, cartItems, trxId } = await req.json();

    if (!ign || !cartItems?.length) {
      return NextResponse.json(
        { error: "Missing required fields: ign or cartItems" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not defined" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const itemsList = cartItems
      .map((item: { name: string; quantity: number; price: number }) => `${item.name} × ${item.quantity}`)
      .join(", ");

    const prompt = `You are a professional Minecraft Server Assistant. Write a concise Discord support ticket application. The player '${ign}' has purchased ${itemsList} and paid via bKash (TrxID: ${trxId ?? "N/A"}). Ask the admin to verify and deliver items in-game. Output strictly the formatted text without markdown backticks.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ ticket: text });
  } catch (err: unknown) {
    console.error("Gemini API Error (Ticket):", err);
    const message = err instanceof Error ? err.message : "AI generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
