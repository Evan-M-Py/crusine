import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Axios from 'axios';

const  InventoryTableDisplay = (props) => {


 const style = {
     tableLabels: {
         width:''
     }
 }

 function customConfirm(next, dropRowKeys) {
  // const dropRowKeysStr = dropRowKeys.join(',')
  console.log(dropRowKeys);
  const dbObj = dropRowKeys[0]
  // console.log(dropRowKeysStr);
    Axios.delete('/api/inventory/' + dbObj).then((res) => {
      next();
      })
    };

const selectRowProp = {
  mode: 'checkbox'
};

 const options = {
  handleConfirmDeleteRow: customConfirm
};

  return (
    <div>
      <BootstrapTable deleteRow={ true } selectRow={ selectRowProp } data={props.data} options={options}>
        <TableHeaderColumn 
          isKey='true'
          dataField='id'
          dataAlign='center'
          headerAlign="left"
          width="75"
        >
          ID
          </TableHeaderColumn>
        <TableHeaderColumn 
          dataField='category'
          dataAlign='center'
          headerAlign="left"
          width="175"
        >
          Catagory
          </TableHeaderColumn>
        <TableHeaderColumn 
          dataField='itemName'
          dataAlign='center'
          headerAlign="left"
          width="325"
        >
          Item Name
          </TableHeaderColumn>
        <TableHeaderColumn 
          dataField='unit'
          dataAlign='center'
          headerAlign="left"
          width="100"
        >
          Quantity Type
          </TableHeaderColumn>
        <TableHeaderColumn 
          dataField='quantity'
          dataAlign='center'
          headerAlign="left"
          width="100"
        >
          Quantity
          </TableHeaderColumn>
        <TableHeaderColumn 
          dataField='price'
          dataAlign='center'
          headerAlign="left"
          width="200"
        >
          Cost
          </TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default InventoryTableDisplay;