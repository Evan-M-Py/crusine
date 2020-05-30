import React, { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
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


    return (
        <Container>
            <Row>
                <ButtonForInventoryComponents inventoryAJAXPost={inventoryInsertAJAX} />
            </Row>

            <Row>
                <InventoryDisplayTable data={invDisplay}  />
            </Row>
        </Container>
    )
}

export default InventoryPage;
