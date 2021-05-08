import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { UserInputError } from 'apollo-server';

import User from '../../models/User.js';
import { validateLoginInput, validateRegisterInput } from '../../utils/validators.js';

function generateToken({ _id, email, username }) {
    return jwt.sign({ _id, email, username }, config.secretKey, { expiresIn: '1h' });
};

export default {
    Mutation: {
        async login(_, args) {
            const { errors, valid } = validateLoginInput(args.loginInput);
            const { username, password } = args.loginInput;

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            } else {
                const user = await User.findOne({ username });

                if (!user) {
                    throw new UserInputError('User not found', { errors: {general: 'User does not exists'} });
                } else {
                    const match = await bcrypt.compare(password, user.password);
                    const { id, email, username } = user;
                    if (match) {
                        const token = generateToken(user);
                        return { ...user._doc, id: user._id, token };
                    } else {
                        throw new UserInputError('User not found', { errors: {username: 'User does not exists'} });
                    }
                }
            }
        },
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
                const token = generateToken(result);
                return { ...result._doc, id: result._id, token };
            }
        }
    }
};