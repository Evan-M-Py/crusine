// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import Axios from 'axios';

// const ExpenseTableDisplay = (props) => {


//     const style = {
//         tableLabels: {
//             width: ''
//         }
//     }

//     function customConfirm(next, dropRowKeys) {
//         for (let i = 0; i < dropRowKeys.length; i++) {
//             const dbObj = dropRowKeys[i]
//             // console.log(dropRowKeysStr);
//             Axios.delete('/api/expenseDel/' + dbObj).then((res) => {
//                 next();
//             })
//         }
//     };

//     const selectRowProp = {
//         mode: 'checkbox'
//     };

//     const options = {
//         handleConfirmDeleteRow: customConfirm
//     };

//     return (
//         <div>
//             <BootstrapTable deleteRow={true} selectRow={selectRowProp} data={props.data} options={options} data={props.data}>
//                 <TableHeaderColumn
//                     isKey
//                     dataField='id'
//                     dataAlign='center'
//                     headerAlign="left"
//                     width="75"
//                 >
//                     ID
//           </TableHeaderColumn>
//                 <TableHeaderColumn
//                     dataField='category'
//                     dataAlign='center'
//                     headerAlign="left"
//                     width="175"
//                 >
//                     Category
//           </TableHeaderColumn>
//                 <TableHeaderColumn
//                     dataField='expense'
//                     dataAlign='center'
//                     headerAlign="left"
//                     width="325"
//                 >
//                     Expense
//           </TableHeaderColumn>
//                 <TableHeaderColumn
//                     dataField='price'
//                     dataAlign='center'
//                     headerAlign="left"
//                     width="100"
//                 >
//                     Cost
//           </TableHeaderColumn>
//             </BootstrapTable>
//         </div>
//     )
// }

// export default ExpenseTableDisplay;