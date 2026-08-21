import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

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
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 503 }
      );
    }

    const itemsList = cartItems
      .map(
        (item: { name: string; quantity: number; price: number }) =>
          `${item.name} × ${item.quantity} (৳${item.price * item.quantity})`
      )
      .join(", ");

    const totalPrice = cartItems.reduce(
      (sum: number, i: { price: number; quantity: number }) =>
        sum + i.price * i.quantity,
      0
    );

    const prompt = `You are a professional Minecraft Server Assistant. Write a concise, highly formal Discord support ticket application. The player '${ign}' has purchased the following items: ${itemsList} — total ৳${totalPrice}, and paid via bKash (TrxID: ${trxId ?? "N/A"}). Ask the admin to verify the transaction and deliver the items in-game to the Minecraft account named '${ign}'. Output STRICTLY the formatted application text without markdown code blocks, prefixes, or pleasantries. Use clean line breaks and emojis for readability.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ ticket: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "AI generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
