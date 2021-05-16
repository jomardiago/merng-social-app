import React from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS } from '../util/graphql';

function DeleteButton({ postId, callback }) {
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy) {
            setConfirmOpen(false);

            const data = proxy.readQuery({
                query: FETCH_POSTS
            });
            proxy.writeQuery({
                query: FETCH_POSTS,
                data: {
                    getPosts: [...data.getPosts.filter(post => post.id !== postId)]
                }
            });
            
            if (callback) callback(); 
        },
        variables: { postId }
    });

    function handleDeletePost() {
        setConfirmOpen(true);
    }

    function handleConfirmCancel() {
        setConfirmOpen(false);
    }

    function handleConfirmDelete() {
        deletePost();
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

export default DeleteButton;