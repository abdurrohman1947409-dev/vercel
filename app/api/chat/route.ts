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
        { error: "GEMINI_API_KEY is not defined in .env.local" },
        { status: 500 }
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
    
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_CONTEXT,
    });
    
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    console.error("Gemini API Error (Chat):", err);
    const message = err instanceof Error ? err.message : "AI response failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
