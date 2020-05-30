import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wrapper from '../wrapper';
import SectionSelectorButton from './SectionSelectorButton';
import DashIcon from '../../icons/dash.png';
import ExpensesIcon from '../../icons/expenses.png';
import InventoryIcon from '../../icons/inventory.png';
import { Link } from 'react-router-dom';

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
                
                <Link to='/dashboard'>
                    <SectionSelectorButton select={selectPage} buttonImg={DashIcon} sectionName='Dashboard' style={style.buttonStyle} />
                </Link>
                
                <Link to='/inventory'>
                    <SectionSelectorButton select={selectPage} buttonImg={InventoryIcon} sectionName='Inventory' style={style.buttonStyle} />
                </Link>
                
                <Link to='/expenses'>
                    <SectionSelectorButton select={selectPage} buttonImg={ExpensesIcon} sectionName='Expenses' style={style.buttonStyle} />
                </Link>
            
            </div>
        )} />
    )
}
export default SideNav;