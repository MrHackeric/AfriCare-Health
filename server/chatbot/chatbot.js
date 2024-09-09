import express from "express";
import {
  model,
  safetySettings,
  generationConfig,
} from "./generativeAIConfig.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const runChat = async (userInput) => {
  const chat = model.startChat({
    generationConfig,
    safetySettings,
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
};

// Chat endpoint
router.post("/chat", upload.single("file"), async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const response = await runChat(text);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ask AI endpoint
router.post("/askAi", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }
    const response = await runChat(text);
    res.json({ response });
  } catch (error) {
    console.error("Error in /askAi endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
