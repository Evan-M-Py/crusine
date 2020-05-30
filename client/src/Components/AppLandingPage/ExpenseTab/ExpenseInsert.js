import React, { useState } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';
import Input from '../../InputBase';
import DropdownBase from "../../DropdownBase";

// Whenever we try to render an array containing JSX, React knows to render each JSX element separately

const categoryOptions = ['Kitchen-Appliances', 'Tools', 'Vehicle', 'FOH', 'MISC'];


function ExpenseInsert(props) {

    const [text, setText] = useState({
        expense: '',
        quantity: '',
        cost: ''

    });

    const [category, setCategory] = useState(categoryOptions[0]);


    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setText((prevState) => ({
            ...prevState, [name]: value
        })
        )
    };

    const expObj = {
        ...text,
        category,
    }


    const style = {
        container: {
            justifyContent: 'center'
        },
        itemLabel: {
            color: 'black',
            textAlign: 'right',
            alignSelf: 'stretch',
            width: '90px',
            margin: '5px'
        },
        inputStyle: {
            marginTop: '2px',
            padding: '0',
            width: '150px'
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
                <p style={style.itemLabel}>Expense:</p>
                <Input style={style.inputStyle} placeholder='enter expense name' inputLabel='Item Name' handleInputChange={handleInputChange} name='expense' value={text.expense} />
                <DropdownBase buttonLabel={'select expense category'} style={style.dropdownStyle} handleDropdownChange={setCategory} name='category' value={category} options={categoryOptions} />
            </Row>
            <Row>
                <p style={style.itemLabel}>Cost: $</p>
                <Input style={style.inputCostStyle} placeholder='0000.00' handleInputChange={handleInputChange} name='cost' ></Input>
                <Button variant='primary' size='sm' style={style.button} onClick={() => props.expenseInsertAjax(expObj)}>Submit Item to Inventory</Button>
            </Row>
        </Container>
    );
};

export default ExpenseInsert;
