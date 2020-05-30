import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function TodoList() {
    return (
        <div>
            <Container>
                <h3>To-Do List</h3>
                <Row>
                    <div id="todosDiv">

                    </div>
                </Row>
                <Row>
                    <Form>
                        <Col>
                            <Form.Group controlId="todo">
                                <Form.Label>What do you need to do?</Form.Label>
                                <Form.Control
                                    type="todo"
                                    placeholder="Enter Item To Do"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="description">
                                <Form.Label>Tell me more...</Form.Label>
                                <Form.Control
                                    type="description"
                                    placeholder="Description"
                                />
                            </Form.Group>
                        </Col>
                        <Row>
                            <Button
                                className="landing-btn col-4 mt-3"
                                variant="primary"
                                type="submit"
                            >
                                Add</Button>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}

export default TodoList