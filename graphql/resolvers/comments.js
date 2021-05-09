import { UserInputError, AuthenticationError } from 'apollo-server';

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
        },
        async deleteComment(_, { postId, commentId }, context) {
            const user = validateAuth(context);
            const post = await Post.findById(postId);

            if (post) {
                if (user.username !== post.comments.find(comment => comment.id === commentId).username) {
                    throw new AuthenticationError('You can only delete your own comment');
                } else {
                    const updatedComments = post.comments.filter(comment => comment.id !== commentId);
                    post.comments = updatedComments;
                    post.save();
                    return post;
                }
            } else {
                throw new Error('Post not found');
            }
        }
    }
};