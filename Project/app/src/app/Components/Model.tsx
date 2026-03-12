const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateContent = async (prompt: string) => {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
}