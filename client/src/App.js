import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SignupPage from './Components/SignupForm';
import UserContext from './utils/userContext';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import InventoryPage from './Components/AppLandingPage/InventoryTab/InventoryPage';
import SideNav from './Components/AppLandingPage/SideNav';
import LoginPage from './Components/LoginForm';
import TopNav from './Components/TopNav/TopNav';
import Dashboard from './Components/DashboardTab/Dashboard';
import ExpensePage from './Components/AppLandingPage/ExpenseTab/ExpensePage';


const App = (props) => {

    // in function for the sign up info in, in a .then set user to currentUserID
    //In the submit button, do an onclick

    const [userID, setUserID] = useState('')

    const location = useLocation()

    const style = {
        parentDiv: {
            display: "flex",
            background: '#F2EFE7',
            margin: '0',
            width: '100vw',
            height: '100vh'
        },
        marginControl: {

        }
    };

    const handleContextChange = (props) => {
        setUserID(props)
    };



    return (
        <div style={style.marginControl}>
            {location.pathname !== '/signup' && location.pathname !== '/' && <TopNav handleContextChange={handleContextChange} />}
            <UserContext.Provider value={userID}>
                <Switch>

                    <Route exact path='/'>
                        <LoginPage handleContextChange={handleContextChange} />

                    </Route>

                    <Route exact path="/signup" component={SignupPage} >

                        <SignupPage handleContextChange={handleContextChange} />
                    </Route>


                    <div style={style.parentDiv}>
                        {location.pathname !== '/signup' && location.pathname !== '/' && <SideNav handleContextChange={handleContextChange} />}

                        <Route exact path="/dashboard" >
                            <Dashboard userID={userID} />
                        </Route>

                        <Route exact path="/inventory">
                            <InventoryPage userID={userID} />
                        </Route>

                        <Route exact path="/expenses">
                            <ExpensePage userID={userID} />
                        </Route>

                    </div>

                </Switch>
            </UserContext.Provider>
        </div>
    )
}

export default App;
