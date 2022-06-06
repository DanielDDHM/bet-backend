import cors from 'cors';
import express from 'express';
import "express-async-errors";
import 'dotenv/config';

import rootRoutes from './routes';

const { PORT, NAME } = process.env

const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(
//   (error: Error, request: Request, response: Response) => {
//     if (error instanceof AppError) {
//       return response.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: error });
//     }
//     return response.status(500).json({
//       status: "error",
//       message: `Internal server error - ${error.message}`,
//     });
//   }
// );

// app use routes
app.use('/v1', rootRoutes)

// one call for test
app.get('/', (request, response) => {
  const user = String(NAME) || "User";
  return response.send({
    message: `Hello ${user}`,
    status: 'UP'
  });
});

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT || 3000}, welcome ${NAME}`);
});

