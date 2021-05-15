import React from 'react';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

function PostCard({ post }) {
    const { id, username, body, createdAt, likesCount, commentsCount, likes } = post;
    const { user } = React.useContext(AuthContext);

    function handleDeletePost() {
        console.log('handleDeletePost hit!');
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton id={id} likes={likes} likesCount={likesCount} user={user} />
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentsCount}
                    </Label>
                </Button>
                { user?.username === username && (
                    <Button as='div' color='red' onClick={handleDeletePost} floated='right'>
                        <Icon name='trash' style={{ margin: 0 }} />
                    </Button>
                ) }
            </Card.Content>
        </Card>
    );
}

export default PostCard;
