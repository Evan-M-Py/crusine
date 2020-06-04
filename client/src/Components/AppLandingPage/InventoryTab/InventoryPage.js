import React, { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryDisplayTable from './InventoryTableDisplay';
import axios from "axios";
import ButtonForInventoryComponents from "./InsertInventoryButton"
import DoughnutChart from '../DoughnutChart';
import './inventory.css';



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

        axios.post('/api/inventory/create', invObj).then((res) => setCount(count + 1));

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

            width: '100rem'
        },
        tableStyle: {
            gridColumnStart: '1',
            gridColumnEnd: '4',
            gridRowStart: '1',
            gridRowEnd: '3',
            margin: '0',
            marginLeft: '2rem'
          },
          
        invAndExpContainer: {
            display: 'grid',
            gridTemplateColumns: '20rem 20rem 20rem 20rem 20rem [end]',
            gridTemplateRows: '20rem 20rem 20rem 20rem ',
            marginTop: '2rem'
          },
          chartStyle: {
            gridColumnStart: '3',
            gridColumnEnd: 'end',
            gridRowStart: '1',
            gridRowEnd: '3',
            marginBottom: '4rem'
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
        'Produce', 'Bread', 'Dairy', 'Meat', 'Spices', 'Non-parish'
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
    <div style={style.invAndExpContainer}> 

                <div style={style.tableStyle}>


                    <ButtonForInventoryComponents inventoryAJAXPost={inventoryInsertAJAX} />
                    <InventoryDisplayTable  key={count} count={{setCount, count}}  data={invDisplay}  />
                </div>
                <div style={style.chartStyle}>                   
                        <DoughnutChart Labels={inventoryLabels} DoughnutChartData={doughnutChart} key={count} />
                </div>
    </div>   
    )
}

export default InventoryPage;
