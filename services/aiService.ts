import { GoogleGenAI } from "@google/genai";

// Fallback from .env.local
const FALLBACK_API_KEY = 'AQ.Ab8RN6JTM8B7qDKWVirBWjMSzdGUQ9z_ju-L7O101XgwQZycRQ';

const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.GEMINI_API_KEY || process.env.API_KEY || FALLBACK_API_KEY;
    }
  } catch (e) {
    // ignore
  }
  return FALLBACK_API_KEY;
};

// Ensure API Key is available.
const ai = new GoogleGenAI({ apiKey: getApiKey() });

export interface ContentAnalysis {
  viralityScore: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  suggestions: string[];
}

export const aiService = {
  /**
   * Generates a thread or tweet draft based on a topic and tone.
   * Uses gemini-3-flash-preview for fast, reasoning-capable text generation.
   */
  async generateDraft(topic: string, tone: string, length: number = 3): Promise<string> {
    try {
      const prompt = `You are an expert social media strategist. Write a Twitter thread of approximately ${length} tweets about the topic: "${topic}".
      
      Tone: ${tone}.
      Format: Separate each tweet with the delimiter "---".
      Style: Engaging hooks, concise sentences, and relevant hashtags at the end.
      
      Do not include "Tweet 1:" or "Tweet 2:" prefixes. Just the content.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 } // Fast response preferred for drafts
        }
      });

      return response.text || '';
    } catch (error) {
      console.error('AI Draft Error:', error);
      throw new Error('Failed to generate draft. Please try again.');
    }
  },

  /**
   * Refines existing content based on specific instructions (e.g., "Make it punchier", "Fix grammar").
   */
  async refineContent(content: string, instruction: string): Promise<string> {
    try {
      const prompt = `Refine the following social media content:
      "${content}"
      
      Instruction: ${instruction}
      
      Return only the refined content.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      return response.text || content;
    } catch (error) {
      console.error('AI Refine Error:', error);
      return content;
    }
  },

  /**
   * Analyzes content for virality potential and sentiment.
   * Returns a structured JSON object.
   */
  async analyzeContent(content: string): Promise<ContentAnalysis> {
    try {
      const prompt = `Analyze this tweet content for virality potential and sentiment.
      Content: "${content}"
      
      Return a raw JSON object (no markdown formatting) with the following structure:
      {
        "viralityScore": number (0-100),
        "sentiment": string ("Positive", "Neutral", or "Negative"),
        "suggestions": string[] (Array of 3 actionable tips)
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text || '{}';
      return JSON.parse(text) as ContentAnalysis;
    } catch (error) {
      console.error('AI Analyze Error:', error);
      // Fallback data
      return { 
        viralityScore: 50, 
        sentiment: 'Neutral', 
        suggestions: ['Could not analyze at this time.'] 
      };
    }
  },

  /**
   * Generates an image based on a prompt using Gemini's image generation capabilities.
   * Uses gemini-2.5-flash-image.
   */
  async generateImage(prompt: string, aspectRatio: '1:1' | '16:9' | '9:16' = '1:1'): Promise<string | null> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          // Note: responseMimeType is not supported for nano banana series models currently.
          // Aspect ratio config would go here if supported by the specific endpoint/SDK version,
          // otherwise it's handled via prompt engineering.
        }
      });

      // Iterate through parts to find the image
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error('AI Image Error:', error);
      throw new Error('Failed to generate image.');
    }
  }
};