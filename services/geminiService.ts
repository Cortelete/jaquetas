import { GoogleGenAI } from "@google/genai";

// A chave de API é obtida de process.env.API_KEY, conforme as diretrizes.
// Presume-se que a variável de ambiente está pré-configurada e acessível no ambiente de execução.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDesignIdea = async (prompt: string): Promise<string> => {
  try {
    const fullPrompt = `Você é um assistente de design. Gere uma sugestão criativa e curta para um detalhe extra em uma jaqueta universitária de Engenharia de Software. O usuário pediu inspiração para: "${prompt}". A sugestão deve ser inspiradora e relacionada a tecnologia, código ou cultura geek. Retorne apenas a sugestão. Exemplo: "Um patch bordado com o código '<Hello, World! />' em uma fonte pixelada."`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao gerar ideia de design:", error);
    return "Não foi possível gerar uma ideia no momento. Tente novamente mais tarde.";
  }
};
