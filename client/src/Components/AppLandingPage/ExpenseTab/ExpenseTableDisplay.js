import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Row, Container, Col, Modal, Button } from 'react-bootstrap';
import Axios from 'axios';
import { Route } from 'react-router-dom';

const ExpenseTableDisplay = (props) => {
    const [updateTarget, setUpdateTarget] = useState('')

    const updateAxios = (x) => {
        console.log(x)
        console.log(x.id)
        Axios.put("/api/inventory/", x).then((res) => {
            console.log("completed")
        })
    };

    const columns = [
        { dataField: 'id', text: 'Id' },
        { dataField: 'category', text: 'Category' },
        { dataField: 'expense', text: 'expense' },
        { dataField: 'price', text: 'Price' },
    ]

    function customConfirm(next, dropRowKeys) {
        for (let i = 0; i < dropRowKeys.length; i++) {
            const dbObj = dropRowKeys[i]

            Axios.delete('/api/expenseDel/' + dbObj).then((res) => {
                next();
            })
        }
    };

    const cellEdit = cellEditFactory({
        mode: 'click',
        onStartEdit: (row, column, rowIndex, columnIndex) => { setUpdateTarget(row) },
        beforeSaveCell(oldValue, newValue, row, column, done) {


            setTimeout(() => {
                if (window.confirm('Do you want to accep this change?')) {

                    done(); // contine to save the changes
                    updateAxios(row)
                } else {
                    done(false); // reject the changes
                }
            }, 0);
            return { async: true };


        }

    });


    return (
        <div>
            <BootstrapTable columns={columns} keyField='id' cellEdit={cellEdit} data={props.data} />

        </div>
    )
};

export default ExpenseTableDisplay;