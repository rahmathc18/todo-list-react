import React from "react";

const TodoItemF = (props) => {
    const deleteBtnHandler =  () => {
        alert("Apakah anda yakin untuk menghapus ?");
    }

   const btnHandler = (type) => {
        alert(`Anda memencet button ${type}`)
    }

    return (
    <div>
         <div className='my-1 d-flex flex-row justify-content-between todo-item-container'>
            {props.todoData.id} {props.todoData.activity}
                <div>
             <button onClick={() => props.deleteTodoHandler(props.todoData.id)} className='btn btn-danger' >Delete</button>
            <button onClick={() => btnHandler("Complete")} className='btn btn-success'>Complete</button>
            </div>
             </div>
    </div>
    )
}

export default TodoItemF;