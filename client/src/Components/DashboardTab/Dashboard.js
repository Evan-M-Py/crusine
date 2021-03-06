import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './PieChart';
import BarGraph from './BarGraph';
import ContainerForTodos from '../ContainerForTodos';
import { Col, Row, Container } from "react-bootstrap";
import '../../App.css';
// import HorizontalBarGraph from './HorizontalBarGraph';

const Dashboard = (props) => {

    function getProduce() {
        return axios.get('/api/pieChart/Produce/' + props.userID)
    };

    function getBread() {
        return axios.get('/api/pieChart/Bread/' + props.userID)
    };

    function getDairy() {
        return axios.get('/api/pieChart/Dairy/' + props.userID)
    };

    function getMeat() {
        return axios.get('/api/pieChart/Meat/' + props.userID)
    };

    function getSpices() {
        return axios.get('/api/pieChart/Spices/' + props.userID)
    };

    function getNonParish() {
        return axios.get('/api/pieChart/Non-Parish/' + props.userID)
    };


    const pieChartAjax = () => {
        return axios.all([getProduce(), getBread(), getDairy(), getMeat(), getSpices(), getNonParish()]).then(axios.spread(function (prod, bread, dairy, meat, spices, nonPar) {
            // console.log(prod.data[0].price)
            const pieChartData = [prod.data.length, bread.data.length, dairy.data.length, meat.data.length, spices.data.length, nonPar.data.length];
            setPieChartData(pieChartData);
        })
        )
    };

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    function getKitchenAppliances() {
        return axios.get('/api/barGraph/Kitchen-Appliances/' + props.userID)
    };

    function getTools() {
        return axios.get('/api/barGraph/Tools/' + props.userID)
    };

    function getVehicle() {
        return axios.get('/api/barGraph/Vehicle/' + props.userID)
    };

    function getFOH() {
        return axios.get('/api/barGraph/FOH/' + props.userID)
    };

    function getMISC() {
        return axios.get('/api/barGraph/MISC/' + props.userID)
    };


    const barGraphAjax = () => {
        axios.all([getMISC(), getFOH(), getTools(), getKitchenAppliances(), getVehicle()])
            .then(axios.spread(function (misc, foh, tools, kitchenApp, vehicle) {

                const barGraphData = [foh.data.length, misc.data.length, tools.data.length, kitchenApp.data.length, vehicle.data.length];
                // console.log(foh.data.price);
                setBarGraphData(barGraphData);
            })
            )
    };

    //============================================================================================================================================================================================================

    function allGraphAjax() {
        barGraphAjax();
        pieChartAjax();
    };

    const [refresh, setRefresh] = useState(true)

    function refreshSet() {
        setRefresh(refresh + 1)
    }

    useEffect(() => {
        allGraphAjax()
    },
        [true]
    );

    const [pieChartData, setPieChartData] = useState();
    const [barGraphData, setBarGraphData] = useState();


    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    const style = {
        main: {
            marginBottom: '200px'

        },
        wrapper: {
            display: 'flex',
            width: '100vw',
            height: '50%',
            margin: '0',
            padding: '0'
        },
        wrapperTwo: {
            display: 'flex',
            height: '80%',
            margin: '0',
            padding: '0',
            background: '#F2EFE7'
        },
        graphs: {
            marginBottom: '75px',
            width: '40vw'
        },
        todo: {

            width: '50vw'
        },
        button: {
            height: '50px',
            width: '125px',
            marginLeft: '20vw'
        },
        font: {
            textAlign: 'center'
        },
        container: {
            background: '#F2EFE7'
        }
    }


    return (
        <div style={style.container}>

            <Container style={{ background: '#F2EFE7' }}>
                <Row className='justify-content-center'>

                    <Col>
                        <Row>
                            <div style={style.wrapper}>

                                <div className='weDontknowyet' style={style.graphs} >
                                    <h2 style={style.font}>Inventory Breakdown</h2>
                                    <PieChart graphData={pieChartData} />
                                </div>
                                <div className='weDontknowyet' style={style.graphs} >
                                    <h2 style={style.font}>Expenses Breakdown</h2>
                                    <BarGraph graphData={barGraphData} />
                                </div>

                            </div>
                        </Row>


                        <Row>
                            <Col md={{ span: 10, offset: 4 }}>
                                <ContainerForTodos style={style.todo} />
                            </Col>
                        </Row>

                    </Col>

                </Row>

            </Container>

        </div>
    )
};


export default Dashboard;
