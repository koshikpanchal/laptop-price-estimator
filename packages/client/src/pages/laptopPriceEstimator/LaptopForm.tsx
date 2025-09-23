import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/spinner';

const SPINNER_MESSAGES = [
   'Your laptop price is estimating by AI...',
   'Sit back, relax - we evaluate prices best!',
   'Crunching laptop details, almost there...',
   'AI is calculating the best price range for you...',
   'Hold tight, we are analyzing your laptop specs...',
];

const LaptopForm = () => {
   const [model, setModel] = useState('');
   const [processor, setProcessor] = useState('');
   const [ram, setRam] = useState('');
   const [stroage, setStroage] = useState('');
   const [gpu, setGpu] = useState('');
   const [age, setAge] = useState('');
   const [condition, setCondition] = useState('');
   const [priceRange, setPriceRange] = useState('');

   const [isLoading, setIsLoading] = useState(false);

   interface LaptopDetails {
      model: string;
      processor: string;
      ram: string;
      stroage: string;
      gpu: string;
      age: string;
      condition: string;
   }

   interface PriceEstimatorResponse {
      output: {
         text: string;
      };
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         setIsLoading(true);

         const laptopDetails: LaptopDetails = {
            model,
            processor,
            ram,
            stroage,
            gpu,
            age,
            condition,
         };

         const { data } = await axios.post<PriceEstimatorResponse>(
            '/api/priceEstimator',
            {
               data: laptopDetails,
            }
         );

         setPriceRange(data.output.text);
         setIsLoading(false);
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 items-start">
               <div className="flex flex-row gap-6 w-full">
                  <div className="grid gap-2 flex-1 min-w-[180px]">
                     <Label>Model</Label>
                     <Input
                        id="model"
                        placeholder="Dell"
                        onChange={(e) => setModel(e.target.value)}
                        required
                     />
                  </div>
                  <div className="grid gap-2 flex-1 min-w-[180px]">
                     <Label>Processor</Label>
                     <Input
                        id="processor"
                        placeholder="i7-9300U"
                        onChange={(e) => setProcessor(e.target.value)}
                        required
                     />
                  </div>
               </div>
               <div className="flex flex-row gap-6 w-full">
                  <div className="grid gap-2 flex-1 min-w-[180px]">
                     <Label>RAM</Label>
                     <Input
                        id="ram"
                        placeholder="8GB"
                        onChange={(e) => setRam(e.target.value)}
                        required
                     />
                  </div>
                  <div className="grid gap-2 flex-1 min-w-[180px]">
                     <Label>Storage</Label>
                     <Input
                        id="storage"
                        placeholder="1TB SSD"
                        onChange={(e) => setStroage(e.target.value)}
                        required
                     />
                  </div>
               </div>
               <div className="flex flex-row gap-6 w-full">
                  <div className="grid gap-2 flex-1 min-w-[180px]">
                     <Label>GPU</Label>
                     <Input
                        id="gpu"
                        placeholder="GTX 1650"
                        onChange={(e) => setGpu(e.target.value)}
                     />
                  </div>
                  <div className="grid gap-2 flex-1 min-w-[180px]">
                     <Label>Age</Label>
                     <Input
                        id="age"
                        placeholder="2 years"
                        onChange={(e) => setAge(e.target.value)}
                        required
                     />
                  </div>
               </div>
               <div className="flex flex-row gap-6 w-full">
                  <div className="grid gap-2 flex-1 min-w-[180px]">
                     <Label>Condition</Label>
                     <Input
                        id="condition"
                        placeholder="good or screen broken or minor scratches"
                        onChange={(e) => setCondition(e.target.value)}
                        required
                     />
                  </div>
               </div>
            </div>
            <CardFooter className="flex justify-center p-4">
               <Button type="submit" className="w-sm" disabled={isLoading}>
                  Submit
               </Button>
            </CardFooter>
         </form>
         {isLoading && <LoadingSpinner messages={SPINNER_MESSAGES} />}
         {priceRange && (
            <div className="flex justify-center text-2xl text-blue-900">
               <p>{priceRange}</p>
            </div>
         )}
      </div>
   );
};

export default LaptopForm;
