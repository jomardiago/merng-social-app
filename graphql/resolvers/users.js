import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { UserInputError } from 'apollo-server';

import User from '../../models/User.js';
import { validateRegisterInput } from '../../utils/validators.js';

export default {
    Mutation: {
        async register(_, args) {
            let { username, email, password, confirmPassword } = args.registerInput;
            const { errors, valid } = validateRegisterInput(args.registerInput);
            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('Username is taken', { errors: {username: 'This username is taken'} });
            } else if (!valid) {
                throw new UserInputError('Errors', { errors });
            } else {
                password = await bcrypt.hash(password, 12);
                const newUser = new User({ email, username, password, createdAt: new Date().toISOString() });
                const result = await newUser.save();
                const token = jwt.sign({ id: result.id, email, username }, config.secretKey, { expiresIn: '1h' });
                return { ...result._doc, id: result._id, token };
            }
        }
    }
};