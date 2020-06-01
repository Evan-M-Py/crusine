import React from 'react';
import './TopNav.css';
import Brand from '../Brand';
import { withRouter } from 'react-router-dom';

const TopNav = (props) => {

    return (
        <nav className="topNav">

            <div className="brand">
                <Brand />
            </div>

        </nav>
    )

};

export default withRouter(TopNav);