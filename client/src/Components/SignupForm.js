import React, { useState } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Brand from "./Brand";
import Container from "react-bootstrap/Container";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const SignupPage = (props) => {

    const { register, handleSubmit, watch, errors } = useForm();

    const [loginStatus, setLoginStatus] = useState(false)

    const onSubmit = (data) => {

        axios.post('/api/createuser', data).then((res) => {
            console.log(res)
            console.log('stops here')
            const truckId = res.data.truck.id
            props.handleContextChange(truckId)
            setLoginStatus(true);
        })


    };


    return (

        <div className="login">
            {loginStatus ? <Redirect to='/dashboard' /> : null}
            <Container className="login d-flex align-items-center w-100">
                <Row className="justify-content-center w-100">
                    <Jumbotron className="col-8">
                        <Brand />
                        <form >
                            <Row>
                                <Col>
                                    <label htmlFor='firstName'>First Name: </label>
                                    <input className="form-control" type="text" name="firstName" ref={register({ required: true, minLength: 2 })} />
                                </Col>
                                <Col>
                                    <label htmlFor='lastName'>Last Name:</label>
                                    <input className="form-control" type="text" name="lastName" ref={register({ required: true, minLength: 2 })} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor='email'>Email:</label>
                                    <input className="form-control" type="text" name="email" ref={register({ required: true, minLength: 5 })} />
                                </Col>
                                <Col>
                                    <label htmlFor='phonenumber'>Phone Number:</label>
                                    <input className="form-control" type="text" name="phoneNumber" ref={register({ required: true, minLength: 10, maxLength: 10 })} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor='username'>Username:</label>
                                    <input className="form-control" type="text" name="username" ref={register({ required: true, minLength: 6 })} />
                                </Col>
                                <Col>
                                    <label htmlFor='password'>Password:</label>
                                    <input className="form-control" type="password" name="password" ref={register({ required: true, minLength: 8 })} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col className="col-6">
                                    <label className="mt-2" htmlFor="truckName">Truck Name:</label>
                                    <input className="form-control" type="text" name="truckName" ref={register({ required: true, minLength: 5 })} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <button className="btn landing-btn teal mt-4" onClick={handleSubmit(onSubmit)} type="submit">Submit</button>
                            </Row>
                            <Row className="justify-content-center">
                                <a className="mt-3 teal" href="/" style={{ color: '#B7D4DC' }}>
                                    Already a member? Sign in here
                                    </a>
                            </Row>
                        </form>
                    </Jumbotron>
                </Row>
            </Container>
        </div>
    );
};

export default SignupPage;