const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const corsMiddleware = require('./src/middlewares/corsMiddleware');
const errorHandler = require('./src/middlewares/errorHandler');
const { globalLimiter } = require('./src/middlewares/rateLimiter');
const routes = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

app.use(corsMiddleware);
app.use(express.json());
app.use(globalLimiter);

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'GigValue AI Backend is running' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
