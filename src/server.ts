import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import http from 'http';
import socketHandler from '../socket/index';
import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
socketHandler(io);

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
