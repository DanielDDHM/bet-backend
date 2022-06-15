import cors from 'cors';
import express from 'express';
import "express-async-errors";
import 'dotenv/config';

import rootRoutes from './routes';
import swaggerUi from 'swagger-ui-express';
import { apiDocumentation } from './docs/api';
import promptScript from './scripts/prompt.script';
import { betsCron } from './cronjobs';
const { PORT, NAME } = process.env

// DRAWN ON PROMPT
promptScript();

//APP
const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DOCS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation))

// CRON
betsCron.start()

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
  console.log(`APP STARTED ON http://localhost:${PORT || 3000}`);
});

