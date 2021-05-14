import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

function Register({ history }) {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errors, setErrors] = React.useState({});

    const [registerUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, result) {
            console.log('register user result: ', result);
            history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: {username, email, password, confirmPassword}
    });

    function handleSubmit(e) {
        e.preventDefault();
        registerUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input type='text' label='Username' placeholder='Username..' name='username' value={username} onChange={e => setUsername(e.target.value)} error={errors.username}/>
                <Form.Input type='email' label='Email' placeholder='Email..' name='email' value={email} onChange={e => setEmail(e.target.value)} error={errors.email}/>
                <Form.Input type='password' label='Password' placeholder='Password..' name='password' value={password} onChange={e => setPassword(e.target.value)} error={errors.password}/>
                <Form.Input type='password' label='Confirm Password' placeholder='Confirm Password..' name='confirmPassword' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} error={errors.password}/>
                <Button type='submit' primary>
                    Register
                </Button>
            </Form>
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register($username: String! $email: String! $password: String! $confirmPassword: String!) {
        register(registerInput: {username: $username, email: $email, password: $password, confirmPassword: $confirmPassword}) {
            id
            username
            email
            createdAt
            token
        }
    } 
`;

export default Register;
