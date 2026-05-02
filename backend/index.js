const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const corsMiddleware = require('./src/middlewares/corsMiddleware');
const errorHandler = require('./src/middlewares/errorHandler');
const routes = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'GigValue AI Backend is running' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
