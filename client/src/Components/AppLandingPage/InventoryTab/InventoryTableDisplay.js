import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Row, Container, Col, Modal, Button } from 'react-bootstrap';
import Axios from 'axios';
import { Route } from 'react-router-dom';
import { DBCLICK_TO_CELL_EDIT } from 'react-bootstrap-table2-editor/lib/src/const';

const InventoryTableDisplay = (props) => {

    const [updateBool, setUpdateBool] = useState(false);
    const [componentRemount, setComponentRemount] = useState(0)

    //===================================================================================================================================================

    function deleteHandler(dbObj) {
        for (let i = 0; i < dbObj.length; i++) {
            console.log(dbObj)
            Axios.delete('/api/inventoryDel/' + dbObj[i].id).then((res) => {
                props.count.setCount(props.count.count + 1)
                console.log('you deleted WHAT?!?!')

            })
        }
    };

    const [updateTarget, setUpdateTarget] = useState('')

    const updateAxios = (x) => {

        Axios.put("/api/inventory/", x).then((res) => {
            console.log("completed")
        })
    };

    const columns = [
        { dataField: 'id', text: 'ID' },
        { dataField: 'itemName', text: 'Item Name' },
        { dataField: 'category', text: 'Category' },
        { dataField: 'unit', text: 'Unit' },
        { dataField: 'quantity', text: 'Quantity' },
        { dataField: 'price', text: 'Price' },
    ]

    const cellEdit = cellEditFactory({
        mode: 'click',
        onStartEdit: (row, column, rowIndex, columnIndex) => { setUpdateTarget(row) },
        beforeSaveCell(oldValue, newValue, row, column, done) {


            setTimeout(() => {
                if (window.confirm('Do you want to accept this change?')) {

                    done(); // contine to save the changes
                    updateAxios(row)
                } else {
                    done(false); // reject the changes
                }
            }, 0);

            return { async: true };
        }
    });

    const tableData = [...props.data]

    const [deleteObject, setDeleteObject] = useState([]);

    const selectRow = {

        mode: 'checkbox',
        clickToExpand: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            console.log(row)
            setDeleteObject([...deleteObject, row])
        },
        mode: 'checkbox',
        onSelectAll: (isSelect, rows, e) => {
            console.log(rows)
            setDeleteObject(rows)
        }
    };

    const style = {
        deleteButton: {
            // color: 'red',
            // width: '4rem'
        }
    };

    return (
        <div>

            <button className="btn btn-danger mb-2" style={style.deleteButton} onClick={() => deleteHandler(deleteObject)}>Delete</button>

            <BootstrapTable key={componentRemount} selectRow={selectRow} columns={columns} keyField='id' cellEdit={cellEdit} data={props.data} />

        </div>
    );
};

export default InventoryTableDisplay;