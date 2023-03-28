import "bootstrap/dist/css/bootstrap.css";
import TodoItem from '../components/TodoItem';
// import TodoItemF from './components/TodoItemF';
import React from 'react';
import Axios from 'axios';
import { connect } from "react-redux";
import {
  incrementTodoCount, 
  decrementTodoCount, 
  changeTodoCount,
  fetchTodoGlobal,
} from "../redux/actions/todo";



class TodoPage extends React.Component {
  state = {
    todoList: [],
    inputTodo: ""
  }

  fetchTodo = () => {
    Axios.get("http://localhost:2000/todo")
    .then((response) => {
      this.setState({todoList: response.data});
      this.props.changeTodo(response.data.length)
    })
    .catch((err) => {
      alert("Terjadi kesalahan server !")
    })
  }

  componentDidMount () {
    this.props.fetchTodoGlobal();
}

  deleteTodo = (id) => {
    Axios.delete(`http://localhost:2000/todo/${id}`)
    .then(() => {
      alert("Berhasil menghapus todo !")
      this.fetchTodo()
    })
    .catch((err) => {
      alert("Terjadi kesalahan server !")
    })
    
    // this.setState(
    //   {
    //     todoList: this.state.todoList.filter((val) => {
    //       return val.id !== id
    //     })
    //   }
    // )
  }

  completeTodo = (id) => {
    Axios.patch(`http://localhost:2000/todo/${id}`, {
      status: true,
    })
    .then((id) => {
      alert("Aktivitas telah selesai !");
      this.props.fetchTodoGlobal()
    })
    .catch(() => {
      alert("Terjadi kesalahan server !")
    })
  }

  renderTodoList = () => {
     return this.props.todoGlobalState.todoList.map((val) => {
        return (
          <TodoItem 
          completeTodoHandler={this.completeTodo} 
          deleteTodoHandler={this.deleteTodo} 
          todoData={val} />
        )
      })
  }

  addTodo = () => {
    Axios.post("http://localhost:2000/todo", {
      status: false,
      activity: this.state.inputTodo
    })
    .then(() => {
      alert("berhasil menambahkan aktivitas baru !");
      this.props.fetchTodoGlobal();
    })
    .catch((err) => {
      alert("Terjadi kesalahan server !")
    })
    // this.setState(
    //   {
    //     todoList: [
    //       ...this.state.todoList,
    //       {activity: this.state.inputTodo, id: this.state.todoList.length + 1}
    //     ]
    //   }
    // )
  }

  inputHandler = (event) => {
    //event.target.value menyimpan value dari input text saat ini
    this.setState({ inputTodo: event.target.value});
  }

  render() {
   return (
    <div>
      <h1 className="d-flex flex-row justify-content-center align-item-center text-align-center">Todo list({this.props.todoGlobalState.todoCount})</h1>
      {/* <button className="d-flex flex-row justify-content-center align-item-center text-align-center btn btn-info" onClick={this.fetchTodo}>Get my Todo list {this.props.todoGlobalState.todoCount}</button> */}
      {this.renderTodoList()}
    <div className="d-flex flex-row justify-content-center align-item-center text-align-center">
      <input onChange={this.inputHandler} type="text" className='mx-3' />
      <button onClick={this.addTodo} className='btn btn-primary'>Add Todo</button>
      <button onClick={this.props.incrementTodo} className="btn btn-warning">Increment Todo</button>
      <button onClick={this.props.decrementTodo} className="btn btn-warning">Decrement Todo</button>
      <button onClick={() => this.props.changeTodo(7)} className="btn btn-info">Change Todo</button>    
    </div>
    </div>
  );
  }
}

const mapStateToProps = (state) => {
  //state = {
  //   todo: todo
  // }
  // state.todo.todoCount
  return {
    testingProps: 0,
    todoGlobalState: state.todo
  }
}

const mapDispatchToProps = {
  incrementTodo: incrementTodoCount,
  decrementTodo: decrementTodoCount,
  changeTodo: changeTodoCount,
  fetchTodoGlobal: fetchTodoGlobal,
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
