import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Label, Icon, Popup } from 'semantic-ui-react';

function LikeButton({ id, likes, likesCount, user }) {
    const [liked, setLiked] = React.useState(false);

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id }
    });

    React.useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    function renderLikeButton() {
        return user ? (
            liked ? (
                <Popup 
                    inverted
                    content="Unlike post"
                    trigger={
                        <Button color='teal'>
                            <Icon name='heart' />
                        </Button>
                    }
                />
            ) : (
                <Popup 
                    inverted
                    content="Like post"
                    trigger={
                        <Button color='teal' basic>
                            <Icon name='heart' />
                        </Button>
                    }
                />
            )
        ) : (
            <Button color='teal' basic as={Link} to='/login'>
                <Icon name='heart' />
            </Button>
        )
    }

    function handleLikePost() {
        likePost();
    }

    return (
        <Button as='div' labelPosition='right' onClick={handleLikePost}>
            { renderLikeButton() }
            <Label basic color='teal' pointing='left'>
                {likesCount}
            </Label>
        </Button>
    );
}

const LIKE_POST = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likesCount
        }
    } 
`;

export default LikeButton;