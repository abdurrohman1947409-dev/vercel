import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_CONTEXT = `You are a helpful, brief, and friendly support assistant for a Minecraft SMP server called VerleSMP. The server IP is play.yourserver.net. Answer player questions directly and politely. Keep responses concise (2–4 sentences max). Use occasional Minecraft-themed language but stay professional. If you don't know something specific about the server, say so honestly and suggest they open a Discord ticket.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages?.length) {
      return NextResponse.json(
        { error: "Missing messages array" },
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

    const history = messages.slice(0, -1).map(
      (m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })
    );

    const lastMessage = messages[messages.length - 1];
    let text = "";

    // Try newest model first, fall back gracefully on 404
    const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_CONTEXT,
        });
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage.content);
        text = result.response.text();
        break;
      } catch (modelErr: unknown) {
        const msg = modelErr instanceof Error ? modelErr.message : "";
        if (!msg.includes("404") && !msg.includes("not found")) throw modelErr;
      }
    }

    if (!text) {
      return NextResponse.json(
        { error: "No available Gemini model responded. Check your API key." },
        { status: 503 }
      );
    }

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "AI response failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
