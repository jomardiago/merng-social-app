import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';
import config from 'config';

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi() {
            return 'Hello World!';
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
