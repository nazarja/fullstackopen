import React, { useState } from 'react';

const LoginForm = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        const result = await props.login({
            variables: { username, password }
        });

        if (result) {
            const token = result.data.login.value;
            props.setToken(token);
            localStorage.setItem('phonenumbers-user-token', token)
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>&nbsp;
            <input name="username" type="text" value={username} onChange={({target}) => setUsername(target.value)}/>
            <br />
            <label htmlFor="password">Password</label>&nbsp;
            <input name="password" type="password"  onChange={({target}) => setPassword(target.value)}/>
            <br /><br />
            <button>Login</button>
        </form>
    );
};

export default LoginForm;