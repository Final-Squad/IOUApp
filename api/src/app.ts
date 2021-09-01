import express from 'express';
import dotenv from 'dotenv';
import DB from './db';
import userRoutes from './controller/users';
import owesRoutes from './controller/owes';
const logger = require('../logger/logger');

// Environmental variables
dotenv.config();

const port: number = parseInt(<string>process.env.PORT) || 3000;
const host: string = process.env.HOST || 'localhost';

// Application Configurations
const app: express.Application = express();
app.use(express.json())
app.use('/users', userRoutes);
app.use('/owes', owesRoutes);
DB.connect();

app.get('/', (req: express.Request, res: express.Response) => res.redirect('/healthcheck'));

app.get('/healthcheck', (req: express.Request, res: express.Response) => {
  res.status(200).send({ status: 200 })
});

app.listen(port, host, () => {
  logger.info(`🚀 on http://${host}:${port} ✅`, { environment: process.env.NODE_ENV })
});
