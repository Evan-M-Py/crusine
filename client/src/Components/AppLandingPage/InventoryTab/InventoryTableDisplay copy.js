import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapTable } from 'react-bootstrap-table-next';
import { Row, Container, Col, Modal, Button } from 'react-bootstrap';
import Axios from 'axios';

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

const columns = [
  { dataField: 'id', text: 'Id' },
  { dataField: 'category', text: 'Category' },
  { dataField: 'itemName', text: 'Item Name' },
  { dataField: 'unit', text: 'Unit' },
  { dataField: 'quantity', text: 'Quantity' },
  { dataField: 'price', text: 'Price' },
]

const cellEdit = {
  
  beforeSaveCell: (oldValue, newValue, row, column) => { 
    console.log(newValue);
  }
}
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

      <BootstrapTable keyField='id' cellEdit={ cellEditProp } deleteRow={ true } selectRow={ selectRowProp } data={props.data} scrollTop={ 'Bottom' } options={options}/>

    </div>
  )
}

export default InventoryTableDisplay;