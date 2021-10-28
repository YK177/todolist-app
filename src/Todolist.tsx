import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    deleteTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeTasksStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeFilter: (todolistID: string, filterValue: FilterValueType) => void
    deleteTodolist: (todolistID: string) => void
}

export const Todolist = (props: PropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState('')

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

    //tasks handlers
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError('')
    }

    const addTask = () => {
        if (newTitle === '') {
            setError('Field is required!')
        } else {
            props.addTask(props.id, newTitle.trim())
        }
        setNewTitle('')
    }

    const onClickHandlerForAddTask = () => {
        addTask()
    }

    const onEnterPressHandlerForAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    const changeFilterHandler = (filterValue: FilterValueType) => {
        props.changeFilter(props.id, filterValue)
    }

    //todolist handlers
    const deleteTodolistHandler = () => props.deleteTodolist(props.id)

    return (
        <div className="App">
            <h3>
                {props.title}
                <button onClick={deleteTodolistHandler}>x</button>
            </h3>
            <div>
                <input
                    onChange={onChangeHandler}
                    onKeyPress={onEnterPressHandlerForAddTask}
                    value={newTitle}
                    type="text"
                />
                {error && <span>{error}</span>}
                <button onClick={onClickHandlerForAddTask}>+</button>
            </div>
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