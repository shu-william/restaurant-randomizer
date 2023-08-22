import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const LoginForm = ({ loggedIn, setLoggedIn }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [loginErrors, setLoginErrors] = useState("");
    const navigate = useNavigate();

    const registerHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", {
            username,
            email,
            password,
            confirmPassword 
        }, { withCredentials: true })
            .then(res => {
                // console.log(res);
                setLoggedIn(true);
                navigate("/home");
            })
            .catch(err => {
                setLoggedIn(false);
                if(err.response.data.code === 11000) {
                    let keyName = Object.keys(err.response.data.keyValue)[0];
                    setErrors([`The ${keyName} provided already exists.`]);
                } else {
                    const errorResponse = err.response.data.errors;
                    const errorArray = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArray.push(errorResponse[key].message);
                    }
                    setErrors(errorArray);
                }
            })
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {
            email,
            password
        }, { withCredentials: true })
            .then(res => {
                // console.log(res);
                setLoggedIn(true);
                navigate("/home");
            })
            .catch(err => {
                // console.log(err);
                setLoggedIn(false);
                setLoginErrors(err.response.data);
            })
    }

    return (
        <div>
            <div className="col-md-6 mx-auto">
                <h2 className="my-3">Register</h2>
                <Form onSubmit={registerHandler}> 
                    {errors.map((err, index) => (
                        <p key={index} className="text-danger">{err}</p>
                    ))}
                    <FormGroup>
                        <Label for="username">Username:</Label>
                        <Input id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email:</Label>
                        <Input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password:</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </FormGroup>
                    <Button tag="Input" type="submit" value="Register">Register</Button>
                </Form>    
            </div>
            <div className="col-md-6 mx-auto">
                <h2 className="my-3">Login</h2>
                <Form onSubmit={loginHandler}> 
                    { loginErrors ? <p className="text-danger">{loginErrors}</p> : "" }
                    <FormGroup>
                        <Label for="email">Email:</Label>
                        <Input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password:</Label>
                        <Input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>
                    <Button tag="Input" type="submit" value="Log In">Log In</Button>
                </Form>    
            </div>
        </div>
    )
}

export default LoginForm;
