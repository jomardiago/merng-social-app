import Post from '../../models/Post.js';
import validateAuth from '../../utils/validateAuth.js';

export default {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
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
        }
    }
};