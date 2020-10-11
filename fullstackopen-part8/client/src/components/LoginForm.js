import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;

const LoginForm = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useMutation(LOGIN);

    if (!props.show) return null;

    const handleSubmit = async event => {
        event.preventDefault();
        const response = await login({ variables: { username, password } });
        if (response) {
            const token = response.data.login.value;
            props.setToken(token);
            localStorage.setItem('booklist-user-token', token);
            props.setPage('authors');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>&nbsp;
                <input name="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
                <br />
                <label htmlFor="password">Password</label>&nbsp;
                <input name="password" type="password" onChange={({ target }) => setPassword(target.value)} />
                <br /><br />
                <button>Login</button>
            </form>
        </>
    );
};

export default LoginForm;