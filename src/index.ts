import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models';
import providersRouter from './routes/providers';
import { testUserMiddleware } from './middlewares/testUser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(testUserMiddleware());

app.use('/providers', providersRouter);

app.get('/', (_req, res) => res.send('Welcome to the Providers API'));

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (error) {
    console.error('Failed to connect to DB:', error);
    process.exit(1);
  }
}

start();

export default app;
