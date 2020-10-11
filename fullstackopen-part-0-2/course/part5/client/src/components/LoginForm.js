import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password }) => {
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="Username">username</label> &nbsp;
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <br />
                    <label htmlFor="Password">password</label> &nbsp;
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

export default LoginForm;