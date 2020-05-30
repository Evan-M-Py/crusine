import React, { useState, useRef } from 'react';
// stateless component
const Title = () => {
    return (
        <div id="titleWrapper" className="text-center mb-4">
            <h2 className="textCenter">To-do List</h2>
        </div>
    );
};

const Form = (props) => {
    const inputRef = useRef(null);

    const [valueState, setValueState] = useState({
        todoBody: ''
    });

    const handleChange = (event) => {
        setValueState({
            [event.target.name]: event.target.value
        });
    };

    const handleNewTodoAddition = () => {
        if (valueState.todoBody !== '') {
            props.addTodo(valueState.todoBody);
            setValueState({
                todoBody: ''
            });
        };
    };

    return (
        // ref should be passed a callback
        // with underlying dom element as its
        // argument to get its reference 
        <div id="form" className="row my-2 d-flex justify-content-center">
            <input
                className="form-control col-9"
                name='todoBody'
                value={valueState.todoBody}
                placeholder="Add todos here..."
                autocomplete="off"
                onChange={(e) => handleChange(e)}
            />
            <button
                className="btn btn-primary col-2 ml-2"
                onClick={(e) => handleNewTodoAddition(e)}
            >
                Add To-do!
            </button>
        </div>
    );
};

const Todo = ({ todo, remove }) => {
    // single todo 
    return (
        <p className="todos">
            {todo.value}
            <span
                className="removeBtn float-right"
                onClick={() => {
                    remove(todo.id)
                }}>
                x
			</span>
        </p>
    );
};

const List = ({ todos, remove }) => {
    let allTodos = [];
    if (todos.length > 0) {
        allTodos = todos.map(todo => {
            // passing todo and remove method reference
            return (<Todo todo={todo} remove={remove} />);
            //return (<p>{todo.value}</p>);
        });
    } else {
        allTodos.push(<h3 id="acu">All caught up!</h3>);
    }
    return (
        <div id="list">
            <p id="info"> Your Todos: </p>
            {allTodos}
        </div>
    );
};

const ContainerForTodos = (props) => {
    const localData = localStorage.todos && JSON.parse(localStorage.todos);
    const introData = [
        {
            id: -1,
            value: "Hover over todos and click on 'x' to delete them!"
        }
    ];
    const [state, setState] = useState({
        data: localData || introData
    });

    // binding methods
    // this.addTodo = this.addTodo.bind(this);
    // this.removeTodo = this.removeTodo.bind(this);



    // // Handler to update localStorage
    const updateLocalStorage = () => {
        if (typeof (Storage) !== "undefined")
            localStorage.todos = JSON.stringify(state.data);
    }


    // // Handler to add todo
    const addTodo = (val) => {
        let id;
        // if localStorage is available then increase localStorage count
        // else use global window object's id variable
        if (typeof (Storage) !== "undefined") {
            id = Number(localStorage.count);
            localStorage.count = Number(localStorage.count) + 1;
        } else {
            id = window.id++;
        }
        const todo = {
            value: val,
            id: id
        };
        state.data.push(todo);

        // update state
        setState({
            data: state.data
        }, () => {
            // update localStorage
            updateLocalStorage();
        });
    };


    // // Handler to remove todo
    const removeTodo = (id) => {
        // filter out the todo that has to be removed
        const list = state.data.filter(todo => {
            if (todo.id !== id) {
                return todo;
            }
        });
        // update state
        setState({
            data: list
        }, () => {
            // update localStorage
            console.log("WORKING");
            updateLocalStorage();
        });
    }


    const componentDidMount = () => {
        localStorage.clear();
        if (typeof (Storage) !== "undefined") {
            if (!localStorage.todos) {
                localStorage.todos = JSON.stringify(state.data);
            }
            if (!localStorage.count) {
                localStorage.count = 0;
            }
        } else {
            console.log("%cApp will not remember todos created as LocalStorage Is Not Available");
            window.id = 0;
        }
    }

    return (
        <div id="container" className="card col-11">
            <Title />
            <Form addTodo={addTodo} />
            <List todos={state.data} remove={removeTodo} />
        </div>
    );
};

export default ContainerForTodos;