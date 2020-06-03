import React, { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryDisplayTable from './InventoryTableDisplay';
import axios from "axios";
import ButtonForInventoryComponents from "./InsertInventoryButton"
import DoughnutChart from '../DoughnutChart'

function InventoryPage(props) {

    const [count, setCount] = useState(0);

    const [invDisplay, setInvDisplay] = useState([{}]);


    const inventoryInsertAJAX = (thing) => {
        console.log('post made it this far')
        const invObj = {
            category: thing.category,
            itemName: thing.itemName,
            unit: thing.unit,
            quantity: thing.quantity,
            price: thing.price,
            TruckId: Number(props.userID)
        };

        axios.post('/api/inventory/create', invObj).then((res) => setCount(count +1));

    };

    const inventoryTableAJAX = () => {
        return axios.get("/api/inventory/" + props.userID).then((res) => {
            setInvDisplay(res.data);
        })
    };

    useEffect(() => {
        inventoryTableAJAX()
    }, [count])


    const style = {
        table: {
            marginLeft:'4rem'
        },
        
        tableStyle: {
            width: '100rem'
        },
        
        graphSize: {
            margin: '3px',
            marginTop: '2rem',
            height: '30rem',
            width: '85rem',
            background: 'blue'
        },

        container: {
            marginTop: '2rem',
            justifyContent: 'center'
        }

    }

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


    const doughnutChartAjax = () => {
        axios.all([getProduce(), getBread(), getDairy(), getMeat(), getSpices(), getNonParish()])
            .then(axios.spread(function (produce, bread, dairy, meat, spices, nonparish) {
                const categoryArray = [produce.data, bread.data, dairy.data, meat.data, spices.data, nonparish.data];

                const totalCostArray = [0, 0, 0, 0, 0, 0]

                for (let i = 0; i < categoryArray.length; i++) {
                    const a = categoryArray[i];
                    // console.log(a);

                    for (let y = 0; y < a.length; y++) {
                        // console.log(a[y]);

                        const b = Number(a[y].price);
                        // console.log(b)

                        console.log(Math.round(100 * b) / 100)
                        totalCostArray[i] += b
                    }
                }

                setdoughnutChart(totalCostArray);

            })
        )
    };

    const inventoryLabels = [
        'produce', 'bread', 'dairy', 'meat', 'spices', 'non-parish'
    ]

    useEffect(() => {
        doughnutChartAjax()
    },
        [count]
    )

    const [doughnutChart, setdoughnutChart] = useState();

    const handleTableEdit = () => {
        setCount(count + 1)
    }

    return (
    <> 
        <Container style={style.container}>
            <Row>

                <div style={style.table}>

                    <ButtonForInventoryComponents inventoryAJAXPost={inventoryInsertAJAX} />
                    
                    <InventoryDisplayTable key={count} count={{setCount, count}} style={style.tableStyle} data={invDisplay}  />
                
                </div>


            </Row>

                <Row>


                        <div className='weDontknowyet' style={style.graphs} >
                        <   h2 style={style.font}>Expenses Breakdown</h2>
                            <DoughnutChart Labels={inventoryLabels} DoughnutChartData={doughnutChart} key={count} />
                        </div>



                </Row>

        </Container>
    </>   
    )
}

export default InventoryPage;
