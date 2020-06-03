import ExpenseInsert from './ExpenseInsert'
import React, { useState } from "react";
import { Collapse, Button } from 'react-bootstrap';


const ButtonForExpensesComponent = props => {
    const [open, setOpen] = useState(false);

    const style = {
        divSpot: {

        }
    }

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                // aria-expanded={open}
                className='landing-btn mb-1'
            >
                Add Expense
        </Button>
            <Collapse in={open}>
                <div styel={styleMedia.divSpot}>
                    <ExpenseInsert expenseInsertAjax={props.expenseInsertAjax} />
                </div>
            </Collapse>
        </>
    );
}

export default ButtonForExpensesComponent;