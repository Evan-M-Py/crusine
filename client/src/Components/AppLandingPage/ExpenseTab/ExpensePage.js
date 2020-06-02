import React, { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpenseDisplayTable from './ExpenseTableDisplay';
import axios from "axios";
import ButtonForExpenseComponent from "./InsertExpenseButton"


function ExpensePage( props ) {

    const [expDisplay, setExpDisplay] = useState([{}]);

    const [count, setCount] = useState(0);

    const expenseInsertAJAX = (thing) => {
      
      const expObj = {
        expense: thing.expense,
        price: thing.cost,
        category: thing.category,
        TruckId:  Number(props.userID)
      }

      axios.post("/api/expense/create", expObj).then((res) => {
        setCount(count +1)
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
    }

}


  return (
    <>
      <Container style={style.container}>
        <Row>

              <ButtonForExpenseComponent expenseInsertAjax={expenseInsertAJAX} />

              <ExpenseDisplayTable style={style.tableStyle} data={expDisplay} />

            </Row>



            <Row>

                <div style={style.graphSize}>

                </div>




            </Row>



      </Container>
    </>
  )
};

export default ExpensePage;