import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS } from '../util/graphql';

function Home() {
    const { user } = React.useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS);

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {
                    loading ? (
                        <h1>Loading posts...</h1>
                    ) : (
                        <Transition.Group>
                            {data.getPosts && data.getPosts.map(post => (
                                <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))}
                        </Transition.Group>
                    )
                }
            </Grid.Row>
        </Grid>
    );
}

export default Home;
