import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wrapper from '../wrapper';
import SectionSelectorButton from './SectionSelectorButton';
import DashIcon from '../../icons/dash.png';
import ExpensesIcon from '../../icons/expenses.png';
import InventoryIcon from '../../icons/inventory.png';
import LogoutIcon from '../../icons/logout.png'
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function SideNav() {
    const style = {
        navStyle: {
            height: '100vh',
            width: '75px',
            backgroundColor: 'lightGrey',
            margin: '0',
            borderRadius: '0px, 6px, 6px, 0px'
        },
        buttonStyle: {
            marginTop: '30px',
            width: '80px',
            height: '80px'
        }
    }
    const selectPage = () => {
    };
    return (
        <Wrapper inside={(
            <div style={style.navStyle}>
                
                <Link to='/dashboard' data-tip data-for="dashboardTooltip">
                    <SectionSelectorButton id="dashboardButton" select={selectPage} buttonImg={DashIcon} sectionName='Dashboard' style={style.buttonStyle} />
                </Link>
                <ReactTooltip id="dashboardTooltip">
                    <span>Dashboard</span>
                </ReactTooltip>
                
                <Link to='/inventory' data-tip data-for="inventoryTooltip">
                    <SectionSelectorButton select={selectPage} buttonImg={InventoryIcon} sectionName='Inventory' style={style.buttonStyle} />
                </Link>
                <ReactTooltip id="inventoryTooltip">
                    <span>Inventory</span>
                </ReactTooltip>
                
                <Link to='/expenses' data-tip data-for="expensesTooltip">
                    <SectionSelectorButton select={selectPage} buttonImg={ExpensesIcon} sectionName='Expenses' style={style.buttonStyle} />
                </Link>
                <ReactTooltip id="expensesTooltip">
                    <span>Expenses</span>
                </ReactTooltip>

                <Link to='#' data-tip data-for="logoutTooltip">
                    <SectionSelectorButton select={selectPage} buttonImg={LogoutIcon} sectionName='Logout' style={style.buttonStyle} />
                </Link>
                <ReactTooltip id="logoutTooltip">
                    <span>Log Out</span>
                </ReactTooltip>
            
            </div>
        )} />
    )
}
export default SideNav;