import express from 'express';
import type { Request, Response } from 'express';
import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';
import laptopPrompt from './llm/prompts/estimateLaptopPrice.txt';

import { priceEstimatorController } from './controller/priceEstimator.controller';

const router = express.Router();

// Hugging Face model endpoint via OpenAI SDK
const MODEL = 'HuggingFaceTB/SmolLM3-3B:hf-inference';

// Create a reusable client once
const openAIClient = new OpenAI({
   baseURL: 'https://router.huggingface.co/v1',
   apiKey: process.env.HF_ACCESS_KEY,
});

const infrenceClient = new InferenceClient(process.env.HF_ACCESS_KEY);

router.post('/api/priceEstimator', async (req: Request, res: Response) => {
   try {
      //    const { data } = req.body;

      //   const response = await openAIClient.responses.create({
      //      model: MODEL,
      //      input: laptopPrompt,
      //      temperature: 0.2,
      //      max_output_tokens: 5000,
      //   });

      //   const output = response.output_text
      //      .replace(/<think>[\s\S]*?<\/think>/g, '')
      //      .trim();

      //   res.json({ output });

      const chatCompletion = await infrenceClient.chatCompletion({
         provider: 'cerebras',
         model: 'meta-llama/Llama-3.1-8B-Instruct',
         messages: [
            {
               role: 'system',
               content: laptopPrompt,
            },
         ],
      });

      return chatCompletion.choices[0]?.message.content || '';
   } catch (error) {
      console.error(error);
   }
});

export default router;
