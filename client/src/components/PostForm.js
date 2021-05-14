import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS } from '../util/graphql';

function PostForm() {
    const [body, setBody] = React.useState('');
    const [createPost, { error }] = useMutation(CREATE_POST, {
        variables: { body },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS,
            });

            proxy.writeQuery({
                query: FETCH_POSTS,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts]
                }
            });

            setBody('');
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        createPost();
    }

    function handleChange(e) {
        setBody(e.target.value);
    }

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input type='text' placeholder='Hi World!' name='body' onChange={handleChange} value={body} />
                <Button type='submit' color='teal'>
                    Submit
                </Button>
            </Form.Field>
        </Form>
    );
}

const CREATE_POST = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likesCount
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

export default PostForm;
