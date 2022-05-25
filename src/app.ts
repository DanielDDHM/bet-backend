import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import rootRoutes from './routes';

const { DATABASE_URL, PORT, NAME } = process.env

const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app use routes
app.use('/v1', rootRoutes)

// one call for test
app.get('/', (request, response) => {
  const user = String(process.env.NAME) || "User";
  return response.send({
    message: `Hello ${user}`,
  });
});

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT || 3000}`);
});

