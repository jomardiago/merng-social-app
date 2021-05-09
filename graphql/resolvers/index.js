import postsResolvers from './posts.js';
import usersResolvers from './users.js';
import commentsResolvers from './comments.js';

export default {
    Post: {
        commentsCount(parent) {
            return parent.comments.length;
        },
        likesCount(parent) {
            return parent.likes.length;
        }
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
};