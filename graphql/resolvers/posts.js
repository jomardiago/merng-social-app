import { AuthenticationError } from 'apollo-server';

import Post from '../../models/Post.js';
import validateAuth from '../../utils/validateAuth.js';

export default {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (!post) throw new Error('Post not found');
                return post;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            try {
                const user = validateAuth(context);

                if (user) {
                    const newPost = Post({
                        body,
                        user: user.id,
                        username: user.username,
                        createdAt: new Date().toISOString()
                    });

                    const post = await newPost.save();
                    return post;
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        async deletePost(_, { postId }, context) {
            const user = validateAuth(context);

            if (user) {
                try {
                    const post = await Post.findById(postId);
                    if (post) {
                        await post.delete();
                        return 'Post successfully deleted';
                    } else {
                        throw new Error('Post is not found');
                    }
                } catch (error) {
                    throw new Error(error);
                }
            } else {
                throw new AuthenticationError('Action is not allowed');
            }
        }
    }
};