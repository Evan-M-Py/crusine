import React, { useState } from 'react';
import './TopNav.css';
// import DropdownBase from '../DropdownBase';
import Brand from '../Brand'
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const TopNav = (props) => {

    const [toggleState, setToggleState] = useState({
        toggle: false
    });
    const [trucksState, setTrucksState] = useState({
        trucks: ''
    });

    const truckOptions = [trucksState.trucks];

    const logoutFunction = () => {
        Axios.get('/logout').then(
            props.history.push("/")
        );
        props.handleContextChange();
    };

    return (
        <nav className="topNav">

            <div className="brand">
                <Brand />
            </div>

            <ul className={`navLinks ${toggleState.toggle ? "nav-active" : ""}`}>

                <li className="brand text-center mb-3"><a className="logout" onClick={() => logoutFunction()} >Logout</a></li>

            </ul>

        </nav>
    )

}


export default withRouter(TopNav);