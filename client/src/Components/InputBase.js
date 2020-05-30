import React from "react";
import Wrapper from './wrapper'

const Input = props => {

    return (
        <div>
            <input 
            style={props.style} 
            onChange={props.handleInputChange ? e => props.handleInputChange(e) : null} 
            value={props.value} name={props.name}  
            className={props.className} 
            placeholder={props.placeholder}/>
        </div>
    )
};

export default Input;