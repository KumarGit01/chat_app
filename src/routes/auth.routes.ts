import express from 'express';
import type { Request, Response } from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Define route handlers with proper typing
const registerHandler = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
};

const loginHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isValid = await bcrypt.compare(password, user?.password || '');
    if (!user || !isValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);
    res.status(200).json({ token, user });
};

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;
