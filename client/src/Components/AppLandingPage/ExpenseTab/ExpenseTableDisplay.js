import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const  ExpenseTableDisplay = (props) => {


 const style = {
     tableLabels: {
         width:''
     }
 }

  return (
    <div>
      <BootstrapTable data={props.data}>
        <TableHeaderColumn 
          isKey
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
          dataField='expense'
          dataAlign='center'
          headerAlign="left"
          width="325"
        >
          Expense
          </TableHeaderColumn>
        <TableHeaderColumn 
          dataField='price'
          dataAlign='center'
          headerAlign="left"
          width="100"
        >
          Cost
          </TableHeaderColumn>
      </BootstrapTable>
    </div>
  )
}

export default ExpenseTableDisplay;