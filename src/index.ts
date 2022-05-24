import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// import routes from './routes';

import helmet from 'helmet';
import morganMiddleware from './middlewares/morgan';
import healthMiddleware from './middlewares/health';

const PORT = process.env.APP_PORT || 3000
const { DATABASE_URL } = process.env

const app = express();
const router = express.Router()

// Middlewares
app.use(helmet());
morganMiddleware.setup(app)
healthMiddleware.setup(app)

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app use routes
app.use('/v1', router)
// app.use(routes)
app.get('/', (request, response) => {
  const user = String(process.env.NAME) || "User";
  return response.send({
    message: `Hello ${user}`,
  });
});

mongoose.connect(String(DATABASE_URL))
  .then(() => {
    console.log('connecting to database successful')

    app.listen(PORT, () => {
      console.log(`App started on http://localhost:${PORT}`);
    });
  })
  .catch(e => console.error('could not connect to DB', e))



