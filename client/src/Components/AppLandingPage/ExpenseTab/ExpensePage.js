import React, { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpenseDisplayTable from './ExpenseTableDisplay';
import axios from "axios";
import ButtonForExpenseComponent from "./InsertExpenseButton"
import DoughnutChart from '../DoughnutChart'


function ExpensePage(props) {

    const [expDisplay, setExpDisplay] = useState([{}]);

    const [count, setCount] = useState(0);

    const expenseInsertAJAX = (thing) => {
        console.log('expense insert route hit');
        const expObj = {
            expense: thing.expense,
            price: thing.cost,
            category: thing.category,
            TruckId: Number(props.userID)
        }

        axios.post("/api/expense/create", expObj).then((res) => {
            setCount(count + 1);
        });


    };

    const expenseTableAJAX = () => {
        return axios.get("/api/expense/" + props.userID).then((res) => {
            setExpDisplay(res.data);
        });
    }


    useEffect(() => {

        expenseTableAJAX()
    }, [count]);


    const style = {

        tableStyle: {
            width: '50rem'
        },

        graphSize: {
            margin: '3px',
            marginTop: '2rem',
            height: '30rem',
            width: '85rem',
            background: 'blue'
        },

        container: {
            marginTop: '2rem'
        },

        tableStyle: {
            width: '50rem'
        },

        graphSize: {
            margin: '3px',
            marginLeft: '2rem',
            height: '25rem',
            width: '35rem',
            background: 'blue'
        },

        container: {
            marginTop: '2rem'
        },
        graphs: {
            marginBottom: '75px',
            width: '40vw'
        }

    }


    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

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


    const doughnutChartAjax = () => {
        axios.all([getMISC(), getFOH(), getTools(), getKitchenAppliances(), getVehicle()])
            .then(axios.spread(function (misc, foh, tools, kitchenApp, vehicle) {
                const categoryArray = [misc.data, foh.data, tools.data, kitchenApp.data, vehicle.data];

                const totalCostArray = [0, 0, 0, 0, 0]

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

    const expenseLabels = [
        'Misc.',
        'FOH',
        'Tools',
        'Kitchen-Appliances',
        'Vehicle',
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
                    <ButtonForExpenseComponent expenseInsertAjax={expenseInsertAJAX} />
                    <ExpenseDisplayTable key={count} count={{ setCount, count }} style={style.tableStyle} data={expDisplay} handleTableEdit={handleTableEdit} />
                </Row>

                <Row>
                    <div className='weDontknowyet' style={style.graphs} >
                        <h2 style={style.font}>Expenses Breakdown</h2>
                        <DoughnutChart Labels={expenseLabels} DoughnutChartData={doughnutChart} key={count} />
                    </div>
                </Row>

            </Container>
        </>
    )
};

export default ExpensePage;