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

router.post('/api/priceEstimator', async (req: Request, res: Response) => {
   try {
      const { data } = req.body;

      const prompt = laptopPrompt.replace(
         '{{laptop_data}}',
         JSON.stringify(data)
      );

      const response = await openAIClient.responses.create({
         model: MODEL,
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 50000,
      });

      const output = response.output_text
         .replace(/<think>[\s\S]*?<\/think>/g, '')
         .trim();

      res.json({ output });
   } catch (error) {
      console.error(error);
   }
});

export default router;
