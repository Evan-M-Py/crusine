import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './PieChart';
import BarGraph from './BarGraph';
import ContainerForTodos from '../ContainerForTodos'
import { Col, Row, Container } from "react-bootstrap";

import LineGraph from './HorizontalBarGraph';
import HorizontalBarGraph from './HorizontalBarGraph';


const Dashboard = (props) => {

    // state = {
    //     // Code goes here
    // }

    function getProduce() {
       return axios.get('/api/pieChart/Produce/' + props.userID)
    };

    function getBread() {
        return  axios.get('/api/pieChart/Bread/' + props.userID)
    };

    function getDairy() {
        return axios.get('/api/pieChart/Dairy/' + props.userID)
    };

    function getMeat() {
        return  axios.get('/api/pieChart/Meat/' + props.userID)
    };

    function getSpices() {
        return  axios.get('/api/pieChart/Spices/' + props.userID)
    };

    function getNonParish() {
        return  axios.get('/api/pieChart/Non-Parish/' + props.userID)
    };


    const pieChartAjax = () => {
        return axios.all([getProduce(), getBread(), getDairy(), getMeat(), getSpices(), getNonParish()]).then(axios.spread(function (prod, bread, dairy, meat, spices, nonPar) {
            const pieChartData = [prod.data.length, bread.data.length, dairy.data.length, meat.data.length, spices.data.length, nonPar.data.length];
            setPieChartData(pieChartData);
        })
    )};

    // const lineGraphAjax = () => {
    //     return axios.all([getProduce(), getBread(), getDairy(), getMeat(), getSpices(), getNonParish()]).then(axios.spread((one, two, three, four, five, six) => {
    //     const costArray =  [one, two, three, four, five, six];
    //     for (let i = 0; i < costArray.length; i++) {
    //         let layerOne = []
    //         layerOne = costArray[i].data;
    //         for (let i = 0; i < layerOne.length; i++) {
    //             let layerThree = [];
    //             let layerTwo = layerOne[i].price;
    //             layerThree.push(layerTwo)
    //             console.log(sum(layerThree))
    //         }
    //     }

    //     })
    // )};

    //     function theForLoop(one) {
    //         for(var i = 0; i < one.length; i++){
    //             let  priceArray = []
    //             priceArray.push(one[i]) 
    //                 console.log(priceArray);
    //             }
    //         }
            
    //     function sum(array) {
    //              array.reduce(function(a, b){
    //             return a + b;
    //         }, 0)};






   


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    function getKitchenAppliances() {
        return axios.get('/api/barGraph/Kitchen-Appliances/' + props.userID)
     };
 
     function getTools() {
         return  axios.get('/api/barGraph/Tools/' + props.userID)
     };
 
     function getVehicle() {
         return axios.get('/api/barGraph/Vehicle/' + props.userID)
     };
 
     function getFOH() {
         return  axios.get('/api/barGraph/FOH/' + props.userID)
     };
 
     function getMISC() {
         return  axios.get('/api/barGraph/MISC/' + props.userID)
     };
 
 
     const barGraphAjax = () => {
         axios.all([getMISC(), getFOH(), getTools(), getKitchenAppliances(), getVehicle()])
         .then(axios.spread(function (misc, foh, tools, kitchenApp, vehicle) {
            const barGraphData =  [foh.data.length, misc.data.length, tools.data.length, kitchenApp.data.length, vehicle.data.length];   
            setBarGraphData(barGraphData);
         })
    )};

    function allGraphAjax() {
        barGraphAjax();
        pieChartAjax();
        // lineGraphAjax();
    };

        const [ refresh, setRefresh ] = useState(true)

        function refreshSet() {
            setRefresh(refresh +1)
        }

     useEffect(() => {
         allGraphAjax()},
         [true]
     )

    const [ pieChartData, setPieChartData ] = useState();
    const [ barGraphData, setBarGraphData ] = useState();
    // const [ lineGraphData, setLineGraphData ] = useState();

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
                padding: '0'
            },
            graphs: {
                marginBottom: '75px',
                width: '40vw'
            },
            todo: {
                margin: '75vw',
                width: '50vw'
            },
            button: {
                height: '50px',
                width: '125px',
                marginLeft: '20vw'
            },
            font: {
                textAlign: 'center'
            }
        }


        return (
            <div>

                <Container>

                    <Row>

                        <div style={style.wrapper}>

                                <div style={style.graphs} >
                                    <h2 style={style.font}>Inventory Breakdown</h2>
                                    <PieChart graphData={pieChartData} />
                                </div>
                                <div style={style.graphs} >
                                    <h2 style={style.font}>Expenses Breakdown</h2>
                                    <BarGraph graphData={barGraphData} />
                                </div>

                        </div>

                    </Row>

                    <Row>
                    
                        <ContainerForTodos style={style.todo}/>
                    
                    </Row>
            
                </Container>
            
            </div>
        )
    };


export default Dashboard;
