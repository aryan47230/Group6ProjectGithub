const { GoogleGenAI } = require("@google/genai");
require("dotenv").config({ path: require('path').resolve(__dirname, '../../.env') });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not set in the environment or .env.local file.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const prompt = "Reply with 'API is working!' if you can read this.";
    console.log(`Sending prompt: "${prompt}"...`);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    console.log("Response from Gemini:");
    console.log(response.text);
  } catch (error) {
    console.error("Error fetching from Gemini API:");
    console.error(error);
  }
}

run();
