import React from "react";

class TodoItem extends React.Component {

    // componentWillUnmount () {
    //     alert("component will mount")
    // }

    deleteBtnHandler () {
        alert("Apakah anda yakin untuk menghapus ?");
    }

    btnHandler(type) {
        alert(`Anda memencet button ${type}`)
    }

    render() {
        return (
         <div className="d-flex flex-row justify-content-center align-item-center text-align-center">
            <div className='my-1 d-flex flex-row justify-content-between todo-item-container'>
            {this.props.todoData.id} {this.props.todoData.activity}
                <div>
             <button 
             onClick={() => this.props.deleteTodoHandler(this.props.todoData.id)} 
             className='btn btn-danger' >Delete
             </button>
            <button 
            disabled={this.props.todoData.status} 
            onClick={() => this.props.completeTodoHandler(this.props.todoData.id)} 
            className='btn btn-success'>{
                this.props.todoData.status ? "Finished" : "Complete"
            }
            </button>
            </div>
             </div>
        </div>
        )
    }
}

export default TodoItem;