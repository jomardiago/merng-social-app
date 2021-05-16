import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Card, Form, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';

function Post(props) {
    const { user } = React.useContext(AuthContext);
    const postId = props.match.params.postId;
    const commentInputRef = React.useRef(null);

    const [commentBody, setCommentBody] = React.useState('');

    const { loading, data } = useQuery(FETCH_POST, {
        variables: { postId }
    });
    const [createComment] = useMutation(CREATE_COMMENT, {
        update() {
            setCommentBody('');
            commentInputRef.current.blur();
        },
        variables: { postId, body: commentBody }
    });

    function redirectToHome() {
        props.history.push('/');
    }

    function handleInputChange(e) {
        setCommentBody(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        createComment();
    }

    function renderPost() {
        const { id, body, username, createdAt, likes, likesCount, comments, commentsCount } = data.getPost;

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image floated='right' size='small' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{ username }</Card.Header>
                                <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton id={id} likes={likes} likesCount={likesCount} user={user} />
                                <Button as="div" labelPosition="right">
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">{commentsCount}</Label>
                                </Button>
                                { user?.username === username && <DeleteButton postId={id} callback={redirectToHome} /> }
                            </Card.Content>
                        </Card>
                        {
                            user && (
                                <Card fluid>
                                    <Card.Content>
                                        <p>Post a comment</p>
                                        <Form>
                                            <div className="ui action input fluid">
                                                <input type="text" placeholder="Comment.." name="commentBody" value={commentBody} onChange={handleInputChange} ref={commentInputRef} />
                                                <button type="submit" className="ui button teal" disabled={commentBody.trim() === ''} onClick={handleSubmit}>Submit</button>
                                            </div>
                                        </Form>
                                    </Card.Content>
                                </Card>
                            )
                        }
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {
                                        user?.username === comment.username && (
                                            <DeleteButton postId={id} commentId={comment.id} />
                                        )
                                    }
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
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

const CREATE_COMMENT = gql`
    mutation ($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                username
                createdAt
            }
            commentsCount
        }
    }
`;

export default Post;