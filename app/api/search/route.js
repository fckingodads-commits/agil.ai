import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      tools: [{ googleSearch: {} }],
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: "Anda adalah Agil.ai, asisten AI canggih. Jawab menggunakan bahasa Indonesia yang santai, cerdas, dan terstruktur."
    });

    const response = await result.response;
    const answerText = response.text();
    
    const candidates = response.candidates || [];
    const chunks = candidates[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources = chunks.map(chunk => chunk.web ? { title: chunk.web.title, url: chunk.web.uri } : null).filter(Boolean);

    return Response.json({ answer: answerText, sources: sources });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
