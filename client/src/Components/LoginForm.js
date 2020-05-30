import React, { Component, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Brand from "../Components/Brand";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import UserContext from '../utils/userContext'


function LoginPage(props) {

    const { register, handleSubmit, watch, errors } = useForm();

    const [ text, setText ] = useState({
        username: '',
        password: ''
    });
    const [ loginStatus, setLoginStatus ] = useState(false);
    
    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name);
        console.log(value)

        setText((prevState) => ({
            ...prevState, [name]: value
        })
        )
    }; 

    const onSubmit = (e) => {
        console.log('outside axios')
        console.log(text)
        axios.post('/login', text).then(response => {
            console.log('inside axios')
            const truckId = response.data.truckObj[0].id
            props.handleContextChange( truckId )
            setLoginStatus(true);
        });
    }
        if(loginStatus){
            return <Redirect to='/dashboard'  />
        } else
        return (
            <div  className="login">
                    <Container className="login d-flex align-items-center w-100">
                        <Row className="justify-content-center w-100">
                            <Jumbotron className="col-8">
                                <Brand />
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col>
                                            
                                            <label>Username</label>
                                            <input onChange={(e) => handleInputChange(e)} type='text' name="username" placeholder="Enter your username"/>
                                            
                                        </Col>
                                        <Col>
                                            
                                                <label>Password</label>
                                                <input onChange={(e) => handleInputChange(e)} type='text' name="password" placeholder="Enter your password"/>
                                            
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <button
                                            className="landing-btn col-4 mt-3"
                                            variant="primary"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <a className="mt-3 teal" href="/signup">
                                            Not a member yet? Sign up here
                                        </a>
                                    </Row>
                                </form>
                            </Jumbotron>
                        </Row>
                    </Container>

            </div>
        );
    }

export default LoginPage;
