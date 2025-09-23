import type { Request, Response } from 'express';
import { priceEstimatorService } from '../service/priceEstimator.service';

export const priceEstimatorController = {
   async getEstimatedPrice(req: Request, res: Response) {
      try {
         const { data } = req.body;

         console.log(data);

         if (!data) {
            res.status(400).json({ error: 'Please enter the data of laptop' });
         }

         const stringifyLaptopData = JSON.stringify(data);

         const output =
            await priceEstimatorService.getEstimatedPrice(stringifyLaptopData);

         res.json({ output });
      } catch (error) {
         console.error(error);
      }
   },
};
