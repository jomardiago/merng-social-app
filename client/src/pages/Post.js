import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';

function Post(props) {
    const { user } = React.useContext(AuthContext);
    const postId = props.match.params.postId;
    const { loading, data } = useQuery(FETCH_POST, {
        variables: { postId }
    });

    function handleCommentClick() {
        console.log('handleCommentClick hit!');
    }

    function redirectToHome() {
        props.history.push('/');
    }

    function renderPost() {
        const { id, body, username, createdAt, likes, likesCount, commentsCount } = data.getPost;

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image floated='right' size='small' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{ username }</Card.Header>
                                <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton id={id} likes={likes} likesCount={likesCount} user={user} />
                                <Button as="div" labelPosition="right" onClick={handleCommentClick}>
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">{commentsCount}</Label>
                                </Button>
                                { user?.username === username && <DeleteButton postId={id} callback={redirectToHome} /> }
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    if (loading) {
        return <p>Loading post...</p>
    }

    return (
        <div>
            { renderPost() }
        </div>
    );
}

const FETCH_POST = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            username
            createdAt
            likesCount
            likes {
                username
            }
            commentsCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default Post;