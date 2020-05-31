import React, { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryDisplayTable from './InventoryTableDisplay';
import axios from "axios";
import ButtonForInventoryComponents from "./InsertInventoryButton"

function InventoryPage(props) {

    const [count, setCount] = useState(0);

    const [invDisplay, setInvDisplay] = useState([{}]);


    const inventoryInsertAJAX = (thing) => {
        console.log('post made it this far')
        const invObj = {
            category: thing.category,
            itemName: thing.itemName,
            unit: thing.unit,
            quantity: thing.quantity,
            price: thing.price,
            TruckId: Number(props.userID)
        };

        axios.post('/api/inventory/create', invObj).then((res) => setCount(count +1));

    };

    const inventoryTableAJAX = () => {
        return axios.get("/api/inventory/" + props.userID).then((res) => {
            setInvDisplay(res.data);
        })
    };

    useEffect(() => {
        inventoryTableAJAX()
    }, [count])


    const style = {
        
        tableStyle: {
            width: '100rem'
        },
        
        graphSize: {
            margin: '3px',
            marginLeft: '2rem',
            height: '25rem',
            width: '35rem',
            background: 'blue'
        },

        container: {
            marginTop: '2rem'
        }

    }

    return (
    <> 
        <Container style={style.container}>
            <Row>

                <Col md='6'>
                    <Row>
                        <ButtonForInventoryComponents inventoryAJAXPost={inventoryInsertAJAX} />
                    </Row>

                    <Row >
                        <InventoryDisplayTable style={style.tableStyle} data={invDisplay}  />
                    </Row>
                </Col>

                <Col md='6'>
                    <Row>

                        <Col>
                        <div style={style.graphSize}>

                        </div>
                        </Col>

                        <Col>
                        <div style={style.graphSize}>

                        </div>
                        </Col>

                    </Row>

                </Col>


            </Row>

        </Container>
    </>   
    )
}

export default InventoryPage;
