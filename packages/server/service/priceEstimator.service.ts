import { llmClient } from '../llm/client';
import laptopPrompt from '../llm/prompts/estimateLaptopPrice.txt';

export const priceEstimatorService = {
   async getEstimatedPrice(laptopData: string) {
      const prompt = laptopPrompt.replace('{{laptop_data}}', laptopData);

      return await llmClient.estimatePriceByBart(prompt);
   },
};
