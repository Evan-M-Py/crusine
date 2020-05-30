import InventoryInsert from './AppLandingPage/InventoryTab/InventoryInsert'
import React, { useState, useRef } from "react";
import { Collapse, Button } from 'react-bootstrap';


const ButtonForInventoryComponents = props => {
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
          variant='secondary'
        >
          Sign up your first truck!
        </Button>
        <Collapse in={open}>
          <div styel={style.divSpot}>
           <TruckInsert truckAjaxPost={props.truckAJAXPost}/>
           </div>
        </Collapse>
      </>
  );
}

export default ButtonForInventoryComponents;