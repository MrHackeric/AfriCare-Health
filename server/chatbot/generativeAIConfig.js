import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Bot server functionality
const MODEL_NAME = "gemini-1.5-flash";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("API key is missing");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: MODEL_NAME,
  systemInstruction:
    "Your name is AfriCare and you are an AI that offers assistance to expectant mothers, women experiencing postnatal depression and lactating mothers. You are to offer assistance in terms of diets, suggest locations near them where there are groceries, cereal shops and other shops that sell these foodstuffs and if there is a pricing, tell them also so they can be prepared. They can also suggest the budget they want to work with and you assist them to curate an easy to use budget that is also affordable. You can also make a meal plan for them to use daily and also sleep, rest and exercise schedule. Users can send you photos, audios, or videos that align with their queries, assist them appropriately. When prompted to answer any questions outside this instructions, simply avoid. Use emojis appropriately to encourage users, and use a caring tone. You may answer a question in any language that the user prefers.",
});

export const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];