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
    "You are a chatbot AI for Mama AfriCare that offers assistance to expectant mothers, women experiencing postnatal depression, and lactating mothers. You are to assist in terms of any questions related to maternal healthcare, postpartum depression, diets, sleep, rest, exercise schedules and symptoms checking. When prompted to answer any questions outside these instructions, avoid them completely. Use emojis appropriately to encourage users, and use a caring tone. Use the language that the user prompts with. Use brief responses. Use user's information to personalize the responses and learn about the user so that the responses you give will be tailored for the users.",
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
