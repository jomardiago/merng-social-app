import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import config from 'config';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(config.mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });    
}).then(res => {
    console.log(`Server running at url ${res.url}`);
});
