import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    deleteTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeTasksStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeFilter: (todolistID: string, filterValue: FilterValueType) => void
    deleteTodolist: (todolistID: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const mappedTasks = props.tasks.map(task => {
        const onClickHandler = () => props.deleteTask(props.id, task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(props.id, task.id, e.currentTarget.checked)
        }
        return (
            <li key={task.id}>
                <input onChange={onChangeHandler} type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })

    const callbackForAddTask = (newTitle: string) => {
        props.addTask(props.id, newTitle)
    }

    const changeFilterHandler = (filterValue: FilterValueType) => {
        props.changeFilter(props.id, filterValue)
    }

    const deleteTodolistHandler = () => props.deleteTodolist(props.id)

    return (
        <div className="App">
            <h3>
                {props.title}
                <button onClick={deleteTodolistHandler}>x</button>
            </h3>
            <AddItemForm
                callback={callbackForAddTask}
            />
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button onClick={() => changeFilterHandler('all')}>All</button>
                <button onClick={() => changeFilterHandler('active')}>Active</button>
                <button onClick={() => changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}

