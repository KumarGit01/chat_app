

import express from 'express';
import Message from '../model/message';

const router = express.Router();

// Get all messages between two users
router.get('/:user1/:user2', async (req, res) => {
    const { user1, user2 } = req.params;

    const messages = await Message.find({
        $or: [
            { senderId: user1, receiverId: user2 },
            { senderId: user2, receiverId: user1 }
        ]
    }).sort({ timestamp: 1 });

    res.json(messages);
});

export default router;
