import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import config from 'config';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

const PORT = process.env.port || 5000;

const pubSub = new PubSub();

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => ({ req, pubSub })
});

mongoose.connect(config.mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });    
}).then(res => {
    console.log(`Server running at url ${res.url}`);
}).catch(err => {
    console.error(err);
});
