import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '../../components/ui/card';
import LaptopForm from './LaptopForm';

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
               <LaptopForm />
            </CardContent>
         </Card>
      </div>
   );
};

export default LaptopPriceEstimator;
