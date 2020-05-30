import React, { useState } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';
import Input from '../../InputBase';
import DropdownBase from "../../DropdownBase";

// Whenever we try to render an array containing JSX, React knows to render each JSX element separately

const quantityOptions = ['lbs.', 'oz.', 'dz.',];
const categoryOptions = ['Produce', 'Meat', 'Dairy', 'Non-Parish', 'Spices', 'Bread'];

function InventoryInsert(props) {

    const [text, setText] = useState({
        itemName: '',
        quantity: '',
        price: ''

    });

    const [category, setCategory] = useState(categoryOptions[0]);
    const [unit, setUnit] = useState(quantityOptions[0]);


    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setText((prevState) => ({
            ...prevState, [name]: value
        })
        )
    };

    const invObj = {
        ...text,
        category: category,
        unit: unit
    }


    const style = {
        container: {
            justifyContent: 'center'
        },
        itemLabel: {

            textAlign: 'right',
            alignSelf: 'stretch',
            width: '90px',
            margin: '5px'
        },
        inputStyle: {
            marginTop: '2px',
            padding: '0',
            width: '125px'
        },
        inputCostStyle: {
            width: '60px',
            margin: '0',
            padding: '0'
        },
        dropdownStyle: {
            marginLeft: '4px',
            height: '15px'
        },
        button: {
            marginLeft: '4px',
        }

    };


    return (
        <Container style={style.container}>
            <Row>
                <p style={style.itemLabel}>Item Name:</p>
                <Input style={style.inputStyle} placeholder='enter item name' inputLabel='Item Name' handleInputChange={(e) => handleInputChange(e)} name='itemName' value={text.itemName} />
                <DropdownBase buttonLabel={'select category'} style={style.dropdownStyle} handleDropdownChange={setCategory} name='category' value={category} options={categoryOptions} />
            </Row>
            <Row>
                <p style={style.itemLabel}>Quantity:</p>
                <Input style={style.inputStyle} placeholder='enter amount' handleInputChange={(e) => handleInputChange(e)} name='quantity' />
                <DropdownBase buttonLabel={'select unit'} style={style.dropdownStyle} handleDropdownChange={setUnit} name='unit' value={unit} options={quantityOptions} />
            </Row>
            <Row>
                <p style={style.itemLabel}>Price: $</p>
                <Input style={style.inputCostStyle} placeholder='0000.00' handleInputChange={(e) => handleInputChange(e)} name='price' ></Input>
                <Button variant='primary' size='sm' style={style.button} onClick={() => props.inventoryAjaxPost(invObj)}>Submit Item to Inventory</Button>
            </Row>
        </Container>
    );
};

export default InventoryInsert;
