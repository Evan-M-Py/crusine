import React, { useState } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';
import Input from '../../InputBase';
import DropdownBase from "../../DropdownBase";

// Whenever we try to render an array containing JSX, React knows to render each JSX element separately

const quantityOptions = ['lbs.', 'oz.', 'dz.', 'ea.'];
const categoryOptions = ['Produce', 'Meat', 'Dairy', 'Non-Parish', 'Spices', 'Bread'];

function InventoryInsert(props) {

    const [text, setText] = useState({
        itemName: '',
        quantity: ''
    });

    const [dollars, setDollars] = useState({
        dollars: ''
    });

    const [cents, setCents] = useState({
        cents: ''
    });

    const [category, setCategory] = useState(categoryOptions[0]);
    const [unit, setUnit] = useState(quantityOptions[0]);

    let formattedPrice = `${dollars.dollars}.${cents.cents}`;
    // console.log(formattedPrice);

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === 'dollarPrice') {
            setDollars({
                dollars: value
            });
        }

        if (name === 'centPrice') {
            setCents({
                cents: value
            });
        }

        setText((prevState) => ({
            ...prevState, [name]: value
        })
        )
    };

    const invObj = {
        ...text,
        category: category,
        unit: unit,
        price: formattedPrice
    }

    const clearForms = () => {
        setText({
            itemName: '',
            quantity: ''
        });
        setDollars({
            dollars: ''
        });
        setCents({
            cents: ''
        });
        setCategory(categoryOptions[0]);
        setUnit(quantityOptions[0]);
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
                <Input className="form-control px-1 mb-1" style={style.inputStyle} placeholder='Name' inputLabel='Item Name' handleInputChange={(e) => handleInputChange(e)} name='itemName' value={text.itemName} />
                <DropdownBase buttonLabel={'select category'} style={style.dropdownStyle} handleDropdownChange={setCategory} name='category' value={category} options={categoryOptions} />
            </Row>
            <Row>
                <p style={style.itemLabel}>Quantity:</p>
                <Input className="form-control px-1 mb-1" style={style.inputStyle} placeholder='Amount' handleInputChange={(e) => handleInputChange(e)} name='quantity' value={text.quantity} />
                <DropdownBase buttonLabel={'select unit'} style={style.dropdownStyle} handleDropdownChange={setUnit} name='unit' value={unit} options={quantityOptions} />
            </Row>
            <Row>
                <p style={style.itemLabel}>Price: $</p>
                <Input className="form-control px-1 mb-2" style={style.inputCostStyle} placeholder='0000' handleInputChange={(e) => handleInputChange(e)} name='dollarPrice' maxLength={6} value={dollars.dollars}></Input>
                <p>.</p>
                <Input className="form-control px-1 mb-2" style={style.inputCostStyle} placeholder='00' handleInputChange={(e) => handleInputChange(e)} name='centPrice' maxLength={2} value={cents.cents}></Input>
                <Button className="landing-btn mb-2" size='sm' style={style.button} onClick={() => {
                    props.inventoryAjaxPost(invObj);
                    clearForms();
                }} >Submit Item to Inventory</Button>
            </Row>
        </Container>
    );
};

export default InventoryInsert;
