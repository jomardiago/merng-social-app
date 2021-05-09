import { gql } from 'apollo-server';

export default gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        commentsCount: Int!
        likesCount: Int!
    }
    type Comment {
        id: ID!
        username: String!
        createdAt: String!
        body: String!
    }
    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String!
        token: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    input LoginInput {
        username: String!
        password: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
    type Subscription {
        newPost: Post!
    }
`;