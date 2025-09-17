import OpenAI from 'openai';

// Hugging Face model endpoint via OpenAI SDK
const MODEL = 'HuggingFaceTB/SmolLM3-3B:hf-inference';

// Create a reusable client once
const openAIClient = new OpenAI({
   baseURL: 'https://router.huggingface.co/v1',
   apiKey: process.env.HUGGING_FACE_ACCESS_KEY,
});

type GenerateExtimations = {
   model?: string;
   instructions?: string;
   prompt: string;
   temperature?: number;
   max_output_tokens?: number;
};

type GenerateExtimationsResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async estimatePrice({
      model = MODEL,
      prompt,
      temperature = 0.2,
      max_output_tokens = 500,
      instructions,
   }: GenerateExtimations): Promise<GenerateExtimationsResult> {
      const response = await openAIClient.responses.create({
         model,
         input: prompt,
         temperature,
         instructions,
         max_output_tokens,
      });

      const output = response.output_text
         .replace(/<think>[\s\S]*?<\/think>/g, '')
         .trim();

      return { id: response.id, text: output };
   },
};
