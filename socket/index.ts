import { Server } from "socket.io";
import Message from "../src/model/message";

const onlineUsers = new Map<string, string>();

export default function socketHandler(io: Server) {
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.on('register', (userId: string) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ${socket.id}`);
            io.emit('onlineUsers', Array.from(onlineUsers.keys()));
        })

        socket.on('send_message', async (msg: { senderId: string, receiverId: string, content: string }) => {
            console.log('Message received:', msg);
            const { senderId, receiverId, content } = msg;

            const newMessage = new Message({
                content: content,
                sender: senderId,
                receiver: receiverId
            });

            try {
                await newMessage.save();
                console.log('Message saved to database');

                const receiverSocketId = onlineUsers.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('receive_message', newMessage);
                    console.log(`Message sent to receiver ${receiverId} at socket ${receiverSocketId}`);
                } else {
                    console.log(`Receiver ${receiverId} is not online`);
                }
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected', socket.id);
            // Find and remove the user with this socket ID
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`User ${userId} disconnected`);
                    break;
                }
            }
            io.emit('onlineUsers', Array.from(onlineUsers.keys()));
        })
    })
}   
