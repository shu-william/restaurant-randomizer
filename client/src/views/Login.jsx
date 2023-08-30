import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = ({ loggedIn, setLoggedIn }) => {
    return (
        <div className="my-3">
            <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
    )
}

export default Login;
