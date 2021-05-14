import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

function Login({ history }) {
    const {login} = React.useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState({});

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}) {
            login(userData);
            history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: {username, password}
    });

    function handleSubmit(e) {
        e.preventDefault();
        loginUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input type='text' label='Username' placeholder='Username..' name='username' value={username} onChange={e => setUsername(e.target.value)} error={errors.username}/>
                <Form.Input type='password' label='Password' placeholder='Password..' name='password' value={password} onChange={e => setPassword(e.target.value)} error={errors.password}/>
                <Button type='submit' primary>
                    Login
                </Button>
            </Form>
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login($username: String! $password: String!) {
        login(loginInput: {username: $username, password: $password}) {
            id
            username
            token
        }
    } 
`;

export default Login;
