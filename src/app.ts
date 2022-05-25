import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { AppError } from './helpers';

import rootRoutes from './routes';

const { PORT, NAME } = process.env

const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app use routes
app.use('/v1', rootRoutes)

app.use(
  (error: Error, request: Request, response: Response) => {
    if (error instanceof AppError) {
      return response.status(500).json({ error: error });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${error.message}`,
    });
  }
);


// one call for test
app.get('/', (request, response) => {
  const user = String(NAME) || "User";
  return response.send({
    message: `Hello ${user}`,
  });
});

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT || 3000}, welcome ${NAME}`);
});

