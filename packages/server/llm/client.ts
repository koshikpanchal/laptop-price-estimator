import OpenAI from 'openai';

// Hugging Face model endpoint via OpenAI SDK
const MODEL = 'HuggingFaceTB/SmolLM3-3B:hf-inference';

// Create a reusable client once
const openAIClient = new OpenAI({
   baseURL: 'https://router.huggingface.co/v1',
   apiKey: process.env.HF_ACCESS_KEY,
});

type GenerateExtimationsResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async estimatePrice(prompt: string): Promise<GenerateExtimationsResult> {
      const response = await openAIClient.responses.create({
         model: MODEL,
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 50000,
      });

      const output = response.output_text
         .replace(/<think>[\s\S]*?<\/think>/g, '')
         .trim();

      return { id: response.id, text: output };
   },
};
