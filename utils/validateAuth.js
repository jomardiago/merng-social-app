import jwt from 'jsonwebtoken';
import config from 'config';
import { AuthenticationError } from 'apollo-server';

function validateAuth(context) {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];

        if (token) {
            try {
                const user = jwt.verify(token, config.secretKey);
                return user;
            } catch (error) {   
                throw new AuthenticationError('Token is invalid or expired');
            }
        }

        throw new Error('Authentication Error: Make sure that the token is in valid format. I.E. Bearer {token}');
    }

    throw new Error('Authentication Error: Token is missing from the request headers');
}

export default validateAuth;