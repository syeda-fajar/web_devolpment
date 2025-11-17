import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = 3000;


connectDB();


app.use(express.json());


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Auth API v1.0',
    status: 'Running ',
    endpoints: {
      register: 'POST /api/auth/register'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});