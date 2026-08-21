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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

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

    // Try newest model first, fall back if unavailable
    let text = "";
    const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        text = result.response.text();
        break;
      } catch (modelErr: unknown) {
        const msg = modelErr instanceof Error ? modelErr.message : "";
        // If 404 (model not found), try next; otherwise rethrow
        if (!msg.includes("404") && !msg.includes("not found")) throw modelErr;
      }
    }

    if (!text) {
      return NextResponse.json(
        { error: "No available Gemini model responded. Check your API key." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ticket: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "AI generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
