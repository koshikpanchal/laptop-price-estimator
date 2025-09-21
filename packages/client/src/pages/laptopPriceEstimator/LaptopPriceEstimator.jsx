import { Button } from '../../components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const LaptopPriceEstimator = () => {
   return (
      <div>
         <Card className="w-full">
            <CardHeader>
               <CardTitle>Laptop price estimator</CardTitle>
               <CardDescription>
                  Enter the details of your laptop to estimate the price
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form>
                  <form>
                     <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-6">
                           <div className="grid gap-2">
                              <Label>Model</Label>
                              <Input id="model" placeholder="Dell" required />
                           </div>
                           <div className="grid gap-2">
                              <Label>Processor</Label>
                              <Input
                                 id="processor"
                                 placeholder="i7-9300U"
                                 required
                              />
                           </div>
                        </div>
                        <div className="flex flex-row gap-6">
                           <div className="grid gap-2">
                              <Label>RAM</Label>
                              <Input id="ram" placeholder="8GB" required />
                           </div>
                           <div className="grid gap-2">
                              <Label>Storage</Label>
                              <Input
                                 id="storage"
                                 placeholder="1TB SSD"
                                 required
                              />
                           </div>
                        </div>
                        <div className="flex flex-row gap-6">
                           <div className="grid gap-2">
                              <Label>GPU</Label>
                              <Input id="gpu" placeholder="GTX 1650" required />
                           </div>
                           <div className="grid gap-2">
                              <Label>Age</Label>
                              <Input id="age" placeholder="2 years" required />
                           </div>
                        </div>
                        <div className="flex flex-row gap-6">
                           <div className="grid gap-2">
                              <Label>Condition</Label>
                              <Input
                                 id="condition"
                                 placeholder="good, screen broken"
                                 required
                              />
                           </div>
                        </div>
                     </div>
                  </form>
               </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
               <Button type="submit" className="w-sm">
                  Submit
               </Button>
            </CardFooter>
         </Card>
      </div>
   );
};

export default LaptopPriceEstimator;
