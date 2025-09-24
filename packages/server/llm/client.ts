import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';
import axios from 'axios';

// Create a reusable client once
const openAIClient = new OpenAI({
   baseURL: 'https://router.huggingface.co/v1',
   apiKey: process.env.HF_ACCESS_KEY,
});

// hugging face infrence client
const hfClient = new InferenceClient(process.env.HF_ACCESS_KEY);

type GenerateExtimationsResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async estimatePrice(prompt: string): Promise<GenerateExtimationsResult> {
      // Hugging Face model endpoint via OpenAI SDK
      const MODEL = 'HuggingFaceTB/SmolLM3-3B:hf-inference';

      const response = await openAIClient.responses.create({
         model: MODEL,
         input: prompt,
         temperature: 0.1,
         max_output_tokens: 300,
      });

      const output = response.output_text
         .replace(/<think>[\s\S]*?<\/think>/g, '')
         .trim();

      return { id: response.id, text: output };
   },

   async estimatePriceByBart(prompt: string) {
      const MODEL = 'katanemo/Arch-Router-1.5B:hf-inference';
      const chatCompletion = await openAIClient.chat.completions.create({
         model: MODEL,
         messages: [
            {
               role: 'user',
               content: prompt,
            },
         ],
      });

      let output = chatCompletion.choices[0]?.message.content?.replace(
         /'/g,
         '"'
      );
      let parsed = JSON.parse(output || '');
      return parsed;
   },
};
