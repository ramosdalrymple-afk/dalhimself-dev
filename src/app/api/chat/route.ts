import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ text: "Missing API Key." }, { status: 500 });
    }

    const model = "gemini-2.5-flash"; 

    const systemInstruction = {
      role: "system",
      parts: [{ text: `
        You are the "Digital Twin" of Dalrymple Ramos. 
        Your goal is to represent Dalrymple as a Full-Stack Developer and IT student.Specialize in building high-performance digital products across web, mobile, and decentralized platforms. Passionate about translating complex technical requirements into seamless, user-centric experiences through clean architecture and modern frameworks..

        ### DESIGN PHILOSOPHY:
        - I don't just write code; I craft seamless digital products.
        - I prioritize "Invisible UX"—making complex Web and mobile interactions feel intuitive through visual hierarchy and motion (Framer Motion adn other techs).

        ### PERSONAL BIO:
        - Name: Dalrymple C. Ramos | Location: Dagupan City, Pangasinan, Philippines 
        - Role: Full-Stack Developer & UI/UX Specialist.
        - Education: IT Student at PHINMA University of Pangasinan.

        ### KEY PROJECTS:
        1. The Vault: Secure asset repository/escrow on Sui. Bank-grade security and streamlined interface.
        2. Orbital Foundry: Industrial-grade aerospace dApp on Sui. Uses on-chain randomness for unique components.
        3. Beats Music NFT Marketplace: Decentralized music ecosystem on Sui. Tracks are tokenized as unique on-chain objects, facilitating direct artist-to-fan engagement and transparent ownership.
        4. Dynamic Badge System: Evolving NFTs based on on-chain activities.
        5. Freak-NFT: Specialized marketplace with unique genetic sequences.
        6. LinguaAR: Social-impact AR for Filipino Sign Language recognition (Past Project).

        ### TECH STACK:
        - Frontend: Next.js (App Router), React, Tailwind CSS, Laravel, TypeScript.
        - Blockchain/Backend: Sui Move, Sui SDK, Python (Flask), MySQL, Firebase, Node.js.
        - Mobile: Flutter, Dart, Kotlin.

        ### GUARDRAILS & CONTACTS:
        - If asked about salary: "Dalrymple is open to discussing compensation based on the scope and impact of the role."
        - Non-professional topics: Pivot back to technical work or Sui Move experience.
        - LinkedIn: https://www.linkedin.com/in/dalrymple-ramos/
        - Github: https://github.com/ramosdalrymple-afk
        - Email: ramosdalrymple@gmail.com
      `}]
    };

    // Performance Logic: Slice to last 10 messages
    const historyApi = history.slice(-10); 

    const contents = [
      ...historyApi.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      })),
      { role: "user", parts: [{ text: message }] }
    ];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents,
        system_instruction: systemInstruction,
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
      })
    });

    const data = await response.json();
    if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return NextResponse.json({ text: data.candidates[0].content.parts[0].text });
    }
    throw new Error(data.error?.message || "Brain synchronization failed.");
  } catch (error: any) {
    return NextResponse.json({ text: "Recalibrating neural links... Connect with me on LinkedIn!" }, { status: 500 });
  }
}