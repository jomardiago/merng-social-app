import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';
import config from 'config';

import Post from './models/Post.js';

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query {
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(config.mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });    
}).then(res => {
    console.log(`Server running at url ${res.url}`);
});
