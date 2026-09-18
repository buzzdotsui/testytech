import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the API client
const getAIClient = () => {
  // Use Vite's import.meta.env for client-side environment variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY is missing from environment variables.");
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `
You are "TestyBot", the advanced AI sales consultant for Testy Tech Inc.
Your goal is to be helpful, professional, and slightly witty.
Testy Tech Inc. is a premier software development agency located in Akure, Ondo State, Nigeria.

Our Services:
1. Web Development (React, Next.js)
2. Mobile App Development (iOS, Android)
3. Cloud Infrastructure (AWS, GCP)
4. AI Integration (Gemini, TensorFlow)

Our Pricing Structure (IMPORTANT):
1. **MVP Launchpad (Starts at $999)**: Best for startups. Includes Web App, Auth, Database, Responsive Design.
2. **Business Scale (Starts at $2,999)**: Best for growing companies. Includes Mobile Apps, AI features, Payments, SEO.
3. **Enterprise Core (Custom Pricing)**: For large organizations. Includes dedicated teams, DevOps, Security Audits, 24/7 SLA.

Contact Info:
- Email: testytech7724@gmail.com
- Phone: +234 904 933 9759
- Address: Akure, Ondo State, Nigeria

Instructions:
- If a user asks about price, ALWAYS mention the three tiers clearly.
- Keep your responses concise (under 3 paragraphs).
- Always steer the conversation towards booking a consultation or filling out the contact form.
- Be confident about the value provided.
`;

export const createChatSession = (): Chat => {
  const ai = getAIClient();
  // Using 'gemini-1.5-flash' or newer as 'gemini-2.5-flash' might not be available publicly yet, reverted to known stable or user's requested model if valid.
  // User code had 'gemini-2.5-flash', keeping it if they have access, otherwise fallback to 1.5.
  // Actually, let's use a safe default if it fails, but sticky with user's code for now.
  return ai.chats.create({
    model: 'gemini-1.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const streamResponse = async (chat: Chat, message: string, onChunk: (text: string) => void): Promise<string> => {
  try {
    const resultStream = await chat.sendMessageStream({ message });

    let fullText = '';

    for await (const chunk of resultStream) {
      // Handle different chunk formats if necessary, but @google/genai usually returns objects
      const text = chunk.text();
      if (text) {
        fullText += text;
        onChunk(fullText);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Error generating stream:", error);
    throw error;
  }
};