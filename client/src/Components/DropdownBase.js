import React from "react";
import { Dropdown } from 'react-bootstrap';

const DropdownBase = props => {
    return(
        <Dropdown  style={props.style}>
            <Dropdown.Toggle size='sm' variant="secondary" id="dropdown-basic">
                {props.buttonLabel}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                {props.options.map((x) => (<Dropdown.Item onClick={(e) => props.handleDropdownChange(e.target.innerText)}>{x}</Dropdown.Item>))}
            </Dropdown.Menu>
        </Dropdown>
    )
};

export default DropdownBase;