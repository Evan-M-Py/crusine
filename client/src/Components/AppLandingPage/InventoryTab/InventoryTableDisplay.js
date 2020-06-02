// import React, {useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import { Row, Container, Col, Modal, Button } from 'react-bootstrap';
// import Axios from 'axios';

// const  InventoryTableDisplay = (props) => {


//   const [show, setShow] = useState(false);
//   const [ updateBool, setUpdateBool ] = useState(false);

//   var timeOut

//   const handleCloseCancel = () => {
    
//     setShow(false);
//     setUpdateBool(false);


//   };
  
//   const handleCloseSubmit = () => {
//     console.log('sucsess')
//     setShow(false);
//     setUpdateBool(true);

    

//   };
//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);



//  const style = {
//      tableLabels: {
//          width:''
//      }
//  }

//  function customConfirm(next, dropRowKeys) {
//     for (let i = 0; i < dropRowKeys.length; i++) {
//     const dbObj = dropRowKeys[i]
//     // console.log(dropRowKeysStr);
//       Axios.delete('/api/inventoryDel/' + dbObj).then((res) => {
//         next();
//         })
//       }
//     };

// const selectRowProp = {
//   mode: 'checkbox'
// };

//  const options = {
//   handleConfirmDeleteRow: customConfirm
// };




// function onAfterSaveCell(row, cellName, cellValue) {
//   const dbObj = row.id

//   // setShow(true);

// };


// function onBeforeSaveCell(row, cellName, cellValue) {

// };


// function onBeforeSaveCellAsync(row, cellName, cellValue, done) {
//   // if your validation is async, for example: you want to pop a confirm dialog for user to confim
//   // in this case, react-bootstrap-table pass a callback function to you
//   // you are supposed to call this callback function with a bool value to perfom if it is valid or not
//   // in addition, you should return 1 to tell react-bootstrap-table this is a async operation.
//   setShow(true)


  
//   setTimeout(() => {
//     if(updateBool === true){
//       done(true);
//     }else{
//       done(false)
//     } 
//   }, 8000);

//   return 1;  
  

// }

// const cellEditProp = {
//   mode: 'click',
//   blurToSave: true,
//   beforeSaveCell: onBeforeSaveCellAsync, // a hook for before saving cell
//   afterSaveCell: onAfterSaveCell  // a hook for after saving cell
// };

//   return (
//     <div>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseCancel}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleCloseSubmit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <BootstrapTable cellEdit={ cellEditProp } deleteRow={ true } selectRow={ selectRowProp } data={props.data} scrollTop={ 'Bottom' } options={options}>
//         <TableHeaderColumn 
//           isKey='true'
//           dataField='id'
//           dataAlign='center'
//           headerAlign="left"
//           width="75"
//         >
//           ID
//           </TableHeaderColumn>
//         <TableHeaderColumn 
//           dataField='category'
//           dataAlign='center'
//           headerAlign="left"
//           width="175"
//         >
//           Category
//           </TableHeaderColumn>
//         <TableHeaderColumn 
//           dataField='itemName'
//           dataAlign='center'
//           headerAlign="left"
//           width="325"
//         >
//           Item Name
//           </TableHeaderColumn>
//         <TableHeaderColumn 
//           dataField='unit'
//           dataAlign='center'
//           headerAlign="left"
//           width="100"
//         >
//           Quantity Type
//           </TableHeaderColumn>
//         <TableHeaderColumn 
//           dataField='quantity'
//           dataAlign='center'
//           headerAlign="left"
//           width="100"
//         >
//           Quantity
//           </TableHeaderColumn>
//         <TableHeaderColumn 
//           dataField='price'
//           dataAlign='center'
//           headerAlign="left"
//           width="200"
//         >
//           Cost
//           </TableHeaderColumn>
//       </BootstrapTable>

//     </div>
//   )
// }

// export default InventoryTableDisplay;


import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Row, Container, Col, Modal, Button } from 'react-bootstrap';
import Axios from 'axios';
import { Route } from 'react-router-dom';
import { DBCLICK_TO_CELL_EDIT } from 'react-bootstrap-table2-editor/lib/src/const';

const  InventoryTableDisplay = (props) => {


  const [show, setShow] = useState(false);
  const [ updateBool, setUpdateBool ] = useState(false);

  var timeOut

  const handleCloseCancel = () => {
    
    setShow(false);
    setUpdateBool(false);


  };
  
  const handleCloseSubmit = () => {
    console.log('sucsess')
    setShow(false);
    setUpdateBool(true);

    

  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

//===================================================================================================================================================

const [ updateTarget, setUpdateTarget ] = useState('')


const updateAxios = (x) => {

  Axios.put("/api/inventory/", x ).then((res) => {
    console.log("completed")
  })
};

const columns = [
  { dataField: 'id', text: 'Id' },
  { dataField: 'category', text: 'Category' },
  { dataField: 'itemName', text: 'Item Name' },
  { dataField: 'unit', text: 'Unit' },
  { dataField: 'quantity', text: 'Quantity' },
  { dataField: 'price', text: 'Price' },
]

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
const tableData = [...props.data]

  return (
    <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <BootstrapTable columns={ columns } keyField='id' cellEdit={ cellEdit }  data={props.data} />

    </div>
  )
}

export default InventoryTableDisplay;