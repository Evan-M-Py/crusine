import React, { useState } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';
import Input from '../../InputBase';
import DropdownBase from "../../DropdownBase";

// Whenever we try to render an array containing JSX, React knows to render each JSX element separately

const categoryOptions = ['Kitchen-Appliances', 'Tools', 'Vehicle', 'FOH', 'MISC'];


function ExpenseInsert(props) {

    const [expense, setExpense] = useState({
        expense: ''
    });
    const [dollars, setDollars] = useState({
        dollars: ''
    });
    const [cents, setCents] = useState({
        cents: ''
    });
    const [category, setCategory] = useState(categoryOptions[0]);


    let formattedPrice = `${dollars.dollars}.${cents.cents}`;



    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === 'expense') {
            setExpense({
                expense: value
            });
        };

        if (name === 'dollarPrice') {
            setDollars({
                dollars: value
            });
        };

        if (name === 'centPrice') {
            setCents({
                cents: value
            });
        };

    };

    const expObj = {
        expense: expense.expense,
        category,
        cost: formattedPrice,
    };

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
                <Input className="form-control mb-2 px-1" style={style.inputStyle} placeholder='Name' inputLabel='Item Name' handleInputChange={handleInputChange} name='expense' value={expense.expense} />
                <DropdownBase className="ml-2" buttonLabel={'select expense category'} style={style.dropdownStyle} handleDropdownChange={setCategory} name='category' value={category} options={categoryOptions} />
            </Row>
            <Row>
                <p style={style.itemLabel}>Cost: $</p>
                <Input className="form-control px-1" style={style.inputCostStyle} placeholder='0000' handleInputChange={(e) => handleInputChange(e)} name='dollarPrice' maxLength={6}></Input>
                <p>.</p>
                <Input className="form-control px-1" style={style.inputCostStyle} placeholder='00' handleInputChange={(e) => handleInputChange(e)} name='centPrice' maxLength={2}></Input>

                <Button className="landing-btn ml-4" size='sm' style={style.button} onClick={() => props.expenseInsertAjax(expObj)}>Submit Item to Inventory</Button>
            </Row>
        </Container>
    );
};

export default ExpenseInsert;
