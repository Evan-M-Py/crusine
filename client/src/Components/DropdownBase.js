import React from "react";
import { Dropdown } from 'react-bootstrap';

const DropdownBase = props => {
    return(
        <Dropdown style={props.style}>
            <Dropdown.Toggle className="landing-btn" size='sm' id="dropdown-basic">
                {props.value}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                {props.options.map((x) => (<Dropdown.Item onClick={(e) => props.handleDropdownChange(e.target.innerText)}>{x}</Dropdown.Item>))}
            </Dropdown.Menu>
        </Dropdown>
    )
};

export default DropdownBase;