import React from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS } from '../util/graphql';

function DeleteButton({ postId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const [deleteEntity] = useMutation(commentId ? DELETE_COMMENT : DELETE_POST, {
        update(proxy) {
            setConfirmOpen(false);

            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS
                });
                proxy.writeQuery({
                    query: FETCH_POSTS,
                    data: {
                        getPosts: [...data.getPosts.filter(post => post.id !== postId)]
                    }
                });
            }
            
            if (callback) callback(); 
        },
        variables: { postId, commentId }
    });

    function handleDeletePost() {
        setConfirmOpen(true);
    }

    function handleConfirmCancel() {
        setConfirmOpen(false);
    }

    function handleConfirmDelete() {
        deleteEntity();
    }

    return (
        <>
            <Button as='div' color='red' floated='right' onClick={handleDeletePost}>
                <Icon name='trash' style={{ margin: 0 }} />
            </Button>
            <Confirm open={confirmOpen} onCancel={handleConfirmCancel} onConfirm={handleConfirmDelete} />
        </>
    );
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentsCount
        }
    }
`;

export default DeleteButton;