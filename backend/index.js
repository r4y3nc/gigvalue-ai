const express = require('express');
const dotenv = require('dotenv');
const corsMiddleware = require('./src/middlewares/corsMiddleware');
const routes = require('./src/routes/index');

dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
