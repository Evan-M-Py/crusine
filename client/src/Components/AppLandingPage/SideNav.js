import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wrapper from '../wrapper';
import SectionSelectorButton from './SectionSelectorButton';
import DashIcon from '../../icons/dash.png';
import ExpensesIcon from '../../icons/expenses.png';
import InventoryIcon from '../../icons/inventory.png';
import LogoutIcon from '../../icons/logout.png'
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Axios from 'axios';

const SideNav = (props) => {
    const style = {
        navStyle: {
            height: '100vh',
            width: '75px',
            backgroundColor: '#283B63',
            margin: '0',
            borderRadius: '0px, 6px, 6px, 0px',
            padding: '0px 5px 0px 5px'
        },
        buttonStyle: {
            margin: '10px 0 10px 0',
            width: '80px',
            height: '80px'
        }
    }

    const [loginStatus, setLoginStatus] = useState(false);

    const logoutFunction = () => {
        Axios.get('/logout').then(
            setLoginStatus(true)
        );
        props.handleContextChange();
    };

    const selectPage = () => {
    };

    if (loginStatus) {
        return <Redirect to='/' />
    } else
        return (
            <Wrapper inside={(
                <div style={style.navStyle} className="justify-content-center">

                    <Link to='/dashboard' data-tip data-for="dashboardTooltip">
                        {/* <SectionSelectorButton id="dashboardButton" select={selectPage} buttonImg={DashIcon} sectionName='Dashboard' style={style.buttonStyle} /> */}
                        <i class="fas fa-chart-pie fa-4x my-4" style={{ color: '#F2EFE7', text: "center" }}></i>
                    </Link>
                    <ReactTooltip id="dashboardTooltip">
                        <span>Dashboard</span>
                    </ReactTooltip>

                    <Link to='/inventory' data-tip data-for="inventoryTooltip">
                        {/* <SectionSelectorButton select={selectPage} buttonImg={InventoryIcon} sectionName='Inventory' style={style.buttonStyle} /> */}
                        <i class="fas fa-list fa-4x my-4" style={{ color: '#F2EFE7', text: "center" }}></i>
                    </Link>
                    <ReactTooltip id="inventoryTooltip">
                        <span>Inventory</span>
                    </ReactTooltip>

                    <Link to='/expenses' data-tip data-for="expensesTooltip">
                        {/* <SectionSelectorButton select={selectPage} buttonImg={ExpensesIcon} sectionName='Expenses' style={style.buttonStyle} /> */}
                        <i class="fas fa-receipt fa-4x my-4 ml-2" style={{ color: '#F2EFE7', text: "center" }}></i>
                    </Link>
                    <ReactTooltip id="expensesTooltip">
                        <span>Expenses</span>
                    </ReactTooltip>

                    <Link onClick={() => logoutFunction()} data-tip data-for="logoutTooltip">
                        {/* <SectionSelectorButton select={selectPage} buttonImg={LogoutIcon} sectionName='Logout' style={style.buttonStyle} /> */}
                        <i class="fas fa-sign-out-alt fa-4x my-4 ml-1" style={{ color: '#F2EFE7', text: "center" }}></i>
                    </Link>
                    <ReactTooltip id="logoutTooltip">
                        <span>Log Out</span>
                    </ReactTooltip>

                </div>
            )} />
        )
}
export default SideNav;