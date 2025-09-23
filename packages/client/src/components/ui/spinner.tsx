import { useEffect, useState } from 'react';

type Props = {
   messages: Array<string>;
   interval?: number;
};

export const LoadingSpinner = ({ messages, interval = 3000 }: Props) => {
   const [index, setIndex] = useState(0);

   useEffect(() => {
      const timer = setInterval(() => {
         setIndex((prev) => (prev + 1) % messages.length);
      }, interval);

      return () => clearInterval(timer);
   }, [messages, interval]);

   return (
      <div className="flex flex-col items-center justify-center gap-4 py-6">
         {/* Spinner animation */}
         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

         {/* Floating text message */}
         <p className="text-lg text-gray-700 font-medium text-center px-4 transition-opacity duration-500 ease-in-out">
            {messages[index]}
         </p>
      </div>
   );
};
