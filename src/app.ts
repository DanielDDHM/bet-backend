import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

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

mongoose.connect(String(DATABASE_URL))
  .then(() => {
    console.log(`connecting to database successful, Dear ${NAME || "USER"}`)
    app.listen(PORT, () => {
      console.log(`App started on http://localhost:${PORT || 3000}`);
    });
  })
  .catch(e => console.error('could not connect to DB', e))

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


