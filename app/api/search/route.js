import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return Response.json({ error: 'API Key belum diset di Vercel.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Menggunakan model standar yang universal
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answerText = response.text();

    return Response.json({ answer: answerText, sources: [] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
