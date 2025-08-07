
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const geminiModel = 'gemini-2.5-flash';
const imagenModel = 'imagen-3.0-generate-002';

export const generateDreamInterpretation = async (dreamDescription: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: geminiModel,
            contents: `Here is my dream: "${dreamDescription}"`,
            config: {
                systemInstruction: "You are a gentle and insightful dream interpreter with a background in psychology. Your tone is caring, therapeutic, and positive. Avoid definitive statements and instead offer thoughtful possibilities and questions for reflection. Focus on emotional themes and symbolic meanings in a way that empowers the user. Keep the interpretation to one or two short paragraphs.",
            },
        });
        
        return response.text;
    } catch (error) {
        console.error("Error generating dream interpretation:", error);
        throw new Error("Failed to get interpretation from AI.");
    }
};

export const generateDreamImage = async (dreamDescription: string): Promise<string> => {
    const enhancedPrompt = `Surreal dreamscape, ethereal, fantastical art, based on the following dream: "${dreamDescription}". Use a palette of glowing blues, deep indigos, and soft whites. Highly detailed, cinematic lighting, style of digital art.`;
    
    try {
        const response = await ai.models.generateImages({
            model: imagenModel,
            prompt: enhancedPrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating dream image:", error);
        throw new Error("Failed to generate image from AI.");
    }
};
