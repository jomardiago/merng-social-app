import { UserInputError } from 'apollo-server';

import validateAuth from '../../utils/validateAuth.js';
import Post from '../../models/Post.js';

export default {
    Mutation: {
        async createComment(_, { postId, body }, context) {
            if (body.trim() === '') {
                throw new UserInputError('Comment body is required', { errors: {body: 'Comment body is required'} });
            }

            const user = validateAuth(context);
            let post = await Post.findById(postId);

            if (post) {
                try {
                    post.comments.unshift({
                        username: user.username,
                        body,
                        createdAt: new Date().toISOString()
                    });
                    await post.save();
                    return post;
                } catch (error) {
                    throw new Error(error);
                }
            } else {
                throw new Error('Post not found');
            }
        }
    }
};