import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import clientRoutes from './routes/clientRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

let cachedDb: mongoose.Connection | null = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    cachedDb = db.connection;
    console.log('Connected to database');
    return cachedDb;
  } catch (error) {
    console.log('Connection error:', error);
    throw new Error('Error connecting to database');
  }
};

connectToDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/order', orderRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
