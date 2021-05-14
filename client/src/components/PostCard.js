import React from 'react';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
    const { id, username, body, createdAt, likesCount, commentsCount, likes } = post;

    function likePost() {
        console.log('You liked post with id: ', id);
    }

    function commentOnPost() {
        console.log('You want to comment on post with id: ', id);
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
                <Button as='div' labelPosition='right'>
                    <Button color='teal' basic onClick={likePost}>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {likesCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic onClick={commentOnPost}>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentsCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
}

export default PostCard;
