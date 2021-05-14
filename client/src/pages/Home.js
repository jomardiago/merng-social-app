import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import PostCard from '../components/PostCard';

function Home() {
    const { loading, data } = useQuery(FETCH_POSTS);

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    loading ? (
                        <h1>Loading posts...</h1>
                    ) : (
                        data.getPosts && data.getPosts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )
                }
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POSTS = gql`
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

export default Home;
