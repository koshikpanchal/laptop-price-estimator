import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello world!');
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
