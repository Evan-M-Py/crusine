import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryPage from '../InventoryTab/InventoryPage';
import SideNav from '../SideNav';
import Wrapper from '../../wrapper';

function FullAppPage() {

    const displayDash = () => {
        console.log('yess');
    };

    const displayInventory = () => {
        console.log('yess');
    };

    const displayExpenses = () => {
        console.log('yess');
    };

    const style = {
        container: {
            margin: '0',
            padding: '0'
        }
    }

    return (
        <Wrapper inside={(
            <Container style={style.container}>
                <Row >
                    <Col xs={1} md={2} lg={2}>
                <SideNav />
                </Col>

                <Col>    
                        <BrowserRouter>
                        
                            <Switch>
                                <Route exact path="/dashboard">
                                    <InventoryPage/>
                                </Route>
                                <Route exact path="/inventory">
                                    <InventoryPage />
                                </Route>
                                <Route exact path="/expenses">
                                    <InventoryPage />
                                </Route>
                                <Route path='*'>
                                    <InventoryPage />
                                </Route>
                            </Switch>
                        </BrowserRouter>
                        </Col>
                </Row>
            </Container>
            )}/>
    )
}

export default FullAppPage;