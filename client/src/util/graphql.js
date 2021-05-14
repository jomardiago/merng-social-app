import gql from 'graphql-tag';

export const FETCH_POSTS = gql`
    {
        getPosts {
            id
            username
            body
            createdAt
            likesCount
            likes {
                username
            }
            commentsCount
            comments {
                id
                username
                body
                createdAt
            }
        }
    }
`;