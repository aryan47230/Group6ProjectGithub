import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateContent = async (prompt: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });
    console.log(response.text);
    return response.text;
}