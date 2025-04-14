import { Schema, model } from 'mongoose';

interface IMessage {
    content: string;
    sender: string;
    receiver: string;
}

const messageSchema = new Schema<IMessage>({
    content: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
}, { timestamps: true })

const Message = model<IMessage>('Message', messageSchema);

export default Message;

