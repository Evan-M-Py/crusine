import React, { Component, useState } from "react";
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

     
   const onSubmit = (data) => {
        data.preventDefault();
        console.log(data);
        const dbObj = { 
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            username: username,
            password: password,
            truckName: truckName
        };

        axios.post('/api/createuser', dbObj).then(rest => {
            props.handleChange(rest.data.user.id);
            return <Redirect to="/dashboard" />
        });
       
    };




    return (
            <div className="login">
                <Container className="login d-flex align-items-center w-100">
                    <Row className="justify-content-center w-100">
                        <Jumbotron className="col-8">
                            <Brand />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col>
                                            <label>first name: </label>
                                            <input type="text" name="firstName" onChange={handleSubmit(onSubmit)} ref={register({required: true, minLength: 2})}> </input>
                                    </Col>
                                    <Col>
                                            <label>last name:</label>
                                            <input type="text" name="lastName" onChange={handleSubmit(onSubmit)} ref={register({required: true, minLength: 2})}> </input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                            <label>email:</label>
                                            <input type="text" name="email" onChange={handleSubmit(onSubmit)} ref={register({required: true, minLength: 5})}> </input>
                                    </Col>
                                    <Col>
                                            <label>phone number:</label>
                                            <input type="text" name="phoneNumber" onChange={handleSubmit(onSubmit)} ref={register({required: true, minLength: 10, maxLength: 10})}> </input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                            <label>username:</label>
                                            <input type="text" name="username" onChange={handleSubmit(onSubmit)} ref={register({required: true, minLength: 8})}> </input>
                                    </Col>
                                    <Col>
                                            <label>password:</label>
                                            <input type="text" name="password" onChange={handleSubmit(onSubmit)} ref={register({required: true, minLength: 8})}> </input>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col className="col-6">
                                            <label htmlFor="truckName">truck name:</label>
                                            <input type="text" name="TruckName" onChange={handleSubmit(onSubmit)} ref={register({required: true, minLength: 8})}> </input>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <button
                                        className="landing-btn col-4 mt-3"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </Row>
                                <Row className="justify-content-center">
                                    <a className="mt-3 teal" href="/">
                                        Already a member? Sign in here
                                    </a>
                                </Row>
                            </form>
                        </Jumbotron>
                    </Row>
                </Container>
            </div>
        );
    }

export default SignupPage;