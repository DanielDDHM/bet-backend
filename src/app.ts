import cors from 'cors';
import express from 'express';
import "express-async-errors";
import 'dotenv/config';

import rootRoutes from './routes';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './docs/swagger.json'

// import { betsCron } from './cronjobs';
const { PORT, NAME } = process.env

const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DOCS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

// CRON
// betsCron.start()

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
  console.log(`App started on http://localhost:${PORT || 3000}`);
});

