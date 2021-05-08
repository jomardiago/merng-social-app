import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

import User from '../../models/User.js';

export default {
    Mutation: {
        async register(_, { registerInput: {username, email, password, confirmPassword} }, context, info) {
            password = await bcrypt.hash(password, 12);
            const newUser = new User({ email, username, password, createdAt: new Date().toISOString() });
            const result = await newUser.save();
            const token = jwt.sign({ id: result.id, email, username }, config.secretKey, { expiresIn: '1h' });
            return { ...result._doc, id: result._id, token };
        }
    }
};