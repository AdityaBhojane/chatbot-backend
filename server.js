import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import authRoutes from './Routes/AuthRoutes.js';
import chatRouter from './Routes/chatRouter.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
