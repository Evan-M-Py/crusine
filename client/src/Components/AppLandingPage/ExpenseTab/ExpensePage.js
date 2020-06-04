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
            setCount(count + 1)
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
          },

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
        'produce',
        'bread',
        'dairy',
        'meat',
        'spices',
        'non-parishable'
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
            <div style={style.invAndExpContainer}> 
                <div style={style.tableStyle}>
                    <ButtonForExpenseComponent expenseInsertAjax={expenseInsertAJAX} />
                    <ExpenseDisplayTable key={count} count={{ setCount, count }} style={style.tableStyle} data={expDisplay} handleTableEdit={handleTableEdit} />
                </div>
                <div style={style.chartStyle}>                   
                    <DoughnutChart Labels={expenseLabels} DoughnutChartData={doughnutChart} key={count} />
                </div>
            </div>   
        </>
    )
};

export default ExpensePage;