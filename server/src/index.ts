import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';


// 1. Initialize DB Connection
connectDB();

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Routes
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Note App API');
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});